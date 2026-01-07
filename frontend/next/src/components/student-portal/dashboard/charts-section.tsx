'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';

interface ChartsSectionProps {
  consistencyData: Array<{
    day: string;
    interviews: number;
    puzzles: number;
  }>;
  skillData: Array<{
    skill: string;
    value: number;
  }>;
}

export function ChartsSection({ consistencyData, skillData }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Consistency Tracker</CardTitle>
          <p className="text-muted-foreground mt-1 text-xs">Last 7 days activity</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consistencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-primary)`,
                  borderRadius: '0.625rem',
                  position: 'relative',
                  zIndex: 50
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
                cursor={{ fill: 'var(--color-primary)', fillOpacity: 0.1 }}
              />
              <Legend />
              <Bar
                dataKey="interviews"
                stackId="a"
                fill="var(--color-chart-1)"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="puzzles"
                stackId="a"
                fill="var(--color-chart-2)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Skill Analysis</CardTitle>
          <p className="text-muted-foreground mt-1 text-xs">Your strengths & gaps</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillData.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-foreground text-sm font-medium">{skill.skill}</span>
                  <span className="text-primary text-xs font-semibold">{skill.value}%</span>
                </div>
                <div className="bg-border h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="from-primary to-primary/60 h-full rounded-full bg-linear-to-r transition-all duration-500"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
