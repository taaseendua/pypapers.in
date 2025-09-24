import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, QrCode } from 'lucide-react';

const tools = [
  {
    title: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and more.',
    href: '/qr-code-generator',
    icon: <QrCode className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome to Utility Tools</h2>
        </div>
        <p className="text-muted-foreground">
          A collection of handy, easy-to-use tools to help with your daily tasks.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.title} className="flex flex-col">
              <CardHeader>
                <div className="mb-4">{tool.icon}</div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <div className="p-6 pt-0">
                <Link href={tool.href}>
                  <Button>
                    Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
