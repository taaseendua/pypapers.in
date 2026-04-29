
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Image as ImageIcon, Sparkles, Download, Wand2 } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import { useToast } from '@/hooks/use-toast';

export default function NotesCleanerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [contrast, setContrast] = useState(1.5);
  const [brightness, setBrightness] = useState(1.1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.filter = `contrast(${contrast}) brightness(${brightness}) grayscale(100%)`;
        ctx.drawImage(img, 0, 0);
      }
    };
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'cleaned-notes.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast({ title: 'Downloaded', description: 'Cleaned scan saved.' });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-emerald-100 rounded-2xl inline-flex text-emerald-600">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Handwritten Notes Cleaner</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Remove gray backgrounds and enhance contrast of scanned handwritten notes for better readability.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-3xl border-border/50 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Upload Scan</Label>
              <Input type="file" accept="image/*" onChange={handleUpload} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between"><Label>Contrast</Label><span className="text-xs">{contrast}x</span></div>
              <Slider value={[contrast]} min={1} max={3} step={0.1} onValueChange={(v) => setContrast(v[0])} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between"><Label>Brightness</Label><span className="text-xs">{brightness}x</span></div>
              <Slider value={[brightness]} min={0.5} max={2} step={0.1} onValueChange={(v) => setBrightness(v[0])} />
            </div>
            <Button onClick={processImage} className="w-full font-bold" disabled={!image}>
              <Wand2 className="mr-2 h-4 w-4" /> Enhance Scan
            </Button>
            {image && <Button variant="outline" onClick={handleDownload} className="w-full">Download Result</Button>}
          </Card>

          <Card className="md:col-span-2 rounded-3xl overflow-hidden bg-white flex items-center justify-center p-4 min-h-[400px]">
             {image ? (
                <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-md border" />
             ) : (
                <div className="text-muted-foreground text-center">
                   <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                   <p>Upload a photo of your notes to start cleaning.</p>
                </div>
             )}
          </Card>
        </div>

        <InArticleAdBanner />
      </div>
    </AppLayout>
  );
}
