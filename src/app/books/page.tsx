
'use client';

import { AppLayout } from '@/components/app-layout';
import { Book, Download, BookOpen, Mic } from 'lucide-react';
import { books } from '@/lib/books-data';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
            <Card key={book.title} className="flex flex-col">
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
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-2 items-center">
                <Button asChild className="w-full">
                  <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2" /> Read Now
                  </a>
                </Button>
                 <Button asChild className="w-full">
                  <a href={book.audioUrl} target="_blank" rel="noopener noreferrer">
                    <Mic className="mr-2" /> Listen Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={book.pdfUrl} download={`${book.title.replace(/\s/g, '-')}.pdf`}>
                    <Download className="mr-2" /> Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
