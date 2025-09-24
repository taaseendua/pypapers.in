import { AppLayout } from '@/components/app-layout';
import { ContentGrid } from '@/components/content-grid';
import { contentData } from '@/lib/content-data';

export default function Home() {
  return (
    <AppLayout>
      <ContentGrid allContent={contentData} />
    </AppLayout>
  );
}
