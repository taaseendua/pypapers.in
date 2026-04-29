'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { KeyRound, Copy, ShieldCheck, Zap, CheckCircle2, Lock } from 'lucide-react';
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

    if (!charPool) {
        setPassword('');
        toast({
            variant: "destructive",
            title: 'Selection Error',
            description: 'Please select at least one character type.'
        })
        return;
    };

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
        title: 'Securely Copied!',
        description: 'The password is now on your clipboard.',
      });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-4 bg-amber-100 rounded-3xl inline-flex text-amber-600">
            <KeyRound className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">Secure Password Generator</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Generate randomized, cryptographically-secure passwords locally in your browser.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-xl">Custom Parameters</CardTitle>
              <CardDescription>Adjust complexity to meet security standards.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Password Length</Label>
                  <span className="text-xl font-black text-amber-600">{length} Chars</span>
                </div>
                <Slider
                  min={6}
                  max={64}
                  step={1}
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  className="py-2"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
                  <label htmlFor="uppercase" className="text-sm font-bold cursor-pointer select-none">Uppercase Letters (A-Z)</label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
                  <label htmlFor="numbers" className="text-sm font-bold cursor-pointer select-none">Numbers (0-9)</label>
                </div>
                 <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
                  <label htmlFor="symbols" className="text-sm font-bold cursor-pointer select-none">Symbols (!@#$)</label>
                </div>
              </div>
              <Button onClick={generatePassword} className="w-full h-14 font-black rounded-xl text-lg bg-amber-600 hover:bg-amber-700 transition-all shadow-md">
                <Zap className="mr-2 h-5 w-5 fill-current" /> Create Secure Password
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 bg-white p-8 flex flex-col items-center justify-center shadow-sm relative">
            <div className="text-center space-y-8 w-full">
              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-100 inline-flex mb-2">
                <ShieldCheck className="h-10 w-10 text-amber-600" />
              </div>
              <div className="relative w-full">
                <Input
                    readOnly
                    value={password}
                    placeholder="Click Generate..."
                    className="pr-12 text-center text-xl font-mono font-bold h-16 rounded-2xl bg-muted/30 border-2"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 hover:bg-amber-100 rounded-xl" 
                  onClick={handleCopy} 
                  disabled={!password}
                >
                    <Copy className="h-6 w-6 text-amber-600" />
                </Button>
              </div>
              <div className="pt-4 flex flex-col items-center gap-2">
                 <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                    <Lock className="h-3 w-3" /> Client-Side Execution Only
                 </div>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Your password is generated locally and never leaves your browser.
                 </p>
              </div>
            </div>
          </Card>
        </div>

        <InArticleAdBanner />

        {/* SEO CONTENT SECTION */}
        <section className="prose prose-amber max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-sm space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">Why Use a Random Password Generator?</h2>
            <p className="text-muted-foreground leading-relaxed">
              In an age of constant digital threats, using "password123" or your pet's name is no longer safe. Cybercriminals use sophisticated "brute-force" attacks that can crack weak passwords in seconds. A <strong>Random Password Generator</strong> like the one we offer at <strong>Lovely Tools (pypapers.in)</strong> ensures that your credentials are high-entropy, unpredictable, and robust against hacking attempts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">What Makes a Password Strong?</h3>
              <p className="text-sm text-muted-foreground">
                A truly secure password should have at least 12-16 characters and include a mix of:
              </p>
              <ul className="space-y-3">
                {[
                  "Lowercase letters (a-z)",
                  "Uppercase letters (A-Z)",
                  "Numerical digits (0-9)",
                  "Special characters (!, @, #, $, etc.)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Privacy & Security Guarantee</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike some online services, <strong>Lovely Tools</strong> does not transmit your generated password to any server. The code runs entirely on your local machine using JavaScript. This means your password is never "in transit" across the internet and cannot be intercepted by anyone, including us. We recommend using a reputable Password Manager to store these complex keys once generated.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
