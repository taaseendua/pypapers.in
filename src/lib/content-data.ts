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
    id: '4',
    title: 'SyncUp Workspace',
    description: 'An all-in-one platform for team messaging, file sharing, and project management.',
    category: 'tool',
    imageUrl: getImageUrl('collab-tool-2', 'team meeting'),
    imageHint: 'team meeting',
    link: '#',
  },
  {
    id: '7',
    title: 'PixelPerfect',
    description: 'A design tool for creating and testing UI components with pixel-perfect precision.',
    category: 'tool',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'design software',
    link: '#',
  },
  {
    id: '8',
    title: 'DataWeaver',
    description: 'A tool for cleaning, transforming, and visualizing large datasets with ease.',
    category: 'tool',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'data chart',
    link: '#',
  },
];
