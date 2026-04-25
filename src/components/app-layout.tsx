'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'All Tools' },
    { href: '/trending', label: 'Trending' },
    { href: '/books', label: 'Premium Books' },
    { href: '/articles', label: 'Articles' },
  ];

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile Menu would go here - keeping it simple for now */}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
                Premium collection of professional tools designed to simplify your daily digital tasks.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/qr-code-generator" className="hover:text-primary">QR Generator</Link></li>
                <li><Link href="/age-calculator" className="hover:text-primary">Age Calculator</Link></li>
                <li><Link href="/emi-calculator" className="hover:text-primary">EMI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/coming-soon" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/coming-soon" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Pro Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}