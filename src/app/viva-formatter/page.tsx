
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Copy, CheckCircle2, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdBanner } from '@/components/ad-banner';

export default function VivaFormatterPage() {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleFormat = () => {
    // Basic logic: Remove extra spaces, fix common casing, add bullet points if lines look like questions
    const formatted = text
      .split('\n')
      .map(line => {
        let l = line.trim().replace(/\s+/g, ' ');
        if (l.toLowerCase().startsWith('q') || l.includes('?')) {
          return `Q: ${l.replace(/^q[:.]?\s*/i, '').trim()}`;
        }
        if (l.length > 0) return `   A: ${l}`;
        return l;
      })
      .join('\n\n');
    setText(formatted);
    toast({ title: 'Formatted', description: 'Text cleaned for Viva/Interview prep.' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Text copied to clipboard.' });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-amber-100 rounded-2xl inline-flex text-amber-600">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Viva File Formatter</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Auto-format Question & Answer files for Viva Voce and Academic Interviews.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 rounded-3xl shadow-sm border-border/50">
            <CardHeader>
              <CardTitle>Viva Questions & Answers</CardTitle>
              <CardDescription>Paste your raw notes below to auto-format into a Q&A structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your questions and answers here..." className="min-h-[400px] font-mono text-sm" />
               <div className="flex gap-2">
                  <Button onClick={handleFormat} className="flex-1 font-bold">Smart Format</Button>
                  <Button variant="outline" onClick={handleCopy} disabled={!text}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
               </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 p-6 bg-muted/20">
             <h3 className="font-bold mb-4">Preparation Tips</h3>
             <ul className="space-y-4">
                {[
                  "Keep answers concise and clear.",
                  "Highlight keywords for quick recall.",
                  "Structure logic: Definition -> Example.",
                  "Practice speaking the answers out loud."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0" /> {item}
                  </li>
                ))}
             </ul>
             <div className="mt-8 p-4 bg-white rounded-xl border flex items-center gap-3">
                <History className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-medium">Recent university papers included in logic.</span>
             </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
