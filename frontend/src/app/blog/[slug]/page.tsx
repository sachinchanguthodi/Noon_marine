'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogService } from '@/lib/blogService';
import { BlogPost } from '@/lib/supabase';
import { Calendar, Eye, ArrowLeft, Share2 } from 'lucide-react';
import Head from 'next/head';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    try {
      const data = await blogService.getBySlug(slug);
      if (!data) {
        router.push('/blog');
        return;
      }
      setBlog(data);
    } catch (error) {
      console.error('Error loading blog:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.seo_description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
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
    return null;
  }

  return (
    <>
      <Head>
        <title>{blog.seo_title || blog.title}</title>
        <meta
          name="description"
          content={blog.seo_description || blog.excerpt || ''}
        />
        <meta
          name="keywords"
          content={blog.seo_keywords?.join(', ') || ''}
        />
        <meta property="og:title" content={blog.seo_title || blog.title} />
        <meta
          property="og:description"
          content={blog.seo_description || blog.excerpt || ''}
        />
        {blog.featured_image && (
          <meta property="og:image" content={blog.featured_image} />
        )}
        <meta property="og:type" content="article" />
        <meta property="article:author" content={blog.author_name} />
        <meta
          property="article:published_time"
          content={blog.published_at || ''}
        />
        {blog.seo_tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push('/blog')}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </button>

            <div className="flex items-center gap-4 text-sm text-blue-100 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(blog.published_at!).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} />
                {blog.view_count} views
              </span>
              <span>By {blog.author_name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>

            {blog.excerpt && (
              <p className="text-xl text-blue-100">{blog.excerpt}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {blog.featured_image && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {blog.seo_tags && blog.seo_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.seo_tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article
            className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Share this article</p>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
