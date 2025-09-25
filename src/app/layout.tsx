
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    template: '%s | Pro Tools',
    default: 'Pro Tools - Free Online Tools for Daily Tasks',
  },
  description: 'A free, accessible, and easy-to-use collection of online tools to help with your daily tasks, from QR code generation to word counting and more.',
  keywords: 'online tools, free tools, productivity, calculator, converter, generator, web tools',
  openGraph: {
    title: 'Pro Tools - Free Online Tools for Daily Tasks',
    description: 'Discover a wide range of free online tools designed to simplify your everyday tasks.',
    url: 'https://pypapers.in', // Replace with your actual domain
    siteName: 'Pro Tools',
    images: [
      {
        url: 'https://pypapers.in/og-image.png', // Replace with an actual URL to an OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Tools - Free Online Tools for Daily Tasks',
    description: 'The ultimate collection of free online tools to boost your productivity.',
    // site: '@yourtwitterhandle', // Replace with your Twitter handle
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
    // images: ['https://pypapers.in/twitter-image.png'], // Replace with an actual URL to a Twitter image
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
