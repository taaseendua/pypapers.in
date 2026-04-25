'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Card } from './ui/card';

export function AdBanner() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      // Fail silently if ads fail to load or if pushed too many times
    }
  }, [pathname]);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full overflow-hidden border-none shadow-none bg-transparent">
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="3682052769"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </Card>
  );
}
