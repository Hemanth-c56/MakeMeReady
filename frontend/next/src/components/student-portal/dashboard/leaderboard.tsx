'use client';

import { Badge } from '~/shared/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';

interface LeaderboardEntry {
  rank: number;
  name: string;
  interviews: number;
  assessments: number;
  puzzles: number;
  total: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

export function Leaderboard({ leaderboard }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Dedication Leaderboard</CardTitle>
        <p className="text-muted-foreground mt-1 text-xs">Ranked by total completed activities</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-semibold">
                  Rank
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-semibold">
                  Name
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-semibold">
                  Breakdown
                </th>
                <th className="text-muted-foreground px-4 py-3 text-right text-xs font-semibold">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-border border-b transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-primary/10 border-l-primary hover:bg-primary/15 border-l-4'
                      : 'hover:bg-muted/50'
                  }`}>
                  <td className="px-4 py-4">
                    <Badge
                      variant={entry.rank <= 3 ? 'default' : 'secondary'}
                      className={`font-semibold ${
                        entry.rank <= 3 ? 'from-primary to-primary/80 bg-linear-to-r' : ''
                      }`}>
                      {entry.rank}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-foreground font-medium">{entry.name}</p>
                    {entry.isCurrentUser && (
                      <p className="text-primary text-xs font-semibold">You</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-muted-foreground text-sm">
                      {entry.interviews} Int • {entry.assessments} Assmt • {entry.puzzles} Puz
                    </p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <p className="text-primary font-semibold">{entry.total}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
