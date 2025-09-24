
'use client';

import { Card } from './ui/card';
import { useEffect } from 'react';

export function InArticleAdBanner() {
  
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Card className="flex items-center justify-center p-4 min-h-[120px] w-full">
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
