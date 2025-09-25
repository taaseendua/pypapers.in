
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { KeyRound, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setPassword(newPassword);
  };
  
  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast({
        title: 'Copied to clipboard!',
        description: 'The password has been copied to your clipboard.',
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <KeyRound className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Password Generator</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Password Options</CardTitle>
              <CardDescription>Customize your password settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="length">Password Length: {length}</Label>
                <Slider
                  id="length"
                  min={6}
                  max={64}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
                <label
                  htmlFor="uppercase"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Uppercase Letters
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
                <label
                  htmlFor="numbers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Numbers
                </label>
              </div>
               <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
                <label
                  htmlFor="symbols"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Symbols
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generatePassword}>Generate Password</Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6">
            <CardHeader>
              <CardTitle className="text-center">Your New Password</CardTitle>
            </CardHeader>
            <CardContent className="flex w-full flex-col items-center justify-center gap-4">
               <div className="relative w-full">
                <Input
                    readOnly
                    value={password}
                    placeholder="Click 'Generate' to create a password"
                    className="pr-10 text-center text-lg h-12"
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9" onClick={handleCopy} disabled={!password}>
                    <Copy className="h-5 w-5" />
                </Button>
               </div>
              <p className="text-xs text-muted-foreground">
                Click the button to generate a new password.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>
      </div>
    </AppLayout>
  );
}
