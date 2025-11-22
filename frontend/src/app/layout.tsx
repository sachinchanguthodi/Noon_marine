import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const geistSans = localFont({
  src: [
    {
      path: '../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noon Marine - Comprehensive Maritime Solutions',
  description: 'Your one-stop solution for vessel sales, marine insurance, flag registration, crew management, and all maritime services.',
  keywords: 'marine services, vessel sales, maritime, ship management, UAE, Dubai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
