'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Ship,
  Shield,
  Flag,
  Users,
  Wrench,
  Package,
  Truck,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle2,
  Globe,
  Clock,
  Award,
  TrendingUp,
  Headphones,
  Star,
  ClipboardCheck,
  LifeBuoy,
  Building2,
  Menu,
  X,
  Calendar,
  BookOpen,
  ShoppingBag,
  MapPin,
  Eye,
  Settings,
  Box
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  created_at: string;
  published_at?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

interface MarketplaceListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'VESSEL' | 'MACHINERY' | 'EQUIPMENT' | 'SPARE_PARTS' | 'OTHER';
  price: number;
  currency: string;
  condition: 'NEW' | 'USED' | 'REFURBISHED';
  images: string[];
  location: string;
  view_count: number;
  featured: boolean;
  created_at: string;
  published_at?: string;
}

const marketplaceCategories = [
  { value: 'VESSEL', label: 'Vessels', icon: Ship },
  { value: 'MACHINERY', label: 'Machinery', icon: Settings },
  { value: 'EQUIPMENT', label: 'Equipment', icon: Wrench },
  { value: 'SPARE_PARTS', label: 'Spare Parts', icon: Package },
  { value: 'OTHER', label: 'Other', icon: Box },
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
  const cat = marketplaceCategories.find((c) => c.value === category);
  return cat?.icon || Box;
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [recentListings, setRecentListings] = useState<MarketplaceListing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
    fetchRecentListings();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      const { blogService } = await import('@/lib/blogService');
      const blogs = await blogService.getAllPublished();
      setRecentBlogs(blogs.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setBlogsLoading(false);
    }
  };

  const fetchRecentListings = async () => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      const listings = await marketplaceService.getRecentPublished(4);
      setRecentListings(listings);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setListingsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-white font-medium hover:text-primary-400 transition flex items-center">
                <ShoppingBag className="h-4 w-4 mr-1" />
                Marketplace
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white transition">Logistics</Link>
              <Link href="/vessels" className="text-gray-300 hover:text-white transition">Vessels</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Auth Buttons + Menu */}
            <div className="md:hidden flex items-center space-x-2">
              <Link
                href="/login"
                className="px-2 py-1.5 text-xs text-gray-300 hover:text-white font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Get Started
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white transition"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/marketplace"
                  className="text-white font-medium transition py-2 px-2 hover:bg-gray-800 rounded flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Marketplace
                </Link>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition py-2 px-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/logistics"
                  className="text-gray-300 hover:text-white transition py-2 px-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logistics
                </Link>
                <Link
                  href="/vessels"
                  className="text-gray-300 hover:text-white transition py-2 px-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vessels
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition py-2 px-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition py-2 px-2 hover:bg-gray-800 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Services Overview - At the Very Top */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Our Maritime Services</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Everything you need for maritime operations - all in one place
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service, index) => (
              <Link
                href="/services"
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300 active:scale-95"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 sm:p-3 rounded-lg w-fit mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Preview Section */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Marine Marketplace
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Latest Marine Listings</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore vessels, machinery, equipment, and spare parts from trusted sellers
            </p>
          </div>

          {listingsLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading listings...</p>
            </div>
          ) : recentListings.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No listings available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {recentListings.map((listing) => {
                  const CategoryIcon = getCategoryIcon(listing.category);
                  return (
                    <Link
                      key={listing.id}
                      href={`/marketplace/${listing.slug}`}
                      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300"
                    >
                      <div className="relative h-40 sm:h-48 bg-gray-100">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <CategoryIcon className="h-12 w-12 text-gray-300" />
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
                      <div className="p-4">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {marketplaceCategories.find((c) => c.value === listing.category)?.label}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition text-sm sm:text-base">
                          {listing.title}
                        </h3>
                        <p className="text-lg sm:text-xl font-bold text-primary-600 mb-2">
                          {formatPrice(listing.price, listing.currency)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate max-w-[80px]">{listing.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {listing.view_count}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
                >
                  Browse All Listings
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section - Below Services */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden py-10 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-blue-900/30 animate-pulse"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            From vessel sales to crew training, insurance to flag registration - access all essential maritime services through one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white text-primary-700 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-primary-50 transition shadow-xl text-base sm:text-lg"
            >
              Start Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition text-base sm:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Operating across UAE, GCC, Africa & Asia</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock support for urgent needs</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">20+ Years Experience</h3>
              <p className="text-gray-600">Proven track record in maritime industry</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated marine professionals at your service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Maritime Professionals Choose Noon Marine
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We bring together all essential maritime services under one roof, making it easier for vessel owners, operators, and maritime businesses to manage their operations efficiently.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-lg mr-4">
                      <CheckCircle2 className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=800&q=80"
                alt="Vessel operations"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Maritime Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, trends, and insights from the maritime industry
            </p>
          </div>

          {blogsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading latest articles...</p>
            </div>
          ) : recentBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {recentBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {blog.excerpt || 'Read this article to learn more...'}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
                >
                  View All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Streamline Your Maritime Operations?
          </h2>
          <p className="text-xl mb-10 text-primary-100 max-w-2xl mx-auto">
            Join thousands of maritime professionals who trust Noon Marine for their vessel and crew management needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-10 py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-lg shadow-xl"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition text-lg"
            >
              Contact Sales
            </Link>
          </div>
          <p className="mt-6 text-primary-200">No credit card required â€¢ Free forever â€¢ Setup in minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-300 pt-32 pb-12 overflow-hidden">
        {/* Ocean Container */}
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave wave-2"></div>
        </div>

        {/* Footer Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo.png" alt="Noon Marine" width={130} height={52} className="object-contain" />
              </div>
              <p className="text-sm">
                Your trusted partner for comprehensive maritime solutions across the UAE, GCC, Africa, and Asia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/marketplace" className="hover:text-primary-400 transition">Marketplace</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Vessel Sales</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Marine Insurance</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Flag Registration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary-400 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary-400 transition">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-primary-400 transition">Careers</Link></li>
                <li><Link href="/news" className="hover:text-primary-400 transition">News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Dubai Maritime City, UAE</li>
                <li>Email: info@noonmarine.uk</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Noon Marine Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: Ship,
    title: 'Vessel Sales & Chartering',
    description: 'Buy, sell, or charter vessels worldwide',
  },
  {
    icon: Users,
    title: 'Vessel Management & Manning',
    description: 'End-to-end vessel management with crew',
  },
  {
    icon: Wrench,
    title: 'Repair & Docking',
    description: 'Dry-docking and maintenance services',
  },
  {
    icon: Flag,
    title: 'Flag Registration',
    description: 'International flag registration services',
  },
  {
    icon: ClipboardCheck,
    title: 'Classification & Survey',
    description: 'Class notations and periodic surveys',
  },
  {
    icon: FileText,
    title: 'Legal Consultancy',
    description: 'Maritime law and contract review',
  },
  {
    icon: Shield,
    title: 'Marine Insurance',
    description: 'Hull, P&I, and cargo insurance',
  },
  {
    icon: Building2,
    title: 'Offshore Project Support',
    description: 'Engineering and logistics for offshore',
  },
  {
    icon: Package,
    title: 'Spare Parts Supply',
    description: 'Marine parts and technical supplies',
  },
  {
    icon: Truck,
    title: 'Logistics & Shipping',
    description: 'Heavy equipment and cargo services',
  },
  {
    icon: LifeBuoy,
    title: 'Salvage & Towage',
    description: 'Emergency towage and salvage services',
  },
  {
    icon: GraduationCap,
    title: 'Training & Certification',
    description: 'STCW, HSE, and professional courses',
  },
  {
    icon: Globe,
    title: 'Digital Platform Operations',
    description: 'Online dealer portal and tracking',
  },
];

const benefits = [
  {
    title: 'One-Stop Solution',
    description: 'Access all maritime services through a single platform - no need to deal with multiple vendors.',
  },
  {
    title: 'Digital & Physical Presence',
    description: 'Manage everything online or visit our Dubai Maritime City office for in-person support.',
  },
  {
    title: 'Fast Processing',
    description: 'Streamlined processes and fast-track options for urgent documentation and certifications.',
  },
  {
    title: 'Expert Network',
    description: 'Connected with leading classification societies, insurance providers, and maritime authorities worldwide.',
  },
];

