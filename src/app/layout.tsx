import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s | Lovely Tools',
    default: 'Lovely Tools - Free Online Tools for Daily Tasks',
  },
  description: 'A premium, free collection of online tools designed to simplify your digital life. QR codes, calculators, converters, and more.',
  keywords: 'online tools, free tools, pypapers, lovely tools, productivity, calculator, converter, generator',
  openGraph: {
    title: 'Lovely Tools - Free Online Tools for Daily Tasks',
    description: 'Discover a wide range of free online tools designed to simplify your everyday tasks.',
    url: 'https://pypapers.in',
    siteName: 'Lovely Tools',
    images: [
      {
        url: 'https://pypapers.in/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovely Tools - Free Online Tools for Daily Tasks',
    description: 'The ultimate collection of free online tools to boost your productivity.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
