import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  try {
    // Parse request body
    const {
      subject,
      htmlContent,
      audienceFilter = 'all'
    } = await req.json()

    // Validate inputs
    if (!subject || !htmlContent) {
      return new Response(
        JSON.stringify({ error: 'Subject and htmlContent are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!)

    // Build query based on audience filter
    let query = supabase
      .from('signatures')
      .select('email, first_name, last_name')
      .eq('consent_updates', true) // Only send to people who opted in!

    // Apply additional filters
    if (audienceFilter === 'pledgers') {
      // Get emails of people who made pledges
      const { data: pledgeData } = await supabase
        .from('pledges')
        .select('signature_id')

      const pledgeSignatureIds = pledgeData?.map(p => p.signature_id) || []
      query = query.in('id', pledgeSignatureIds)
    } else if (audienceFilter === 'major_pledgers') {
      // Get emails of people who pledged $1000+
      const { data: pledgeData } = await supabase
        .from('pledges')
        .select('signature_id, amount')
        .gte('amount', 100000) // $1000 in cents

      const pledgeSignatureIds = pledgeData?.map(p => p.signature_id) || []
      query = query.in('id', pledgeSignatureIds)
    }

    // Fetch recipients
    const { data: recipients, error: fetchError } = await query

    if (fetchError) {
      console.error('Error fetching recipients:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch recipients' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!recipients || recipients.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No recipients found matching criteria',
          sent: 0
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Rate limiting: Send in batches to avoid hitting API limits
    // Resend free tier: 3000/month, but rate limit is 10/second
    const BATCH_SIZE = 10
    const DELAY_MS = 2000 // 2 seconds between batches

    let sentCount = 0
    let failedCount = 0
    const errors = []

    // Process in batches
    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE)

      // Send emails in parallel for this batch
      const batchPromises = batch.map(async (recipient) => {
        try {
          // Personalize the email by replacing {{first_name}} placeholder
          const personalizedHtml = htmlContent.replace(/\{\{first_name\}\}/g, recipient.first_name || 'Supporter')

          const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Salt Spring Island Arena Campaign <saltspringislandarena@gmail.com>',
              to: recipient.email,
              subject: subject,
              html: personalizedHtml
            })
          })

          if (response.ok) {
            sentCount++
            return { success: true, email: recipient.email }
          } else {
            const errorText = await response.text()
            failedCount++
            errors.push({ email: recipient.email, error: errorText })
            return { success: false, email: recipient.email, error: errorText }
          }
        } catch (error) {
          failedCount++
          errors.push({ email: recipient.email, error: error.message })
          return { success: false, email: recipient.email, error: error.message }
        }
      })

      // Wait for batch to complete
      await Promise.all(batchPromises)

      // Delay before next batch (except for last batch)
      if (i + BATCH_SIZE < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS))
      }
    }

    // Log the campaign send to database
    const { error: logError } = await supabase
      .from('email_campaigns')
      .insert({
        subject: subject,
        audience_filter: audienceFilter,
        recipients_count: recipients.length,
        sent_count: sentCount,
        failed_count: failedCount,
        sent_at: new Date().toISOString()
      })

    if (logError) {
      console.error('Error logging campaign:', logError)
      // Don't fail the request if logging fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Campaign sent successfully`,
        totalRecipients: recipients.length,
        sent: sentCount,
        failed: failedCount,
        errors: errors.length > 0 ? errors.slice(0, 10) : [] // Return first 10 errors
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-campaign-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})
