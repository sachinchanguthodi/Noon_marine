import Link from 'next/link';
import { Anchor } from 'lucide-react';

export default function Footer() {
  return (
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
              <li><Link href="/logistics" className="hover:text-primary-400 transition">Logistics & Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary-400 transition">Blog</Link></li>
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Noon Marine Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
