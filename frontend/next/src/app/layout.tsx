import * as React from 'react';

import type { Metadata, Viewport } from 'next';

import '../styles/globals.css';

import { ThemeProvider } from '~/providers/theme-provider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'Make Me Ready',
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
      <body className="font-sans" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
