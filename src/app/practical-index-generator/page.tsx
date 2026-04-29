
'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListOrdered, Plus, Trash2, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AdBanner } from '@/components/ad-banner';
import { useToast } from '@/hooks/use-toast';

export default function PracticalIndexGeneratorPage() {
  const [experiments, setExperiments] = useState([{ id: 1, title: '', date: '', page: '' }]);
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const { toast } = useToast();

  const addRow = () => setExperiments([...experiments, { id: Date.now(), title: '', date: '', page: '' }]);
  const removeRow = (id: number) => setExperiments(experiments.filter(e => e.id !== id));

  const updateRow = (id: number, field: string, val: string) => {
    setExperiments(experiments.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const generatePDF = () => {
    const doc = new jsPDF() as any;
    doc.setFontSize(22);
    doc.text('INDEX', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Name: ${studentName}`, 20, 35);
    doc.text(`Roll No: ${rollNo}`, 140, 35);

    const tableData = experiments.map((exp, i) => [i + 1, exp.title, exp.date, exp.page]);
    doc.autoTable({
      startY: 45,
      head: [['S.No', 'Title of Experiment', 'Date', 'Page No']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [50, 50, 50] }
    });

    doc.save('practical-index.pdf');
    toast({ title: 'Success', description: 'Index page generated.' });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <div className="p-3 bg-red-100 rounded-2xl inline-flex text-red-600">
            <ListOrdered className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Practical File Index Generator</h1>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">Create professional index pages for your lab manuals and practical files in seconds.</p>
        </section>

        <AdBanner />

        <Card className="rounded-3xl border-border/50 shadow-sm">
          <CardHeader className="flex md:flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Experiment List</CardTitle>
              <CardDescription>Add experiments and their details for the table.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Input placeholder="Your Name" value={studentName} onChange={e => setStudentName(e.target.value)} className="w-32" />
                <Input placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} className="w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {experiments.map((exp, i) => (
              <div key={exp.id} className="grid grid-cols-12 gap-2 items-end border-b pb-4">
                <div className="col-span-1 text-xs font-bold opacity-50 text-center">{i + 1}</div>
                <div className="col-span-6 space-y-1">
                  <Label className="text-[10px] uppercase">Title</Label>
                  <Input value={exp.title} onChange={e => updateRow(exp.id, 'title', e.target.value)} placeholder="Experiment Title" />
                </div>
                <div className="col-span-2 space-y-1">
                   <Label className="text-[10px] uppercase">Date</Label>
                   <Input value={exp.date} onChange={e => updateRow(exp.id, 'date', e.target.value)} placeholder="DD/MM" />
                </div>
                <div className="col-span-2 space-y-1">
                   <Label className="text-[10px] uppercase">Page</Label>
                   <Input value={exp.page} onChange={e => updateRow(exp.id, 'page', e.target.value)} placeholder="P.No" />
                </div>
                <div className="col-span-1">
                  <Button variant="ghost" size="icon" onClick={() => removeRow(exp.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addRow} className="w-full border-dashed"><Plus className="mr-2 h-4 w-4" /> Add Experiment</Button>
          </CardContent>
          <CardFooter>
            <Button onClick={generatePDF} className="w-full h-12 font-bold bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" /> Download Index Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
