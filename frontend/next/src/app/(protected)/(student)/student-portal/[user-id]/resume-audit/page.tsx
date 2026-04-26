'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Download, FileSearch, Upload, Loader2 } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/shared/shadcn/select';

import { InsightsSection } from '~/components/student-portal/resume-audit/insights-section';
import { QuickStats } from '~/components/student-portal/resume-audit/quick-stats';
import { ScoreHero } from '~/components/student-portal/resume-audit/score-hero';
import api from '~/lib/api';

interface AuditResults {
  overallScore: number;
  atsScore: number;
  keywordMatchScore: number;
  experienceRelevanceScore: number;
  skillsCoverageScore: number;
  formatReadabilityScore: number;
  hardSkills: number;
  softSkills: number;
  actionVerbsPercentage: number;
  quantifiableResultsPercentage: number;
  strengths: string[];
  improvements: string[];
  actionPlan: { title: string; description: string }[];
  careerProgression: { year: number; level: string }[];
  industryAlignment: { industry: string; match: number }[];
  keywordDensity: { keyword: string; count: number }[];
  interviewReadinessScore: number;
  competitiveTierScore: number;
  improvementSuggestions: string[];
  personalityMatch: string;
  potentialRoles: string[];
}

interface ResumeResponse {
  id: string;
  user_id: string;
  raw_text: string;
  file_hash?: string;
  analysis_json?: string;
  created_at: string;
}

export default function ResumeAuditPage() {
  const [resumes, setResumes] = useState<ResumeResponse[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);

  // Fetch resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get<ResumeResponse[]>('/resumes/');
        setResumes(response.data);
      } catch (error) {
        console.error("Failed to fetch resumes", error);
      } finally {
        setIsLoadingResumes(false);
      }
    };
    fetchResumes();
  }, []);

  const selectedResume = resumes.find((r) => r.id === selectedResumeId);
  const auditData: AuditResults | null = selectedResume && selectedResume.analysis_json 
    ? JSON.parse(selectedResume.analysis_json) 
    : null;

  const handleLoadReport = () => {
    if (selectedResumeId && auditData) {
      setIsLoaded(true);
    }
  };

  const handleReset = () => {
    setSelectedResumeId(null);
    setIsLoaded(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post<ResumeResponse>('/resumes/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // Add to list if not already present
      setResumes((prev) => {
        const exists = prev.find(r => r.id === response.data.id);
        if (exists) return prev;
        return [response.data, ...prev];
      });
      setSelectedResumeId(response.data.id);
      setIsLoaded(true);
    } catch (error) {
      console.error("Failed to upload resume", error);
      alert("Failed to evaluate resume. Check console.");
    } finally {
      setIsUploading(false);
      // clear input
      event.target.value = '';
    }
  };

  const handleDownloadReport = () => {
    if (!auditData) return;
    const jsonStr = JSON.stringify(auditData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-analysis-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="from-background via-secondary/5 to-background min-h-screen bg-linear-to-br p-4 md:px-6">
      <div className="mx-auto">
        <div className="bg-card border-border mb-8 flex flex-col items-center justify-between gap-4 rounded-xl border p-6 shadow-sm sm:flex-row">
          <div className="w-full flex-1 sm:w-auto">
            <label className="text-foreground mb-2 block text-sm font-semibold">
              Select Resume Version
            </label>
            <Select
              value={selectedResumeId || ''}
              onValueChange={(val) => {
                setSelectedResumeId(val);
                setIsLoaded(false);
              }}
              disabled={isLoadingResumes}
            >
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder={isLoadingResumes ? "Loading..." : "Choose a resume..."} />
              </SelectTrigger>
              <SelectContent>
                {resumes.length > 0 ? (
                  resumes.map((resume, idx) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      Resume Version {resumes.length - idx} ({new Date(resume.created_at).toLocaleDateString()})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-resume" disabled>
                    No resumes uploaded
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              onClick={handleLoadReport}
              disabled={!selectedResumeId || !auditData}
              variant="secondary"
              className="flex-1 sm:flex-none">
              <FileSearch className="mr-2 h-4 w-4" />
              Load Report
            </Button>

            <div className="relative flex-1 sm:flex-none">
              <input
                type="file"
                accept=".pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                onChange={handleFileUpload}
                disabled={isUploading}
                title="Upload new PDF"
              />
              <Button
                disabled={isUploading}
                className="w-full flex items-center gap-2">
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {isUploading ? 'Analyzing AI...' : 'Upload & Audit New'}
              </Button>
            </div>
          </div>
        </div>

        {isLoaded && auditData && selectedResume && (
          <>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-foreground mb-2 text-4xl font-bold">Resume Analysis Report</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <FileSearch className="h-4 w-4" />
                  Analyzed on {new Date(selectedResume.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent sm:flex-none"
                  onClick={handleReset}>
                  Select Another
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent sm:flex-none"
                  onClick={handleDownloadReport}
                  size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScoreHero auditData={auditData} />

            <QuickStats
              hardSkills={auditData.hardSkills}
              softSkills={auditData.softSkills}
              actionVerbsPercentage={auditData.actionVerbsPercentage}
              quantifiableResultsPercentage={auditData.quantifiableResultsPercentage}
            />

            <InsightsSection
              strengths={auditData.strengths}
              improvements={auditData.improvements}
              interviewReadinessScore={auditData.interviewReadinessScore}
              competitiveTierScore={auditData.competitiveTierScore}
              actionPlan={auditData.actionPlan}
              potentialRoles={auditData.potentialRoles}
              personalityMatch={auditData.personalityMatch}
            />
          </>
        )}

        {!isLoaded && (
          <Card className="border-border border-2 border-dashed p-16 text-center">
            <FileSearch className="text-muted-foreground mx-auto mb-6 h-16 w-16 opacity-50" />
            <h2 className="text-foreground mb-3 text-2xl font-bold">
              Ready to Analyze Your Resume?
            </h2>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              Select an existing resume or upload a new PDF version to unlock comprehensive AI-powered
              insights to land your dream role
            </p>
            <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-lg border px-4 py-2">
              <BookOpen className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-medium">
                {resumes.length} resume versions available
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
