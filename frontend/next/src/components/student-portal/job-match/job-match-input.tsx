'use client';

import { useState } from 'react';

import { Sparkles } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';

interface JobMatchInputProps {
  onAnalyze: (resume: string, jobDescription: string) => void;
  isLoading?: boolean;
}

export function JobMatchInput({ onAnalyze, isLoading = false }: JobMatchInputProps) {
  const [selectedResume, setSelectedResume] = useState('full-stack-v1');
  const [jobDescription, setJobDescription] = useState('');

  const resumes = [
    { id: 'full-stack-v1', label: 'Full Stack Resume (v1)' },
    { id: 'frontend-v2', label: 'Frontend Focus (v2)' },
    { id: 'backend-v1', label: 'Backend Specialist (v1)' }
  ];

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      onAnalyze(selectedResume, jobDescription);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-bold">Target Role Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Compare your resume against any job description to find gaps.
        </p>
      </div>

      {/* Input Card */}
      <Card className="space-y-6 p-8">
        {/* Resume Selector */}
        <div className="space-y-3">
          <label className="text-foreground text-sm font-semibold">Select Resume</label>
          <select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
            className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none">
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.label}
              </option>
            ))}
          </select>
        </div>

        {/* Job Description Input */}
        <div className="space-y-3">
          <label className="text-foreground text-sm font-semibold">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the Job Description (JD) text here..."
            rows={10}
            className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-primary w-full resize-none rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || isLoading}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          {isLoading ? 'Analyzing...' : 'Analyze Match'}
        </Button>
      </Card>
    </div>
  );
}
