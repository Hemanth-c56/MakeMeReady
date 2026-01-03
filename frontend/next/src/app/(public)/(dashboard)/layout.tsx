import { Inter } from 'next/font/google';

import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>{children}</body>
    </html>
  );
}
