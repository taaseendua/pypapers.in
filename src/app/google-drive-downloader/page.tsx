'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DownloadCloud, Copy, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function GoogleDriveDownloaderPage() {
  const [driveUrl, setDriveUrl] = useState('');
  const [directLink, setDirectLink] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const extractFileId = (url: string): string | null => {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleGenerate = () => {
    setError('');
    setDirectLink('');

    if (!driveUrl) {
      setError('Please enter a Google Drive URL.');
      return;
    }

    const fileId = extractFileId(driveUrl);

    if (!fileId) {
      setError('Invalid Google Drive URL. Please make sure it is a valid file sharing link.');
      return;
    }

    const newDirectLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    setDirectLink(newDirectLink);
  };

  const handleCopy = () => {
    if (directLink) {
      navigator.clipboard.writeText(directLink);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };


  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <DownloadCloud className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Google Drive Direct Link Generator</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Enter Google Drive URL</CardTitle>
                <CardDescription>Paste your file's sharing link to create a direct download link.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drive-url">Sharing URL</Label>
                  <Input
                    id="drive-url"
                    value={driveUrl}
                    onChange={(e) => setDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>
                 {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerate}>Generate Link</Button>
              </CardFooter>
            </Card>
            
            {directLink && (
                <Card>
                    <CardHeader>
                        <CardTitle>Your Direct Download Link</CardTitle>
                        <CardDescription>Use this link to directly download the file.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Input 
                                readOnly 
                                value={directLink} 
                                className="pr-12"
                            />
                             <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                             </Button>
                        </div>
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                                Make sure the file's sharing setting is set to "Anyone with the link" for this to work.
                            </AlertDescription>
                        </Alert>
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
