
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Download } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader',
  description: 'Download high-quality YouTube video thumbnails for free. Simply paste a YouTube video URL to get thumbnails in various resolutions (HD, SD).',
  keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'youtube hd thumbnail', 'video thumbnail'],
};

type Thumbnail = {
  quality: string;
  url: string;
  width: number;
  height: number;
};

export default function YouTubeThumbnailDownloaderPage() {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getYouTubeVideoId = (videoUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFetchThumbnails = () => {
    setError('');
    const videoId = getYouTubeVideoId(url);

    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid URL.');
      setThumbnails([]);
      return;
    }

    setLoading(true);
    const qualities = [
      { quality: 'Maximum', resolution: 'maxresdefault', width: 1280, height: 720 },
      { quality: 'Standard', resolution: 'sddefault', width: 640, height: 480 },
      { quality: 'High', resolution: 'hqdefault', width: 480, height: 360 },
      { quality: 'Medium', resolution: 'mqdefault', width: 320, height: 180 },
      { quality: 'Default', resolution: 'default', width: 120, height: 90 },
    ];

    const newThumbnails: Thumbnail[] = qualities.map(({ quality, resolution, width, height }) => ({
      quality: `${quality} (${width}x${height})`,
      url: `https://img.youtube.com/vi/${videoId}/${resolution}.jpg`,
      width,
      height
    }));

    setThumbnails(newThumbnails);
    setLoading(false);
  };

  const handleDownload = async (thumbnailUrl: string, quality: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `youtube-thumbnail-${quality.split(' ')[0].toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };


  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Youtube className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">YouTube Thumbnail Downloader</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter YouTube Video URL</CardTitle>
            <CardDescription>Paste the URL of the YouTube video to download its thumbnails.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">Video URL</Label>
              <Input
                id="youtube-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleFetchThumbnails} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Thumbnails'}
            </Button>
          </CardFooter>
        </Card>

        {thumbnails.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Available Thumbnails</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {thumbnails.map((thumb) => (
                <Card key={thumb.quality}>
                  <CardHeader>
                    <CardTitle className="text-lg">{thumb.quality}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                      <Image
                        src={thumb.url}
                        alt={`Thumbnail in ${thumb.quality} quality`}
                        width={thumb.width}
                        height={thumb.height}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => handleDownload(thumb.url, thumb.quality)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>

      </div>
    </AppLayout>
  );
}
