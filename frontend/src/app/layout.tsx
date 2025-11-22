import type { Metadata } from 'next';
import { Outfit, Roboto } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
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
      <body className={`${roboto.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
