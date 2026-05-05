'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Ship,
  Wrench,
  Package,
  Settings,
  Box,
  Search,
  Filter,
  MapPin,
  Eye,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { MarketplaceListing } from '@/lib/supabase';

const categories = [
  { value: 'ALL', label: 'All Categories', icon: Box },
  { value: 'VESSEL', label: 'Vessels', icon: Ship },
  { value: 'MACHINERY', label: 'Machinery', icon: Settings },
  { value: 'EQUIPMENT', label: 'Equipment', icon: Wrench },
  { value: 'SPARE_PARTS', label: 'Spare Parts', icon: Package },
  { value: 'OTHER', label: 'Other', icon: Box },
];

const conditions = [
  { value: 'ALL', label: 'All Conditions' },
  { value: 'NEW', label: 'New' },
  { value: 'USED', label: 'Used' },
  { value: 'REFURBISHED', label: 'Refurbished' },
];

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function getCategoryIcon(category: string) {
  const cat = categories.find((c) => c.value === category);
  return cat?.icon || Box;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    filterAndSortListings();
  }, [listings, searchQuery, selectedCategory, selectedCondition, sortBy]);

  const fetchListings = async () => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      const data = await marketplaceService.getAllPublished();
      setListings(data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortListings = () => {
    let filtered = [...listings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter((listing) => listing.category === selectedCategory);
    }

    if (selectedCondition !== 'ALL') {
      filtered = filtered.filter((listing) => listing.condition === selectedCondition);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime());
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.view_count - a.view_count);
        break;
    }

    setFilteredListings(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-white font-medium">Marketplace</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white transition">Logistics</Link>
              <Link href="/vessels" className="text-gray-300 hover:text-white transition">Vessels</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition">
                Sign In
              </Link>
              <Link href="/register" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-3">
                <Link href="/marketplace" className="text-white font-medium py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
                <Link href="/services" className="text-gray-300 hover:text-white py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link href="/logistics" className="text-gray-300 hover:text-white py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Logistics</Link>
                <Link href="/vessels" className="text-gray-300 hover:text-white py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Vessels</Link>
                <Link href="/blog" className="text-gray-300 hover:text-white py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <div className="flex space-x-2 pt-2">
                  <Link href="/login" className="px-4 py-2 text-gray-300 font-medium">Sign In</Link>
                  <Link href="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">Get Started</Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Marine Marketplace
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Buy and sell vessels, machinery, equipment, and spare parts from trusted maritime professionals
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vessels, machinery, equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
            <p className="text-gray-600">
              {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {/* Expanded Filters */}
        {filtersOpen && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <Ship className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => {
              const CategoryIcon = getCategoryIcon(listing.category);
              return (
                <Link
                  key={listing.id}
                  href={`/marketplace/${listing.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-100">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CategoryIcon className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    {listing.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                      listing.condition === 'NEW' ? 'bg-green-500 text-white' :
                      listing.condition === 'REFURBISHED' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {listing.condition}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {categories.find((c) => c.value === listing.category)?.label}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
                      {listing.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 mb-3">
                      {formatPrice(listing.price, listing.currency)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate max-w-[100px]">{listing.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {listing.view_count}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo.png" alt="Noon Marine" width={130} height={52} className="object-contain" />
            </div>
            <p className="text-sm mb-4">
              Your trusted partner for comprehensive maritime solutions
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Noon Marine Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
