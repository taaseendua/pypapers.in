'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator, Landmark, CheckCircle2, TrendingUp } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-4 bg-emerald-100 rounded-3xl inline-flex text-emerald-600">
            <Landmark className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">Smart EMI Calculator</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Plan your home, car, or personal loan monthly repayments with our professional financial tool.</p>
        </section>

        <AdBanner />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card">
            <CardHeader className="bg-muted/30 border-b p-6">
              <CardTitle className="text-xl">Loan Configuration</CardTitle>
              <CardDescription>Adjust the sliders to estimate your monthly loan installment.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Loan Amount</Label>
                  <span className="text-xl font-black text-emerald-600">{formatCurrency(principal)}</span>
                </div>
                <Slider min={10000} max={10000000} step={10000} value={[principal]} onValueChange={(v) => setPrincipal(v[0])} className="py-2" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Interest Rate (%)</Label>
                  <span className="text-xl font-black text-emerald-600">{rate}%</span>
                </div>
                <Slider min={1} max={20} step={0.1} value={[rate]} onValueChange={(v) => setRate(v[0])} className="py-2" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tenure (Years)</Label>
                  <span className="text-xl font-black text-emerald-600">{tenure} Yrs</span>
                </div>
                <Slider min={1} max={30} step={1} value={[tenure]} onValueChange={(v) => setTenure(v[0])} className="py-2" />
              </div>
              <Button onClick={handleCalculate} className="w-full h-14 font-black rounded-xl text-lg bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md">
                Calculate Installment
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calculator className="h-40 w-40" />
            </div>
            {emi ? (
              <div className="text-center space-y-8 z-10">
                <div>
                  <div className="text-xs uppercase font-black tracking-[0.2em] opacity-80 mb-2">Monthly EMI</div>
                  <div className="text-5xl md:text-6xl font-black tracking-tighter">{formatCurrency(Math.round(emi))}</div>
                </div>
                <div className="pt-8 border-t border-white/20 grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-black opacity-70 mb-1">Total Interest</div>
                    <div className="text-lg font-bold">{formatCurrency(Math.round((emi * tenure * 12) - principal))}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase font-black opacity-70 mb-1">Total Repayment</div>
                    <div className="text-lg font-bold">{formatCurrency(Math.round(emi * tenure * 12))}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-50 z-10 py-12">
                <Calculator className="h-16 w-16 mx-auto" />
                <p className="text-lg font-bold italic">Adjust parameters to see results</p>
              </div>
            )}
          </Card>
        </div>

        <InArticleAdBanner />

        {/* SEO CONTENT SECTION */}
        <section className="prose prose-emerald max-w-none bg-white p-8 md:p-12 rounded-3xl border shadow-sm space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-foreground">What is an EMI?</h2>
            <p className="text-muted-foreground leading-relaxed">
              EMI stands for <strong>Equated Monthly Installment</strong>. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, so that over a specified number of years, the loan is paid off in full. Our <strong>EMI Calculator</strong> for pypapers.in is designed to provide you with a transparent view of your potential financial commitments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 col-span-2">
              <h3 className="text-xl font-bold">How the EMI Calculation Works</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The standard formula for calculating EMI is: <br />
                <code className="bg-muted px-2 py-1 rounded">EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]</code><br /><br />
                Where:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>P:</strong> Principal loan amount (the amount you borrow).</li>
                  <li><strong>R:</strong> Monthly interest rate (Annual rate divided by 12).</li>
                  <li><strong>N:</strong> Loan tenure in months (Years multiplied by 12).</li>
                </ul>
                Manually calculating this can be complex, especially for long-term home loans. Our smart tool automates this process, giving you results in milliseconds.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Why Use Our Tool?</h3>
              <ul className="space-y-3">
                {[
                  "Instant Results: Fast and accurate.",
                  "Interactive Sliders: See how changes impact EMI.",
                  "Zero Costs: Fully free to use.",
                  "Privacy: No data is saved."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-start gap-4">
            <TrendingUp className="h-8 w-8 text-emerald-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-emerald-900 mb-1">Pro Tip for Borrowers</h4>
              <p className="text-sm text-emerald-800">
                Increasing your monthly EMI by even a small amount or making part-payments can significantly reduce your total interest burden and help you close your loan much earlier than planned. Use our calculator to see how a shorter tenure drastically reduces the 'Total Interest' component.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
