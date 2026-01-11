'use client';

import { useState } from 'react';

import { JobMatchInput } from '~/components/student-portal/job-match/job-match-input';
import { MatchResult } from '~/components/student-portal/job-match/match-result';

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

// Mock analysis data
const mockAnalysisData: AnalysisData = {
  match_percentage: 78,
  verdict_short: 'Strong technical match with minor gaps in cloud experience',
  matched_keywords: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'REST APIs', 'Git', 'Agile'],
  missing_keywords: ['AWS', 'GraphQL', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices'],
  resume_improvements: [
    {
      title: 'Add Cloud Platform Experience',
      reason: 'Job description emphasizes AWS experience, which is missing from your resume.',
      original: 'Full Stack Developer at Tech Corp',
      suggested: 'Full Stack Developer at Tech Corp - AWS Lambda, RDS, S3 experience'
    },
    {
      title: 'Highlight API Development',
      reason: 'Include GraphQL experience to match the job requirements.',
      original: 'Built REST APIs with Node.js',
      suggested: 'Built scalable APIs using REST and GraphQL with Node.js'
    },
    {
      title: 'Mention DevOps Skills',
      reason: 'Docker and containerization are key requirements.',
      original: 'Deployed applications to production',
      suggested: 'Deployed applications using Docker containers and CI/CD pipelines'
    }
  ]
};

export default function JobMatchPage() {
  const [state, setState] = useState<AnalysisState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // eslint-disable-next-line
  const handleAnalyze = async (resume: string, jobDescription: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisData(mockAnalysisData);
      setState('results');
      setIsLoading(false);
    }, 1500);
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
