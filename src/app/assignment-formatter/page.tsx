
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, CheckCircle2, Layout } from 'lucide-react';
import jsPDF from 'jspdf';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import { useToast } from '@/hooks/use-toast';

export default function AssignmentFormatterPage() {
  const [content, setContent] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!content) {
      toast({ variant: 'destructive', title: 'Empty Content', description: 'Please paste your assignment text.' });
      return;
    }
    setLoading(true);

    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 25.4; // Standard 1 inch margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(university || 'Assignment Report', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, maxWidth);
    doc.text(splitText, margin, 40);

    doc.save('formatted-assignment.pdf');
    setLoading(false);
    toast({ title: 'Success', description: 'Assignment formatted and downloaded.' });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-indigo-100 rounded-2xl inline-flex text-indigo-600">
            <Layout className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Assignment Margin Formatter</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Auto-format assignments with standard Indian university margins (1-inch all sides).</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-xl">Content Entry</CardTitle>
              <CardDescription>Enter your university name and assignment body text.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="uni">University Name</Label>
                <Input id="uni" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. University of Delhi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Assignment Text</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Paste your text here..." className="min-h-[300px]" />
              </div>
              <Button onClick={handleFormat} className="w-full h-12 font-bold" disabled={loading}>
                {loading ? 'Processing...' : 'Format & Download PDF'}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 p-6 space-y-4">
            <h3 className="font-bold">Formatting Specs</h3>
            <ul className="space-y-3">
              {[
                "Page: A4 Standard",
                "Margins: 1 inch (25.4mm)",
                "Font: Helvetica/Arial",
                "Line Spacing: 1.5x",
                "Header: Center Aligned"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <InArticleAdBanner />

        <section className="prose prose-indigo max-w-none bg-white p-8 rounded-3xl border shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Standard Indian University Assignment Formatting</h2>
          <p className="text-muted-foreground">Most Indian universities (DU, IPU, Anna University, etc.) require assignments to be submitted with strict 1-inch margins on all sides. This tool automates the process by taking your raw text and generating a perfectly formatted PDF that meets academic standards.</p>
          <h3 className="text-xl font-semibold">Guidelines for a Perfect Submission</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>Ensure the font size is consistent (12pt for body).</li>
            <li>Maintain clear paragraph spacing.</li>
            <li>Center align your university name at the top.</li>
            <li>Include your Roll Number and Name in the footer (coming soon).</li>
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
