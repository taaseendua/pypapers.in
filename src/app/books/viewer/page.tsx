
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PageCover = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="bg-background border rounded-md shadow-md flex items-center justify-center">
      {children}
    </div>
  );
});
PageCover.displayName = 'PageCover';

const PDFPage = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="bg-background border rounded-md shadow-md">
      {children}
    </div>
  );
});
PDFPage.displayName = 'PDFPage';

function FlipbookViewer() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get('pdfUrl');
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const flipBookRef = React.useRef<any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };
  
  const goToNextPage = () => {
    if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (flipBookRef.current) {
        flipBookRef.current.pageFlip().flipPrev();
    }
  };

  if (!pdfUrl) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-destructive">PDF URL not found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col p-4 bg-secondary">
        <div className="flex-grow flex items-center justify-center">
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }} className="transition-transform duration-300">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<Skeleton className="w-[600px] h-[800px] rounded-md" />}
              error={<p>Failed to load PDF.</p>}
            >
              <HTMLFlipBook
                width={600}
                height={800}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={handleFlip}
                ref={flipBookRef}
                className="mx-auto"
              >
                <PageCover>
                  <div className="p-4 text-center">
                    <h2 className="text-2xl font-bold">Book Cover</h2>
                  </div>
                </PageCover>
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <PDFPage key={`page_${index + 1}`}>
                    <Page pageNumber={index + 1} width={600} />
                  </PDFPage>
                ))}
                 <PageCover>
                  <div className="p-4 text-center">
                    <h2 className="text-2xl font-bold">The End</h2>
                  </div>
                </PageCover>
              </HTMLFlipBook>
            </Document>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 py-4">
            <Button variant="outline" onClick={goToPrevPage} disabled={currentPage === 0}><ChevronLeft /> Prev</Button>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {numPages}</span>
            <Button variant="outline" onClick={goToNextPage} disabled={!numPages || currentPage >= numPages -1}>Next <ChevronRight /></Button>
        </div>
      </div>
    </AppLayout>
  );
}

export default function ViewerPage() {
    return (
        <Suspense fallback={<AppLayout><div className="flex-1 flex items-center justify-center"><p>Loading...</p></div></AppLayout>}>
            <FlipbookViewer />
        </Suspense>
    )
}
