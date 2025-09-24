'use client';

import React from 'react';
import {
  Wand2,
  Wrench,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { AiRecommender } from './ai-recommender';

const navItems = [
  { id: 'tool', label: 'Tools', icon: Wrench },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = React.useState('tool');
  const [isAiRecommenderOpen, setIsAiRecommenderOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveCategory(item.id)}
                  isActive={activeCategory === item.id}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setIsAiRecommenderOpen(true)}>
                <Wand2 className="text-accent" />
                <span>AI Recommender</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {React.cloneElement(children as React.ReactElement, { activeCategory })}
      </SidebarInset>
      <AiRecommender
        open={isAiRecommenderOpen}
        onOpenChange={setIsAiRecommenderOpen}
      />
    </SidebarProvider>
  );
}
