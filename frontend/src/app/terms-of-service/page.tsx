import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service – Noon Marine',
  description: 'Read Noon Marine\'s terms of service governing the use of our maritime services platform.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src="/logo.webp" alt="Noon Marine" width={110} height={42} className="object-contain" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white text-sm transition">Home</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10 text-sm">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using the Noon Marine website (noonmarine.com) and its services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Services Provided</h2>
            <p>Noon Marine provides a digital platform for maritime services including but not limited to vessel sales, flag registration, marine insurance, crew management, logistics, and related services. We act as an intermediary and service facilitator.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorised use of your account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Marketplace Listings</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All listings must be accurate, legal, and comply with UAE maritime regulations.</li>
              <li>Noon Marine is not a party to transactions between buyers and sellers.</li>
              <li>We reserve the right to remove any listing that violates our policies.</li>
              <li>Prices and availability are subject to change without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>All content on noonmarine.com, including text, images, logos, and software, is the property of NOONMARINE GULF SOLUTIONS FZE or its licensors and is protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>Noon Marine shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform or services. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of the United Arab Emirates. Any disputes shall be resolved through the courts of Dubai, UAE.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our platform after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <div className="space-y-1">
              <p><strong>NOONMARINE GULF SOLUTIONS FZE</strong></p>
              <p>Dubai Maritime City (DMC), New Building, Office No. 16, Dubai, UAE</p>
              <p>Email: <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a></p>
              <p>Phone: <a href="tel:+971506873131" className="text-primary-600 hover:underline">+971 50 687 3131</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
