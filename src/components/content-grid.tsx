'use client';

import React from 'react';
import { Search } from 'lucide-react';
import type { ContentItem } from '@/lib/types';
import { Input } from './ui/input';
import { ContentCard } from './content-card';

type ContentGridProps = {
  allContent: ContentItem[];
  activeCategory?: string;
};

export function ContentGrid({
  allContent,
  activeCategory = 'all',
}: ContentGridProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContent = React.useMemo(() => {
    return allContent
      .filter((item) =>
        activeCategory === 'all' ? true : item.category === activeCategory
      )
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allContent, activeCategory, searchTerm]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for tools, books..."
            className="pl-10 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredContent.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-center h-96">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">No results found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
