
'use client';

import { AppLayout } from '@/components/app-layout';
import { Newspaper } from 'lucide-react';

export default function ArticlesPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Newspaper className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Articles</h2>
        </div>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
                This is the articles page. You can add content here.
            </p>
        </div>
      </div>
    </AppLayout>
  );
}
