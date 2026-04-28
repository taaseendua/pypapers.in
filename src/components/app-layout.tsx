'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Tools' },
    { href: '/trending', label: 'Trending' },
    { href: '/books', label: 'Books' },
    { href: '/articles', label: 'Articles' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-all hover:text-primary relative py-1",
                  pathname === link.href 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full" 
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Simple Mobile indicator or Menu icon would go here */}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>

      <footer className="border-t bg-card/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <Logo />
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Lovely Tools is a premium collection of digital utilities built for speed, privacy, and simplicity. We help you get things done, beautifully.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Products</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/qr-code-generator" className="hover:text-primary transition-colors">QR Generator</Link></li>
                <li><Link href="/age-calculator" className="hover:text-primary transition-colors">Age Calculator</Link></li>
                <li><Link href="/emi-calculator" className="hover:text-primary transition-colors">EMI Calculator</Link></li>
                <li><Link href="/pdf-to-flipbook" className="hover:text-primary transition-colors">PDF Flipbook</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-foreground">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/articles" className="hover:text-primary transition-colors">Articles</Link></li>
                <li><Link href="/trending" className="hover:text-primary transition-colors">Trends</Link></li>
                <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Lovely Tools (pypapers.in). All rights reserved.</p>
            <div className="flex gap-6">
              <span>Made with ❤️ for everyone</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
