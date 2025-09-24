'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translateText } from '@/ai/flows/ai-translate-text';
import { Languages, Copy, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Chinese (Simplified)', label: 'Chinese (Simplified)' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Hindi', label: 'Hindi' },
];

export default function AiDocumentTranslatorPage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!sourceText) return;
    setLoading(true);
    setTranslatedText('');
    try {
      const result = await translateText(sourceText, targetLanguage);
      setTranslatedText(result);
    } catch (e) {
      console.error(e);
      toast({
        title: 'Translation Error',
        description: 'Could not translate the text. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      toast({ title: 'Copied to clipboard!' });
    }
  };
  
  const handleSwap = () => {
    if (translatedText) {
      setSourceText(translatedText);
      setTranslatedText('');
    }
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Languages className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">AI Document Translator</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Translate Your Text</CardTitle>
            <CardDescription>
              Paste your text and choose a language to translate it using AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="min-h-[300px] text-base"
              />
               <div className="relative">
                <Textarea
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="min-h-[300px] text-base bg-secondary"
                />
                 {translatedText && (
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                      <Copy className="h-5 w-5" />
                    </Button>
                )}
               </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleTranslate} disabled={loading || !sourceText}>
                  {loading ? 'Translating...' : 'Translate'}
                </Button>
                 <Button variant="outline" onClick={handleSwap} disabled={!translatedText}>
                    <ArrowRightLeft className="mr-2" /> Swap
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
