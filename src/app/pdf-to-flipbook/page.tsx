'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUp, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF to Flipbook Converter',
  description: 'Convert any PDF into a beautiful, interactive flipbook for free. Upload your PDF and create a shareable, page-turning digital book in seconds.',
  keywords: ['pdf to flipbook', 'flipbook converter', 'pdf converter', 'digital flipbook', 'interactive pdf'],
};

export default function PdfToFlipbookPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      setPdfFile(null);
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a valid PDF file.',
      });
    }
  };

  const handleConvert = () => {
    if (!pdfFile) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a PDF file to convert.',
      });
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(pdfFile);
    reader.onload = () => {
      const pdfDataUrl = reader.result as string;
      // We store the data URL in session storage because it can be too long for a URL query parameter.
      sessionStorage.setItem('flipbookPdfUrl', pdfDataUrl);
      router.push('/books/viewer?pdfUrl=session');
      setLoading(false);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
      });
      setLoading(false);
    };
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <BookUp className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">PDF to Flipbook Converter</h2>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Your PDF</CardTitle>
            <CardDescription>Convert your PDF document into an interactive, flippable book.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Select PDF File</Label>
              <div className="flex items-center gap-2">
                <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="file:text-primary file:font-medium" />
              </div>
              {pdfFile && <p className="text-sm text-muted-foreground">Selected: {pdfFile.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConvert} disabled={loading || !pdfFile}>
              {loading ? 'Converting...' : 'Convert to Flipbook'}
            </Button>
          </CardFooter>
        </Card>
        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>
      </div>
    </AppLayout>
  );
}
