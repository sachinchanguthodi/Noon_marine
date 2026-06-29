'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Bell,
  RefreshCw,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  Ship,
  Wrench,
  Package,
  Settings,
  Box,
  Plus,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Star,
  StarOff,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { MarketplaceListing } from '@/lib/supabase';

const categories = [
  { value: 'MACHINERY', label: 'Machinery', icon: Settings },
  { value: 'EQUIPMENT', label: 'Equipment', icon: Wrench },
  { value: 'SPARE_PARTS', label: 'Spare Parts', icon: Package },
  { value: 'OTHER', label: 'Other', icon: Box },
];

const conditions = [
  { value: 'NEW', label: 'New' },
  { value: 'USED', label: 'Used' },
  { value: 'REFURBISHED', label: 'Refurbished' },
];

const currencies = ['USD', 'AED', 'EUR', 'GBP'];

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AdminMarketplacePage() {
  const [user, setUser] = useState<any>(null);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<MarketplaceListing>>({
    title: '',
    description: '',
    category: 'VESSEL',
    price: 0,
    currency: 'USD',
    condition: 'USED',
    images: [],
    specifications: {},
    location: '',
    status: 'DRAFT',
    featured: false,
  });
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (!['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(parsedUser.role)) {
        alert('Access denied. Admin privileges required.');
        window.location.href = '/dashboard';
        return;
      }

      fetchListings();
    } else {
      window.location.href = '/login';
    }
  }, []);

  const fetchListings = async () => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      const data = await marketplaceService.getAllForAdmin();
      setListings(data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.create(formData);
      await fetchListings();
      setIsCreating(false);
      resetForm();
      alert('Listing created successfully!');
    } catch (error) {
      console.error('Failed to create listing:', error);
      alert('Failed to create listing');
    }
  };

  const handleUpdate = async () => {
    if (!selectedListing) return;
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.update(selectedListing.id, formData);
      await fetchListings();
      setIsEditing(false);
      setSelectedListing(null);
      resetForm();
      alert('Listing updated successfully!');
    } catch (error) {
      console.error('Failed to update listing:', error);
      alert('Failed to update listing');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.delete(id);
      await fetchListings();
      setSelectedListing(null);
      alert('Listing deleted successfully!');
    } catch (error) {
      console.error('Failed to delete listing:', error);
      alert('Failed to delete listing');
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.publish(id);
      await fetchListings();
      alert('Listing published successfully!');
    } catch (error) {
      console.error('Failed to publish listing:', error);
      alert('Failed to publish listing');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.unpublish(id);
      await fetchListings();
      alert('Listing unpublished successfully!');
    } catch (error) {
      console.error('Failed to unpublish listing:', error);
      alert('Failed to unpublish listing');
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.markAsSold(id);
      await fetchListings();
      alert('Listing marked as sold!');
    } catch (error) {
      console.error('Failed to mark as sold:', error);
      alert('Failed to mark as sold');
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      await marketplaceService.toggleFeatured(id, featured);
      await fetchListings();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to toggle featured');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'VESSEL',
      price: 0,
      currency: 'USD',
      condition: 'USED',
      images: [],
      specifications: {},
      location: '',
      status: 'DRAFT',
      featured: false,
    });
    setNewSpecKey('');
    setNewSpecValue('');
    setNewImageUrl('');
  };

  const startEditing = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setFormData({
      title: listing.title,
      description: listing.description,
      category: listing.category,
      price: listing.price,
      currency: listing.currency,
      condition: listing.condition,
      images: listing.images || [],
      specifications: listing.specifications || {},
      location: listing.location,
      status: listing.status,
      featured: listing.featured,
    });
    setIsEditing(true);
  };

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [newSpecKey]: newSpecValue,
        },
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    const specs = { ...formData.specifications };
    delete specs[key];
    setFormData({ ...formData, specifications: specs });
  };

  const addImage = () => {
    if (newImageUrl && (formData.images?.length || 0) < 10) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), newImageUrl],
      });
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    const images = [...(formData.images || [])];
    images.splice(index, 1);
    setFormData({ ...formData, images });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'SOLD':
        return 'bg-blue-100 text-blue-800';
      case 'ARCHIVED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredListings = listings.filter((listing) => {
    const matchesFilter = filter === 'all' || listing.status === filter;
    const matchesSearch =
      searchTerm === '' ||
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: listings.length,
    draft: listings.filter((l) => l.status === 'DRAFT').length,
    published: listings.filter((l) => l.status === 'PUBLISHED').length,
    sold: listings.filter((l) => l.status === 'SOLD').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <Link href="/" className="flex items-center">
              <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white transition relative">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3 border-l border-gray-700 pl-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">
                    {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                  </div>
                  <div className="text-xs text-primary-400 font-semibold">
                    {user?.role?.replace('_', ' ')}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/admin"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin Dashboard
        </Link>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-3xl font-bold text-gray-600 mt-2">{stats.draft}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sold</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.sold}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  resetForm();
                  setIsCreating(true);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Listing
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('DRAFT')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'DRAFT' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Draft ({stats.draft})
              </button>
              <button
                onClick={() => setFilter('PUBLISHED')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'PUBLISHED' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Published ({stats.published})
              </button>
              <button
                onClick={() => setFilter('SOLD')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === 'SOLD' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sold ({stats.sold})
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={fetchListings}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No listings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredListings.map((listing) => {
                    const CategoryIcon = categories.find((c) => c.value === listing.category)?.icon || Box;
                    return (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                              {listing.images && listing.images.length > 0 ? (
                                <img src={listing.images[0]} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <CategoryIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">{listing.title}</div>
                              <div className="text-xs text-gray-500">{listing.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-700">
                            <CategoryIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {categories.find((c) => c.value === listing.category)?.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatPrice(listing.price, listing.currency)}
                          </div>
                          <div className="text-xs text-gray-500">{listing.condition}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleFeatured(listing.id, !listing.featured)}
                            className={`p-1 rounded transition ${listing.featured ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`}
                          >
                            {listing.featured ? <Star className="h-5 w-5 fill-current" /> : <StarOff className="h-5 w-5" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {listing.view_count}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => startEditing(listing)}
                            className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          {listing.status === 'DRAFT' && (
                            <button
                              onClick={() => handlePublish(listing.id)}
                              className="text-green-600 hover:text-green-900 inline-flex items-center"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Publish
                            </button>
                          )}
                          {listing.status === 'PUBLISHED' && (
                            <>
                              <button
                                onClick={() => handleUnpublish(listing.id)}
                                className="text-yellow-600 hover:text-yellow-900 inline-flex items-center"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Unpublish
                              </button>
                              <button
                                onClick={() => handleMarkAsSold(listing.id)}
                                className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                              >
                                <DollarSign className="h-4 w-4 mr-1" />
                                Sold
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isCreating ? 'Create New Listing' : 'Edit Listing'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                    setSelectedListing(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter listing title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition *</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {conditions.map((cond) => (
                      <option key={cond.value} value={cond.value}>
                        {cond.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {currencies.map((cur) => (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Dubai, UAE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="SOLD">Sold</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter detailed description"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Images</h3>
                  <span className={`text-sm ${(formData.images?.length || 0) >= 10 ? 'text-red-600' : 'text-gray-500'}`}>
                    {formData.images?.length || 0}/10 images
                  </span>
                </div>
                {(formData.images?.length || 0) < 10 && (
                  <div className="flex gap-2 mb-4">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    />
                    <button
                      onClick={addImage}
                      disabled={!newImageUrl}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                )}
                {(formData.images?.length || 0) >= 10 && (
                  <p className="text-sm text-red-600 mb-4">Maximum 10 images allowed. Remove an image to add more.</p>
                )}
                {formData.images && formData.images.length > 0 ? (
                  <div className="grid grid-cols-5 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                        <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                          {index + 1}
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No images added yet. Add up to 10 image URLs.</p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Specification name (e.g., Length)"
                  />
                  <input
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Value (e.g., 50 meters)"
                  />
                  <button
                    onClick={addSpecification}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {formData.specifications && Object.keys(formData.specifications).length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-700">{key}:</span>{' '}
                          <span className="text-gray-600">{value}</span>
                        </div>
                        <button
                          onClick={() => removeSpecification(key)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Mark as Featured Listing
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setIsEditing(false);
                  setSelectedListing(null);
                  resetForm();
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={isCreating ? handleCreate : handleUpdate}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                {isCreating ? 'Create Listing' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

