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
    { href: '/trending', label: 'Trends' },
    { href: '/books', label: 'Books' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="flex gap-4 md:gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs md:text-sm font-bold transition-all hover:text-primary relative py-1",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      <footer className="border-t bg-card/30 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <Logo />
              <p className="text-[10px] md:text-xs text-muted-foreground">
                Professional tools for digital simplicity. 100% free and private.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-muted-foreground">
              <Link href="/trending" className="hover:text-primary">News</Link>
              <Link href="/books" className="hover:text-primary">Books</Link>
              <Link href="/articles" className="hover:text-primary">Articles</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-[10px] text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Lovely Tools. Built for speed and simplicity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}