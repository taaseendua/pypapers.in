'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { trackEvent } from '@/lib/analytics';
import { educationResources, type EducationResource } from '@/lib/site-data';
import { cn } from '@/lib/utils';

const allTypes = ['All', ...Array.from(new Set(educationResources.map((item) => item.type)))];
const allBoards = ['All', ...Array.from(new Set(educationResources.map((item) => item.board)))];

function matchesQuery(resource: EducationResource, query: string) {
  const haystack = [
    resource.title,
    resource.type,
    resource.board,
    resource.exam,
    resource.audience,
    resource.description,
    ...resource.subjects,
    ...resource.years,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function ResourceFinder() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [board, setBoard] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('q');
    if (searchTerm) {
      setQuery(searchTerm);
    }
  }, []);

  const filteredResources = useMemo(() => {
    return educationResources.filter((resource) => {
      const typeMatch = type === 'All' || resource.type === type;
      const boardMatch = board === 'All' || resource.board === board;
      const queryMatch = query.trim() === '' || matchesQuery(resource, query.trim());
      return typeMatch && boardMatch && queryMatch;
    });
  }, [board, query, type]);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search resources</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() =>
              query.trim() &&
              trackEvent({
                action: 'resource_search',
                category: 'engagement',
                label: query.trim(),
              })
            }
            placeholder="Search board, exam, subject, year..."
            className="h-11 pl-9"
          />
        </label>
        <label className="flex items-center gap-2 rounded-md border bg-background px-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Filter by resource type</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="h-10 bg-transparent text-sm font-medium outline-none"
          >
            {allTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-md border bg-background px-3">
          <span className="sr-only">Filter by board or exam body</span>
          <select
            value={board}
            onChange={(event) => setBoard(event.target.value)}
            className="h-10 bg-transparent text-sm font-medium outline-none"
          >
            {allBoards.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredResources.map((resource) => (
          <Card key={resource.slug} className="rounded-2xl border-border/70 shadow-sm">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{resource.type}</Badge>
                <Badge variant="outline">{resource.board}</Badge>
                <Badge
                  className={cn(
                    resource.priority === 'Live' && 'bg-emerald-600',
                    resource.priority === 'Build next' && 'bg-blue-600',
                    resource.priority === 'Collecting papers' && 'bg-amber-600'
                  )}
                >
                  {resource.priority}
                </Badge>
              </div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{resource.description}</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-foreground">Exam:</span> {resource.exam}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Useful for:</span>{' '}
                  {resource.audience}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Subjects:</span>{' '}
                  {resource.subjects.join(', ')}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Years:</span>{' '}
                  {resource.years.join(', ')}
                </p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link
                  href={`/previous-year-papers#${resource.slug}`}
                  onClick={() =>
                    trackEvent({
                      action: 'resource_card_click',
                      category: 'resource',
                      label: resource.title,
                    })
                  }
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  View collection plan
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
