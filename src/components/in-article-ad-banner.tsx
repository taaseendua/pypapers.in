'use client';

import { useEffect } from 'react';
import { Card } from './ui/card';

export function InArticleAdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Fail silently if ads fail to load
    }
  }, []);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full overflow-hidden border-none shadow-none bg-transparent">
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
