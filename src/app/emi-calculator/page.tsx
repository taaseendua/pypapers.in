'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Landmark, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { AdBanner } from '@/components/ad-banner';
import { InArticleAdBanner } from '@/components/in-article-ad-banner';
import { SidebarAd } from '@/components/sidebar-ad';

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
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
  }

  return (
    <AppLayout>
      <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto px-4">
        <div className="flex-1 space-y-12 pb-12">
          <div className="text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl inline-flex text-primary mb-4 shadow-sm">
              <Landmark className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">EMI Calculator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Plan your finances with our accurate Equated Monthly Installment calculator.
            </p>
          </div>

          <AdBanner />

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none shadow-xl glass-card">
              <CardHeader>
                <CardTitle>Loan Parameters</CardTitle>
                <CardDescription>Adjust the sliders to match your loan details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="principal" className="font-bold">Loan Amount</Label>
                    <span className="text-primary font-black">{formatCurrency(principal)}</span>
                  </div>
                  <Slider
                    id="principal"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={[principal]}
                    onValueChange={(value) => setPrincipal(value[0])}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="rate" className="font-bold">Interest Rate (% p.a.)</Label>
                    <span className="text-primary font-black">{rate}%</span>
                  </div>
                   <Slider
                    id="rate"
                    min={1}
                    max={20}
                    step={0.1}
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="tenure" className="font-bold">Loan Tenure (Years)</Label>
                    <span className="text-primary font-black">{tenure} Yrs</span>
                  </div>
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
                <Button onClick={handleCalculate} className="w-full h-12 font-bold shadow-lg">
                  Calculate EMI
                </Button>
              </CardFooter>
            </Card>

            {emi !== null ? (
              <Card className="border-none shadow-xl bg-primary text-primary-foreground flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                <CardHeader className="text-center z-10">
                  <CardTitle className="text-primary-foreground/80 uppercase tracking-widest text-sm font-bold">Monthly Installment</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4 z-10">
                  <div className="text-6xl font-black">{formatCurrency(emi)}</div>
                  <div className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">Fixed Rate Applied</div>
                </CardContent>
                <CardFooter className="mt-8 text-xs opacity-60 flex items-center gap-2 z-10">
                  <ShieldCheck className="h-4 w-4" /> Secure Calculation
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-none shadow-xl glass-card flex items-center justify-center p-12">
                <div className="text-center space-y-4 opacity-40">
                  <Calculator className="h-16 w-16 mx-auto" />
                  <p className="font-medium italic">Adjust sliders to see results</p>
                </div>
              </Card>
            )}
          </div>

          <InArticleAdBanner />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="p-6 bg-card border rounded-2xl">
                <h4 className="font-bold mb-2">Total Interest</h4>
                <p className="text-2xl font-black text-primary">
                  {emi ? formatCurrency((emi * tenure * 12) - principal) : '---'}
                </p>
             </div>
             <div className="p-6 bg-card border rounded-2xl">
                <h4 className="font-bold mb-2">Total Payment</h4>
                <p className="text-2xl font-black text-primary">
                  {emi ? formatCurrency(emi * tenure * 12) : '---'}
                </p>
             </div>
             <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <h4 className="font-bold mb-2 text-primary">Status</h4>
                <p className="text-sm font-medium text-muted-foreground">Ready for Bank Submission</p>
             </div>
          </div>

          <AdBanner />
        </div>

        <SidebarAd />
      </div>
    </AppLayout>
  );
}
