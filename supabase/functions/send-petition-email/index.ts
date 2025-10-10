import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const YOUR_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'your-email@example.com'

serve(async (req) => {
  try {
    const { record } = await req.json()

    // Construct full name
    const fullName = `${record.first_name} ${record.last_name}`

    // Send thank-you email to petitioner
    const thankYouResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Salt Spring Island Arena Campaign <noreply@yourdomain.com>',
        to: record.email,
        subject: 'Thank you for signing our petition!',
        html: `
          <h1>Thank You for Your Support!</h1>
          <p>Hi ${record.first_name},</p>
          <p>Thank you for signing our petition to support the Salt Spring Island Arena project. Your voice matters!</p>

          <h2>Next Steps:</h2>
          <ul>
            <li>Share the petition with your network</li>
            <li>Follow us on social media for updates</li>
            <li>We'll keep you posted on our progress</li>
          </ul>

          <p>Together we can make this arena a reality for our community!</p>
          <p>Best regards,<br>The SSI Arena Campaign Team</p>
        `
      })
    })

    if (!thankYouResponse.ok) {
      console.error('Failed to send thank-you email:', await thankYouResponse.text())
    }

    // Send notification to yourself
    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Petition Alerts <noreply@yourdomain.com>',
        to: YOUR_EMAIL,
        subject: '🎉 New Petition Signature!',
        html: `
          <h2>New signature received!</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Postal Code:</strong> ${record.postal_code}</p>
          <p><strong>Consented to Petition:</strong> ${record.consent_petition ? 'Yes' : 'No'}</p>
          <p><strong>Wants Updates:</strong> ${record.consent_updates ? 'Yes' : 'No'}</p>
          <p><strong>Time:</strong> ${new Date(record.created_at).toLocaleString()}</p>
        `
      })
    })

    if (!notificationResponse.ok) {
      console.error('Failed to send notification email:', await notificationResponse.text())
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in send-petition-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
