'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRCode from 'qrcode.react';
import { Download, QrCode, Share2, Shield, Zap, CheckCircle2 } from 'lucide-react';
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
      downloadLink.download = 'pypapers-qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-blue-100 rounded-2xl inline-flex text-blue-600">
            <QrCode className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Free QR Code Generator</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Create high-resolution, professional QR codes for URLs, text, and business cards instantly.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-xl">Configure Your Code</CardTitle>
              <CardDescription>Enter your URL or text below to generate a real-time preview.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="qr-text" className="text-sm font-bold">Content URL or Text</Label>
                <Input
                  id="qr-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com"
                  className="h-12 text-base rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Shield className="h-4 w-4 text-green-500" /> High Error Correction (ECC Level H) enabled for better scanning.
              </div>
              <Button onClick={handleGenerate} className="w-full h-12 font-bold rounded-xl text-base transition-all hover:scale-[1.02]">
                <Zap className="mr-2 h-5 w-5 fill-current" /> Generate QR Code
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 flex flex-col items-center justify-center p-8 bg-white shadow-sm">
            <div className="p-6 bg-white rounded-2xl shadow-inner border-2 border-dashed border-muted mb-8">
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
              <Button variant="outline" onClick={handleDownload} className="flex-1 h-12 font-bold rounded-xl border-2">
                <Download className="mr-2 h-5 w-5" /> Download PNG
              </Button>
              <Button variant="secondary" size="icon" className="h-12 w-12 rounded-xl">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        <InArticleAdBanner />

        {/* SEO CONTENT SECTION */}
        <section className="prose prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-sm space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">What is a QR Code Generator?</h2>
            <p className="text-muted-foreground leading-relaxed">
              A QR Code (Quick Response Code) generator is a digital tool that allows users to convert information like URLs, contact details, or plain text into a scannable grid pattern. These codes are widely used in modern marketing, business cards, and digital payments due to their speed and ease of use. At <strong>Lovely Tools (pypapers.in)</strong>, we provide a premium, 100% free QR generator that produces high-resolution images suitable for both print and digital use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Why use our QR Generator?</h3>
              <ul className="space-y-3">
                {[
                  "Completely Free: No hidden costs or subscriptions.",
                  "High Resolution: Perfect for printing on banners and business cards.",
                  "Privacy Focused: Your data is processed locally and not stored.",
                  "ECC Level H: Advanced error correction ensures scannability even if the code is slightly damaged."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">How to Generate a QR Code</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Enter the destination URL or text in the configuration box.</li>
                <li>Click the 'Generate' button to refresh the live preview.</li>
                <li>Download the code as a high-quality PNG file.</li>
                <li>Test the code with your mobile camera before printing.</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
