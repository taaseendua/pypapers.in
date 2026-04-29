'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Landmark } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
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
  
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(val);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-2xl inline-flex text-primary">
            <Landmark className="h-6 w-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black">EMI Calculator</h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">Plan your monthly loan repayments with precision.</p>
        </div>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border/50">
            <CardHeader className="p-5">
              <CardTitle className="text-lg">Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold">
                  <Label>Loan Amount</Label>
                  <span className="text-primary">{formatCurrency(principal)}</span>
                </div>
                <Slider min={10000} max={10000000} step={10000} value={[principal]} onValueChange={(v) => setPrincipal(v[0])} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold">
                  <Label>Interest Rate (%)</Label>
                  <span className="text-primary">{rate}%</span>
                </div>
                <Slider min={1} max={20} step={0.1} value={[rate]} onValueChange={(v) => setRate(v[0])} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold">
                  <Label>Tenure (Years)</Label>
                  <span className="text-primary">{tenure} Yrs</span>
                </div>
                <Slider min={1} max={30} step={1} value={[tenure]} onValueChange={(v) => setTenure(v[0])} />
              </div>
              <Button onClick={handleCalculate} className="w-full h-10 font-bold">Calculate Monthly EMI</Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/50 bg-primary text-primary-foreground p-6 flex flex-col justify-center">
            {emi ? (
              <div className="text-center space-y-6">
                <div>
                  <div className="text-[10px] uppercase font-bold opacity-80 mb-1">Monthly EMI</div>
                  <div className="text-4xl font-black">{formatCurrency(emi)}</div>
                </div>
                <div className="pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xs opacity-70">Total Interest</div>
                    <div className="text-sm font-bold">{formatCurrency((emi * tenure * 12) - principal)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs opacity-70">Total Pay</div>
                    <div className="text-sm font-bold">{formatCurrency(emi * tenure * 12)}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 opacity-40">
                <Calculator className="h-10 w-10 mx-auto" />
                <p className="text-xs font-bold italic">Adjust parameters to see results</p>
              </div>
            )}
          </Card>
        </div>

        <InArticleAdBanner />
      </div>
    </AppLayout>
  );
}