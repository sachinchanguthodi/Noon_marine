import { supabase, MarketplaceListing } from './supabase';

export type { MarketplaceListing };

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const marketplaceService = {
  async getAllPublished(): Promise<MarketplaceListing[]> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('status', 'PUBLISHED')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getRecentPublished(limit: number = 4): Promise<MarketplaceListing[]> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('status', 'PUBLISHED')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getFeatured(): Promise<MarketplaceListing[]> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('status', 'PUBLISHED')
      .eq('featured', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllForAdmin(): Promise<MarketplaceListing[]> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string): Promise<MarketplaceListing | null> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      await supabase
        .from('marketplace_listings')
        .update({ view_count: data.view_count + 1 })
        .eq('id', data.id);
    }

    return data;
  },

  async getById(id: string): Promise<MarketplaceListing | null> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getByCategory(category: MarketplaceListing['category']): Promise<MarketplaceListing[]> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .select('*')
      .eq('status', 'PUBLISHED')
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(listing: Partial<MarketplaceListing>): Promise<MarketplaceListing> {
    const slug = listing.slug || generateSlug(listing.title || '');

    const { data, error } = await supabase
      .from('marketplace_listings')
      .insert({
        ...listing,
        slug,
        images: listing.images || [],
        specifications: listing.specifications || {},
        view_count: 0,
        featured: listing.featured || false,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, listing: Partial<MarketplaceListing>): Promise<MarketplaceListing> {
    const updateData: any = { ...listing };

    if (listing.title && !listing.slug) {
      updateData.slug = generateSlug(listing.title);
    }

    if (listing.status === 'PUBLISHED' && !listing.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('marketplace_listings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('marketplace_listings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async publish(id: string): Promise<MarketplaceListing> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .update({
        status: 'PUBLISHED',
        published_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unpublish(id: string): Promise<MarketplaceListing> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .update({
        status: 'DRAFT',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAsSold(id: string): Promise<MarketplaceListing> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .update({
        status: 'SOLD',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleFeatured(id: string, featured: boolean): Promise<MarketplaceListing> {
    const { data, error } = await supabase
      .from('marketplace_listings')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
