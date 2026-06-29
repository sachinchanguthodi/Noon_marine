import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Maritime Services – Vessel Sales, Insurance & Flag Registration | Noon Marine Dubai',
  description: 'Comprehensive maritime services in Dubai: vessel sales & chartering, flag registration, marine insurance, crew management, STCW training, and logistics. All in one platform.',
  keywords: 'maritime services Dubai, vessel sales UAE, flag registration Dubai, marine insurance Gulf, STCW training UAE, crew management',
};
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
  ClipboardCheck,
  Waves,
  LifeBuoy,
  Building2,
  Globe,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/services" className="text-white font-medium">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white">Logistics</Link>
              <Link href="/vessels" className="text-gray-300 hover:text-white">Vessels</Link>
              <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1566487097168-e91a4cafd685?auto=format&fit=crop&w=2000&q=80"
            alt="Marine services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Comprehensive Marine Services</h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Your one-stop solution for all maritime needs. From vessel sales to crew training,
            we bring together essential maritime services under one roof.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Globe className="h-5 w-5 mr-2" />
              Operating across UAE, GCC, Africa & Asia
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 mr-2" />
              24/7 Support Available
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Building2 className="h-5 w-5 mr-2" />
              20+ Years Experience
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Get Started</h2>
            <p className="text-xl text-gray-600">Simple steps to access our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up for free and access our platform</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Service</h3>
              <p className="text-gray-600">Browse our comprehensive service catalog</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Request</h3>
              <p className="text-gray-600">Fill out the service request form</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Support</h3>
              <p className="text-gray-600">Our team will assist you promptly</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-lg font-semibold"
            >
              Start Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Organized by category for easy navigation</p>
          </div>

          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="bg-primary-600 p-3 rounded-lg">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-600 transition">
                        <service.icon className="h-6 w-6 text-primary-600 group-hover:text-white transition" />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/register"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Request Service
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Need Help Choosing the Right Service?
              </h2>
              <p className="text-xl text-primary-100 mb-6">
                Our marine experts are here to guide you. Contact us for a free consultation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-3" />
                  <span className="text-lg">+971 50 687 3131</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-3" />
                  <span className="text-lg">info@noonmarine.com</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-6 w-6 mr-3" />
                  <span className="text-lg">Dubai Maritime City (DMC), New Building, Office No. 16, Dubai, UAE</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-4">Quick Contact</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Select Service</option>
                  <option>Vessel Sales & Chartering</option>
                  <option>Marine Insurance</option>
                  <option>Flag Registration</option>
                  <option>Crew Management</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const serviceCategories = [
  {
    name: 'Vessel Operations & Management',
    description: 'Complete vessel lifecycle services',
    icon: Ship,
    services: [
      {
        icon: Ship,
        title: 'Vessel Sales & Chartering',
        description: 'Buy, sell, or charter yachts, cargo boats, and supply vessels worldwide.',
        features: [
          'New and used vessel sales',
          'Long & short-term charter',
          'Vessel valuation & inspection',
          'Documentation assistance',
        ],
      },
      {
        icon: Users,
        title: 'Vessel Management & Manning',
        description: 'End-to-end vessel management with crew recruitment and operational support.',
        features: [
          'Crew recruitment & vetting',
          'Maintenance scheduling',
          'Performance monitoring',
          'Operational support 24/7',
        ],
      },
      {
        icon: Wrench,
        title: 'Repair & Docking Coordination',
        description: 'Professional dry-docking, overhaul planning, and survey booking services.',
        features: [
          'Dry-docking arrangements',
          'Overhaul planning',
          'Survey coordination',
          'Quality control & supervision',
        ],
      },
    ],
  },
  {
    name: 'Compliance & Documentation',
    description: 'Legal, registration, and classification services',
    icon: FileText,
    services: [
      {
        icon: Flag,
        title: 'Flag Registration & Licensing',
        description: 'International flagging services for Poland, Liberia, Bahamas, MMSI, and more.',
        features: [
          'Multiple flag state options',
          'MMSI registration',
          'Fast-track processing',
          'Annual renewal management',
        ],
      },
      {
        icon: ClipboardCheck,
        title: 'Classification & Survey Booking',
        description: 'Class notations, periodic surveys, and compliance documentation services.',
        features: [
          'Class society liaison',
          'Periodic survey arrangements',
          'Compliance documentation',
          'Certification management',
        ],
      },
      {
        icon: FileText,
        title: 'Legal Consultancy',
        description: 'Maritime law expertise, contract review, and dispute resolution.',
        features: [
          'Contract drafting & review',
          'Dispute resolution',
          'Regulatory compliance advice',
          'Maritime law consultation',
        ],
      },
    ],
  },
  {
    name: 'Insurance & Risk Management',
    description: 'Comprehensive marine insurance solutions',
    icon: Shield,
    services: [
      {
        icon: Shield,
        title: 'Marine Insurance',
        description: 'Hull & Machinery, P&I Club, Liability, and Cargo Insurance coverage.',
        features: [
          'Hull & Machinery insurance',
          'P&I Club coverage',
          'Cargo insurance',
          'Liability coverage',
        ],
      },
    ],
  },
  {
    name: 'Offshore & Industrial Support',
    description: 'Engineering, logistics, and equipment for offshore projects',
    icon: Building2,
    services: [
      {
        icon: Building2,
        title: 'Offshore Project Support',
        description: 'Engineering, logistics, and specialized equipment for offshore operations.',
        features: [
          'Project engineering',
          'Equipment supply',
          'Logistics coordination',
          'Technical support',
        ],
      },
      {
        icon: Package,
        title: 'Spare Parts & Equipment Supply',
        description: 'Marine spare parts, tools, and technical supplies with global delivery.',
        features: [
          'Genuine OEM parts',
          'Worldwide delivery',
          'Emergency service',
          'Inventory management',
        ],
      },
      {
        icon: Truck,
        title: 'Logistics & Shipping Contracts',
        description: 'Heavy equipment logistics, cargo handling, and container services.',
        features: [
          'Heavy equipment transport',
          'Container services',
          'Customs clearance',
          'Port-to-port delivery',
        ],
      },
    ],
  },
  {
    name: 'Emergency & Salvage Services',
    description: 'Critical emergency response and salvage operations',
    icon: LifeBuoy,
    services: [
      {
        icon: LifeBuoy,
        title: 'Salvage & Towage',
        description: 'Emergency towage, wreck removal, and professional salvage services.',
        features: [
          'Emergency towage 24/7',
          'Wreck removal',
          'Salvage operations',
          'Marine casualty response',
        ],
      },
    ],
  },
  {
    name: 'Training & Certification',
    description: 'Professional maritime training programs',
    icon: GraduationCap,
    services: [
      {
        icon: GraduationCap,
        title: 'Training & Certification',
        description: 'HSC, STCW, HSE courses with international certifications.',
        features: [
          'STCW certified courses',
          'HSE training programs',
          'HSC certifications',
          'Online & in-person options',
        ],
      },
    ],
  },
  {
    name: 'Digital Services',
    description: 'Online platform and dealer portal access',
    icon: Globe,
    services: [
      {
        icon: Globe,
        title: 'Digital Platform Operations',
        description: 'Online dealer portal, document upload, and license processing.',
        features: [
          'Online dealer portal',
          'Document management',
          'License processing',
          'Real-time tracking',
        ],
      },
    ],
  },
];

