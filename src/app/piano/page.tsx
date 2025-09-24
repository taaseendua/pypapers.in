'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import * as Tone from 'tone';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

const notes: { note: string, key: string, type: 'white' | 'black' }[] = [
  { note: 'C4', key: 'a', type: 'white' },
  { note: 'C#4', key: 'w', type: 'black' },
  { note: 'D4', key: 's', type: 'white' },
  { note: 'D#4', key: 'e', type: 'black' },
  { note: 'E4', key: 'd', type: 'white' },
  { note: 'F4', key: 'f', type: 'white' },
  { note: 'F#4', key: 't', type: 'black' },
  { note: 'G4', key: 'g', type: 'white' },
  { note: 'G#4', key: 'y', type: 'black' },
  { note: 'A4', key: 'h', type: 'white' },
  { note: 'A#4', key: 'u', type: 'black' },
  { note: 'B4', key: 'j', type: 'white' },
  { note: 'C5', key: 'k', type: 'white' },
];

export default function PianoPage() {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  useEffect(() => {
    setSynth(new Tone.Synth().toDestination());
  }, []);
  
  const playNote = (note: string) => {
    if (synth && Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    synth?.triggerAttackRelease(note, '8n');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const note = notes.find(n => n.key === event.key);
      if (note) {
        playNote(note.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [synth]);

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Music className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Piano</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Virtual Piano</CardTitle>
            <CardDescription>Click the keys or use your keyboard to play.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative flex h-48 w-full justify-center">
              {notes.map(({ note, key, type }) => (
                <div
                  key={note}
                  onMouseDown={() => playNote(note)}
                  className={`relative flex cursor-pointer items-end justify-center rounded-b-md border-2 border-t-0 border-black transition-all active:bg-gray-300
                    ${type === 'white' ? 'h-full w-12 bg-white' : 'h-2/3 w-8 bg-black z-10 -mx-4 text-white'}`}
                >
                  <span className="mb-2 font-semibold uppercase">{key}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-muted-foreground">Keyboard mapping: A, S, D, F, G, H, J, K for white keys and W, E, T, Y, U for black keys.</p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>
      </div>
    </AppLayout>
  );
}
