'use client';

import Link from 'next/link';

import {
  Bot,
  ChevronsUpDown,
  CircleUserRound,
  FileUser,
  Home,
  Lightbulb,
  LogOut,
  Moon,
  Puzzle,
  Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '~/shared/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/shared/shadcn/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '~/shared/shadcn/sidebar';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
              <SidebarMenuButton asChild className="w-fit p-5 py-5">
                <Link
                  href={`/student-portal/3jf358dks/dashboard`}
                  className="flex items-center justify-baseline text-2xl">
                  <span>Logo</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <div className="bg-sidebar-border h-px w-[80%] self-center" />

        <SidebarContent className="mt-7 gap-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-4">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="home">
                    <Link href={`/student-portal/3jf358dks/dashboard`}>
                      <Home className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Interview">
                    <Link href={`/student-portal/3jf358dks/ai-interview`}>
                      <Bot className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Ai Interview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Technical">
                    <Link href={`/student-portal/3jf358dks/technical-quiz`}>
                      <Lightbulb className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Technial Quiz</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Resume">
                    <Link href={`/student-portal/3jf358dks/resume-check`}>
                      <FileUser className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Resume Check</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Puzzle">
                    <Link href={`/student-portal/3jf358dks/fun-puzzels`}>
                      <Puzzle className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Fun puzzles</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="mb-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    // CHANGED: Added 'h-14' for taller button
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-14">
                    {/* CHANGED: Avatar h-8 -> h-10 */}
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left leading-tight">
                      {/* CHANGED: Font sizes increased */}
                      <span className="truncate text-base font-semibold">Hemanth</span>
                      <span className="text-muted-foreground truncate text-sm">
                        hemanth@example.com
                      </span>
                    </div>
                    {/* CHANGED: Icon size-4 -> size-5 */}
                    <ChevronsUpDown className="ml-auto size-5" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  // CHANGED: min-w-56 -> min-w-64 (Wider menu)
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-1 py-2 text-left">
                      {/* CHANGED: Header Avatar h-8 -> h-10 */}
                      <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate text-base font-semibold">Hemanth</span>
                        <span className="text-muted-foreground truncate text-sm">
                          hemanth@example.com
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    {/* CHANGED: Added padding 'p-3' and text-base */}
                    <DropdownMenuItem className="cursor-pointer gap-2 p-3 text-base">
                      <CircleUserRound className="h-5 w-5" /> {/* Icon 4 -> 5 */}
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                      className="cursor-pointer gap-2 p-3 text-base">
                      <div className="relative flex items-center justify-center">
                        <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      </div>
                      <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer gap-2 p-3 text-base">
                    <LogOut className="h-5 w-5" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
