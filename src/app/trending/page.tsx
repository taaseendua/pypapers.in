
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

function ArticleSkeleton() {
    return (
        <Card className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
                 <Skeleton className="h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            </div>
            <div className="md:w-2/3 flex flex-col">
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="mt-auto">
                    <Skeleton className="h-8 w-32" />
                </CardFooter>
            </div>
        </Card>
    )
}


export default function TrendingPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendingArticles() {
      try {
        setLoading(true);
        const response = await fetch('/api/trending');
        if (!response.ok) {
          throw new Error('Failed to fetch trending topics. The API key might be missing or invalid.');
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingArticles();
  }, []);

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <TrendingUp className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Latest Trends</h2>
        </div>
        
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error} Please make sure you have added your GNews API key to the .env file.
                </AlertDescription>
            </Alert>
        )}

        <div className="space-y-6">
            {loading ? (
                Array.from({length: 5}).map((_, i) => <ArticleSkeleton key={i} />)
            ) : (
                articles.map((article, index) => (
                    <Card key={index} className="flex flex-col md:flex-row overflow-hidden transition-shadow hover:shadow-lg">
                        {article.image && (
                             <div className="md:w-1/3 h-48 md:h-auto relative">
                                <Image 
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                             </div>
                        )}
                        <div className={`flex flex-col ${article.image ? 'md:w-2/3' : 'w-full'}`}>
                            <CardHeader>
                                <CardTitle className="text-xl">{article.title}</CardTitle>
                                <CardDescription>
                                    <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span> by <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">{article.source.name}</a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">{article.description}</p>
                            </CardContent>
                            <CardFooter>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                                    Read more <ExternalLink className="h-4 w-4" />
                                </a>
                            </CardFooter>
                        </div>
                    </Card>
                ))
            )}
        </div>

      </div>
    </AppLayout>
  );
}
