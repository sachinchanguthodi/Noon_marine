'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Anchor,
  Ship,
  Package,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  ArrowRight,
  Truck,
  Container,
  Boxes,
  Globe,
  CheckCircle2,
  Clock,
  Shield,
  BarChart3,
  Search,
  Calculator,
  Bell,
  Building2,
  Users,
} from 'lucide-react';

// Transport Tab Component
function TransportTab({ selectedService, setSelectedService }: any) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Logistics & Shipping Solutions
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Reliable freight forwarding and logistics services for your maritime cargo needs.
              Get instant quotes, book shipments, and track your cargo in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Globe className="h-5 w-5 mr-2" />
                <span>Global Network</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5 mr-2" />
                <span>Fast Transit Times</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Shield className="h-5 w-5 mr-2" />
                <span>Secure Handling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {logisticsServices.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-primary-300"
              >
                <div className="aspect-video relative bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {service.illustration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary-600 text-sm font-medium">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Store/Warehousing Tab Component
function StoreTab() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 to-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Warehousing & Storage Solutions
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Secure storage facilities with advanced inventory management systems. From short-term to long-term storage, we handle your cargo with care.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warehouseServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="bg-amber-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Clear & Protect Tab Component
function ProtectTab() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Customs Clearance & Cargo Insurance
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Streamlined customs clearance and comprehensive cargo insurance to protect your shipments throughout the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {protectServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Logistics Management Tab Component
function ManagementTab() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Logistics Management Platform
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Real-time visibility and control over your entire supply chain with our advanced logistics management system.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Solutions Tab Component
function SolutionsTab() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tailored Logistics Solutions
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Custom logistics solutions designed for your specific industry needs and business requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industrySolutions.map((solution, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <solution.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function LogisticsPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('transport');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Anchor className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-primary-900">Noon Marine</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-primary-600 transition">Services</Link>
              <Link href="/logistics" className="text-primary-600 font-medium">Logistics</Link>
              <Link href="/vessels" className="text-gray-700 hover:text-primary-600 transition">Vessels</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition"
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
          </div>
        </nav>
      </header>

      {/* Tabs Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('transport')}
              className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === 'transport'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Transport</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('store')}
              className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === 'store'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Store</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('protect')}
              className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === 'protect'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Clear & Protect</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === 'management'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Logistics Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`py-4 px-2 border-b-2 font-medium whitespace-nowrap transition ${
                activeTab === 'solutions'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Solutions</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'transport' && <TransportTab selectedService={selectedService} setSelectedService={setSelectedService} />}
      {activeTab === 'store' && <StoreTab />}
      {activeTab === 'protect' && <ProtectTab />}
      {activeTab === 'management' && <ManagementTab />}
      {activeTab === 'solutions' && <SolutionsTab />}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Logistics Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for all your shipping needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">Get an Instant Quote</h2>
                <p className="text-primary-100 mb-8">
                  Fill in your shipment details and get competitive rates from multiple carriers instantly.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Instant Online Quotes</h4>
                      <p className="text-primary-100 text-sm">Get freight rates in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Competitive Pricing</h4>
                      <p className="text-primary-100 text-sm">Compare rates from multiple carriers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Easy Booking</h4>
                      <p className="text-primary-100 text-sm">Book and pay online in minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Port of Loading
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Jebel Ali, Dubai"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Port of Discharge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Singapore"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Container className="h-4 w-4 inline mr-1" />
                      Cargo Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>20' Container (FCL)</option>
                      <option>40' Container (FCL)</option>
                      <option>40' High Cube Container</option>
                      <option>LCL (Less than Container Load)</option>
                      <option>Break Bulk</option>
                      <option>Ro-Ro (Roll-on/Roll-off)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Boxes className="h-4 w-4 inline mr-1" />
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Ready Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition font-semibold text-lg flex items-center justify-center"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    Get Instant Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Logistics Services</h2>
            <p className="text-xl text-gray-600">Comprehensive freight solutions for every need</p>
          </div>

          <div className="space-y-8">
            {serviceDetails.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-primary-600 p-4 rounded-xl">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ship Your Cargo?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get started with our logistics services today and experience hassle-free shipping
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition text-lg"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Anchor className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold text-white">Noon Marine</span>
              </div>
              <p className="text-sm">
                Your trusted partner for maritime logistics and shipping solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Logistics Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/logistics" className="hover:text-primary-400 transition">Ocean Freight</Link></li>
                <li><Link href="/logistics" className="hover:text-primary-400 transition">Container Shipping</Link></li>
                <li><Link href="/logistics" className="hover:text-primary-400 transition">Break Bulk</Link></li>
                <li><Link href="/logistics" className="hover:text-primary-400 transition">Door-to-Door</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary-400 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary-400 transition">Contact</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">All Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Dubai Maritime City, UAE</li>
                <li>Phone: +971 50 100 1882</li>
                <li>Email: logistics@noonmarine.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Noon Marine Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Service Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {logisticsServices.find(s => s.id === selectedService)?.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {logisticsServices.find(s => s.id === selectedService)?.fullDescription}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const logisticsServices = [
  {
    id: 'noon-spot',
    title: 'Noon Spot',
    description: 'Get fixed prices and guaranteed loading when booking your customers\' shipments online.',
    fullDescription: 'Book container shipments with guaranteed space allocation and transparent pricing. Perfect for regular shippers who need reliability and competitive rates.',
    illustration: (
      <img
        src="https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=400&q=80"
        alt="Noon Spot"
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'ocean-contract',
    title: 'Ocean Contract',
    description: 'Transport your goods with stable rates, choice of allocation and assured space.',
    fullDescription: 'Long-term contracts with preferential rates and guaranteed space for high-volume shippers. Ideal for businesses with regular shipping needs.',
    illustration: (
      <img
        src="https://images.unsplash.com/photo-1566487097168-e91a4cafd685?auto=format&fit=crop&w=400&q=80"
        alt="Ocean Contract"
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'ocean-quote',
    title: 'Ocean Quote Request',
    description: 'Get a freight quote for standard, oversized, and LCL shipments.',
    fullDescription: 'Request customized quotes for any cargo type, size, or destination. Our team will provide competitive rates within 24 hours.',
    illustration: (
      <img
        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80"
        alt="Ocean Quote"
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'noon-go',
    title: 'Noon Go',
    description: 'Book and manage your own deliveries from door to door with a simple online platform.',
    fullDescription: 'Complete door-to-door delivery service with real-time tracking, customs clearance, and last-mile delivery. Manage everything through our digital platform.',
    illustration: (
      <img
        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80"
        alt="Noon Go"
        className="w-full h-full object-cover"
      />
    ),
  },
  {
    id: 'intermodal',
    title: 'Intermodal Transport',
    description: 'Find online rates for Inland Transportation of Full Container Loads.',
    fullDescription: 'Seamless intermodal transportation combining sea, rail, and road. Get instant quotes for inland container movements across the region.',
    illustration: (
      <img
        src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80"
        alt="Intermodal Transport"
        className="w-full h-full object-cover"
      />
    ),
  },
];

const features = [
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access to major ports worldwide',
  },
  {
    icon: DollarSign,
    title: 'Competitive Rates',
    description: 'Best prices from multiple carriers',
  },
  {
    icon: Clock,
    title: 'Fast Transit',
    description: 'Quick delivery times guaranteed',
  },
  {
    icon: Shield,
    title: 'Cargo Insurance',
    description: 'Full coverage for your shipments',
  },
];

const serviceDetails = [
  {
    icon: Container,
    title: 'Full Container Load (FCL)',
    description: 'Dedicated containers for your exclusive use, ideal for large shipments.',
    features: [
      '20\' & 40\' standard containers',
      'High cube & refrigerated options',
      'Direct port-to-port service',
      'Guaranteed space allocation',
      'Competitive long-term rates',
      'Real-time tracking',
    ],
  },
  {
    icon: Boxes,
    title: 'Less than Container Load (LCL)',
    description: 'Cost-effective solution for smaller shipments sharing container space.',
    features: [
      'Pay only for space used',
      'Weekly consolidations',
      'Major trade lanes covered',
      'Door-to-door available',
      'Flexible pickup dates',
      'Customs clearance included',
    ],
  },
  {
    icon: Ship,
    title: 'Break Bulk & Heavy Lift',
    description: 'Specialized handling for oversized, heavy, or project cargo.',
    features: [
      'Project cargo expertise',
      'Heavy machinery transport',
      'Ro-Ro services',
      'Lashing & securing',
      'Port handling coordination',
      'Engineering support',
    ],
  },
  {
    icon: Truck,
    title: 'Door-to-Door Service',
    description: 'Complete end-to-end logistics from origin to final destination.',
    features: [
      'Pickup from any location',
      'Customs clearance',
      'Last-mile delivery',
      'Single point of contact',
      'Full liability coverage',
      'Real-time updates',
    ],
  },
];

const warehouseServices = [
  {
    icon: Package,
    title: 'Short-term Storage',
    description: 'Flexible storage solutions for temporary warehousing needs.',
    features: [
      'Daily/weekly rates available',
      'Quick in-out processing',
      'Climate-controlled options',
      'Secure 24/7 monitoring',
    ],
  },
  {
    icon: Building2,
    title: 'Long-term Warehousing',
    description: 'Dedicated warehouse space for extended storage requirements.',
    features: [
      'Competitive monthly rates',
      'Inventory management system',
      'Order fulfillment services',
      'Value-added services',
    ],
  },
  {
    icon: FileText,
    title: 'Distribution Services',
    description: 'Complete distribution and fulfillment from our facilities.',
    features: [
      'Pick & pack services',
      'Last-mile delivery',
      'Cross-docking',
      'Return management',
    ],
  },
];

const protectServices = [
  {
    icon: FileText,
    title: 'Customs Clearance',
    description: 'Expert customs brokerage for smooth clearance of your shipments.',
    features: [
      'Import/export documentation',
      'HS code classification',
      'Duty & tax calculation',
      'Compliance management',
      'Origin certification',
      'Fast-track processing',
    ],
  },
  {
    icon: Shield,
    title: 'Cargo Insurance',
    description: 'Comprehensive insurance coverage for your valuable cargo.',
    features: [
      'All-risk coverage available',
      'Competitive premiums',
      'Claims assistance',
      'Door-to-door protection',
      'War & strike coverage',
      'Quick claim settlement',
    ],
  },
];

const managementFeatures = [
  {
    icon: BarChart3,
    title: 'Real-time Tracking',
    description: 'Track your shipments in real-time with GPS and milestone updates.',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description: 'Digital document repository for all your shipping paperwork.',
  },
  {
    icon: DollarSign,
    title: 'Cost Analytics',
    description: 'Detailed cost breakdown and analytics for better budget control.',
  },
  {
    icon: Users,
    title: 'Multi-user Access',
    description: 'Team collaboration with role-based access controls.',
  },
  {
    icon: Bell,
    title: 'Automated Alerts',
    description: 'Instant notifications for shipment status changes and delays.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Reports',
    description: 'Comprehensive reports on shipping performance and KPIs.',
  },
];

const industrySolutions = [
  {
    icon: Building2,
    title: 'Oil & Gas Logistics',
    description: 'Specialized logistics for oilfield equipment, pipes, and heavy machinery with project cargo expertise.',
  },
  {
    icon: Package,
    title: 'E-commerce Fulfillment',
    description: 'Complete e-commerce logistics from warehousing to last-mile delivery with integrated platform.',
  },
  {
    icon: Ship,
    title: 'Automotive Logistics',
    description: 'Ro-Ro services, spare parts distribution, and complete supply chain for automotive industry.',
  },
  {
    icon: Boxes,
    title: 'Cold Chain Logistics',
    description: 'Temperature-controlled transport and storage for perishables, pharma, and sensitive cargo.',
  },
];
