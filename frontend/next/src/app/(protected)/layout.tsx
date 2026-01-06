import AuthGuard from '~/shared/components/authguard';

import type React from 'react';

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
