'use client';

import { useState } from 'react';

import { AlertCircle, ArrowRight, Check, Copy } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';

interface MatchResultsProps {
  data: {
    match_percentage: number;
    verdict_short: string;
    matched_keywords: string[];
    missing_keywords: string[];
    resume_improvements: Array<{
      title: string;
      reason: string;
      original: string;
      suggested: string;
    }>;
  };
  onBack: () => void;
}

export function MatchResult({ data, onBack }: MatchResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-amber-500';
    if (percentage >= 40) return 'text-orange-500';
    return 'text-rose-600';
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return 'from-emerald-50 to-teal-50 border-emerald-200';
    if (percentage >= 60) return 'from-amber-50 to-orange-50 border-amber-200';
    if (percentage >= 40) return 'from-orange-50 to-red-50 border-orange-200';
    return 'from-rose-50 to-red-50 border-rose-200';
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
        <ArrowRight className="h-4 w-4 rotate-180" />
        Back
      </Button>

      {/* Score Hero Card */}
      <div className={`bg-linear-to-br ${getScoreBg(data.match_percentage)} rounded-xl border p-8`}>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Circular Gauge */}
          <div className="shrink-0">
            <div className="relative h-40 w-40">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-300"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(data.match_percentage / 100) * 339.29} 339.29`}
                  className={`transition-all duration-500 ${getScoreColor(data.match_percentage)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getScoreColor(data.match_percentage)}`}>
                  {data.match_percentage}%
                </span>
                <span className="text-muted-foreground text-sm">Match</span>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="flex-1 space-y-2">
            <h2 className="text-foreground text-2xl font-bold">{data.verdict_short}</h2>
            <p className="text-muted-foreground">
              This analysis shows how well your resume aligns with the job description. Use the
              suggestions below to optimize your resume for better chances.
            </p>
          </div>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Matched Keywords */}
        <Card className="space-y-4 border-emerald-200 bg-emerald-50/30 p-6">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-600" />
            <h3 className="text-foreground font-semibold">Matched Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.matched_keywords.map((keyword, idx) => (
              <Badge
                key={idx}
                className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                <Check className="h-3 w-3" />
                {keyword}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Missing Keywords */}
        <Card className="space-y-4 border-rose-200 bg-rose-50/30 p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-rose-600" />
            <h3 className="text-foreground font-semibold">Missing Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.missing_keywords.map((keyword, idx) => (
              <Badge key={idx} className="gap-1 bg-rose-100 text-rose-700 hover:bg-rose-200">
                <AlertCircle className="h-3 w-3" />
                {keyword}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Resume Improvements */}
      <div className="space-y-4">
        <h3 className="text-foreground text-xl font-bold">Resume Improvements</h3>
        <div className="space-y-4">
          {data.resume_improvements.map((improvement, idx) => (
            <Card key={idx} className="border-border space-y-4 p-6">
              <div>
                <h4 className="text-foreground mb-1 font-semibold">{improvement.title}</h4>
                <p className="text-muted-foreground text-sm">{improvement.reason}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Original */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-semibold">Original</label>
                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm text-rose-700 line-through">{improvement.original}</p>
                  </div>
                </div>

                {/* Suggested */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-semibold">Suggested</label>
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-sm font-medium text-emerald-700">{improvement.suggested}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(improvement.suggested, idx)}
                      className="h-auto p-1">
                      <Copy
                        className={`h-4 w-4 ${copiedIndex === idx ? 'text-emerald-600' : 'text-muted-foreground'}`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
