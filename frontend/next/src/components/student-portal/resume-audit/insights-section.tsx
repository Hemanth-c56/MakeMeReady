'use client';

import {
  AlertTriangle,
  Award,
  Briefcase,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react';

import { Card } from '~/shared/shadcn/card';
import { Progress } from '~/shared/shadcn/progress';

interface InsightsSectionProps {
  strengths: string[];
  improvements: string[];
  interviewReadinessScore: number;
  competitiveTierScore: number;
  actionPlan: { title: string; description: string }[];
  potentialRoles: string[];
  personalityMatch: string;
}

export function InsightsSection({
  strengths,
  improvements,
  interviewReadinessScore,
  competitiveTierScore,
  actionPlan,
  potentialRoles,
  personalityMatch
}: InsightsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-6 flex items-center gap-2 text-2xl font-bold">
          <Lightbulb className="text-primary h-6 w-6" />
          Resume Insights
        </h2>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <Card className="border-l-4 border-green-500 transition-shadow hover:shadow-md">
          <div className="p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Winning Factors
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                  <span className="text-foreground text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Improvements */}
        <Card className="border-l-4 border-amber-500 transition-shadow hover:shadow-md">
          <div className="p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Critical Improvements
            </h3>
            <ul className="space-y-3">
              {improvements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-foreground text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      {/* Interview Readiness & Competitive Tier */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-blue-500 transition-shadow hover:shadow-md">
          <div className="p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-blue-500" />
              Interview Readiness
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-500">{interviewReadinessScore}%</div>
              <div className="flex-1">
                <Progress value={interviewReadinessScore} className="mb-2 h-2" />
                <p className="text-muted-foreground text-xs">
                  How prepared you are for interview discussions
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-purple-500 transition-shadow hover:shadow-md">
          <div className="p-6">
            <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
              <Award className="h-5 w-5 text-purple-500" />
              Competitive Tier
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-purple-500">{competitiveTierScore}%</div>
              <div className="flex-1">
                <Progress value={competitiveTierScore} className="mb-2 h-2" />
                <p className="text-muted-foreground text-xs">
                  Where you stand among peer candidates
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Plan */}
      <Card className="border-primary border-l-4 transition-shadow hover:shadow-md">
        <div className="p-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
            <TrendingUp className="text-primary h-5 w-5" />
            Action Plan
          </h3>
          <div className="space-y-4">
            {actionPlan.map((action, i) => (
              <div
                key={i}
                className="border-border flex gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <div className="bg-primary/20 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground mb-1 font-semibold">{action.title}</h4>
                  <p className="text-muted-foreground text-sm">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Target Roles Section */}
      <Card className="border-l-4 border-emerald-500 transition-shadow hover:shadow-md">
        <div className="p-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold">
            <Briefcase className="h-5 w-5 text-emerald-500" />
            Recommended Roles
          </h3>
          <div className="mb-6 space-y-3">
            {potentialRoles.map((role, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-foreground text-sm font-medium">{role}</span>
              </div>
            ))}
          </div>
          <div className="border-border border-t pt-4">
            <p className="text-foreground mb-2 text-sm font-semibold">Personality Profile</p>
            <p className="text-muted-foreground text-sm italic">"{personalityMatch}"</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
