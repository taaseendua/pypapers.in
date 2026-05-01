
import { MetadataRoute } from 'next';

const tools = [
  '/previous-year-papers',
  '/qr-code-generator',
  '/age-calculator',
  '/emi-calculator',
  '/password-generator',
  '/word-counter',
  '/case-converter',
  '/ai-content-recommender',
  '/image-resizer',
  '/youtube-thumbnail-downloader',
  '/pdf-to-flipbook',
  '/google-drive-downloader',
  '/jpg-to-pdf-converter',
  '/meta-tag-generator',
  '/quiz',
  '/trending',
  '/books',
  '/articles',
  '/assignment-formatter',
  '/pdf-page-numberer',
  '/notes-cleaner',
  '/viva-formatter',
  '/practical-index-generator',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://pypapers.in';

  const toolPages = tools.map((tool) => ({
    url: `${siteUrl}${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolPages,
  ];
}
