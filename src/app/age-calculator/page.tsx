'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, Cake } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Age Calculator',
    description: 'Calculate your age in years, months, and days with our free and easy-to-use Age Calculator. Simply enter your date of birth to see your exact age.',
    keywords: ['age calculator', 'date of birth calculator', 'calculate age', 'how old am I', 'age in years'],
  };
};

export default function AgeCalculatorPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = () => {
    if (date) {
      const now = new Date();
      const years = differenceInYears(now, date);
      const pastYearDate = addYears(date, years);
      const months = differenceInMonths(now, pastMonthDate);
      const pastMonthDate = addMonths(pastYearDate, months);
      const days = differenceInDays(now, pastMonthDate);
      setAge({ years, months, days });
    }
  };

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Cake className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Age Calculator</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Enter your Date of Birth</CardTitle>
              <CardDescription>Select your birth date to calculate your age.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCalculate}>Calculate Age</Button>
            </CardFooter>
          </Card>

          {age && (
            <Card className="flex flex-col items-center justify-center p-6">
              <CardHeader>
                <CardTitle className="text-center">Your Age</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="text-4xl font-bold text-primary">{age.years}</div>
                <div className="text-muted-foreground">
                  {age.months} months | {age.days} days
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <AdBanner />
          <InArticleAdBanner />
        </div>

      </div>
    </AppLayout>
  );
}
