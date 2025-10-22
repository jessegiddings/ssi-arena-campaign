# Resend Email Automation Setup Guide

This guide will help you set up automated email notifications for your Salt Spring Island Arena petition using Resend and Supabase Edge Functions.

## Prerequisites

- Supabase CLI installed (`npm install -g supabase`)
- Resend account (free tier: 3,000 emails/month)
- Your Supabase project is set up

## Step 1: Set Up Resend

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com) and create an account

2. **Verify your domain** (or use test domain)
   - In Resend dashboard, go to "Domains"
   - Add your domain and verify it with DNS records
   - OR use Resend's test domain for development

3. **Get your API key**
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy it for later use (keep it secret!)

## Step 2: Update Environment Variables

1. Open your `.env` file and update:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   NOTIFICATION_EMAIL=your-actual-email@example.com
   ```

## Step 3: Deploy the Edge Function

1. **Login to Supabase CLI**
   ```bash
   supabase login
   ```

2. **Link your project**
   ```bash
   cd /Users/irvinelaptop/documents/projects/todo
   supabase link --project-ref dpulfcvdhvqigytruezd
   ```

3. **Set the secrets in Supabase**
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
   supabase secrets set NOTIFICATION_EMAIL=your-actual-email@example.com
   ```

4. **Deploy the Edge Function**
   ```bash
   supabase functions deploy send-petition-email --no-verify-jwt
   ```

## Step 4: Set Up the Database Trigger

1. **Get your Service Role Key**
   - Go to your Supabase dashboard
   - Navigate to Settings → API
   - Copy your `service_role` key (NOT the anon key)

2. **Update the SQL file**
   - Open `supabase/email-trigger.sql`
   - Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key

3. **Run the SQL in Supabase**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Paste the contents of `supabase/email-trigger.sql`
   - Click "Run"

## Step 5: Update Email Content (Optional)

You can customize the email templates in `supabase/functions/send-petition-email/index.ts`:

- **Line 21**: Change the `from` email domain
- **Line 23**: Customize the thank-you email subject
- **Line 24-39**: Edit the thank-you email HTML content
- **Line 49**: Change the notification `from` email domain
- **Line 50**: Update notification recipient (or use env var)
- **Line 51**: Customize the notification subject
- **Line 52-60**: Edit the notification email HTML content

After making changes, redeploy:
```bash
supabase functions deploy send-petition-email --no-verify-jwt
```

## Step 6: Test the Setup

1. Go to your petition website
2. Submit a test signature
3. Check:
   - The signature appears in your Supabase database
   - You receive a notification email
   - The petitioner receives a thank-you email

## Troubleshooting

### Emails not sending?

1. **Check Edge Function logs**
   ```bash
   supabase functions logs send-petition-email
   ```

2. **Verify secrets are set**
   ```bash
   supabase secrets list
   ```

3. **Check Resend dashboard**
   - Go to resend.com/emails to see email delivery status
   - Check for any errors or bounces

4. **Verify domain setup**
   - Make sure your domain is verified in Resend
   - Or use `onboarding@resend.dev` as the from address for testing

### Database trigger not firing?

1. Check if the trigger exists:
   ```sql
   SELECT * FROM information_schema.triggers
   WHERE trigger_name = 'on_petition_signature';
   ```

2. Verify the function exists:
   ```sql
   SELECT * FROM pg_proc
   WHERE proname = 'handle_new_petition_signature';
   ```

### Permission errors?

- Make sure you're using the service_role key in the trigger, not the anon key
- Verify the Edge Function URL is correct

## What Happens Now?

Every time someone signs your petition:

1. ✅ Signature is saved to Supabase
2. ✅ Database trigger fires automatically
3. ✅ Edge Function is called
4. ✅ Thank-you email sent to petitioner
5. ✅ Notification email sent to you
6. ✅ Campaign stats are updated

## Next Steps: Bulk Emails

To send emails to all your petition signers later:

1. Export emails from Supabase:
   ```sql
   SELECT email, first_name, last_name
   FROM signatures
   WHERE consent_updates = true;
   ```

2. Use a bulk email service like:
   - Mailchimp (free up to 500 contacts)
   - SendGrid (free up to 100 emails/day)
   - Brevo (free up to 300 emails/day)

Or create another Edge Function for bulk sends with rate limiting.

## Cost Estimate

With Resend free tier (3,000 emails/month):
- If you get 1,000 signatures: 2,000 emails total (1,000 thank-yous + 1,000 notifications)
- Well within free tier limits!

## Support

If you need help:
- Resend docs: [resend.com/docs](https://resend.com/docs)
- Supabase Edge Functions: [supabase.com/docs/guides/functions](https://supabase.com/docs/guides/functions)
