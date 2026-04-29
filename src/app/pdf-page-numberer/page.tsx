
'use client';

import { useState, ChangeEvent } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileType, Hash, Download, CheckCircle2 } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import { useToast } from '@/hooks/use-toast';

export default function PdfPageNumbererPage() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState('bottom-center');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === 'application/pdf') setFile(f);
  };

  const addNumbers = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = `Page ${i + 1}`;
        const fontSize = 10;
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        
        let x = width / 2 - textWidth / 2;
        let y = 20;

        if (position === 'bottom-right') x = width - textWidth - 30;
        if (position === 'bottom-left') x = 30;
        if (position === 'top-center') y = height - 30;

        page.drawText(text, { x, y, size: fontSize, font, color: rgb(0.4, 0.4, 0.4) });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `numbered-${file.name}`;
      link.click();
      toast({ title: 'Success', description: 'Page numbers added successfully.' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to process PDF.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-blue-100 rounded-2xl inline-flex text-blue-600">
            <Hash className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">PDF Page Number Adder</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Add sequential page numbers to your existing PDF files with custom positioning.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 shadow-sm p-6 space-y-6">
            <div className="space-y-2">
              <Label>Upload PDF</Label>
              <Input type="file" accept="application/pdf" onChange={handleFileChange} className="file:text-primary" />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addNumbers} className="w-full h-12 font-bold" disabled={loading || !file}>
              {loading ? 'Processing...' : 'Download Numbered PDF'}
            </Button>
          </Card>

          <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Why Number PDF Pages?</h2>
            <p className="text-sm text-muted-foreground">Pagination is crucial for long documents, legal filings, and academic submissions. It helps readers keep track and provides a professional look to your reports.</p>
            <ul className="space-y-2">
              {["Free and fast processing", "No file storage", "Works in-browser", "Customizable positions"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" /> {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <InArticleAdBanner />
      </div>
    </AppLayout>
  );
}
