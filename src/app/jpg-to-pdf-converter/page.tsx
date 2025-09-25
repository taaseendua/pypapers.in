
'use client';

import { useState, ChangeEvent } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImage, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function JpgToPdfConverterPage() {
  const [images, setImages] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      const newFileNames: string[] = [];
      let validFiles = true;

      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          newFileNames.push(file.name);
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              newImages.push(event.target.result as string);
              if (newImages.length === files.length) {
                setImages(prev => [...prev, ...newImages]);
                setFileNames(prev => [...prev, ...newFileNames]);
              }
            }
          };
          reader.readAsDataURL(file);
        } else {
          validFiles = false;
        }
      });
      
      if (!validFiles) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload only image files.',
        });
      }
    }
  };

  const handleConvertAndDownload = () => {
    if (images.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Images Selected',
        description: 'Please upload one or more JPG images to convert.',
      });
      return;
    }

    setLoading(true);
    
    // Default to A4 size, portrait orientation
    const pdf = new jsPDF('p', 'mm', 'a4');
    const a4Width = 210;
    const a4Height = 297;
    const margin = 10; 
    const maxWidth = a4Width - margin * 2;
    const maxHeight = a4Height - margin * 2;

    images.forEach((imgData, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      const img = new (window as any).Image();
      img.src = imgData;
      
      const imgWidth = img.width;
      const imgHeight = img.height;
      
      let ratio = 1;
      if (imgWidth > maxWidth) {
        ratio = maxWidth / imgWidth;
      }
      if (imgHeight * ratio > maxHeight) {
        ratio = maxHeight / imgHeight;
      }

      const pdfImgWidth = imgWidth * ratio;
      const pdfImgHeight = imgHeight * ratio;

      const x = (a4Width - pdfImgWidth) / 2;
      const y = (a4Height - pdfImgHeight) / 2;

      pdf.addImage(imgData, 'JPEG', x, y, pdfImgWidth, pdfImgHeight);
    });

    pdf.save('converted.pdf');
    setLoading(false);
    setImages([]);
    setFileNames([]);
     toast({
        title: 'Download Started',
        description: 'Your PDF has been generated and is downloading.',
      });
  };
  
  const handleClear = () => {
    setImages([]);
    setFileNames([]);
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <FileImage className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">JPG to PDF Converter</h2>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Upload Your Images</CardTitle>
            <CardDescription>Convert your JPG images into a single PDF document.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Select Images</Label>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/jpeg,image/png,image/webp" 
                onChange={handleFileChange} 
                multiple
                className="file:text-primary file:font-medium"
              />
            </div>
            
            {images.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold">Image Preview:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {images.map((imgSrc, index) => (
                            <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg border">
                                <Image
                                    src={imgSrc}
                                    alt={`Uploaded image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleConvertAndDownload} disabled={loading || images.length === 0}>
              {loading ? 'Converting...' : 'Convert & Download PDF'}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={images.length === 0}>
                Clear
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
