'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Cake, Clock } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-2xl inline-flex text-primary">
            <Cake className="h-6 w-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black">Age Calculator</h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">Precise chronological age breakdown instantly.</p>
        </div>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border/50">
            <CardHeader className="p-5">
              <CardTitle className="text-lg">Birth Date</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} className={cn('w-full h-10 justify-start text-xs font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    className="rounded-xl"
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleCalculate} className="w-full h-10 font-bold">Calculate Age</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 bg-primary text-primary-foreground p-6">
            {age ? (
              <div className="text-center space-y-4">
                <div>
                  <div className="text-5xl font-black">{age.years}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Years Old</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-xl font-bold">{age.months}</div>
                    <div className="text-[9px] uppercase font-bold opacity-70">Months</div>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="text-xl font-bold">{age.days}</div>
                    <div className="text-[9px] uppercase font-bold opacity-70">Days</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-3 opacity-40">
                <Clock className="h-10 w-10" />
                <p className="text-xs font-bold italic">Waiting for input...</p>
              </div>
            )}
          </Card>
        </div>

        <InArticleAdBanner />
      </div>
    </AppLayout>
  );
}