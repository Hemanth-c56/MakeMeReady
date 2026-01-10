'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { BrainCircuit, Globe, Smartphone, Upload } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
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
import { Tabs, TabsList, TabsTrigger } from '~/shared/shadcn/tabs';
import { SmartTagInput } from '~/shared/components/smart-tag-input';

const domainTracks = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Master modern web technologies',
    icon: Globe,
    color: 'from-blue-50 to-transparent border-blue-200',
    badge: 'Most Popular',
    suggestions: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'GraphQL']
  },
  {
    id: 'mobile',
    title: 'Mobile App Dev',
    description: 'Build native and cross-platform apps',
    icon: Smartphone,
    color: 'from-purple-50 to-transparent border-purple-200',
    badge: 'Growing',
    suggestions: ['Swift', 'iOS', 'Kotlin', 'Android', 'React Native', 'Flutter']
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    description: 'Build intelligent systems with ML',
    icon: BrainCircuit,
    color: 'from-emerald-50 to-transparent border-emerald-200',
    badge: 'High Demand',
    suggestions: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'NLP', 'Computer Vision']
  }
];

export function DomainTracks() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState('midSenior');
  //eslint-disable-next-line
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const currentTrack = domainTracks.find((t) => t.id === selectedTrack);

  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {domainTracks.map((track) => {
          const Icon = track.icon;
          return (
            <Card
              key={track.id}
              onClick={() => setSelectedTrack(track.id)}
              className={`group cursor-pointer border-2 bg-linear-to-br transition-all hover:shadow-md ${track.color} overflow-hidden`}>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br transition-colors">
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <Badge className="text-xs">{track.badge}</Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold">{track.title}</h3>
                  <p className="text-muted-foreground text-sm">{track.description}</p>
                </div>

                <div className="pt-4">
                  <Button className="w-full" onClick={() => setSelectedTrack(track.id)}>
                    Configure Interview
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!selectedTrack} onOpenChange={() => selectedTrack && setSelectedTrack(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {currentTrack?.title} Session</DialogTitle>
            <DialogDescription>
              Choose your difficulty level, focus areas, and optionally upload your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Difficulty Level</Label>
              <Tabs value={difficulty} onValueChange={setDifficulty}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="junior">Junior</TabsTrigger>
                  <TabsTrigger value="midSenior">Mid-Senior</TabsTrigger>
                  <TabsTrigger value="staff">Staff</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Focus Areas</Label>
              <SmartTagInput
                suggestions={currentTrack?.suggestions || []}
                onTagsChange={setSelectedTags}
                placeholder={`Search skills like ${currentTrack?.suggestions.slice(0, 2).join(', ')}...`}
                helperText="Leave empty to start a General Interview covering all topics."
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Resume (Optional)</Label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="border-border hover:border-primary/50 hover:bg-primary/5 flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-4 transition-all">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-muted-foreground h-5 w-5" />
                    <span className="text-foreground text-sm font-medium">
                      {resumeFile ? resumeFile.name : 'Click to upload resume'}
                    </span>
                    <span className="text-muted-foreground text-xs">PDF, DOC, or DOCX</span>
                  </div>
                </label>
              </div>
            </div>

            <Button
              className="h-11 w-full text-base font-semibold"
              onClick={() => router.push('/student-interview/12345/interview/67343')}>
              Start Domain Interview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
