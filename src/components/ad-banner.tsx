'use client';

import { useEffect } from 'react';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export function AdBanner() {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px]">
      <ins
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
