'use client';

import { Flame } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';

interface PumpStatsProps {
  userName: string;
  readinessScore: number;
  streak: number;
}

export function PumpStats({ readinessScore, streak }: PumpStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="from-primary/5 border-primary/20 bg-linear-to-br to-transparent md:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-primary text-sm font-semibold">Readiness Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <span className="text-primary text-4xl font-bold">{readinessScore}%</span>
                <span className="text-muted-foreground text-xs">of 100%</span>
              </div>
              <div className="bg-border h-3 w-full overflow-hidden rounded-full">
                <div
                  className="from-primary to-primary/80 h-full rounded-full bg-linear-to-r transition-all duration-500"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>

            {/* Context below the progress bar */}
            <p className="text-muted-foreground text-sm">
              Complete more interviews and puzzles to improve your readiness score
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-linear-to-br from-orange-50 to-transparent">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold text-orange-600">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            <Flame className="h-12 w-12 text-orange-500" />
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600">{streak}</p>
              <p className="text-sm text-orange-600/70">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
