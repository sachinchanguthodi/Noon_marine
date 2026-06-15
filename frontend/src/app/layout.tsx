import type { Metadata } from 'next';
import { Outfit, Noto_Sans_Display } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const notoSansDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noon Marine – Integrated Maritime Services, Delivered from Dubai',
  description: 'Ship Sales, Ship Registration, Marine Insurance, and Logistics — all in one platform. Based in Dubai Maritime City with 72-hour response time. Serving UAE, GCC, and global maritime clients.',
  keywords: 'ship registration Dubai, STCW training UAE, maritime insurance Gulf, vessel sales Dubai, marine services UAE, flag registration, crew management, Dubai Maritime City',
  openGraph: {
    title: 'Noon Marine – Integrated Maritime Services, Delivered from Dubai',
    description: 'Ship Sales, Ship Registration, Marine Insurance, and Logistics — all in one platform.',
    url: 'https://noonmarine.com',
    siteName: 'Noon Marine',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSansDisplay.variable} ${outfit.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.KriseenaConfig = { workspaceId: "440ed645-c87a-4c95-8cc8-c1a3e7afe126" };`,
          }}
        />
        <script src="https://www.kriseena.com/widget-loader.js" defer />
      </head>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
