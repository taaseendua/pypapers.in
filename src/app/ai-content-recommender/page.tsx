'use client';

import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { recommendContent } from '@/ai/flows/ai-recommend-content';
import { Sparkles } from 'lucide-react';

export default function AiContentRecommenderPage() {
  const [topic, setTopic] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendContent(topic);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Sparkles className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">AI Content Recommender</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter a Topic</CardTitle>
              <CardDescription>Get AI-powered content recommendations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Artificial Intelligence"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Get Recommendations'}
              </Button>
            </CardFooter>
          </Card>
          {recommendations && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.books && (
                  <div>
                    <h3 className="font-semibold">Books</h3>
                    <ul className="list-disc pl-5">
                      {recommendations.books.map((book: any, index: number) => (
                        <li key={index}>
                          <strong>{book.title}</strong> by {book.author}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendations.audiobooks && (
                  <div>
                    <h3 className="font-semibold">Audiobooks</h3>
                    <ul className="list-disc pl-5">
                      {recommendations.audiobooks.map((audiobook: any, index: number) => (
                        <li key={index}>
                          <strong>{audiobook.title}</strong> by {audiobook.author}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
