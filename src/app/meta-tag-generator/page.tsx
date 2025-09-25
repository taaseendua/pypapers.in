'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Tags } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Meta Tag Generator',
    description: 'Generate SEO-friendly meta tags for your website for free. Create custom title, description, and keyword tags to improve your search engine ranking.',
    keywords: ['meta tag generator', 'seo meta tags', 'create meta tags', 'title tag', 'meta description'],
  };
};

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedTags, setGeneratedTags] = useState('');
  const { toast } = useToast();

  const handleGenerate = () => {
    const tags = `
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="index, follow" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="English" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    `.trim();
    setGeneratedTags(tags);
  };

  const handleCopy = () => {
    if (generatedTags) {
      navigator.clipboard.writeText(generatedTags);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Tags className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Meta Tag Generator</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter Page Details</CardTitle>
              <CardDescription>Fill in the details to generate your SEO meta tags.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your Page Title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description of your page." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="comma, separated, keywords" />
              </div>
              <Button onClick={handleGenerate}>Generate Tags</Button>
            </CardContent>
          </Card>

          {generatedTags && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Meta Tags</CardTitle>
                <CardDescription>Copy and paste these tags into the `<head>` section of your HTML.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-secondary p-4 rounded-md text-sm overflow-x-auto">
                    <code>{generatedTags}</code>
                  </pre>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>
      </div>
    </AppLayout>
  );
}
