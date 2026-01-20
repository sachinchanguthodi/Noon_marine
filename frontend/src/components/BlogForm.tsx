'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { BlogPost } from '@/lib/supabase';
import { Save, X } from 'lucide-react';

interface BlogFormProps {
  initialData?: BlogPost;
  onSubmit: (data: Partial<BlogPost>) => Promise<void>;
}

export default function BlogForm({ initialData, onSubmit }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    featured_image: initialData?.featured_image || '',
    author_name: initialData?.author_name || 'Admin',
    status: initialData?.status || 'DRAFT',
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
    seo_keywords: initialData?.seo_keywords?.join(', ') || '',
    seo_tags: initialData?.seo_tags?.join(', ') || '',
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    if (!initialData && formData.title && !formData.slug) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(formData.title) }));
    }
  }, [formData.title, formData.slug, initialData]);

  const handleSubmit = async (e: React.FormEvent, status?: 'DRAFT' | 'PUBLISHED') => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData: Partial<BlogPost> = {
        ...formData,
        status: status || formData.status as any,
        seo_keywords: formData.seo_keywords
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
        seo_tags: formData.seo_tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await onSubmit(submitData);
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            URL: /blog/{formData.slug || 'your-post-slug'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name
          </label>
          <input
            type="text"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Short Summary)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image URL
          </label>
          <input
            type="url"
            value={formData.featured_image}
            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.featured_image && (
            <div className="mt-4">
              <img
                src={formData.featured_image}
                alt="Preview"
                className="max-w-xs h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Write your blog post content here..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">SEO Settings</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            value={formData.seo_title}
            onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Optimized title for search engines"
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.seo_title.length}/60 characters (recommended)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Meta Description
          </label>
          <textarea
            value={formData.seo_description}
            onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description for search engine results"
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.seo_description.length}/160 characters (recommended)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Keywords
          </label>
          <input
            type="text"
            value={formData.seo_keywords}
            onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="mt-1 text-sm text-gray-500">Separate keywords with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            value={formData.seo_tags}
            onChange={(e) => setFormData({ ...formData, seo_tags: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="tag1, tag2, tag3"
          />
          <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'DRAFT')}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <Save size={20} />
          Save as Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, 'PUBLISHED')}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save size={20} />
          Publish
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blogs')}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <X size={20} />
          Cancel
        </button>
      </div>
    </form>
  );
}
