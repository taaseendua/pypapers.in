import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Cake, Calculator, KeyRound, Pilcrow, CaseUpper, Sparkles, Crop, Youtube, Music } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';

const tools = [
  {
    title: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and more.',
    href: '/qr-code-generator',
    icon: <QrCode className="h-10 w-10 text-blue-500" />,
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Age Calculator',
    description: 'Calculate age from your date of birth.',
    href: '/age-calculator',
    icon: <Cake className="h-10 w-10 text-pink-500" />,
    bgColor: 'bg-pink-100',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installment for loans.',
    href: '/emi-calculator',
    icon: <Calculator className="h-10 w-10 text-green-500" />,
    bgColor: 'bg-green-100',
  },
  {
    title: 'Password Generator',
    description: 'Generate strong and secure passwords.',
    href: '/password-generator',
    icon: <KeyRound className="h-10 w-10 text-yellow-500" />,
    bgColor: 'bg-yellow-100',
  },
  {
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs.',
    href: '/word-counter',
    icon: <Pilcrow className="h-10 w-10 text-purple-500" />,
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Case Converter',
    description: 'Convert text to different letter cases.',
    href: '/case-converter',
    icon: <CaseUpper className="h-10 w-10 text-red-500" />,
    bgColor: 'bg-red-100',
  },
  {
    title: 'AI Content Recommender',
    description: 'Get AI-powered content recommendations.',
    href: '/ai-content-recommender',
    icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Image Resizer',
    description: 'Resize images to your desired dimensions.',
    href: '/image-resizer',
    icon: <Crop className="h-10 w-10 text-orange-500" />,
    bgColor: 'bg-orange-100',
  },
  {
    title: 'YouTube Thumbnail Downloader',
    description: 'Download thumbnails from YouTube videos.',
    href: '/youtube-thumbnail-downloader',
    icon: <Youtube className="h-10 w-10 text-rose-500" />,
    bgColor: 'bg-rose-100',
  },
  {
    title: 'Piano',
    description: 'Play a virtual piano keyboard.',
    href: '/piano',
    icon: <Music className="h-10 w-10 text-teal-500" />,
    bgColor: 'bg-teal-100',
  }
];

export default function Home() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-12 p-8 pt-6">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Tools You Need, All in One Place
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A free, accessible, and easy-to-use collection of online tools to help with your daily tasks.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.title}>
              <Card className="flex flex-col items-center justify-center p-8 text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl h-full">
                <div className={`p-4 rounded-full mb-4 ${tool.bgColor}`}>
                  {tool.icon}
                </div>
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
        
        <section className="max-w-6xl mx-auto">
          <AdBanner />
        </section>

      </div>
    </AppLayout>
  );
}
