
import { NextResponse } from 'next/server';

function getSampleData() {
  return {
    articles: [
      {
        title: 'Tech Innovations Lead the Way in 2024',
        description: 'From AI advancements to sustainable tech, this year is proving to be a landmark for innovation. Industry leaders are pushing the boundaries of what\'s possible.',
        content: 'From AI advancements to sustainable tech, this year is proving to be a landmark for innovation. Industry leaders are pushing the boundaries of what\'s possible. [This is sample content. Add your GNews API key to see live articles.]',
        url: '#',
        image: 'https://picsum.photos/seed/tech/800/600',
        publishedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
        source: {
          name: 'Tech Chronicle (Sample)',
          url: '#',
        },
      },
      {
        title: 'Global Markets Respond to Economic Shifts',
        description: 'Analysts are closely watching as global markets show volatility in response to recent economic policy changes. Experts weigh in on the potential long-term effects.',
        content: 'Analysts are closely watching as global markets show volatility in response to recent economic policy changes. Experts weigh in on the potential long-term effects. [This is sample content. Add your GNews API key to see live articles.]',
        url: '#',
        image: 'https://picsum.photos/seed/markets/800/600',
        publishedAt: new Date(Date.now() - 7200 * 1000).toISOString(),
        source: {
          name: 'Economics Today (Sample)',
          url: '#',
        },
      },
      {
        title: 'The Future of Remote Work: A Hybrid Approach',
        description: 'Companies around the world are embracing a hybrid model, combining in-office and remote work to offer flexibility and improve employee satisfaction.',
        content: 'Companies around the world are embracing a hybrid model, combining in-office and remote work to offer flexibility and improve employee satisfaction. [This is sample content. Add your GNews API key to see live articles.]',
        url: '#',
        image: 'https://picsum.photos/seed/work/800/600',
        publishedAt: new Date(Date.now() - 10800 * 1000).toISOString(),
        source: {
          name: 'Modern Workplace (Sample)',
          url: '#',
        },
      },
    ],
    sampleData: true, // Flag to indicate that this is sample data
  };
}

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GNEWS_API_KEY_HERE') {
    // Return sample data if API key is not configured
    return NextResponse.json(getSampleData());
  }

  const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('GNews API error:', errorData);
      return NextResponse.json(
        { error: `Failed to fetch from GNews: ${errorData.errors.join(', ')}` },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from GNews API:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
