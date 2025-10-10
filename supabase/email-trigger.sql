-- Email Automation Database Trigger
-- Run this in your Supabase SQL Editor after deploying the Edge Function

-- Enable the http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Create the function that calls your Edge Function
CREATE OR REPLACE FUNCTION handle_new_petition_signature()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://dpulfcvdhvqigytruezd.supabase.co/functions/v1/send-petition-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY_HERE'
    ),
    body := jsonb_build_object('record', to_jsonb(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_petition_signature ON public.signatures;

CREATE TRIGGER on_petition_signature
  AFTER INSERT ON public.signatures
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_petition_signature();
