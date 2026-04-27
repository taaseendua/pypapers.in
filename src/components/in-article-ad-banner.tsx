'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from './ui/card';

export function InArticleAdBanner() {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          // Check if the element has width to avoid the "availableWidth=0" error
          if (adRef.current.clientWidth > 0) {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // If no width yet, retry once after a short delay
            setTimeout(() => {
              if (adRef.current && adRef.current.clientWidth > 0) {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              }
            }, 500);
          }
        }
      } catch (e) {
        // Fail silently
      }
    };

    // Wait for the route transition and layout to settle
    const timer = setTimeout(pushAd, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full overflow-hidden border-none shadow-none bg-transparent">
      <ins
        ref={adRef}
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', width: '100%' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="5336616459"
      ></ins>
    </Card>
  );
}
