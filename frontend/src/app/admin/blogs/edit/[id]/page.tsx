'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import { blogService } from '@/lib/blogService';
import { BlogPost } from '@/lib/supabase';

export default function EditBlogPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const data = await blogService.getById(id);
      setBlog(data);
    } catch (error) {
      console.error('Error loading blog:', error);
      alert('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<BlogPost>) => {
    await blogService.update(id, data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog post not found</h2>
          <p className="mt-2 text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="mt-2 text-gray-600">Update your blog post content</p>
        </div>

        <BlogForm initialData={blog} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
