'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CaseUpper, Copy, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Converter',
  description: 'Easily convert text between different cases: UPPERCASE, lowercase, Sentence case, and Title Case. A simple and free tool for all your text transformation needs.',
  keywords: ['case converter', 'text case', 'uppercase', 'lowercase', 'title case', 'sentence case', 'convert text'],
};


export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  };
  
  const toTitleCase = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };
  
  const handleClear = () => {
    setText('');
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <CaseUpper className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Case Converter</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Text</CardTitle>
            <CardDescription>Paste your text below to convert its case.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] text-lg"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => setText(text.toUpperCase())}>UPPERCASE</Button>
              <Button onClick={() => setText(text.toLowerCase())}>lowercase</Button>
              <Button onClick={toSentenceCase}>Sentence case</Button>
              <Button onClick={toTitleCase}>Title Case</Button>
              <Button variant="outline" onClick={handleCopy} disabled={!text}><Copy className="mr-2" /> Copy</Button>
              <Button variant="destructive" onClick={handleClear} disabled={!text}><Trash2 className="mr-2" /> Clear</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>

      </div>
    </AppLayout>
  );
}
