import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  FileSearch,
  GraduationCap,
  Hash,
  Layout,
  ListOrdered,
  MessageSquare,
  ShieldCheck,
  Wand2,
} from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { ResourceFinder } from '@/components/resource-finder';
import { StructuredData } from '@/components/structured-data';
import { AdBanner } from '@/components/ad-banner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { coreTools, educationResources, growthGuides, siteConfig } from '@/lib/site-data';

export const metadata: Metadata = {
  title: 'Previous Year Papers, Notes, Sample Papers & Free Student Tools',
  description:
    'Search student resources for CBSE, CUET, JEE, NEET, DU, IGNOU, and IPU. Use free academic tools for assignments, notes, PDFs, and exam preparation.',
  alternates: {
    canonical: '/',
  },
};

const toolIcons = [Layout, Hash, Wand2, MessageSquare, ListOrdered, FileSearch];

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PYPapers.in education resources',
    itemListElement: educationResources.map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: resource.title,
      url: `${siteConfig.url}/previous-year-papers#${resource.slug}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What can I find on PYPapers.in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PYPapers.in organizes previous year papers, sample papers, student notes, preparation guides, and free academic tools for Indian students.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the tools free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The academic tools on PYPapers.in are free and designed to run with minimal friction for students.',
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <AppLayout>
      <StructuredData data={homeStructuredData} />
      <div className="space-y-12">
        <section className="grid items-center gap-8 pt-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10">
              Papers, notes, tools, and exam prep
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-foreground md:text-6xl">
                Previous year papers and student tools that save real study time.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                Search exam resources by board, year, subject, and exam. Then use free tools
                to format assignments, clean notes, number PDFs, and prepare practical files.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-bold">
                <Link href="/previous-year-papers">
                  Find papers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link href="#student-tools">Use free tools</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border bg-card p-5 shadow-sm">
            {[
              ['Resource categories', '8', 'Previous papers, samples, notes, guides'],
              ['Priority exams', 'CBSE, CUET, JEE, NEET', 'Built around Indian student demand'],
              ['Core tools', `${coreTools.length}`, 'PDF, assignment, notes, and viva workflows'],
            ].map(([label, value, helper]) => (
              <div key={label} className="rounded-xl border bg-background p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
                <p className="mt-2 text-2xl font-black text-foreground">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />

        <section className="space-y-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <Badge variant="outline">Resource finder</Badge>
              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Search high-demand student resources
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              This library is structured for scalable SEO: every collection can become a useful,
              verified page with papers, answer keys, FAQs, and internal links.
            </p>
          </div>
          <ResourceFinder />
        </section>

        <section id="student-tools" className="space-y-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-black tracking-tight">Free academic tools</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coreTools.map((tool, index) => {
              const Icon = toolIcons[index] ?? BookOpenCheck;
              return (
                <Link href={tool.href} key={tool.href} className="group">
                  <Card className="h-full rounded-2xl border-border/70 shadow-sm transition-shadow hover:shadow-md">
                    <CardHeader className="space-y-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge variant="secondary">{tool.category}</Badge>
                        <CardTitle className="mt-3 text-xl group-hover:text-primary">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border bg-card p-5 shadow-sm md:grid-cols-3">
          {[
            {
              title: 'White-hat SEO only',
              description:
                'Build original pages around real student intent, verified files, and clear navigation.',
              icon: ShieldCheck,
            },
            {
              title: 'Faster indexing',
              description:
                'Keep sitemap coverage tight, link important hubs from the home page, and avoid thin pages.',
              icon: FileSearch,
            },
            {
              title: 'Revenue-ready UX',
              description:
                'Place ads around helpful content without blocking downloads, tools, or reading flow.',
              icon: BookOpenCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="space-y-3 rounded-xl bg-background p-4">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </section>

        <section className="space-y-4">
          <div>
            <Badge variant="outline">Growth system</Badge>
            <h2 className="mt-3 text-3xl font-black tracking-tight">What to publish next</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {growthGuides.map((guide) => (
              <Card key={guide.title} className="rounded-2xl border-border/70">
                <CardHeader>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-muted-foreground">{guide.description}</p>
                  <Button asChild variant="link" className="h-auto p-0 font-bold">
                    <Link href={guide.href}>
                      Open path <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
