import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { 
  QrCode, Cake, Calculator, KeyRound, Pilcrow, CaseUpper, 
  Sparkles, Crop, Youtube, BookUp, DownloadCloud, FileImage, 
  Tags, BrainCircuit, TrendingUp, ArrowRight 
} from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { cn } from '@/lib/utils';

const tools = [
  {
    title: 'QR Code Generator',
    description: 'Instant high-res QR codes for any content.',
    href: '/qr-code-generator',
    icon: <QrCode className="h-6 w-6" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Age Calculator',
    description: 'Precise age breakdown in years, months, and days.',
    href: '/age-calculator',
    icon: <Cake className="h-6 w-6" />,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    title: 'EMI Calculator',
    description: 'Financial planning for loans and repayments.',
    href: '/emi-calculator',
    icon: <Calculator className="h-6 w-6" />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Password Generator',
    description: 'Military-grade secure randomized passwords.',
    href: '/password-generator',
    icon: <KeyRound className="h-6 w-6" />,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Word Counter',
    description: 'Analyze text length and structural statistics.',
    href: '/word-counter',
    icon: <Pilcrow className="h-6 w-6" />,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Case Converter',
    description: 'Quickly toggle between text casing formats.',
    href: '/case-converter',
    icon: <CaseUpper className="h-6 w-6" />,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    title: 'AI Content Recommender',
    description: 'Intelligent book and audio recommendations.',
    href: '/ai-content-recommender',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Image Resizer',
    description: 'Bulk resize images without quality loss.',
    href: '/image-resizer',
    icon: <Crop className="h-6 w-6" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'YouTube Thumbnails',
    description: 'Download high-quality video thumbnails.',
    href: '/youtube-thumbnail-downloader',
    icon: <Youtube className="h-6 w-6" />,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    title: 'PDF to Flipbook',
    description: 'Transform boring PDFs into interactive books.',
    href: '/pdf-to-flipbook',
    icon: <BookUp className="h-6 w-6" />,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    title: 'Drive Link Gen',
    description: 'Direct download links for Google Drive.',
    href: '/google-drive-downloader',
    icon: <DownloadCloud className="h-6 w-6" />,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    title: 'JPG to PDF',
    description: 'Convert multiple images to a single PDF.',
    href: '/jpg-to-pdf-converter',
    icon: <FileImage className="h-6 w-6" />,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    title: 'Meta Tag Gen',
    description: 'SEO-ready tags for your web projects.',
    href: '/meta-tag-generator',
    icon: <Tags className="h-6 w-6" />,
    color: 'text-lime-600',
    bg: 'bg-lime-50',
  },
  {
    title: 'Knowledge Quiz',
    description: 'Challenge yourself with interactive trivia.',
    href: '/quiz',
    icon: <BrainCircuit className="h-6 w-6" />,
    color: 'text-fuchsia-600',
    bg: 'bg-fuchsia-50',
  },
  {
    title: 'Latest Trends',
    description: 'Real-time global news and insights.',
    href: '/trending',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
  },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-16 pb-12">
        <section className="text-center space-y-6 pt-12 pb-8 hero-gradient rounded-3xl p-8 shadow-inner-lg">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full border border-primary/20 shadow-sm">
            The Ultimate Productivity Suite
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground lg:leading-[1.1]">
            Lovely Tools <br className="hidden md:block" />
            <span className="text-primary drop-shadow-sm">For Every Task</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Boost your productivity with our suite of free, secure, and lightning-fast online utilities. No signup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Link href="#tools" className="inline-flex items-center justify-center h-14 px-10 text-lg font-bold text-white transition-all bg-primary rounded-xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:translate-y-0 shadow-lg">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/books" className="inline-flex items-center justify-center h-14 px-10 text-lg font-bold text-primary transition-all bg-white/80 backdrop-blur-md border border-primary/20 rounded-xl hover:bg-primary/5 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 shadow-md">
              Premium Content
            </Link>
          </div>
        </section>

        <section id="tools" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto px-2">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.title} className="group">
              <Card className="h-full border border-white/40 shadow-sm bg-white/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-3 group-hover:bg-white/90 group-hover:border-primary/20 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className={cn("p-5 rounded-2xl inline-flex mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm", tool.bg, tool.color)}>
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">{tool.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
        
        <section className="max-w-7xl mx-auto pt-8">
          <AdBanner />
        </section>

        <section className="max-w-5xl mx-auto text-center py-20 glass-card rounded-[3rem] border border-primary/10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="relative z-10">
             <h2 className="text-4xl font-black mb-6 tracking-tight">Need something custom?</h2>
             <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">We are constantly adding new tools to help you stay ahead. Check back often for more productivity boosters!</p>
             <Link href="/articles" className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:underline underline-offset-8 transition-all">
                Read our latest articles <ArrowRight className="h-5 w-5" />
             </Link>
           </div>
        </section>
      </div>
    </AppLayout>
  );
}
