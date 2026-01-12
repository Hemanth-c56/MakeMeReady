'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Bot,
  CircleUserRound,
  Home,
  Lightbulb,
  LogOut,
  Moon,
  Puzzle,
  ScanSearch,
  Sun,
  Target
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
  SidebarGroupLabel, // Added this import
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '~/shared/shadcn/sidebar';

import MainLogo from '../../../public/assets/main-logo.png';
import ShortLogo from '../../../public/assets/short-logo.png';

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
              <SidebarMenuButton
                asChild
                className="w-full justify-center px-0 py-7 hover:bg-transparent active:bg-transparent">
                <Link
                  href={`/student-portal/3jf358dks/dashboard`}
                  className="flex items-center justify-center">
                  <Image
                    src={MainLogo}
                    alt="MakeMeReady"
                    className="w-55 transition-all group-data-[collapsible=icon]:hidden"
                  />
                  <Image
                    src={ShortLogo}
                    alt="M"
                    className="hidden w-10 object-contain transition-all group-data-[collapsible=icon]:block"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <div className="bg-sidebar-border h-px w-[80%] self-center" />

        <SidebarContent className="mt-5 gap-0">
          {/* --- Main Navigation (Dashboard & Lobby) --- */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Dashboard">
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
                    tooltip="Interview Lobby">
                    <Link href={`/student-portal/3jf358dks/interview-lobby`}>
                      <Bot className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Interview Lobby</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-2">
            <SidebarGroupLabel className="text-muted-foreground text-md mb-2 px-5 font-semibold tracking-wider uppercase">
              Profile Insights
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Resume Audit">
                    <Link href={`/student-portal/3jf358dks/resume-audit`}>
                      <ScanSearch className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Resume Audit</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Job Match">
                    <Link href={`/student-portal/3jf358dks/job-match`}>
                      <Target className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Job Match</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-2">
            <SidebarGroupLabel className="text-muted-foreground text-md mb-2 px-5 font-semibold tracking-wider uppercase">
              Practice Arena
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Technical Quiz">
                    <Link href={`/student-portal/3jf358dks/rapid-fire`}>
                      <Lightbulb className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Rapid Fire</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary/10 hover:text-primary active:bg-primary/15 p-5 py-6 transition-colors"
                    tooltip="Fun Puzzles">
                    <Link href={`/student-portal/3jf358dks/fun-puzzels`}>
                      <Puzzle className="mr-2 size-6!" />
                      <span className="text-[17px] font-medium">Fun Puzzles</span>
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
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-14">
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
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-lg"
                  side={isMobile ? 'top' : 'right'}
                  align="end"
                  sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-1 py-2 text-left">
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
                    <DropdownMenuItem className="cursor-pointer gap-2 p-3 text-base">
                      <CircleUserRound className="h-5 w-5" />
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
