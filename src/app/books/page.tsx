
'use client';

import { AppLayout } from '@/components/app-layout';
import { Book, Download, BookOpen, Play, Pause } from 'lucide-react';
import { books } from '@/lib/books-data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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
  const [buffered, setBuffered] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pdfPage, setPdfPage] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const storageKeyAudio = `book_progress_audio_${book.title}`;
  const storageKeyPdf = `book_progress_pdf_${book.title}`;

  useEffect(() => {
    setIsHydrated(true);
    const savedAudioTime = localStorage.getItem(storageKeyAudio);
    if (savedAudioTime && audioRef.current) {
        audioRef.current.currentTime = parseFloat(savedAudioTime);
    }
    const savedPdfPage = localStorage.getItem(storageKeyPdf);
    if (savedPdfPage) {
        setPdfPage(parseInt(savedPdfPage, 10));
    }
  }, [storageKeyAudio, storageKeyPdf]);


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      setCurrentTime(currentTime);
      setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
      localStorage.setItem(storageKeyAudio, currentTime.toString());
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgress = () => {
    if (audioRef.current && audioRef.current.buffered.length > 0) {
      const bufferedEnd = audioRef.current.buffered.end(audioRef.current.buffered.length - 1);
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setBuffered((bufferedEnd / duration) * 100);
      }
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
        const progressBar = event.currentTarget;
        const clickPositionX = event.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.offsetWidth;
        const seekTime = (clickPositionX / progressBarWidth) * duration;
        audioRef.current.currentTime = seekTime;
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
        {isHydrated && (
          <div className="space-y-3 rounded-lg border p-3">
            <audio
              ref={audioRef}
              src={book.audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onProgress={handleProgress}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              preload="metadata"
            />
            
            <div className="relative w-full h-2 cursor-pointer" onClick={handleSeek}>
                <Progress value={buffered} className="w-full absolute h-full bg-secondary" />
                <Progress value={progress} className="w-full relative" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="h-12 w-12" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 items-center">
        {isHydrated ? (
          <>
            <Button asChild className="w-full">
                <Link href={`/books/viewer?pdfUrl=${encodeURIComponent(book.pdfUrl)}&page=${pdfPage}`}>
                    <BookOpen className="mr-2" /> {pdfPage > 0 ? 'Resume Reading' : 'Read Now'}
                </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href={book.pdfUrl} download={`${book.title.replace(/\s/g, '-')}.pdf`}>
                <Download className="mr-2" /> Download
              </a>
            </Button>
          </>
        ) : (
          <div className="h-20 w-full"></div> // Placeholder for buttons
        )}
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
