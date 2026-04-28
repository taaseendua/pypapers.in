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
import { SidebarAd } from '@/components/sidebar-ad';

export default function QrCodeGeneratorPage() {
  const [text, setText] = useState('https://pypapers.in');
  const [qrValue, setQrValue] = useState('https://pypapers.in');

  const handleGenerate = () => {
    setQrValue(text);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'lovely-tools-qr.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto px-4">
        <div className="flex-1 space-y-12 pb-12">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl inline-flex text-primary mb-4 shadow-sm">
              <QrCode className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">QR Code Generator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate high-resolution, secure QR codes for websites, text, or contacts instantly.
            </p>
          </div>

          <AdBanner />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-xl glass-card">
              <CardHeader>
                <CardTitle>Configure QR Code</CardTitle>
                <CardDescription>Enter the URL or text you want to encode.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-text">Content</Label>
                  <Input
                    id="qr-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g., https://pypapers.in"
                    className="h-12"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                   <Shield className="h-3 w-3" /> Encoded using High Error Correction (ECC Level H)
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerate} className="w-full h-12 text-lg font-bold">Generate Code</Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-xl flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-950 border">
              <CardContent className="flex flex-col items-center justify-center gap-8">
                <div className="p-6 bg-white rounded-3xl shadow-inner-lg border border-zinc-100">
                  <QRCode
                    id="qr-code-canvas"
                    value={qrValue}
                    size={200}
                    level={'H'}
                    includeMargin={true}
                    renderAs="canvas"
                  />
                </div>
                <div className="flex gap-3 w-full">
                  <Button variant="outline" onClick={handleDownload} className="flex-1 h-12 font-bold">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="secondary" className="px-4 h-12">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <InArticleAdBanner />

          <div className="bg-primary/5 border border-primary/10 p-8 rounded-[2rem] space-y-4">
             <h3 className="text-xl font-bold">Premium QR Standards</h3>
             <p className="text-muted-foreground leading-relaxed">
               Our generator produces static QR codes that never expire. Unlike other services, we do not track your users or add redirects. The data is encoded directly into the pattern, ensuring maximum privacy and longevity for your print or digital materials.
             </p>
          </div>

          <AdBanner />
        </div>

        <SidebarAd />
      </div>
    </AppLayout>
  );
}
