import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LoadingSpinner, Navigation } from '@/components';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Recipe Finder',
  description: 'Recipe Finder - Поиск рецептов',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          </main>
        </div>
      </body>
    </html>
  );
}
