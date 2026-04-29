'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Cake, Clock, CheckCircle2, History } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function AgeCalculatorPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = () => {
    if (date) {
      const now = new Date();
      if (date > now) {
        setAge(null);
        return;
      }
      const years = differenceInYears(now, date);
      const pastDateYearsAgo = addYears(date, years);
      const months = differenceInMonths(now, pastDateYearsAgo);
      const pastDateMonthsAgo = addMonths(pastDateYearsAgo, months);
      const days = differenceInDays(now, pastDateMonthsAgo);
      setAge({ years, months, days });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-4 bg-pink-100 rounded-3xl inline-flex text-pink-600">
            <Cake className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Accurate Age Calculator</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Calculate your exact age in years, months, and days with our free chronological tool.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-xl">Select Birth Date</CardTitle>
              <CardDescription>Choose your date of birth to get your precise age breakdown.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} className={cn('w-full h-14 justify-start text-base font-medium rounded-xl', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-3 h-5 w-5 text-pink-600" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl shadow-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    className="rounded-2xl"
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleCalculate} className="w-full h-14 font-black rounded-xl text-lg bg-pink-600 hover:bg-pink-700 transition-all">
                Calculate Age
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 bg-gradient-to-br from-pink-600 to-rose-600 text-white p-8 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <History className="h-32 w-32" />
             </div>
            {age ? (
              <div className="text-center space-y-6 z-10 w-full">
                <div>
                  <div className="text-7xl font-black tracking-tighter">{age.years}</div>
                  <div className="text-sm uppercase tracking-[0.2em] font-black opacity-80">Years Old</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-black">{age.months}</div>
                    <div className="text-[10px] uppercase font-bold opacity-70">Months</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                    <div className="text-3xl font-black">{age.days}</div>
                    <div className="text-[10px] uppercase font-bold opacity-70">Days</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50 z-10">
                <Clock className="h-16 w-16" />
                <p className="text-lg font-bold italic">Select your birthday...</p>
              </div>
            )}
          </Card>
        </div>

        <InArticleAdBanner />

        {/* SEO CONTENT SECTION */}
        <section className="prose prose-pink max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-sm space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">Why Use a Chronological Age Calculator?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Knowing your exact age in years, months, and days is often required for various administrative tasks, such as filling out insurance forms, school admissions, or job applications. While we all know our birth year, calculating the exact number of days since you were born can be tricky due to leap years and varying month lengths. Our <strong>Age Calculator</strong> does the hard work for you, providing an instant and accurate result.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Key Features of pypapers.in Age Tool</h3>
              <ul className="space-y-3">
                {[
                  "Precise Results: Accounts for leap years automatically.",
                  "Day Breakdown: See exactly how many days you've been on Earth.",
                  "Fast & Private: No personal data is stored or transmitted.",
                  "Multi-Format: View age in years, months, and days simultaneously."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-pink-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-foreground text-sm">Is this calculator accurate for leap years?</h4>
                  <p className="text-xs text-muted-foreground">Yes, our algorithm uses the standard Gregorian calendar rules to ensure every leap day is counted correctly.</p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Can I calculate age for historical dates?</h4>
                  <p className="text-xs text-muted-foreground">Absolutely. You can select any date back to 1900 to calculate age or duration.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
