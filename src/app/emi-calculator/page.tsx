'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Our free EMI calculator helps you plan your finances.',
    keywords: ['emi calculator', 'loan calculator', 'home loan emi', 'car loan emi', 'personal loan emi', 'monthly installment'],
  };
};

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(5); // in years
  const [emi, setEmi] = useState<number | null>(null);

  const handleCalculate = () => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiValue);
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
  }

  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center gap-4">
          <Calculator className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">EMI Calculator</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter loan amount, interest rate, and tenure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="principal">Loan Amount: {formatCurrency(principal)}</Label>
                <Slider
                  id="principal"
                  min={10000}
                  max={10000000}
                  step={10000}
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Interest Rate (% p.a.): {rate}%</Label>
                 <Slider
                  id="rate"
                  min={1}
                  max={20}
                  step={0.1}
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Loan Tenure (Years): {tenure} years</Label>
                 <Slider
                  id="tenure"
                  min={1}
                  max={30}
                  step={1}
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCalculate}>Calculate EMI</Button>
            </CardFooter>
          </Card>

          {emi !== null && (
            <Card className="flex flex-col items-center justify-center p-6">
               <CardHeader>
                <CardTitle className="text-center">Monthly EMI</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <div className="text-4xl font-bold text-primary">{formatCurrency(emi)}</div>
                <div className="text-muted-foreground">per month</div>
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
