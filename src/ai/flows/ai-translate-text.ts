'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TranslationRequestSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z.string().describe('The language to translate the text into.'),
});

export async function translateText(text: string, targetLanguage: string) {
  const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;

  const { output } = await ai.generate({
    prompt,
    output: {
      schema: z.string().describe('The translated text.'),
    },
  });
  return output || '';
}
