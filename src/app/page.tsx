import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  QrCode, Cake, Landmark, KeyRound, Pilcrow, CaseUpper, 
  Sparkles, Crop, Youtube, BookUp, DownloadCloud, FileImage, 
  Tags, BrainCircuit, TrendingUp, ArrowRight, Zap
} from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { cn } from '@/lib/utils';

const tools = [
  {
    title: 'QR Generator',
    description: 'Instant high-res QR codes.',
    href: '/qr-code-generator',
    icon: <QrCode className="h-5 w-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    title: 'Age Calc',
    description: 'Precise breakdown of age.',
    href: '/age-calculator',
    icon: <Cake className="h-5 w-5" />,
    color: 'text-pink-600',
    bg: 'bg-pink-100',
  },
  {
    title: 'EMI Calc',
    description: 'Plan your loan repayments.',
    href: '/emi-calculator',
    icon: <Landmark className="h-5 w-5" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
  },
  {
    title: 'Passwords',
    description: 'Secure randomized passwords.',
    href: '/password-generator',
    icon: <KeyRound className="h-5 w-5" />,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    title: 'Word Counter',
    description: 'Analyze text statistics.',
    href: '/word-counter',
    icon: <Pilcrow className="h-5 w-5" />,
    color: 'text-violet-600',
    bg: 'bg-violet-100',
  },
  {
    title: 'Case Switch',
    description: 'Change text casing fast.',
    href: '/case-converter',
    icon: <CaseUpper className="h-5 w-5" />,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
  {
    title: 'AI Recommend',
    description: 'Smart content suggestions.',
    href: '/ai-content-recommender',
    icon: <Sparkles className="h-5 w-5" />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
  },
  {
    title: 'Image Resize',
    description: 'Fast image dimension edits.',
    href: '/image-resizer',
    icon: <Crop className="h-5 w-5" />,
    color: 'text-orange-600',
    bg: 'bg-orange-100',
  },
  {
    title: 'YT Thumbnails',
    description: 'Download video covers.',
    href: '/youtube-thumbnail-downloader',
    icon: <Youtube className="h-5 w-5" />,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
  },
  {
    title: 'PDF Flipbook',
    description: 'Interactive PDF viewer.',
    href: '/pdf-to-flipbook',
    icon: <BookUp className="h-5 w-5" />,
    color: 'text-teal-600',
    bg: 'bg-teal-100',
  },
  {
    title: 'Drive Links',
    description: 'Direct G-Drive downloads.',
    href: '/google-drive-downloader',
    icon: <DownloadCloud className="h-5 w-5" />,
    color: 'text-sky-600',
    bg: 'bg-sky-100',
  },
  {
    title: 'JPG to PDF',
    description: 'Convert images to PDF.',
    href: '/jpg-to-pdf-converter',
    icon: <FileImage className="h-5 w-5" />,
    color: 'text-cyan-600',
    bg: 'bg-cyan-100',
  },
  {
    title: 'Meta Tags',
    description: 'SEO tags generator.',
    href: '/meta-tag-generator',
    icon: <Tags className="h-5 w-5" />,
    color: 'text-lime-600',
    bg: 'bg-lime-100',
  },
  {
    title: 'Quiz Time',
    description: 'Test your knowledge.',
    href: '/quiz',
    icon: <BrainCircuit className="h-5 w-5" />,
    color: 'text-fuchsia-600',
    bg: 'bg-fuchsia-100',
  },
  {
    title: 'Trends',
    description: 'Global news insights.',
    href: '/trending',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
  },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-12">
        <section className="text-center space-y-4 pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full">
            <Zap className="h-3 w-3 fill-primary" /> Smart Digital Utilities
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Modern Tools. <br className="md:hidden" />
            <span className="text-primary">Master Your Day.</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto font-medium">
            Lightning-fast, private, and professional utilities designed for your daily workflow.
          </p>
        </section>

        <section className="max-w-7xl mx-auto">
          <AdBanner />
        </section>

        <section id="tools" className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.title} className="group">
                <Card className="h-full border border-border/50 shadow-sm tool-card-hover rounded-2xl overflow-hidden bg-card/50">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={cn("p-3 rounded-xl inline-flex mb-3 group-hover:scale-110 transition-transform", tool.bg, tool.color)}>
                      {tool.icon}
                    </div>
                    <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-[11px] text-muted-foreground font-medium leading-tight">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        <section className="max-w-7xl mx-auto py-8">
          <AdBanner />
        </section>
      </div>
    </AppLayout>
  );
}