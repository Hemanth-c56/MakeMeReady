'use client';

import { useState } from 'react';

import { JobMatchInput } from '~/components/student-portal/job-match/job-match-input';
import { MatchResult } from '~/components/student-portal/job-match/match-result';
import api from '~/lib/api';

type AnalysisState = 'input' | 'results';

interface AnalysisData {
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
}



export default function JobMatchPage() {
  const [state, setState] = useState<AnalysisState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async (resumeId: string, jobDescription: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/job-match/analyze', {
        resume_id: resumeId,
        job_description: jobDescription,
      });
      setAnalysisData(response.data);
      setState('results');
    } catch (error) {
      console.error('Job match analysis failed:', error);
      alert('Failed to analyze job match. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setState('input');
    setAnalysisData(null);
  };

  return (
    <div className="bg-background min-h-screen px-4 py-12 md:px-6">
      <div className="mx-auto">
        {state === 'input' ? (
          <JobMatchInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : analysisData ? (
          <MatchResult data={analysisData} onBack={handleBack} />
        ) : null}
      </div>
    </div>
  );
}
