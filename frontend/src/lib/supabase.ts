import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_name: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords: string[];
  seo_tags: string[];
  view_count: number;
  created_at: string;
  updated_at: string;
};
