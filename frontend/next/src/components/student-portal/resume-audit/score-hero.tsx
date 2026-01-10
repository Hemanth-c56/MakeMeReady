'use client';

import { Award, FileSearch, Target, TrendingUp, Zap } from 'lucide-react';

import { Card } from '~/shared/shadcn/card';
import { Progress } from '~/shared/shadcn/progress';

interface AuditResults {
  overallScore: number;
  atsScore: number;
  keywordMatchScore: number;
  experienceRelevanceScore: number;
  skillsCoverageScore: number;
  formatReadabilityScore: number;
}

interface ScoreHeroProps {
  auditData: AuditResults;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-blue-500';
  if (score >= 55) return 'text-amber-500';
  return 'text-red-500';
};

export function ScoreHero({ auditData }: ScoreHeroProps) {
  return (
    <Card className="border-primary/50 mb-8 overflow-hidden bg-linear-to-br">
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6 h-56 w-56">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-border"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={`${(auditData.overallScore / 100) * 565.5} 565.5`}
                  className={`${getScoreColor(auditData.overallScore)} transition-all`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-bold ${getScoreColor(auditData.overallScore)}`}>
                  {auditData.overallScore}
                </span>
                <span className="text-muted-foreground mt-2 text-sm">Overall Score</span>
              </div>
            </div>
            <p className="text-foreground mt-4 max-w-sm text-center text-sm">
              Your resume is in the{' '}
              {auditData.overallScore >= 85
                ? 'excellent'
                : auditData.overallScore >= 75
                  ? 'strong'
                  : auditData.overallScore >= 60
                    ? 'good'
                    : 'needs improvement'}{' '}
              range. Apply these insights to maximize your opportunities.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-semibold">ATS Score</span>
                </div>
                <span className={`text-lg font-bold ${getScoreColor(auditData.atsScore)}`}>
                  {auditData.atsScore}%
                </span>
              </div>
              <Progress value={auditData.atsScore} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-semibold">Keyword Match</span>
                </div>
                <span className={`text-lg font-bold ${getScoreColor(auditData.keywordMatchScore)}`}>
                  {auditData.keywordMatchScore}%
                </span>
              </div>
              <Progress value={auditData.keywordMatchScore} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-semibold">
                    Experience Relevance
                  </span>
                </div>
                <span
                  className={`text-lg font-bold ${getScoreColor(auditData.experienceRelevanceScore)}`}>
                  {auditData.experienceRelevanceScore}%
                </span>
              </div>
              <Progress value={auditData.experienceRelevanceScore} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-semibold">Skills Coverage</span>
                </div>
                <span
                  className={`text-lg font-bold ${getScoreColor(auditData.skillsCoverageScore)}`}>
                  {auditData.skillsCoverageScore}%
                </span>
              </div>
              <Progress value={auditData.skillsCoverageScore} className="h-2" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSearch className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-semibold">Readability</span>
                </div>
                <span
                  className={`text-lg font-bold ${getScoreColor(auditData.formatReadabilityScore)}`}>
                  {auditData.formatReadabilityScore}%
                </span>
              </div>
              <Progress value={auditData.formatReadabilityScore} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
