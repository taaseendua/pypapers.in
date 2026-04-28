'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from './ui/card';

export function AdBanner() {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          // Check if the element is visible and has width
          const width = adRef.current.offsetWidth;
          if (width > 0) {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // Retry once if width is not yet available
            setTimeout(() => {
              if (adRef.current && adRef.current.offsetWidth > 0) {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              }
            }, 500);
          }
        }
      } catch (e) {
        // Silently handle AdSense push errors
        console.error('AdSense initialization skipped:', e);
      }
    };

    // Delay slightly to ensure layout has settled
    const timer = setTimeout(pushAd, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full overflow-hidden border-none shadow-none bg-transparent">
      <ins
        ref={adRef}
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minWidth: '250px' }}
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="3682052769"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
}
