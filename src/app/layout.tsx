
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s | Lovely Tools - pypapers.in',
    default: 'Lovely Tools - Free Online Academic & Digital Tools',
  },
  description: 'A premium collection of student-centric tools. Format university assignments, clean handwritten notes, add PDF page numbers, and more at pypapers.in.',
  keywords: 'pypapers, lovely tools, university assignment formatter, pdf page numberer, handwritten notes cleaner, viva formatter, practical file index generator, free online tools',
  metadataBase: new URL('https://pypapers.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lovely Tools - Free Academic & Digital Utilities',
    description: 'Master your digital workflow with our 100% free, private tools for students and professionals.',
    url: 'https://pypapers.in',
    siteName: 'Lovely Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovely Tools - Free Academic & Digital Utilities',
    description: 'The ultimate tool suite for university students. Fast, free, and secure.',
  },
  verification: {
    google: 'sFoaNbrjyICA19YNvq991-tVAC7KpI8J7oJgbVZF9Ug',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8167663924453774"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
