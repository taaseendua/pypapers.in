'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const BookSchema = z.object({
  title: z.string().describe('The title of the book.'),
  author: z.string().describe('The author of the book.'),
});

const AudiobookSchema = z.object({
  title: z.string().describe('The title of the audiobook.'),
  author: z.string().describe('The author of the audiobook.'),
  narrator: z.string().describe('The narrator of the audiobook.'),
});

const RecommendationsSchema = z.object({
  books: z.array(BookSchema).describe('A list of recommended books.'),
  audiobooks: z.array(AudiobookSchema).describe('A list of recommended audiobooks.'),
});

export async function recommendContent(topic: string) {
  const prompt = `Recommend 3 books and 3 audiobooks on the topic of ${topic}.`;

  const { output } = await ai.generate({
    prompt,
    output: { schema: RecommendationsSchema },
  });
  return output!;
}
