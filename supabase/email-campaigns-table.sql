-- Create email_campaigns table for tracking bulk email sends
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  audience_filter TEXT,
  recipients_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_campaigns_sent_at ON email_campaigns(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_audience_filter ON email_campaigns(audience_filter);

-- Add Row Level Security (RLS)
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert campaign logs (used by Edge Function)
CREATE POLICY "Service role can insert email campaigns"
  ON email_campaigns
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to view campaign history
CREATE POLICY "Authenticated users can view email campaigns"
  ON email_campaigns
  FOR SELECT
  TO authenticated
  USING (true);

COMMENT ON TABLE email_campaigns IS 'Tracks bulk email campaigns sent to petition supporters';
COMMENT ON COLUMN email_campaigns.subject IS 'Email subject line';
COMMENT ON COLUMN email_campaigns.audience_filter IS 'Audience segment: all, pledgers, or major_pledgers';
COMMENT ON COLUMN email_campaigns.recipients_count IS 'Total number of recipients in the query';
COMMENT ON COLUMN email_campaigns.sent_count IS 'Number of emails successfully sent';
COMMENT ON COLUMN email_campaigns.failed_count IS 'Number of emails that failed to send';
COMMENT ON COLUMN email_campaigns.sent_at IS 'When the campaign was sent';
