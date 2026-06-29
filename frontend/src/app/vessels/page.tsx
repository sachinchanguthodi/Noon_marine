'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Ship, Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const TYPE_LABELS: Record<string, string> = {
  YACHT: 'Yacht', CARGO: 'Cargo Ship', SUPPLY: 'Supply Vessel',
  TANKER: 'Tanker', FISHING: 'Fishing Vessel', PASSENGER: 'Passenger Ship',
  TUGBOAT: 'Tugboat', OTHER: 'Other',
};

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: 'For Sale', CHARTERED: 'For Charter',
  SOLD: 'Sold', UNDER_MAINTENANCE: 'Under Maintenance', DECOMMISSIONED: 'Decommissioned',
};

interface Vessel {
  id: string;
  name: string;
  vesselType: string;
  status: string;
  flag?: string;
  yearBuilt?: number;
  grossTonnage?: number;
  price?: number;
  charterRate?: number;
  description?: string;
  images: string[];
}

export default function VesselsPage() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [purposeFilter, setPurposeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('Any Price');

  useEffect(() => {
    fetch(`${API_URL}/api/vessels?limit=100`)
      .then(r => r.json())
      .then(data => setVessels(data.data || []))
      .catch(() => setVessels([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = vessels.filter((v) => {
    const typeMatch = typeFilter === 'All Types' || v.vesselType === typeFilter;
    const purposeMatch =
      purposeFilter === 'All' ||
      (purposeFilter === 'For Sale' && v.status === 'AVAILABLE') ||
      (purposeFilter === 'For Charter' && v.status === 'CHARTERED');
    const price = v.price || 0;
    const priceMatch =
      priceFilter === 'Any Price' ||
      (priceFilter === 'Under $1M' && price < 1000000) ||
      (priceFilter === '$1M - $5M' && price >= 1000000 && price <= 5000000) ||
      (priceFilter === '$5M - $10M' && price > 5000000 && price <= 10000000) ||
      (priceFilter === 'Over $10M' && price > 10000000);
    return typeMatch && purposeMatch && priceMatch;
  });

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
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white transition">Logistics</Link>
              <Link href="/vessels" className="text-white font-medium">Vessels</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-white transition">Parts & Equipment</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition">Sign In</Link>
              <Link href="/register" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">Get Started</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=2000&q=80" alt="Vessel Fleet" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Vessel Sales & Chartering</h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Browse our extensive inventory of vessels for sale and charter. From yachts to cargo ships, find the perfect vessel for your needs.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vessel Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>All Types</option>
                  <option>Cargo Ships</option>
                  <option>Tankers</option>
                  <option>Supply Vessels</option>
                  <option>Yachts</option>
                  <option>Tugboats</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <select
                  value={purposeFilter}
                  onChange={(e) => setPurposeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Charter">For Charter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>Any Price</option>
                  <option>Under $1M</option>
                  <option>$1M - $5M</option>
                  <option>$5M - $10M</option>
                  <option>Over $10M</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setTypeFilter('All Types'); setPurposeFilter('All'); setPriceFilter('Any Price'); }}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">
            {loading ? 'Loading...' : `${filtered.length} vessel${filtered.length !== 1 ? 's' : ''} found`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Ship className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {vessels.length === 0 ? 'No vessels listed yet' : 'No vessels match your filters'}
              </h3>
              <p className="text-gray-500 mb-6">
                {vessels.length === 0 ? 'Check back soon or contact us directly.' : 'Try adjusting your search criteria'}
              </p>
              {vessels.length > 0 && (
                <button
                  onClick={() => { setTypeFilter('All Types'); setPurposeFilter('All'); setPriceFilter('Any Price'); }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((vessel) => (
                <div key={vessel.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                  <div className="aspect-video relative bg-gray-200">
                    {vessel.images?.[0] ? (
                      <img src={vessel.images[0]} alt={vessel.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Ship className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${vessel.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-700' : vessel.status === 'CHARTERED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABELS[vessel.status] || vessel.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vessel.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{TYPE_LABELS[vessel.vesselType] || vessel.vesselType}</p>
                    <div className="space-y-2 mb-4">
                      {vessel.yearBuilt && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-primary-400" />
                          <span>Year: {vessel.yearBuilt}</span>
                        </div>
                      )}
                      {vessel.flag && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-primary-400" />
                          <span>{vessel.flag}</span>
                        </div>
                      )}
                      {vessel.grossTonnage && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Ship className="h-4 w-4 mr-2 text-primary-400" />
                          <span>GT: {vessel.grossTonnage.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        {vessel.price ? (
                          <>
                            <div className="text-2xl font-bold text-primary-600">${vessel.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">For Sale</div>
                          </>
                        ) : vessel.charterRate ? (
                          <>
                            <div className="text-2xl font-bold text-primary-600">${vessel.charterRate.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Per Day</div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-400">Price on request</div>
                        )}
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium"
                      >
                        Inquire
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-primary-100 mb-8">Contact our vessel specialists for personalized assistance</p>
          <Link href="/contact" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-lg">
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
