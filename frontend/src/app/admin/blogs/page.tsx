'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogService, BlogPost } from '@/lib/blogService';
import { Pencil, Trash2, Plus, Eye, Globe } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
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

    loadBlogs();
  }, [router]);

  const loadBlogs = async () => {
    try {
      const data = await blogService.getAllForAdmin();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
      alert('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await blogService.delete(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleToggleStatus = async (blog: BlogPost) => {
    try {
      if (blog.status === 'PUBLISHED') {
        await blogService.unpublish(blog.id);
        alert('Blog unpublished successfully');
      } else {
        await blogService.publish(blog.id);
        alert('Blog published successfully');
      }
      loadBlogs();
    } catch (error) {
      console.error('Error updating blog status:', error);
      alert('Failed to update blog status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="mt-2 text-gray-600">Create and manage your blog posts</p>
          </div>
          <button
            onClick={() => router.push('/admin/blogs/new')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create New Post
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No blog posts found. Create your first post to get started!
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                            <div className="text-sm text-gray-500">{blog.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{blog.author_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            blog.status
                          )}`}
                        >
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          {blog.view_count}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.published_at
                          ? new Date(blog.published_at).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(blog)}
                            className="text-green-600 hover:text-green-900"
                            title={blog.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                          >
                            <Globe size={18} />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
