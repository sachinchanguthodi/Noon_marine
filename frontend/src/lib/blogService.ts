import { supabase, BlogPost } from './supabase';

export type { BlogPost };

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const blogService = {
  async getAllPublished(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'PUBLISHED')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllForAdmin(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      await supabase
        .from('blog_posts')
        .update({ view_count: data.view_count + 1 })
        .eq('id', data.id);
    }

    return data;
  },

  async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(post: Partial<BlogPost>): Promise<BlogPost> {
    const slug = post.slug || generateSlug(post.title || '');

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        ...post,
        slug,
        seo_keywords: post.seo_keywords || [],
        seo_tags: post.seo_tags || [],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const updateData: any = { ...post };

    if (post.title && !post.slug) {
      updateData.slug = generateSlug(post.title);
    }

    if (post.status === 'PUBLISHED' && !post.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async publish(id: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
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

  async unpublish(id: string): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        status: 'DRAFT',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
