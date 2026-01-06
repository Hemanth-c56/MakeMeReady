'use client';

import { SidebarTrigger } from '~/shared/shadcn/sidebar';

export function Navbar() {
  return (
    <nav className="bg-sidebar border-sidebar-border sticky top-0 box-border flex items-center justify-between border-b p-2">
      <div className="flex items-center gap-3 lg:gap-5">
        <SidebarTrigger className="p-5" />
      </div>
      <span>Anytime.....Anywhere.....</span>
    </nav>
  );
}
