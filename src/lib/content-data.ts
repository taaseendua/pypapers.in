import type { ContentItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string, hint: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
};

export const contentData: ContentItem[] = [
  {
    id: '1',
    title: 'CodeSphere IDE',
    description: 'A next-generation cloud-based IDE for seamless remote development and collaboration.',
    category: 'tool',
    imageUrl: getImageUrl('dev-tool-1', 'code editor'),
    imageHint: 'code editor',
    link: '#',
  },
  {
    id: '2',
    title: 'The Art of Simplicity',
    description: 'Explore the principles of minimalist design and how to apply them to digital products.',
    category: 'book',
    imageUrl: getImageUrl('design-book-1', 'design book'),
    imageHint: 'design book',
    link: '#',
  },
  {
    id: '3',
    title: 'Atomic Focus',
    description: 'Learn how to achieve deep work and maximize your productivity in a world of distractions.',
    category: 'audiobook',
    imageUrl: getImageUrl('productivity-audiobook-1', 'headphones audio'),
    imageHint: 'headphones audio',
    link: '#',
  },
  {
    id: '4',
    title: 'SyncUp Workspace',
    description: 'An all-in-one platform for team messaging, file sharing, and project management.',
    category: 'tool',
    imageUrl: getImageUrl('collab-tool-2', 'team meeting'),
    imageHint: 'team meeting',
    link: '#',
  },
  {
    id: '5',
    title: 'The Innovator\'s Journey',
    description: 'A compelling biography of a tech visionary who changed the world.',
    category: 'book',
    imageUrl: getImageUrl('biography-book-2', 'person portrait'),
    imageHint: 'person portrait',
    link: '#',
  },
  {
    id: '6',
    title: 'Wealth by Design',
    description: 'A practical guide to personal finance, investing, and building long-term wealth.',
    category: 'audiobook',
    imageUrl: getImageUrl('finance-audiobook-2', 'money chart'),
    imageHint: 'money chart',
    link: '#',
  },
];
