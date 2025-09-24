'use client';

import React from 'react';
import {
  Home,
  QrCode,
  Cake,
  Calculator,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const navItems = [
  { id: '/', label: 'Home', icon: Home, href: '/' },
  { id: '/qr-code-generator', label: 'QR Code Generator', icon: QrCode, href: '/qr-code-generator' },
  { id: '/age-calculator', label: 'Age Calculator', icon: Cake, href: '/age-calculator' },
  { id: '/emi-calculator', label: 'EMI Calculator', icon: Calculator, href: '/emi-calculator' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.id}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
