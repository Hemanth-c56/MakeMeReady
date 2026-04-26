import { cookies } from 'next/headers';

import { SidebarProvider } from '~/shared/shadcn/sidebar';

import { Navbar } from '~/components/student-portal/navbar';
import { AppSidebar } from '~/components/student-portal/sidebar';

import type React from 'react';

export default async function StudentPortalLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="relative box-border min-h-screen w-full overflow-x-hidden">
        <div className="panel-bg pointer-events-none fixed bottom-0 left-0 z-0 h-[70%] w-full" />
        <Navbar />
        <main className="mb-20 box-border">
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
