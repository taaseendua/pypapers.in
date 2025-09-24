import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight } from 'lucide-react';

export function ContentCard({ content }: { content: ContentItem }) {
  const categoryVariant = {
    tool: 'default',
    book: 'secondary',
    audiobook: 'outline',
  } as const;
  
  const categoryText = {
    tool: 'Tool',
    book: 'Book',
    audiobook: 'Audiobook'
  }

  return (
    <a href={content.link} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={content.imageUrl}
            alt={content.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={content.imageHint}
          />
        </div>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter className="flex justify-between">
          <Badge variant={categoryVariant[content.category]}>{categoryText[content.category]}</Badge>
          <div className="flex items-center text-sm text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
