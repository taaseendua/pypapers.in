
'use client';

import { AppLayout } from '@/components/app-layout';
import { Book, Download, BookOpen, Mic } from 'lucide-react';
import { books } from '@/lib/books-data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useRef } from 'react';

function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds === Infinity) {
    return '0:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function BookCard({ book }: { book: (typeof books)[0] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime } = audioRef.current;
      setCurrentTime(currentTime);
      setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleCanPlay = () => {
    setIsLoading(false);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
            data-ai-hint="book cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <CardTitle className="text-xl mb-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{book.description}</p>
        <div className="space-y-2">
          <audio
            ref={audioRef}
            controls
            className="w-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
          >
            <source src={book.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
           {isLoading ? (
            <div className="text-sm text-muted-foreground text-center py-4">Loading audio...</div>
          ) : (
            <>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 items-center">
        <Button asChild className="w-full">
          <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2" /> Read Now
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <a href={book.pdfUrl} download={`${book.title.replace(/\s/g, '-')}.pdf`}>
            <Download className="mr-2" /> Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function BooksPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Book className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Premium Books</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
