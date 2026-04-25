'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from './ui/card';

export function InArticleAdBanner() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Fail silently
    }
  }, [pathname]);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full overflow-hidden border-none shadow-none bg-transparent">
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="5336616459"
      ></ins>
    </Card>
  );
}
