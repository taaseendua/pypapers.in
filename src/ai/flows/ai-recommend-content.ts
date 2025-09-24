'use server';

/**
 * @fileOverview Recommends content (tools, books, or audiobooks) to a user based on their interests or past activity.
 *
 * - recommendContent - A function that recommends content.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A comma-separated list of the user\'s interests.'),
  pastActivity: z
    .string()
    .optional()
    .describe('A description of the user\'s past activity on the platform.'),
  contentList: z.string().describe('A list of available content (tools, books, audiobooks), each item described with title and a short summary'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendedContent: z
    .string()
    .describe(
      'A list of content items (tools, books, audiobooks) that are recommended to the user, including title and summary, tailored to the user\'s interests and past activity.'
    ),
  reasoning: z.string().describe('The reasoning behind the content recommendations.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(
  input: RecommendContentInput
): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an expert recommendation system that suggests relevant content to users based on their interests and past activity.

  User Interests: {{{userInterests}}}
  Past Activity: {{{pastActivity}}}
  Available Content: {{{contentList}}}

  Based on the user's interests and past activity, recommend content items from the available content list.
  Explain your reasoning for the recommendations.

  Output the recommended content items with title and short summary, and the reasoning behind the recommendations, tailored to the user's interests and past activity.
  Ensure that the recommended content is formatted as a list.
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
