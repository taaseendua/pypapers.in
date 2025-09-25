'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import QRCode from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('https://firebase.google.com/studio');
  const [qrValue, setQrValue] = useState('https://firebase.google.com/studio');

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
           <QrCode className="h-8 w-8" />
           <h2 className="text-3xl font-bold tracking-tight">QR Code Generator</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter your data</CardTitle>
              <CardDescription>Enter any text or URL to generate a QR code.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-text">Text or URL</Label>
                <Input
                  id="qr-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g., https://example.com"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate}>Generate QR Code</Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6">
            <CardContent className="flex flex-col items-center justify-center gap-6">
              <div className="bg-white p-4 rounded-lg border">
                <QRCode
                  id="qr-code-canvas"
                  value={qrValue}
                  size={256}
                  level={'H'}
                  includeMargin={true}
                />
              </div>
              {qrValue && (
                 <Button variant="outline" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>

      </div>
    </AppLayout>
  );
}
