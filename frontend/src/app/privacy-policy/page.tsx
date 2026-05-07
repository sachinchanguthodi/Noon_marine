import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy – Noon Marine',
  description: 'Read Noon Marine\'s privacy policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10 text-sm">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>NOONMARINE GULF SOLUTIONS FZE ("Noon Marine", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website noonmarine.com or use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal identification information:</strong> Name, email address, phone number, company name.</li>
              <li><strong>Usage data:</strong> Pages visited, time spent, browser type, IP address.</li>
              <li><strong>Communications:</strong> Messages sent through our contact forms or email.</li>
              <li><strong>Account information:</strong> Username, password (encrypted), and profile details for registered users.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and improve our maritime services and platform.</li>
              <li>To respond to inquiries and customer service requests.</li>
              <li>To send service updates, newsletters, or promotional materials (with your consent).</li>
              <li>To analyse website usage and optimise user experience.</li>
              <li>To comply with legal obligations under UAE law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Service providers who assist us in operating our platform (e.g., hosting, email delivery).</li>
              <li>Maritime authorities or regulatory bodies when required by law.</li>
              <li>Business partners with your explicit consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies</h2>
            <p>We use cookies and similar tracking technologies to improve your browsing experience. You can control cookie settings through your browser. See our <Link href="/cookie-policy" className="text-primary-600 hover:underline">Cookie Policy</Link> for more details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
            <p>We implement industry-standard security measures including SSL encryption to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong>NOONMARINE GULF SOLUTIONS FZE</strong></p>
              <p>Dubai Maritime City (DMC), New Building, Office No. 16, Dubai, UAE</p>
              <p>Email: <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a></p>
              <p>Phone: <a href="tel:+971501001882" className="text-primary-600 hover:underline">+971 50 100 1882</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
