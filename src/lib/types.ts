export type ContentCategory = 'tool' | 'book' | 'audiobook';

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  imageUrl: string;
  imageHint: string;
  link: string;
};
