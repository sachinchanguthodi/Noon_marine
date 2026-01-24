import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

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

export type MarketplaceListing = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'VESSEL' | 'MACHINERY' | 'EQUIPMENT' | 'SPARE_PARTS' | 'OTHER';
  price: number;
  currency: string;
  condition: 'NEW' | 'USED' | 'REFURBISHED';
  images: string[];
  specifications: Record<string, string>;
  location: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SOLD' | 'ARCHIVED';
  featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
};
