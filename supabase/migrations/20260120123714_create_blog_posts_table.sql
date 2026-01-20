/*
  # Create Blog Posts Table for SEO-Optimized Content Management

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text) - Main blog post title
      - `slug` (text, unique) - URL-friendly version of the title
      - `content` (text) - Rich text content of the blog post
      - `excerpt` (text) - Short summary for previews
      - `featured_image` (text) - URL to the featured/hero image
      - `author_name` (text) - Name of the author
      - `status` (text) - Publication status: DRAFT, PUBLISHED, or ARCHIVED
      - `published_at` (timestamptz) - Date and time when the post was published
      
      SEO Fields:
      - `seo_title` (text) - Optimized title for search engines
      - `seo_description` (text) - Meta description for search engine results
      - `seo_keywords` (text[]) - Array of SEO keywords
      - `seo_tags` (text[]) - Array of content tags for categorization
      
      Analytics:
      - `view_count` (integer) - Number of times the blog post was viewed
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to published posts
    - Add policy for all operations (admin will manage via service role)
    
  3. Indexes
    - Index on `slug` for fast lookups
    - Index on `status` for filtering published posts
    - Index on `published_at` for chronological sorting
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  author_name text NOT NULL DEFAULT 'Admin',
  status text NOT NULL DEFAULT 'DRAFT',
  published_at timestamptz,
  
  seo_title text,
  seo_description text,
  seo_keywords text[] DEFAULT '{}',
  seo_tags text[] DEFAULT '{}',
  
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Add constraint to ensure status is valid
ALTER TABLE blog_posts ADD CONSTRAINT check_blog_status 
  CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'));

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts (public access)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (status = 'PUBLISHED');

-- Policy: Service role can do everything (for admin operations)
CREATE POLICY "Service role has full access"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER trigger_update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();