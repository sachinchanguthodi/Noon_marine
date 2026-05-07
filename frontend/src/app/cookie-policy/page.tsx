import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy – Noon Marine',
  description: 'Learn how Noon Marine uses cookies and how you can manage your cookie preferences.',
};

export default function CookiePolicyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
        <p className="text-gray-500 mb-10 text-sm">Last updated: May 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They help us remember your preferences and improve your experience on noonmarine.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Essential Cookies</h3>
                <p className="text-sm">Required for the website to function. These cannot be disabled. They include session management and security cookies.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h3>
                <p className="text-sm">Help us understand how visitors interact with our website. We use Google Analytics 4 and Microsoft Clarity for this purpose. Data is anonymised.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Functional Cookies</h3>
                <p className="text-sm">Remember your preferences such as language settings and login state to provide a better experience.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h3>
                <p className="text-sm">Used to track visitors across websites to display relevant advertisements. We only use these with your explicit consent.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Managing Your Cookies</h2>
            <p className="mb-3">You can control and manage cookies in the following ways:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies through their settings menu.</li>
              <li><strong>Opt-out tools:</strong> For Google Analytics, visit <span className="text-primary-600">tools.google.com/dlpage/gaoptout</span>.</li>
              <li><strong>Contact us:</strong> Email <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a> to request data deletion.</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Note: Disabling essential cookies may affect the functionality of our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Cookies</h2>
            <p>We may use third-party services that place their own cookies on your device, including:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Google Analytics 4</li>
              <li>Google Tag Manager</li>
              <li>Microsoft Clarity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <div className="space-y-1">
              <p><strong>NOONMARINE GULF SOLUTIONS FZE</strong></p>
              <p>Dubai Maritime City (DMC), New Building, Office No. 16, Dubai, UAE</p>
              <p>Email: <a href="mailto:info@noonmarine.com" className="text-primary-600 hover:underline">info@noonmarine.com</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
