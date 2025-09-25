
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Crop, Upload, Download } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Resizer',
  description: 'Easily resize your images online for free. Upload an image, set your desired width and height, and download the perfectly resized image in seconds.',
  keywords: ['image resizer', 'resize image', 'photo resizer', 'image dimensions', 'free image resizer'],
};

export default function ImageResizerPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          if (originalImageRef.current) {
            originalImageRef.current.src = img.src;
          }
        };
        img.src = event.target?.result as string;
        setOriginalImage(event.target?.result as string);
        setResizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!originalImage || width <= 0 || height <= 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = originalImage;
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL('image/png'));
    };
  };

  const handleDownload = () => {
    if (!resizedImage) return;
    const link = document.createElement('a');
    link.href = resizedImage;
    const nameParts = imageName.split('.');
    const extension = nameParts.pop();
    link.download = `${nameParts.join('.')}-resized.${extension || 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Crop className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Image Resizer</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload & Resize</CardTitle>
              <CardDescription>Upload your image and set the new dimensions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Image</Label>
                <div className="flex items-center gap-2">
                    <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="file:text-primary file:font-medium" />
                </div>
              </div>

              {originalImage && (
                <>
                  <div className="space-y-4 rounded-lg border p-4">
                     <h3 className="font-medium">Original Image Preview</h3>
                     <img ref={originalImageRef} src={originalImage} alt="Original Preview" className="max-h-60 w-auto rounded-md" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (px)</Label>
                      <Input id="width" type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value, 10))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (px)</Label>
                      <Input id="height" type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {originalImage && (
              <CardFooter>
                <Button onClick={handleResize}>Resize Image</Button>
              </CardFooter>
            )}
          </Card>

          {resizedImage && (
            <Card className="flex flex-col items-center justify-center p-6">
              <CardHeader>
                <CardTitle className="text-center">Resized Image</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-6">
                <div className="bg-white p-4 rounded-lg border">
                  <img src={resizedImage} alt="Resized" className="max-h-80 w-auto rounded-md" />
                </div>
                 <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resized Image
                </Button>
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
