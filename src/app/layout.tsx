import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import React from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Covid-19 Dashboard',
  description: 'A covid dashboard to keep you inform on your desired location.',
};

export const revalidate = 3600; // revalidate at most every hour

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={'container'}>
          <main className={'main'}>{children}</main>
        </div>
      </body>
    </html>
  );
}
