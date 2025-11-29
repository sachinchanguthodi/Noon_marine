import Link from 'next/link';
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
  Anchor,
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
  Building2
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Anchor className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              <span className="text-lg sm:text-2xl font-bold text-primary-900">Noon Marine</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-primary-600 transition">Services</Link>
              <Link href="/logistics" className="text-gray-700 hover:text-primary-600 transition">Logistics</Link>
              <Link href="/vessels" className="text-gray-700 hover:text-primary-600 transition">Vessels</Link>
              <Link href="/training" className="text-gray-700 hover:text-primary-600 transition">Training</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">Contact</Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/login"
                className="px-3 py-2 sm:px-4 text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 sm:px-6 text-sm sm:text-base bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
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
          <p className="mt-6 text-primary-200">No credit card required • Free forever • Setup in minutes</p>
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
              <div className="flex items-center space-x-2 mb-4">
                <Anchor className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold text-white">Noon Marine</span>
              </div>
              <p className="text-sm">
                Your trusted partner for comprehensive maritime solutions across the UAE, GCC, Africa, and Asia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services" className="hover:text-primary-400 transition">Vessel Sales</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Marine Insurance</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Flag Registration</Link></li>
                <li><Link href="/services" className="hover:text-primary-400 transition">Crew Management</Link></li>
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
                <li>Phone: +971 50 100 1882</li>
                <li>Email: info@noonmarine.com</li>
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
