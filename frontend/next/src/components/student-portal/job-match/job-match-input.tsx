'use client';

import { useState, useEffect } from 'react';

import { Sparkles, AlertCircle } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';
import api from '~/lib/api';

interface JobMatchInputProps {
  onAnalyze: (resumeId: string, jobDescription: string) => void;
  isLoading?: boolean;
}

export function JobMatchInput({ onAnalyze, isLoading = false }: JobMatchInputProps) {
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumes, setResumes] = useState<any[]>([]);
  const [fetchingResumes, setFetchingResumes] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/resumes/');
        setResumes(response.data);
        if (response.data && response.data.length > 0) {
          setSelectedResumeId(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
      } finally {
        setFetchingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  const handleAnalyze = () => {
    if (jobDescription.trim() && selectedResumeId) {
      onAnalyze(selectedResumeId, jobDescription);
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
          
          {fetchingResumes ? (
            <div className="text-muted-foreground text-sm">Loading resumes...</div>
          ) : resumes.length === 0 ? (
            <div className="flex items-center gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-500">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">No resumes uploaded yet. Please upload a resume first to use the Job Match feature.</p>
            </div>
          ) : (
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none">
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  Resume uploaded on {new Date(resume.created_at).toLocaleDateString()}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Job Description Input */}
        <div className="space-y-3">
          <label className="text-foreground text-sm font-semibold">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the Job Description (JD) text here..."
            rows={10}
            disabled={resumes.length === 0 || fetchingResumes}
            className="border-border bg-card text-foreground placeholder-muted-foreground focus:ring-primary w-full resize-none rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Action Button */}
        <Button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || isLoading || resumes.length === 0 || fetchingResumes}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          {isLoading ? 'Analyzing...' : 'Analyze Match'}
        </Button>
      </Card>
    </div>
  );
}
