import { Trophy } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { Progress } from '~/shared/shadcn/progress';

interface AchievementsCardProps {
  user: {
    currentAtsScore: number;
    totalSessions: number;
    focusAreas: Array<{ category: string; count: number; color: string }>;
  };
  badges: Array<{ id: number; label: string; icon: string }>;
}

export function AchievementsCard({ user, badges }: AchievementsCardProps) {
  return (
    <Card className="border-border overflow-hidden border">
      {/* Section A: Trophy Case */}
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Badges Earned
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex flex-wrap gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="group relative">
              <div className="absolute inset-0 rounded-lg bg-linear-to-br from-yellow-200/50 to-yellow-400/50 opacity-75 blur-md transition-opacity group-hover:opacity-100" />
              <div className="relative min-w-32 rounded-lg border-2 border-yellow-300 bg-linear-to-br from-yellow-100 to-yellow-50 px-4 py-3 text-center transition-shadow hover:shadow-lg">
                <div className="mb-2 text-3xl">{badge.icon}</div>
                <p className="text-xs font-semibold text-yellow-900">{badge.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Section B: Performance Footer */}
      <div className="border-border border-t bg-slate-50/50 px-6 py-6 dark:bg-slate-950/30">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Col 1: Resume Strength */}
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">Current ATS Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-primary text-4xl font-bold">{user.currentAtsScore}%</span>
              <span className="text-muted-foreground text-sm">Good</span>
            </div>
            <Progress value={user.currentAtsScore} className="h-2" />
          </div>

          {/* Col 2: Interview Volume */}
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">Total Sessions</p>
            <div className="flex items-baseline gap-2">
              <span className="text-foreground text-4xl font-bold">{user.totalSessions}</span>
            </div>
            <p className="text-muted-foreground text-xs">Sessions completed this month</p>
          </div>

          {/* Col 3: Session Breakdown */}
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm font-medium">Focus Areas</p>
            <div className="space-y-2">
              {user.focusAreas.map((area, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${area.color}`} />
                  <span className="text-foreground font-medium">{area.category}</span>
                  <span className="text-muted-foreground ml-auto">{area.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
