'use client';

import { useState } from 'react';

import { useRouter, useParams } from 'next/navigation';

import { FileText, Upload, Loader2 } from 'lucide-react';
import api from '~/lib/api';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/shared/shadcn/dialog';
import { Label } from '~/shared/shadcn/label';
import { Textarea } from '~/shared/shadcn/textarea';

import type React from 'react';

export function JobDescriptionBased() {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const router = useRouter();
  const params = useParams() || {};
  const userId = (params['user-id'] as string) || 'me';
  const [isStarting, setIsStarting] = useState(false);

  const startSession = async () => {
    try {
      setIsStarting(true);
      
      if (resumeFile) {
        const formData = new FormData();
        formData.append('file', resumeFile);
        
        await api.post('/resumes/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      
      const domainStr = `Custom Role. Job Description: ${jobDescription}`;

      const res = await api.post('/interviews/', {
        domain: domainStr,
        difficulty: 'midSenior',
      });
      
      const sessionId = res.data.session_id;
      router.push(`/student-interview/${userId}/interview/${sessionId}`);
    } catch (error) {
      console.error('Failed to start interview session', error);
      setIsStarting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files[0]) {
      setResumeFile(files[0]);
    }
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="border-border hover:border-primary/50 group from-primary/10 via-primary/5 relative cursor-pointer overflow-hidden border-2 bg-linear-to-br to-transparent transition-all hover:shadow-lg">
        <div className="relative flex min-h-80 flex-col justify-between p-8 md:p-12">
          <div className="space-y-4">
            <div className="bg-primary/20 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1">
              <FileText className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-medium">Premium Feature</span>
            </div>
            <h3 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
              Job Description Based
            </h3>
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
              Targeted at real job descriptions. Customize your interview to match a specific job
              description
            </p>
          </div>

          <div className="flex items-center justify-between pt-6">
            <span className="text-primary text-sm font-semibold transition-transform group-hover:translate-x-1">
              Click to start simulation
            </span>
            <div className="bg-primary/20 group-hover:bg-primary/30 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
              <FileText className="text-primary h-5 w-5" />
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Start Role-Specific Interview</DialogTitle>
            <DialogDescription>
              Paste your target job description and upload your resume to customize your interview
              experience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Job Description Textarea */}
            <div className="space-y-3">
              <Label htmlFor="job-desc" className="text-base font-semibold">
                Job Description
              </Label>
              <Textarea
                id="job-desc"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-80 resize-none"
              />
              <p className="text-muted-foreground text-xs">
                Provide the complete job description for accurate targeting
              </p>
            </div>

            {/* Resume Upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Upload Resume</Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="jd-resume-upload"
                />
                <label
                  htmlFor="jd-resume-upload"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-border hover:border-primary/50 hover:bg-primary/5 block cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all">
                  <Upload className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
                  <p className="text-foreground mb-1 text-sm font-medium">
                    Drag & drop your resume here
                  </p>
                  <p className="text-muted-foreground mb-4 text-xs">
                    or click to browse (PDF, DOC, DOCX)
                  </p>
                  {resumeFile && (
                    <p className="text-primary text-sm font-medium">{resumeFile.name}</p>
                  )}
                </label>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={startSession}
              className="h-11 w-full text-base font-semibold"
              disabled={!jobDescription.trim() || !resumeFile || isStarting}>
              {isStarting ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
              {isStarting ? 'Starting...' : 'Start Simulation'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
