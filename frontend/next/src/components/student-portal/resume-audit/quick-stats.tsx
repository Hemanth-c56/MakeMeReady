'use client';

import { Card } from '~/shared/shadcn/card';

interface QuickStatsProps {
  hardSkills: number;
  softSkills: number;
  actionVerbsPercentage: number;
  quantifiableResultsPercentage: number;
}

export function QuickStats({
  hardSkills,
  softSkills,
  actionVerbsPercentage,
  quantifiableResultsPercentage
}: QuickStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card className="border-l-4 border-blue-500 p-4 transition-all hover:shadow-md">
        <div className="text-muted-foreground mb-1 text-xs font-semibold">Hard Skills</div>
        <p className="text-foreground text-3xl font-bold">{hardSkills}</p>
        <p className="text-muted-foreground mt-1 text-xs">Found</p>
      </Card>

      <Card className="border-l-4 border-purple-500 p-4 transition-all hover:shadow-md">
        <div className="text-muted-foreground mb-1 text-xs font-semibold">Soft Skills</div>
        <p className="text-foreground text-3xl font-bold">{softSkills}</p>
        <p className="text-muted-foreground mt-1 text-xs">Found</p>
      </Card>
      <Card className="border-l-4 border-green-500 p-4 transition-all hover:shadow-md">
        <div className="text-muted-foreground mb-1 text-xs font-semibold">Action Verbs</div>
        <p className="text-foreground text-3xl font-bold">{actionVerbsPercentage}%</p>
        <p className="text-muted-foreground mt-1 text-xs">Used</p>
      </Card>
      <Card className="border-l-4 border-orange-500 p-4 transition-all hover:shadow-md">
        <div className="text-muted-foreground mb-1 text-xs font-semibold">Quantifiable</div>
        <p className="text-foreground text-3xl font-bold">{quantifiableResultsPercentage}%</p>
        <p className="text-muted-foreground mt-1 text-xs">Metrics</p>
      </Card>
    </div>
  );
}
