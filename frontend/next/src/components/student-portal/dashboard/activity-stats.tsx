'use client';

import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';

import type React from 'react';

interface ActivityStatsProps {
  statsCards: Array<{
    label: string;
    value: number;
    total?: number;
    trend: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
  }>;
}

export function ActivityStats({ statsCards }: ActivityStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card
            key={i}
            className={`relative overflow-hidden transition-all hover:shadow-md ${
              card.color
                ? `bg-linear-to-br ${card.color}`
                : 'from-primary/5 border-primary/20 bg-linear-to-br to-transparent'
            }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-muted-foreground text-sm font-semibold">
                  {card.label}
                </CardTitle>
                <div className="bg-primary/10 rounded-lg p-2">
                  <Icon className="text-primary h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-foreground text-3xl font-bold">
                {card.value}
                {card.total && <span className="text-muted-foreground text-lg">/{card.total}</span>}
              </p>
              <p className="text-muted-foreground text-xs">{card.trend}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
