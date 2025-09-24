'use client';

import { AppLayout } from '@/components/app-layout';
import { Clock } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Clock className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Coming Soon</h2>
        </div>
        <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
                This page is under construction. New features are coming soon!
            </p>
        </div>
      </div>
    </AppLayout>
  );
}
