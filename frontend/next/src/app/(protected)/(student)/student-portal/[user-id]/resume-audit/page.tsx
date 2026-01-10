'use client';

import { useState } from 'react';

import { BookOpen, Download, FileSearch } from 'lucide-react';

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

const mockResumes = [
  {
    id: 1,
    name: 'Frontend_Resume_v1.pdf',
    analysis: {
      overallScore: 90,
      atsScore: 78,
      keywordMatchScore: 65,
      experienceRelevanceScore: 70,
      skillsCoverageScore: 68,
      formatReadabilityScore: 85,
      hardSkills: 12,
      softSkills: 5,
      actionVerbsPercentage: 72,
      quantifiableResultsPercentage: 45,
      strengths: [
        'Contact info is clear and professional',
        'Education is properly formatted',
        'GitHub portfolio link included',
        'Strong technical skills section',
        'Clean, readable formatting'
      ],
      improvements: [
        'Summary lacks critical keywords for your target role',
        'Project descriptions lack metrics and impact',
        'Missing quantifiable achievements',
        'Could add more leadership examples'
      ],
      actionPlan: [
        {
          title: 'Enhance Project Impact Metrics',
          description:
            'Add performance improvements, user engagement metrics, or load time reductions to each project'
        },
        {
          title: 'Expand Technical Keywords',
          description:
            'Include specific frameworks, tools, and technologies mentioned in job descriptions'
        },
        {
          title: 'Add Professional Summary',
          description: 'Create a targeted summary highlighting core competencies and career goals'
        },
        {
          title: 'Quantify All Achievements',
          description:
            'Replace vague statements with numbers: users impacted, % improvement, revenue generated'
        }
      ],
      careerProgression: [
        { year: 2020, level: '2' },
        { year: 2021, level: '3' },
        { year: 2022, level: '3' },
        { year: 2023, level: '4' },
        { year: 2024, level: '4' }
      ],
      industryAlignment: [
        { industry: 'Tech Startups', match: 92 },
        { industry: 'SaaS', match: 88 },
        { industry: 'E-commerce', match: 75 }
      ],
      keywordDensity: [
        { keyword: 'React', count: 8 },
        { keyword: 'TypeScript', count: 6 },
        { keyword: 'Node.js', count: 5 },
        { keyword: 'AWS', count: 4 }
      ],
      interviewReadinessScore: 70,
      competitiveTierScore: 68,
      improvementSuggestions: [
        'Add metrics for each achievement (users, revenue, % improvement)',
        'Include 2-3 more complex projects',
        'Highlight leadership and mentoring experiences',
        'Add professional certifications or continued learning'
      ],
      personalityMatch: 'Growth-oriented, detail-focused technical professional',
      potentialRoles: [
        'Senior Frontend Engineer',
        'Full Stack Engineer',
        'Tech Lead',
        'Product Engineer'
      ]
    } as AuditResults
  },
  {
    id: 2,
    name: 'FullStack_Final.pdf',
    analysis: {
      overallScore: 40,
      atsScore: 92,
      keywordMatchScore: 87,
      experienceRelevanceScore: 85,
      skillsCoverageScore: 90,
      formatReadabilityScore: 88,
      hardSkills: 18,
      softSkills: 8,
      actionVerbsPercentage: 95,
      quantifiableResultsPercentage: 85,
      strengths: [
        'Comprehensive technical skills section',
        'Strong project portfolio with measurable impact',
        'Clear career progression visible',
        'Professional formatting and layout',
        'Multiple languages and frameworks demonstrated',
        'Excellent use of action verbs',
        'Quantified business impact in most projects'
      ],
      improvements: [
        'Could add more leadership and mentoring examples',
        'Consider adding industry certifications'
      ],
      actionPlan: [
        {
          title: 'Highlight Team Leadership',
          description: 'Add 1-2 examples of mentoring, team building, or project leadership'
        },
        {
          title: 'Add Business Impact Context',
          description:
            'Show how technical work translated to business outcomes (revenue, user growth, cost savings)'
        },
        {
          title: 'Include Advanced Certifications',
          description: 'Add AWS, GCP, or specialized certifications if applicable'
        }
      ],
      careerProgression: [
        { year: 2019, level: '2' },
        { year: 2020, level: '3' },
        { year: 2021, level: '4' },
        { year: 2022, level: '4' },
        { year: 2023, level: '5' },
        { year: 2024, level: '5' }
      ],
      industryAlignment: [
        { industry: 'Tech Companies', match: 96 },
        { industry: 'SaaS', match: 94 },
        { industry: 'Fintech', match: 88 },
        { industry: 'E-commerce', match: 85 }
      ],
      keywordDensity: [
        { keyword: 'Leadership', count: 7 },
        { keyword: 'System Design', count: 6 },
        { keyword: 'Cloud Architecture', count: 5 },
        { keyword: 'Team', count: 8 }
      ],
      interviewReadinessScore: 88,
      competitiveTierScore: 87,
      improvementSuggestions: [
        'Consider adding open source contributions',
        'Highlight speaking engagements or community involvement',
        'Add blog posts or technical articles published'
      ],
      personalityMatch: 'Strategic leader with strong technical execution',
      potentialRoles: [
        'Engineering Manager',
        'Tech Lead',
        'Staff Engineer',
        'Principal Engineer',
        'Director of Engineering'
      ]
    } as AuditResults
  }
];

export default function ResumeAuditPage() {
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedResume = mockResumes.find((r) => r.id === selectedResumeId);
  const auditData = selectedResume?.analysis;

  const handleLoadReport = () => {
    if (selectedResumeId) {
      setIsLoaded(true);
    }
  };

  const handleReset = () => {
    setSelectedResumeId(null);
    setIsLoaded(false);
  };

  return (
    <div className="from-background via-secondary/5 to-background min-h-screen bg-linear-to-br p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-card border-border mb-8 flex flex-col items-center justify-between gap-4 rounded-xl border p-6 shadow-sm sm:flex-row">
          <div className="w-full flex-1 sm:w-auto">
            <label className="text-foreground mb-2 block text-sm font-semibold">
              Select Resume Version
            </label>
            <Select
              value={selectedResumeId?.toString() || ''}
              onValueChange={(val) => setSelectedResumeId(Number(val))}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Choose a resume..." />
              </SelectTrigger>
              <SelectContent>
                {mockResumes.length > 0 ? (
                  mockResumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id.toString()}>
                      {resume.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-resume" disabled>
                    No resumes found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleLoadReport}
            disabled={!selectedResumeId}
            className="flex w-full items-center gap-2 sm:w-auto">
            <FileSearch className="h-4 w-4" />
            Load Audit Report
          </Button>
        </div>

        {isLoaded && auditData && selectedResume && (
          <>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-foreground mb-2 text-4xl font-bold">Resume Analysis Report</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <FileSearch className="h-4 w-4" />
                  {selectedResume.name}
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
              Select a resume from your uploaded versions and unlock comprehensive AI-powered
              insights to land your dream role
            </p>
            <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-lg border px-4 py-2">
              <BookOpen className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-medium">
                {mockResumes.length} resume versions available
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
