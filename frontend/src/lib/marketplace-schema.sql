-- Marketplace Listings Table for Supabase
-- Run this SQL in your Supabase SQL Editor to create the marketplace_listings table
-- All inquiries are sent to info@noonmarine.uk (not stored per listing)

CREATE TABLE IF NOT EXISTS marketplace_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('VESSEL', 'MACHINERY', 'EQUIPMENT', 'SPARE_PARTS', 'OTHER')),
  price DECIMAL(15, 2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  condition VARCHAR(20) NOT NULL CHECK (condition IN ('NEW', 'USED', 'REFURBISHED')),
  images TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  location VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED', 'SOLD', 'ARCHIVED')),
  featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_category ON marketplace_listings(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_slug ON marketplace_listings(slug);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_featured ON marketplace_listings(featured);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_published_at ON marketplace_listings(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to published listings
CREATE POLICY "Public can view published listings" ON marketplace_listings
  FOR SELECT
  USING (status = 'PUBLISHED');

-- Policy: Allow authenticated users to manage all listings (for admin)
-- Note: You may want to add role-based restrictions here
CREATE POLICY "Authenticated users can manage listings" ON marketplace_listings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the function on updates
CREATE TRIGGER update_marketplace_listings_updated_at
  BEFORE UPDATE ON marketplace_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Sample data (optional - remove if not needed)
-- INSERT INTO marketplace_listings (title, slug, description, category, price, currency, condition, location, status, featured)
-- VALUES
--   ('Cargo Vessel 2020 Model', 'cargo-vessel-2020-model', 'Well-maintained cargo vessel with 5000 DWT capacity. Complete documentation available.', 'VESSEL', 2500000, 'USD', 'USED', 'Dubai, UAE', 'PUBLISHED', true),
--   ('Marine Engine CAT 3516', 'marine-engine-cat-3516', 'Caterpillar 3516 marine engine in excellent condition. Low running hours.', 'MACHINERY', 150000, 'USD', 'REFURBISHED', 'Abu Dhabi, UAE', 'PUBLISHED', false),
--   ('Navigation Equipment Set', 'navigation-equipment-set', 'Complete navigation equipment including GPS, radar, and AIS. All certified.', 'EQUIPMENT', 25000, 'USD', 'NEW', 'Sharjah, UAE', 'PUBLISHED', false);
