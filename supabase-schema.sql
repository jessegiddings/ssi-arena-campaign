-- Salt Spring Island Arena Campaign Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create signatures table
CREATE TABLE public.signatures (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    consent_petition BOOLEAN NOT NULL DEFAULT false,
    consent_updates BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create pledges table
CREATE TABLE public.pledges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    signature_id UUID REFERENCES public.signatures(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL, -- in cents to avoid floating point issues
    pledge_tier TEXT, -- e.g., "Supporter", "Champion", etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create campaign_stats table for real-time counters
CREATE TABLE public.campaign_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_signatures INTEGER DEFAULT 0,
    total_pledges INTEGER DEFAULT 0,
    total_pledge_amount INTEGER DEFAULT 0, -- in cents
    signature_goal INTEGER DEFAULT 2000,
    pledge_goal INTEGER DEFAULT 15000000, -- $150,000 in cents
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial stats row
INSERT INTO public.campaign_stats (id) VALUES (1);

-- Create indexes for better performance
CREATE INDEX idx_signatures_created_at ON public.signatures(created_at DESC);
CREATE INDEX idx_signatures_email ON public.signatures(email);
CREATE INDEX idx_pledges_signature_id ON public.pledges(signature_id);
CREATE INDEX idx_pledges_created_at ON public.pledges(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_stats ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert, but restrict updates/deletes
CREATE POLICY "Allow public to read signatures count" ON public.signatures
    FOR SELECT USING (true);

CREATE POLICY "Allow public to insert signatures" ON public.signatures
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read pledges count" ON public.pledges
    FOR SELECT USING (true);

CREATE POLICY "Allow public to insert pledges" ON public.pledges
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read campaign stats" ON public.campaign_stats
    FOR SELECT USING (true);

-- Function to update campaign stats when signatures are added
CREATE OR REPLACE FUNCTION update_signature_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.campaign_stats
    SET
        total_signatures = (SELECT COUNT(*) FROM public.signatures),
        last_updated = timezone('utc'::text, now())
    WHERE id = 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update campaign stats when pledges are added
CREATE OR REPLACE FUNCTION update_pledge_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.campaign_stats
    SET
        total_pledges = (SELECT COUNT(*) FROM public.pledges),
        total_pledge_amount = (SELECT COALESCE(SUM(amount), 0) FROM public.pledges),
        last_updated = timezone('utc'::text, now())
    WHERE id = 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update stats
CREATE TRIGGER update_signature_stats_trigger
    AFTER INSERT ON public.signatures
    FOR EACH ROW
    EXECUTE FUNCTION update_signature_stats();

CREATE TRIGGER update_pledge_stats_trigger
    AFTER INSERT ON public.pledges
    FOR EACH ROW
    EXECUTE FUNCTION update_pledge_stats();