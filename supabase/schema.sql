-- PetPal Waitlist Leads Table
-- Run this in your Supabase SQL Editor to create the required table

-- Create the waitlist_leads table
CREATE TABLE IF NOT EXISTS waitlist_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Contact information
    email TEXT UNIQUE NOT NULL,
    phone TEXT NULL,
    country TEXT NULL,
    pet_type TEXT NULL CHECK (pet_type IN ('dog', 'cat', 'other') OR pet_type IS NULL),
    
    -- WhatsApp consent
    whatsapp_consent BOOLEAN DEFAULT FALSE,
    whatsapp_consent_at TIMESTAMPTZ NULL,
    
    -- Status for future double opt-in flow
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'unsubscribed')),
    
    -- UTM tracking parameters
    utm_source TEXT NULL,
    utm_medium TEXT NULL,
    utm_campaign TEXT NULL,
    utm_content TEXT NULL,
    utm_term TEXT NULL,
    
    -- Click IDs
    gclid TEXT NULL,  -- Google Ads
    fbclid TEXT NULL, -- Meta/Facebook Ads
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on email for faster lookups and enforce uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_leads_email 
ON waitlist_leads (email);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_created_at 
ON waitlist_leads (created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_leads_status 
ON waitlist_leads (status);

-- Optional: Add RLS policies for additional security
-- Even though we use service_role key server-side, these add defense in depth

-- Enable RLS
ALTER TABLE waitlist_leads ENABLE ROW LEVEL SECURITY;

-- No policies by default = no access via anon key
-- Service role key bypasses RLS, so our API route still works

-- Grant usage to service role
GRANT ALL ON waitlist_leads TO service_role;

-- Comments for documentation
COMMENT ON TABLE waitlist_leads IS 'Early access waitlist signups for PetPal';
COMMENT ON COLUMN waitlist_leads.status IS 'pending = awaiting verification, verified = confirmed, unsubscribed = opted out';
COMMENT ON COLUMN waitlist_leads.whatsapp_consent_at IS 'Timestamp when WhatsApp consent was given (for compliance)';
