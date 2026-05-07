'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import {
  Ship,
  Wrench,
  Package,
  Settings,
  Box,
  MapPin,
  Eye,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Share2,
  Heart,
  Send,
  User,
  MessageSquare,
  Copy,
  Check,
  Bitcoin,
  Building2,
  CreditCard,
} from 'lucide-react';
import { MarketplaceListing, PaymentMethod } from '@/lib/supabase';

const categories = [
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
  const cat = categories.find((c) => c.value === category);
  return cat?.icon || Box;
}

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<MarketplaceListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchListing(params.slug as string);
      fetchPaymentMethods();
    }
  }, [params.slug]);

  const fetchPaymentMethods = async () => {
    try {
      const { paymentService } = await import('@/lib/paymentService');
      const data = await paymentService.getActive();
      setPaymentMethods(data);
    } catch (err) {
      console.error('Failed to load payment methods:', err);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(id);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch {
      alert('Copied: ' + text);
    }
  };

  const fetchListing = async (slug: string) => {
    try {
      const { marketplaceService } = await import('@/lib/marketplaceService');
      const data = await marketplaceService.getBySlug(slug);
      if (data) {
        setListing(data);
      } else {
        router.push('/marketplace');
      }
    } catch (error) {
      console.error('Failed to fetch listing:', error);
      router.push('/marketplace');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = () => {
    if (listing?.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;

    setSubmitting(true);
    try {
      // Create mailto link with pre-filled content
      const subject = encodeURIComponent(`Inquiry: ${listing.title}`);
      const body = encodeURIComponent(
        `Name: ${inquiryForm.name}\n` +
        `Email: ${inquiryForm.email}\n` +
        `Phone: ${inquiryForm.phone}\n\n` +
        `Listing: ${listing.title}\n` +
        `Price: ${formatPrice(listing.price, listing.currency)}\n` +
        `Category: ${categories.find(c => c.value === listing.category)?.label}\n` +
        `URL: ${window.location.href}\n\n` +
        `Message:\n${inquiryForm.message}`
      );

      window.location.href = `mailto:info@noonmarine.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  const CategoryIcon = getCategoryIcon(listing.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/marketplace" className="text-white font-medium">Marketplace</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white transition">Logistics</Link>
              <Link href="/vessels" className="text-gray-300 hover:text-white transition">Vessels</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
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
                <Link href="/blog" className="text-gray-700 hover:text-primary-600 py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                <Link href="/about" className="text-gray-700 hover:text-primary-600 py-2 px-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-primary-600 py-2 px-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/marketplace" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-80 sm:h-96 lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden">
              {listing.images && listing.images.length > 0 ? (
                <>
                  <img
                    src={listing.images[currentImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {listing.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {listing.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CategoryIcon className="h-24 w-24 text-gray-300" />
                </div>
              )}
              {listing.featured && (
                <span className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded">
                  Featured
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {listing.images && listing.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {listing.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Category & Condition */}
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                <CategoryIcon className="h-4 w-4 mr-1" />
                {categories.find((c) => c.value === listing.category)?.label}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                listing.condition === 'NEW' ? 'bg-green-100 text-green-700' :
                listing.condition === 'REFURBISHED' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {listing.condition}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {listing.title}
            </h1>

            {/* Price */}
            <div className="text-3xl sm:text-4xl font-bold text-primary-600">
              {formatPrice(listing.price, listing.currency)}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {listing.location}
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                {listing.view_count} views
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Listed {new Date(listing.published_at || listing.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Specifications */}
            {listing.specifications && Object.keys(listing.specifications).length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(listing.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                        <dt className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</dt>
                        <dd className="text-gray-900 font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Inquiry Form */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Interested in this listing?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Fill out the form below and our team will get back to you shortly.
              </p>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inquiry Sent!</h3>
                  <p className="text-gray-600 text-sm">
                    Thank you for your interest. Our team will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        required
                        rows={4}
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="I'm interested in this listing and would like more information..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Or email us directly at{' '}
                    <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">
                      info@noonmarine.com
                    </a>
                  </p>
                </form>
              )}
            </div>

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <h2 className="font-semibold text-gray-900">Payment Options</h2>
                  <span className="ml-auto text-xs text-gray-500">After purchase approval</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {method.type === 'CRYPTO' ? (
                          <Bitcoin className="h-5 w-5 text-orange-500" />
                        ) : (
                          <Building2 className="h-5 w-5 text-blue-500" />
                        )}
                        <span className="font-semibold text-gray-900">{method.name}</span>
                        {method.network && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                            {method.network}
                          </span>
                        )}
                      </div>

                      {method.type === 'CRYPTO' && method.wallet_address && (
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          {method.qr_code_url && (
                            <img
                              src={method.qr_code_url}
                              alt={`${method.name} QR Code`}
                              className="w-28 h-28 rounded-lg border border-gray-200 object-contain bg-white flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-1">Wallet Address:</p>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 text-xs bg-gray-100 px-3 py-2 rounded border border-gray-200 break-all text-gray-800">
                                {method.wallet_address}
                              </code>
                              <button
                                onClick={() => copyToClipboard(method.wallet_address!, method.id)}
                                className="flex-shrink-0 p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                                title="Copy address"
                              >
                                {copiedAddress === method.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <p className="text-xs text-amber-600 mt-2 font-medium">
                              Only send {method.name} on the {method.network || 'correct'} network to this address.
                            </p>
                          </div>
                        </div>
                      )}

                      {method.type === 'BANK' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {method.bank_name && <p className="text-gray-600">Bank: <span className="text-gray-900 font-medium">{method.bank_name}</span></p>}
                          {method.account_name && <p className="text-gray-600">Account: <span className="text-gray-900 font-medium">{method.account_name}</span></p>}
                          {method.account_number && <p className="text-gray-600">Acc. No.: <span className="text-gray-900 font-medium">{method.account_number}</span></p>}
                          {method.iban && (
                            <p className="text-gray-600 flex items-center gap-1">
                              IBAN: <span className="text-gray-900 font-medium font-mono">{method.iban}</span>
                              <button onClick={() => copyToClipboard(method.iban!, method.id + 'iban')} className="text-gray-400 hover:text-primary-600 ml-1">
                                {copiedAddress === method.id + 'iban' ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                              </button>
                            </p>
                          )}
                          {method.swift_code && <p className="text-gray-600">SWIFT: <span className="text-gray-900 font-medium">{method.swift_code}</span></p>}
                          {method.routing_number && <p className="text-gray-600">Routing: <span className="text-gray-900 font-medium">{method.routing_number}</span></p>}
                          {method.bank_country && <p className="text-gray-600">Country: <span className="text-gray-900 font-medium">{method.bank_country}</span></p>}
                          {method.bank_currency && <p className="text-gray-600">Currency: <span className="text-gray-900 font-medium">{method.bank_currency}</span></p>}
                          {method.additional_info && (
                            <p className="col-span-2 text-xs text-gray-500 bg-gray-50 rounded p-2 mt-1">{method.additional_info}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button className="flex items-center text-gray-600 hover:text-primary-600 transition">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
              <button className="flex items-center text-gray-600 hover:text-red-500 transition">
                <Heart className="h-5 w-5 mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
