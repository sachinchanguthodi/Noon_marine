'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import { blogService } from '@/lib/blogService';
import { BlogPost } from '@/lib/supabase';

export default function NewBlogPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role)) {
      router.push('/dashboard');
      return;
    }
  }, [router]);

  const handleSubmit = async (data: Partial<BlogPost>) => {
    await blogService.create(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="mt-2 text-gray-600">Write and publish a new blog post</p>
        </div>

        <BlogForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
