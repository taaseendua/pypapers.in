'use client';

import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Pilcrow } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word Counter',
  description: 'A free online tool to count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and professionals.',
  keywords: ['word counter', 'character count', 'sentence count', 'paragraph count', 'text analyzer'],
};

export default function WordCounterPage() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = trimmedText.split(/\n\s*\n/).filter(Boolean).length;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Pilcrow className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Word Counter</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter your text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="min-h-[400px] text-lg"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{stats.words}</p>
                  <p className="text-sm text-muted-foreground">Words</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{stats.characters}</p>
                  <p className="text-sm text-muted-foreground">Characters</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{stats.sentences}</p>
                  <p className="text-sm text-muted-foreground">Sentences</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-lg">
                  <p className="text-3xl font-bold">{stats.paragraphs}</p>
                  <p className="text-sm text-muted-foreground">Paragraphs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>
      </div>
    </AppLayout>
  );
}
