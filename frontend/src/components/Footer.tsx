import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300 pt-32 pb-12 overflow-hidden">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave wave-2"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.webp" alt="Noon Marine" width={130} height={52} className="object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for comprehensive maritime solutions across the UAE, GCC, Africa, and Asia.
            </p>
            <a
              href="https://wa.me/971501001882"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Us
            </a>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/marketplace" className="hover:text-primary-400 transition">Marketplace</Link></li>
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
              <li><Link href="/privacy-policy" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary-400 transition">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary-400 transition">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>Dubai Maritime City (DMC),<br />New Building, Office No. 16,<br />Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" />
                <a href="tel:+971501001882" className="hover:text-primary-400 transition">+971 50 100 1882</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@noonmarine.com" className="hover:text-primary-400 transition">info@noonmarine.com</a>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary-400 flex-shrink-0" />
                <div>
                  <div>Mon–Fri: 8:00 AM – 6:00 PM</div>
                  <div>Sat: 9:00 AM – 2:00 PM (GST)</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} NOONMARINE GULF SOLUTIONS FZE. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-primary-400 transition">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-primary-400 transition">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-primary-400 transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
