import * as React from 'react';

import type { Metadata, Viewport } from 'next';

import '../styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'MakeMeReady',
  icons: {
    icon: '/favicon.ico'
  },
  description: '--',
  keywords: ['Interviews'],
  authors: [{ name: 'MakeMeReady' }],
  creator: 'Hemanth',
  publisher: 'Hemanth',
  openGraph: {
    title: 'MakeMeReady',
    description: '--',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakeMeReady',
    description: '--'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
