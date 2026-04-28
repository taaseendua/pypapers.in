'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function SidebarAd() {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (typeof window !== 'undefined' && adRef.current && adRef.current.clientWidth > 0) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('Sidebar Ad failed to load:', e);
      }
    };

    const timer = setTimeout(pushAd, 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="hidden xl:block sticky top-24 w-[300px] h-[600px] bg-card/50 rounded-2xl border border-dashed border-primary/20 flex items-center justify-center overflow-hidden">
      <ins
        ref={adRef}
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block', width: '300px', height: '600px' }}
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="3682052769"
      ></ins>
    </div>
  );
}
