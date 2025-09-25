
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_GNEWS_API_KEY_HERE') {
    return NextResponse.json(
      { error: 'GNews API key is not configured.' },
      { status: 500 }
    );
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
