'use client';

import Link from 'next/link';

import {
  BadgeCheck,
  Bell,
  Bot,
  ChevronsUpDown,
  CreditCard,
  FileUser,
  Home,
  Lightbulb,
  LogOut,
  Puzzle,
  Sparkles
} from 'lucide-react';

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

        <SidebarContent className="mt-3 gap-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
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
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Hemanth</span>
                      <span className="truncate text-xs">hemanth@example.com</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Hemanth</span>
                        <span className="truncate text-xs">hemanth@example.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
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
