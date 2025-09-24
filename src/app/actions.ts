'use server';

import { recommendContent } from '@/ai/flows/ai-recommend-content';
import { contentData } from '@/lib/content-data';

export async function getAiRecommendations(userInterests: string) {
  try {
    const contentList = contentData
      .map(
        (item) => `Title: ${item.title}\nSummary: ${item.description}`
      )
      .join('\n\n');

    const result = await recommendContent({
      userInterests,
      contentList,
      pastActivity: 'The user is new and has no past activity.',
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('AI recommendation error:', error);
    return {
      success: false,
      error: 'Failed to get AI recommendations. Please try again later.',
    };
  }
}
