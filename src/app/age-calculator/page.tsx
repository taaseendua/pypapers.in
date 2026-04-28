'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Cake, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import { SidebarAd } from '@/components/sidebar-ad';

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
      <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto px-4">
        <div className="flex-1 space-y-12 pb-12">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl inline-flex text-primary mb-4 shadow-sm">
              <Cake className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Age Calculator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Precise chronological age calculation for professional or personal use.
            </p>
          </div>

          <AdBanner />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-xl glass-card">
              <CardHeader>
                <CardTitle>Date of Birth</CardTitle>
                <CardDescription>Select your birthday to begin calculation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full h-12 justify-start text-left font-normal border-primary/20 hover:bg-primary/5',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 shadow-2xl rounded-xl border-none">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      className="rounded-xl"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCalculate} className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                  Calculate Now
                </Button>
              </CardFooter>
            </Card>

            {age ? (
              <Card className="border-none shadow-xl bg-primary text-primary-foreground overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Sparkles className="h-32 w-32" />
                </div>
                <CardHeader className="relative">
                  <CardTitle className="text-center text-primary-foreground/80">Calculated Age</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-8 py-8 relative">
                  <div className="text-center">
                    <div className="text-7xl font-black mb-2">{age.years}</div>
                    <div className="text-xl font-medium opacity-90 uppercase tracking-widest">Years Old</div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-3xl font-bold">{age.months}</div>
                      <div className="text-xs uppercase opacity-70">Months</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="text-3xl font-bold">{age.days}</div>
                      <div className="text-xs uppercase opacity-70">Days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-xl glass-card flex items-center justify-center p-12">
                <div className="text-center space-y-4 opacity-40">
                  <Clock className="h-16 w-16 mx-auto" />
                  <p className="font-medium italic">Enter details to see result</p>
                </div>
              </Card>
            )}
          </div>

          <InArticleAdBanner />

          <div className="prose prose-sm max-w-none text-muted-foreground bg-card/30 p-8 rounded-3xl border">
            <h3 className="text-foreground font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Why use our Age Calculator?
            </h3>
            <p>
              Our tool provides 100% accuracy by accounting for leap years and specific month lengths. Whether you are calculating age for insurance documents, school admissions, or just for fun, Lovely Tools ensures professional results in milliseconds.
            </p>
          </div>
          
          <AdBanner />
        </div>
        
        <SidebarAd />
      </div>
    </AppLayout>
  );
}
