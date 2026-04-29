'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import QRCode from 'qrcode.react';
import { Download, QrCode, Share2, Shield } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('https://pypapers.in');
  const [qrValue, setQrValue] = useState('https://pypapers.in');

  const handleGenerate = () => setQrValue(text);

  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-2xl inline-flex text-primary">
            <QrCode className="h-6 w-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black">QR Generator</h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">Create high-res QR codes for any content instantly.</p>
        </div>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border/50">
            <CardHeader className="p-5">
              <CardTitle className="text-lg">Configure</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-text" className="text-xs">Content URL or Text</Label>
                <Input
                  id="qr-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter URL..."
                  className="h-10 text-sm"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" /> ECC Level H Enabled
              </div>
              <Button onClick={handleGenerate} className="w-full h-10 font-bold">Update Preview</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 flex flex-col items-center justify-center p-6 bg-card">
            <div className="p-4 bg-white rounded-xl shadow-sm border mb-6">
              <QRCode
                id="qr-code-canvas"
                value={qrValue}
                size={160}
                level={'H'}
                includeMargin={true}
                renderAs="canvas"
              />
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={handleDownload} className="flex-1 h-10 font-bold text-xs">
                <Download className="mr-2 h-3 w-3" /> Download PNG
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>

        <InArticleAdBanner />
      </div>
    </AppLayout>
  );
}