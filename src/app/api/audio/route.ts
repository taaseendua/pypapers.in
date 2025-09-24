
import {NextResponse} from 'next/server';

export async function GET() {
  const audioUrl = 'https://drive.google.com/u/0/uc?id=1-C26sY790GKXQSys-eixwjw8E8QiSHAt&export=download';

  try {
    const response = await fetch(audioUrl);

    if (!response.ok) {
      return new NextResponse('Failed to fetch audio', {status: response.status});
    }

    const readableStream = response.body;

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error fetching audio:', error);
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
