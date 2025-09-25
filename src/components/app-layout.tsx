'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './logo';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-auto">
            <Logo />
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Tools
            </Link>
            <Link href="/books" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Premium Books
            </Link>
            <Link href="/articles" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Articles
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0 bg-secondary">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Pro Tools.
          </p>
        </div>
      </footer>
    </div>
  );
}
