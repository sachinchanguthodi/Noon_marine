import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Ship,
  Wrench,
  Users,
  GraduationCap,
  FileText,
  Globe,
  Building2,
  Truck,
} from 'lucide-react';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us – Noon Marine | Rahnama Holding | Dubai Maritime City',
  description:
    'Noon Marine, backed by Rahnama Holding with over 20 years of maritime experience. Shipbuilding, vessel sales, marine engineering, crew training and more — all under one roof in Dubai Maritime City.',
};

export default function AboutPage() {
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
              <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition">Services</Link>
              <Link href="/logistics" className="text-gray-300 hover:text-white transition">Logistics</Link>
              <Link href="/vessels" className="text-gray-300 hover:text-white transition">Vessels</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white font-medium transition">Sign In</Link>
              <Link href="/contact" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative text-white overflow-hidden py-20 sm:py-28 bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="/images/hero-port.webp"
            alt=""
            className="w-full h-full object-cover object-bottom opacity-80"
            loading="eager"
          />
          <div className="absolute inset-0 bg-blue-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-800/50 border border-blue-700/50 rounded-full text-sm font-medium text-blue-200 mb-6">
            <MapPin className="h-4 w-4 mr-2" />
            Dubai Maritime City (DMC) — New Building, Office No. 16
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            About Noon Marine
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            Backed by Rahnama Holding — over two decades of maritime excellence in shipbuilding, vessel sales, repair, and marine engineering.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '20+', label: 'Years of Maritime Experience' },
              { value: '15+', label: 'Marine Services Under One Roof' },
              { value: '72h', label: 'Response Time Guarantee' },
              { value: '4', label: 'Regions Served: UAE, GCC, Africa & Asia' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Noon Marine is the digital and operational arm of <strong>Rahnama Holding Company</strong>, a group with over two decades of deep expertise in the maritime industry — spanning shipbuilding, vessel sales, repair services, and marine engineering.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mission is to create an <strong>integrated maritime ecosystem</strong> within Dubai Maritime City, where professionals, companies, and seafarers can access every service they need — from vessel registration and technical documentation, to crew training, legal compliance, and logistics — all under one roof.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We have launched a dedicated digital platform for marine operations, vessel management, and licensing, already supporting clients across the <strong>UAE, GCC, Africa, and Asia</strong>. Our physical headquarters at DMC enables face-to-face support, document submission, and fully localised assistance for every client.
              </p>
              <div className="space-y-3">
                {[
                  'Shipbuilding, vessel sales & repair services',
                  'Marine engineering & technical documentation',
                  'Crew training, licensing & legal compliance',
                  'Logistics, industrial & offshore support',
                  'Digital platform for marine operations & vessel management',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CEO */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-blue-50 to-slate-100 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-44 h-44 rounded-full overflow-hidden mx-auto mb-5 shadow-lg border-4 border-white">
                  <Image
                    src="/images/sina-rahnama.png"
                    alt="Sina Rahnama — CEO & Founder, Noon Marine"
                    width={176}
                    height={176}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Sina Rahnama</h3>
                <p className="text-primary-600 font-semibold text-sm mb-4">CEO & Founder — Noon Marine</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A young visionary leader with a passion for transforming the maritime industry. As CEO and Founder of Noon Marine, Sina Rahnama is building the region's most comprehensive maritime services hub — connecting vessel owners, seafarers, and maritime businesses across the UAE, GCC, and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer — Departments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Our Business Departments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Under one roof at Dubai Maritime City, we bring together every department a maritime business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <dept.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{dept.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DMC Presence */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Our Presence at Dubai Maritime City</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As part of our expansion strategy, Rahnama Holding has established a centralised facility within <strong>Dubai Maritime City (DMC)</strong> — the region's premier maritime hub. Our office at the New Building, Office No. 16 serves as the anchor point for all client-facing services.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Clients visiting our DMC office can access face-to-face support, submit documents, receive localised assistance, and engage directly with our maritime specialists across every department.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-0.5">Office Address</div>
                    <div className="text-gray-700 text-sm">Dubai Maritime City (DMC)</div>
                    <div className="text-gray-700 text-sm">New Building, Office No. 16</div>
                    <div className="text-gray-700 text-sm">Dubai, United Arab Emirates</div>
                    <div className="text-gray-500 text-xs mt-1">Mon–Fri 8:00 AM – 6:00 PM | Sat 9:00 AM – 2:00 PM (GST)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-gray-100 shadow-lg">
              <img
                src="/images/dmc-aerial.webp"
                alt="Dubai Maritime City aerial view"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent flex items-end p-6">
                <span className="text-white font-semibold text-sm">Dubai Maritime City</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Certifications &amp; Partners</h2>
            <p className="text-gray-600">Working with leading maritime authorities and global partners</p>
          </div>
          <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-10 mb-6">
            {[
              { src: '/logos/logo-prs.webp',  label: 'Polish Register of Shipping',       darkBg: false },
              { src: '/logos/logo-gac.webp',  label: 'Gulf Agency Company',               darkBg: false },
              { src: '/logos/logo-dmc.webp',  label: 'Dubai Maritime City Authority',     darkBg: true  },
              { src: '/logos/logo-stcw.webp', label: 'STCW Training Partners',            darkBg: false },
              { src: '/logos/logo-pi.webp',   label: 'International Group of P&I Clubs',  darkBg: false },
            ].map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2 group">
                <div className={`w-28 h-20 sm:w-32 sm:h-24 rounded-xl shadow-sm border flex items-center justify-center p-3 group-hover:shadow-md transition-all duration-300 ${
                  cert.darkBg ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
                }`}>
                  <img src={cert.src} alt={cert.label} className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs text-gray-500 text-center max-w-[120px] leading-tight">{cert.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 italic">Official accreditation in progress</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Our Journey</h2>
          </div>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-primary-200 mt-2"></div>}
                </div>
                <div className="pb-8">
                  <div className="text-xs text-primary-600 font-semibold mb-1">{item.year}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-blue-100 mb-8 text-lg">Contact our team in Dubai Maritime City for a free consultation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition shadow-lg">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const departments = [
  {
    icon: Ship,
    title: 'Maritime Operations',
    desc: 'Vessel sales, chartering, registration, and full lifecycle management for commercial and private vessels.',
  },
  {
    icon: GraduationCap,
    title: 'Training & Licensing',
    desc: 'STCW-compliant crew training, maritime certifications, and licensing support for seafarers and operators.',
  },
  {
    icon: FileText,
    title: 'Legal & Compliance',
    desc: 'Technical documentation, flag registration, legal consultancy, and compliance with international maritime regulations.',
  },
  {
    icon: Truck,
    title: 'Logistics & Shipping',
    desc: 'Ocean freight, container shipping, heavy equipment logistics, and door-to-door cargo services.',
  },
  {
    icon: Wrench,
    title: 'Repair & Engineering',
    desc: 'Marine engineering, dry-docking coordination, repair supervision, and spare parts supply.',
  },
  {
    icon: Users,
    title: 'Industrial Support',
    desc: 'Offshore project support, crew welfare services, and provisions for maritime workers and vessel crews.',
  },
];

const timeline = [
  {
    year: '2000s',
    title: 'Rahnama Holding Founded',
    desc: 'Rahnama Holding Company established with a focus on shipbuilding, vessel sales, and marine engineering — accumulating two decades of maritime expertise.',
  },
  {
    year: '2022',
    title: 'Noon Marine Platform Launched',
    desc: 'Digital platform for marine operations, vessel management, and licensing launched — immediately serving clients across UAE, GCC, Africa, and Asia.',
  },
  {
    year: '2024',
    title: 'DMC Expansion',
    desc: 'Formal application to Dubai Maritime City Authority to establish a comprehensive marine services hub with 15 dedicated departments under one roof.',
  },
  {
    year: '2025',
    title: 'Physical Office Established',
    desc: 'Noon Marine headquartered at Dubai Maritime City (DMC), New Building, Office No. 16 — enabling face-to-face client support and document services.',
  },
  {
    year: '2026',
    title: 'Public Platform Launch',
    desc: 'Official public launch of noonmarine.com with full marketplace, 15+ services, and trilingual support for the regional maritime community.',
  },
];
