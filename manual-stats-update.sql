-- Manual update of campaign stats
-- Run this in your Supabase SQL Editor to sync the numbers

UPDATE public.campaign_stats
SET
    total_signatures = (SELECT COUNT(*) FROM public.signatures),
    total_pledges = (SELECT COUNT(*) FROM public.pledges),
    total_pledge_amount = (SELECT COALESCE(SUM(amount), 0) FROM public.pledges),
    last_updated = timezone('utc'::text, now())
WHERE id = 1;