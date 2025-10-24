-- Create community_visions table for storing what people would host at the arena
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS community_visions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  vision TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_community_visions_created_at ON community_visions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_visions_category ON community_visions(category);

-- Add Row Level Security (RLS)
ALTER TABLE community_visions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read visions (they're public testimonials)
CREATE POLICY "Anyone can view community visions"
  ON community_visions
  FOR SELECT
  USING (true);

-- Allow anyone to insert their own vision
CREATE POLICY "Anyone can submit a vision"
  ON community_visions
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can update (for moderation if needed)
CREATE POLICY "Authenticated users can update visions"
  ON community_visions
  FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated users can delete (for moderation if needed)
CREATE POLICY "Authenticated users can delete visions"
  ON community_visions
  FOR DELETE
  TO authenticated
  USING (true);

COMMENT ON TABLE community_visions IS 'Community testimonials about what they would host at the arena';
COMMENT ON COLUMN community_visions.name IS 'Name of the person sharing their vision (can be first name + last initial)';
COMMENT ON COLUMN community_visions.email IS 'Optional email for follow-up';
COMMENT ON COLUMN community_visions.vision IS 'What they would host/do at the arena';
COMMENT ON COLUMN community_visions.category IS 'Category: concerts, sports, arts, community, business, other';
