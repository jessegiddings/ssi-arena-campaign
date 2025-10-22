# Email Campaign System Guide

This guide explains how to use the automated email system for the Salt Spring Island Arena campaign.

## Overview

Your email system has two components:

1. **Automated Thank-You Emails** - Sent automatically when someone signs the petition
2. **Milestone Campaign Emails** - Sent manually for quarterly updates or major milestones

## Part 1: Automated Thank-You Emails

### How It Works

When someone signs your petition, Supabase automatically:
1. Saves their signature to the database
2. Triggers the `send-petition-email` Edge Function
3. Sends a professional thank-you email via Resend

### Setup (One-Time)

#### Step 1: Create a New Resend API Key

**IMPORTANT**: Your old API key was exposed and needs to be regenerated.

1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Name it: "SSI Arena Production"
4. Copy the new key (starts with `re_`)

#### Step 2: Set Supabase Secrets

```bash
# Login to Supabase CLI
supabase login

# Link your project (if not already linked)
supabase link --project-ref dpulfcvdhvqigytruezd

# Set the new API key
supabase secrets set RESEND_API_KEY=re_your_new_api_key_here

# Verify it's set
supabase secrets list
```

#### Step 3: Deploy the Thank-You Email Function

```bash
# Deploy the updated function
supabase functions deploy send-petition-email --no-verify-jwt

# Check the logs to verify it's working
supabase functions logs send-petition-email
```

### What the Thank-You Email Contains

Your supporters receive a professional HTML email with:

- ✅ Personalized greeting with their first name
- ✅ Confirmation of their signature
- ✅ **URGENT plea to share** with pre-written copy-paste message
- ✅ Timeline of project next steps (Q4 2025 - 2030)
- ✅ Call-to-action to make a financial pledge
- ✅ Mobile-responsive design

### Testing the Thank-You Email

1. Go to your petition site
2. Submit a test signature with your email
3. Check your inbox within 1-2 minutes
4. Verify the email looks good on both desktop and mobile

If you don't receive it:
```bash
# Check the function logs for errors
supabase functions logs send-petition-email --limit 50
```

---

## Part 2: Milestone Campaign Emails

### When to Send Campaign Emails

**Recommended Schedule:**

- **500 signatures** - First major milestone celebration
- **1,000 signatures** - Halfway to goal update
- **$50,000 pledged** - Financial momentum update
- **2,000 signatures** - Goal reached celebration
- **Quarterly** - Progress updates (if no major milestones)

### Setup (One-Time)

#### Step 1: Create the Database Table

1. Go to your Supabase dashboard → SQL Editor
2. Open the file `supabase/email-campaigns-table.sql`
3. Copy the entire SQL script
4. Paste into the SQL Editor
5. Click "Run"

This creates the `email_campaigns` table to track your email sends.

#### Step 2: Deploy the Campaign Email Function

```bash
# Deploy the bulk email function
supabase functions deploy send-campaign-email --no-verify-jwt

# Verify deployment
supabase functions list
```

### How to Send a Milestone Email

#### Option A: Using cURL (Command Line)

```bash
# Get your Supabase URL and Service Role Key from dashboard
# Settings → API → Project URL and service_role key

# Send to all supporters who opted into updates
curl -X POST \
  https://dpulfcvdhvqigytruezd.supabase.co/functions/v1/send-campaign-email \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "🎉 We Hit 500 Signatures! Here'\''s What'\''s Next",
    "htmlContent": "<html>YOUR EMAIL HTML HERE</html>",
    "audienceFilter": "all"
  }'
```

#### Option B: Using JavaScript (From Your App)

```javascript
const { data, error } = await fetch(
  'https://dpulfcvdhvqigytruezd.supabase.co/functions/v1/send-campaign-email',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: '🎉 We Hit 500 Signatures! Here\'s What\'s Next',
      htmlContent: emailHtml,
      audienceFilter: 'all'
    })
  }
);
```

### Audience Filters

Choose who receives the email:

- `"all"` - All supporters who opted into updates (default)
- `"pledgers"` - Only people who made financial pledges
- `"major_pledgers"` - Only people who pledged $1,000 or more

Example:
```json
{
  "subject": "Special Update for Our Major Donors",
  "htmlContent": "<html>...</html>",
  "audienceFilter": "major_pledgers"
}
```

### Rate Limiting

The function automatically:
- Sends 10 emails per batch
- Waits 2 seconds between batches
- Respects Resend's free tier limit (10 emails/second)

**Example timeline:**
- 100 recipients = ~20 seconds
- 500 recipients = ~1.5 minutes
- 1,000 recipients = ~3 minutes

---

## Email Templates for Milestones

### Template 1: 500 Signatures Milestone

**Subject:** 🎉 We Hit 500 Signatures! Here's What's Next

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
    .content { padding: 30px; }
    .milestone-box { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center; }
    .stats { display: table; width: 100%; margin: 20px 0; }
    .stat { display: table-cell; text-align: center; padding: 15px; }
    .stat-number { font-size: 32px; font-weight: bold; color: #0284c7; }
    .stat-label { font-size: 14px; color: #64748b; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">We Did It! 🎉</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">A major milestone for our community</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; color: #1e293b;">Hi {{first_name}},</p>

      <div class="milestone-box">
        <h2 style="margin: 0 0 10px 0; color: #92400e; font-size: 24px;">🎯 500 Signatures Reached!</h2>
        <p style="margin: 0; color: #78350f; font-size: 14px;">That's 25% of our 2,000 signature goal</p>
      </div>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6;">
        Thanks to supporters like you, we've reached an incredible milestone. <strong>500 islanders</strong> have now signed in support of the Salt Spring Island Community Arena!
      </p>

      <div class="stats">
        <div class="stat">
          <div class="stat-number">500</div>
          <div class="stat-label">Signatures</div>
        </div>
        <div class="stat">
          <div class="stat-number">25%</div>
          <div class="stat-label">To Goal</div>
        </div>
      </div>

      <h3 style="color: #1e293b; font-size: 20px;">What This Means</h3>
      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        Every signature strengthens our case to government funders. With 500 voices united, we're showing that this isn't just a want—it's a community priority.
      </p>

      <h3 style="color: #1e293b; font-size: 20px;">How You Can Help Right Now</h3>
      <ol style="font-size: 15px; color: #334155; line-height: 1.8;">
        <li><strong>Share the petition</strong> with 5 friends who care about Salt Spring Island</li>
        <li><strong>Post on social media</strong> - tag #SSIArena to spread the word</li>
        <li><strong>Make a pledge</strong> to show financial support for the project</li>
      </ol>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://ssiarena.com/petition" class="cta-button">Share the Petition</a>
      </div>

      <h3 style="color: #1e293b; font-size: 20px;">What's Next</h3>
      <ul style="font-size: 15px; color: #334155; line-height: 1.8;">
        <li><strong>Q1 2026:</strong> Present petition to government funders with community support documented</li>
        <li><strong>Q2 2026:</strong> Finalize funding package and secure commitments</li>
        <li><strong>2027:</strong> Begin construction if funding secured</li>
      </ul>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6; margin-top: 30px;">
        Together, we're building something incredible for our island. Thank you for being part of this movement.
      </p>

      <p style="font-size: 16px; color: #1e293b;">
        With gratitude,<br>
        <strong>The Salt Spring Island Arena Campaign Team</strong>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 5px 0;">
        You're receiving this because you signed the petition and opted in for updates.
      </p>
      <p style="margin: 5px 0;">
        <a href="https://ssiarena.com/privacy" style="color: #0284c7; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 2: 1,000 Signatures Milestone

**Subject:** Halfway There! 1,000 Signatures and Counting 🚀

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
    .content { padding: 30px; }
    .celebration-box { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #0284c7; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center; }
    .progress-bar { width: 100%; height: 30px; background-color: #e2e8f0; border-radius: 15px; overflow: hidden; margin: 20px 0; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #0284c7, #0ea5e9); width: 50%; text-align: center; line-height: 30px; color: white; font-weight: bold; font-size: 14px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 32px;">1,000 Signatures! 🎊</h1>
      <p style="margin: 10px 0 0 0; font-size: 18px;">We're halfway to our goal</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; color: #1e293b;">Hi {{first_name}},</p>

      <div class="celebration-box">
        <h2 style="margin: 0 0 10px 0; color: #0c4a6e; font-size: 26px;">🎯 1,000 Islanders United!</h2>
        <p style="margin: 0; color: #075985; font-size: 15px;">That's 50% of our 2,000 signature goal</p>
      </div>

      <div class="progress-bar">
        <div class="progress-fill">50% Complete</div>
      </div>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6;">
        This is a <strong>huge milestone</strong>. One thousand voices from our island community saying: "Yes, we need this arena. Yes, we support this vision."
      </p>

      <h3 style="color: #1e293b; font-size: 20px;">The Momentum Is Building</h3>
      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        With 1,000 signatures, we've demonstrated significant community support. Government funders are taking notice. We're proving that this project has the backing it needs to succeed.
      </p>

      <h3 style="color: #1e293b; font-size: 20px;">Let's Finish Strong</h3>
      <p style="font-size: 15px; color: #334155; line-height: 1.6;">
        We need just <strong>1,000 more signatures</strong> to reach our goal. Here's how you can help us get there:
      </p>

      <ol style="font-size: 15px; color: #334155; line-height: 1.8;">
        <li><strong>Challenge yourself:</strong> Share the petition with 10 people today</li>
        <li><strong>Local businesses:</strong> Ask if they'll display posters or share on social media</li>
        <li><strong>Community groups:</strong> Present at your book club, sports team, or neighborhood association</li>
        <li><strong>Make a pledge:</strong> Financial commitments strengthen our application</li>
      </ol>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://ssiarena.com/pledge" class="cta-button">Make a Financial Pledge</a>
      </div>

      <h3 style="color: #1e293b; font-size: 20px;">Project Timeline Update</h3>
      <ul style="font-size: 15px; color: #334155; line-height: 1.8;">
        <li><strong>Now - Q1 2026:</strong> Reach 2,000 signatures</li>
        <li><strong>Q2 2026:</strong> Submit comprehensive funding application</li>
        <li><strong>Q3-Q4 2026:</strong> Secure funding commitments</li>
        <li><strong>2027-2029:</strong> Construction</li>
        <li><strong>2029/2030:</strong> Grand opening!</li>
      </ul>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6; margin-top: 30px;">
        We're halfway there, {{first_name}}. Let's finish what we started and bring this world-class facility to Salt Spring Island.
      </p>

      <p style="font-size: 16px; color: #1e293b;">
        With gratitude and excitement,<br>
        <strong>The Salt Spring Island Arena Campaign Team</strong>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 5px 0;">
        You're receiving this because you signed the petition and opted in for updates.
      </p>
      <p style="margin: 5px 0;">
        <a href="https://ssiarena.com/privacy" style="color: #0284c7; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 3: Quarterly Progress Update

**Subject:** Salt Spring Island Arena - Q[X] [Year] Progress Update

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
    .content { padding: 30px; }
    .stat-grid { display: table; width: 100%; margin: 20px 0; }
    .stat-item { display: table-cell; text-align: center; padding: 20px; background-color: #f1f5f9; border-radius: 8px; }
    .stat-number { font-size: 28px; font-weight: bold; color: #0284c7; }
    .stat-label { font-size: 13px; color: #64748b; margin-top: 5px; }
    .update-section { border-left: 4px solid #0284c7; padding-left: 20px; margin: 20px 0; }
    .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 26px;">Q[X] [Year] Progress Update</h1>
      <p style="margin: 10px 0 0 0; font-size: 15px;">Salt Spring Island Community Arena Campaign</p>
    </div>

    <div class="content">
      <p style="font-size: 16px; color: #1e293b;">Hi {{first_name}},</p>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6;">
        Here's your quarterly update on the Salt Spring Island Community Arena campaign. Thank you for being part of this movement.
      </p>

      <h3 style="color: #1e293b; font-size: 20px; margin-top: 30px;">Campaign Stats</h3>
      <div class="stat-grid">
        <div class="stat-item" style="margin-right: 10px;">
          <div class="stat-number">[XXX]</div>
          <div class="stat-label">Total Signatures</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">$[XXX]K</div>
          <div class="stat-label">Pledged</div>
        </div>
      </div>

      <div class="update-section">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">What We Accomplished This Quarter</h3>
        <ul style="font-size: 15px; color: #334155; line-height: 1.8;">
          <li>[Achievement 1 - e.g., "Reached 750 signatures"]</li>
          <li>[Achievement 2 - e.g., "Presented to municipal council"]</li>
          <li>[Achievement 3 - e.g., "Secured media coverage in Times Colonist"]</li>
        </ul>
      </div>

      <div class="update-section">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">What's Happening Next Quarter</h3>
        <ul style="font-size: 15px; color: #334155; line-height: 1.8;">
          <li>[Goal 1 - e.g., "Reach 1,500 signatures"]</li>
          <li>[Goal 2 - e.g., "Host community information session"]</li>
          <li>[Goal 3 - e.g., "Submit preliminary funding application"]</li>
        </ul>
      </div>

      <div class="update-section">
        <h3 style="color: #1e293b; font-size: 18px; margin-top: 0;">How You Can Help</h3>
        <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-top: 0;">
          [Specific call to action - e.g., "We're so close to 1,000 signatures. Can you share the petition with 3 friends this week?"]
        </p>
      </div>

      <p style="font-size: 16px; color: #1e293b; line-height: 1.6; margin-top: 30px;">
        Your continued support means everything. Together, we're making this happen.
      </p>

      <p style="font-size: 16px; color: #1e293b;">
        Thank you,<br>
        <strong>The Salt Spring Island Arena Campaign Team</strong>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 5px 0;">
        <a href="https://ssiarena.com" style="color: #0284c7; text-decoration: none;">Visit Our Website</a> |
        <a href="https://ssiarena.com/faq" style="color: #0284c7; text-decoration: none;">FAQ</a> |
        <a href="https://ssiarena.com/privacy" style="color: #0284c7; text-decoration: none;">Privacy Policy</a>
      </p>
      <p style="margin: 5px 0; color: #94a3b8;">
        You're receiving this because you opted in for campaign updates.
      </p>
    </div>
  </div>
</body>
</html>
```

---

## Testing Your Campaign Emails

### Test Before Sending to Everyone

**ALWAYS** test with a small group first:

```bash
# Test by sending to just your email first
curl -X POST \
  https://dpulfcvdhvqigytruezd.supabase.co/functions/v1/send-campaign-email \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "TEST - Do not open",
    "htmlContent": "<html>YOUR TEST EMAIL</html>",
    "audienceFilter": "all"
  }'
```

Check:
- ✅ Subject line renders correctly
- ✅ {{first_name}} is replaced with actual names
- ✅ All links work
- ✅ Images load properly
- ✅ Email looks good on mobile
- ✅ No typos or formatting issues

### Monitor the Send

```bash
# Watch the function logs in real-time
supabase functions logs send-campaign-email --tail

# Check campaign history
# In Supabase dashboard → Table Editor → email_campaigns
```

---

## Best Practices

### Subject Line Tips

- ✅ Use emojis sparingly (1-2 max): "🎉 We Hit 500 Signatures!"
- ✅ Create urgency: "Only 100 Signatures to Go!"
- ✅ Be specific: "Q1 2026 Update: Here's Where We Stand"
- ✅ Keep under 50 characters for mobile
- ❌ Avoid spam words: "FREE", "ACT NOW", "LIMITED TIME"

### Email Content Tips

- ✅ Start with personalization: "Hi {{first_name}}"
- ✅ Lead with the most important info (milestone, news)
- ✅ Include clear call-to-action buttons
- ✅ Keep it scannable (short paragraphs, bullet points)
- ✅ Always include an unsubscribe option (footer link)
- ❌ Don't send more than once per month (unless major news)

### Timing Tips

- ✅ Send Tuesday-Thursday, 10am-2pm Pacific Time (best open rates)
- ✅ Avoid Mondays (busy) and Fridays (weekend mode)
- ✅ Wait at least 2 weeks between emails
- ❌ Don't send on holidays or long weekends

---

## Troubleshooting

### "No recipients found"
- Check that people have `consent_updates = true` in signatures table
- Verify your audienceFilter is correct ("all", "pledgers", "major_pledgers")

### Emails not sending
```bash
# Check function logs
supabase functions logs send-campaign-email --limit 100

# Common issues:
# - Resend API key not set: supabase secrets set RESEND_API_KEY=...
# - Invalid HTML: Validate your email HTML
# - Rate limiting: Wait 2-3 minutes between sends
```

### High bounce rate
- Verify email addresses in your signatures table
- Check Resend dashboard for bounce reasons
- Consider adding email verification to signup form

### Emails going to spam
- Always include unsubscribe link in footer
- Use your verified domain (saltspringislandarena@gmail.com)
- Don't use spam trigger words in subject lines
- Test with Mail Tester: https://www.mail-tester.com/

---

## Campaign Schedule Template

Copy this schedule to plan your emails:

| Date | Milestone | Subject Line | Template | Audience |
|------|-----------|--------------|----------|----------|
| TBD | 500 sigs | "🎉 We Hit 500 Signatures!" | Template 1 | all |
| TBD | Q1 Update | "Q1 2026 Progress Update" | Template 3 | all |
| TBD | 1,000 sigs | "Halfway There! 1,000 Signatures" | Template 2 | all |
| TBD | $50K pledged | "Major Funding Milestone Reached" | Custom | all |
| TBD | Q2 Update | "Q2 2026 Progress Update" | Template 3 | all |
| TBD | 2,000 sigs | "WE DID IT! Goal Reached" | Custom | all |

---

## Summary

Your email campaign system is now ready to:

✅ Automatically send professional thank-you emails to all new signers
✅ Send milestone celebration emails when you hit major goals
✅ Send quarterly progress updates to keep supporters engaged
✅ Track all campaigns in your database for analytics
✅ Personalize emails with first names
✅ Respect rate limits and supporter preferences

**Next Steps:**
1. ✅ Deploy both Edge Functions to Supabase
2. ✅ Create the email_campaigns table in your database
3. ✅ Generate a new Resend API key (old one was exposed)
4. ✅ Test the automated thank-you email
5. ✅ Plan your first milestone email (500 signatures?)

Need help? Check the function logs, review RESEND_SETUP.md, or test with your own email address first.

Good luck with your campaign! 🚀
