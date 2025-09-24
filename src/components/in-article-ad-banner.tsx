'use client';

import { useEffect } from 'react';
import { Card } from './ui/card';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export function InArticleAdBanner() {
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
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8167663924453774"
        data-ad-slot="5336616459"
      ></ins>
    </Card>
  );
}
