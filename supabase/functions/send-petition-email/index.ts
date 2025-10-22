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
        from: 'Salt Spring Island Arena Campaign <saltspringislandarena@gmail.com>',
        to: record.email,
        subject: '✅ Thank You for Signing - Help Us Reach 2,000 Signatures!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Thank You, ${record.first_name}! 🎉</h1>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                          Your signature has been added to our petition for the <strong>Salt Spring Island Community Arena</strong>!
                        </p>

                        <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0;">
                          <p style="margin: 0; font-size: 15px; color: #9a3412; font-weight: bold;">
                            🙏 We Need Your Help Right Now!
                          </p>
                          <p style="margin: 10px 0 0; font-size: 14px; color: #7c2d12; line-height: 1.5;">
                            We need <strong>2,000 signatures</strong> to convince the government to fund this project. Please share this petition with everyone you know on Salt Spring Island!
                          </p>
                        </div>

                        <h2 style="color: #0284c7; font-size: 20px; margin: 30px 0 15px;">📢 Share the Petition Now:</h2>
                        <p style="margin: 0 0 15px; font-size: 15px; line-height: 1.6; color: #333333;">
                          Copy and paste this message to send to 5 island friends:
                        </p>

                        <div style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin: 15px 0; font-family: monospace; font-size: 13px; color: #1e293b;">
                          I just signed the petition for Salt Spring Island's Community Arena! 🏒<br><br>
                          Help us reach 2,000 signatures: https://ssiarena.com/petition<br><br>
                          It takes 30 seconds. Together we can make this happen!
                        </div>

                        <table role="presentation" style="width: 100%; margin: 20px 0;">
                          <tr>
                            <td align="center">
                              <a href="https://ssiarena.com/petition" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                                📋 Copy Petition Link
                              </a>
                            </td>
                          </tr>
                        </table>

                        <h2 style="color: #0284c7; font-size: 20px; margin: 30px 0 15px;">🚀 What's Next?</h2>
                        <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: #333333;">
                          <li><strong>Q4 2025:</strong> Community engagement and signature gathering (we are here!)</li>
                          <li><strong>Q1 2026:</strong> Professional feasibility study</li>
                          <li><strong>Q2 2026:</strong> Government grant applications</li>
                          <li><strong>Q1 2028:</strong> Groundbreaking</li>
                          <li><strong>2029/2030:</strong> Grand opening!</li>
                        </ul>

                        <div style="background-color: #ecfdf5; border-radius: 6px; padding: 20px; margin: 25px 0;">
                          <h3 style="margin: 0 0 10px; color: #065f46; font-size: 18px;">💚 Want to Do More?</h3>
                          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #064e3b;">
                            Consider making a financial pledge to show your commitment:
                            <a href="https://ssiarena.com/#pledge" style="color: #0284c7; text-decoration: none; font-weight: bold;">Make a Pledge →</a>
                          </p>
                        </div>

                        <p style="margin: 25px 0 0; font-size: 15px; line-height: 1.6; color: #333333;">
                          We'll keep you updated on our progress via email. Together we can make this happen for Salt Spring Island!
                        </p>

                        <p style="margin: 20px 0 0; font-size: 15px; color: #333333;">
                          <strong>Thank you for being part of the movement!</strong><br>
                          The SSI Arena Campaign Team
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 10px; font-size: 13px; color: #64748b;">
                          Salt Spring Island Community Arena Association<br>
                          <a href="mailto:saltspringislandarena@gmail.com" style="color: #0284c7; text-decoration: none;">saltspringislandarena@gmail.com</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                          <a href="https://ssiarena.com/privacy" style="color: #64748b; text-decoration: none;">Privacy Policy</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
