
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/structured-data';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/lib/site-data';

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: 'PYPapers.in - Previous Year Papers, Notes & Student Tools',
  },
  description: siteConfig.description,
  keywords: [
    'previous year question papers',
    'sample papers',
    'CBSE previous year papers',
    'CUET sample papers',
    'JEE Main previous year papers',
    'NEET previous year papers',
    'university notes',
    'student tools',
    'assignment formatter',
    'pypapers',
  ],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'PYPapers.in - Previous Year Papers, Notes & Student Tools',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PYPapers.in - Previous Year Papers, Notes & Student Tools',
    description: siteConfig.description,
  },
  verification: {
    google: 'sFoaNbrjyICA19YNvq991-tVAC7KpI8J7oJgbVZF9Ug',
  },
};

const globalStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/previous-year-papers?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  },
];

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
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased">
        <StructuredData data={globalStructuredData} />
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
