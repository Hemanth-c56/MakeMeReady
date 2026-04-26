'use client';

import { Eye } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/shared/shadcn/dialog';

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  //eslint-disable-next-line
  feedback: Record<string, any>;
}

interface ActivityHistoryProps {
  activities: Activity[];
}

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-2xl font-bold">Interview History</h2>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full text-lg">
                {activity.icon}
              </div>
              {idx !== activities.length - 1 && <div className="bg-border mt-2 h-12 w-0.5" />}
            </div>

            {/* Activity content */}
            <div className="flex-1 pt-1">
              <p className="text-foreground font-semibold">{activity.title}</p>
              <p className="text-muted-foreground text-sm">{activity.description}</p>
              <p className="text-muted-foreground mt-1 text-xs">{activity.time}</p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 mt-2">
                    <Eye className="mr-1 h-4 w-4" />
                    View Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-96 max-w-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{activity.title} - Results</DialogTitle>
                    <DialogDescription>{activity.time}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {/* Render feedback based on activity type */}
                    {/* Render feedback based on activity type */}
                    {activity.title === 'Job Match Analysis' && activity.feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-foreground font-semibold">Match Score</p>
                          <p className="text-primary mt-1 text-2xl font-bold">
                            {activity.feedback.matchScore || 0}%
                          </p>
                        </div>
                        {activity.feedback.matchedKeywords && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Matched Keywords</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.feedback.matchedKeywords.map((kw: string, i: number) => (
                              <span
                                key={i}
                                className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        )}
                        {activity.feedback.missingKeywords && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Missing Keywords</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.feedback.missingKeywords.map((kw: string, i: number) => (
                              <span
                                key={i}
                                className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                        )}
                        {activity.feedback.recommendations && (
                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                          <p className="text-foreground text-sm">
                            {activity.feedback.recommendations}
                          </p>
                        </div>
                        )}
                      </div>
                    )}
                    {activity.title === 'Mock Interview' && activity.feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-foreground font-semibold">Interview Score</p>
                          <p className="text-primary mt-1 text-2xl font-bold">
                            {activity.feedback.score || 0}/100
                          </p>
                          {activity.feedback.duration && (
                          <p className="text-muted-foreground mt-1 text-sm">
                            Duration: {activity.feedback.duration}
                          </p>
                          )}
                        </div>
                        {activity.feedback.strengths && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Strengths</p>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            {activity.feedback.strengths.map((s: string, i: number) => (
                              <li key={i} className="text-emerald-600">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        )}
                        {activity.feedback.improvements && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Areas to Improve</p>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            {activity.feedback.improvements.map((imp: string, i: number) => (
                              <li key={i} className="text-orange-600">
                                {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        )}
                        {activity.feedback.feedback && (
                          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                            <p className="text-foreground text-sm">
                              {activity.feedback.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {activity.title === 'Resume Audit' && activity.feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-foreground font-semibold">ATS Score</p>
                          <p className="text-primary mt-1 text-2xl font-bold">
                            {activity.feedback.atsScore || 0}%
                          </p>
                        </div>
                        {activity.feedback.strengths && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Strengths</p>
                          <ul className="list-inside list-disc space-y-1 text-sm text-emerald-600">
                            {activity.feedback.strengths.map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        )}
                        {activity.feedback.improvements && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Improvements</p>
                          <ul className="list-inside list-disc space-y-1 text-sm text-orange-600">
                            {activity.feedback.improvements.map((imp: string, i: number) => (
                              <li key={i}>{imp}</li>
                            ))}
                          </ul>
                        </div>
                        )}
                        {activity.feedback.suggestions && (
                          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                            <p className="text-foreground text-sm">
                              {activity.feedback.suggestions}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {(activity.title === 'Rapid Fire Drill' || activity.title === 'Drills Completed') && activity.feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-foreground font-semibold">Results</p>
                          <p className="mt-1 text-sm">
                            Solved:{' '}
                            <span className="text-primary font-bold">
                              {activity.feedback.solved || 0}/{activity.feedback.total || 0}
                            </span>
                          </p>
                          <p className="text-sm">
                            Accuracy:{' '}
                            <span className="text-primary font-bold">
                              {activity.feedback.accuracy || 0}%
                            </span>
                          </p>
                          {activity.feedback.avgTime && (
                          <p className="text-sm">
                            Average Time:{' '}
                            <span className="text-primary font-bold">
                              {activity.feedback.avgTime}
                            </span>
                          </p>
                          )}
                        </div>
                        {activity.feedback.topicsStrength && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Strengths</p>
                          <div className="flex flex-wrap gap-2">
                            {activity.feedback.topicsStrength.map((topic: string, i: number) => (
                              <span
                                key={i}
                                className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        )}
                      </div>
                    )}
                    {activity.title === 'Fundamentals Practice' && activity.feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-foreground font-semibold">Practice Session</p>
                          <p className="mt-2 text-sm">
                            Questions Answered:{' '}
                            <span className="text-primary font-bold">
                              {activity.feedback.questionsAnswered || 0}
                            </span>
                          </p>
                          <p className="text-sm">
                            Accuracy:{' '}
                            <span className="text-primary font-bold">
                              {activity.feedback.accuracy || 0}%
                            </span>
                          </p>
                        </div>
                        {activity.feedback.topicsCovered && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">Topics Covered</p>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            {activity.feedback.topicsCovered.map((topic: string, i: number) => (
                              <li key={i} className="text-foreground">
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        )}
                        {activity.feedback.nextTopics && (
                        <div>
                          <p className="text-foreground mb-2 font-semibold">
                            Next Topics to Practice
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {activity.feedback.nextTopics.map((topic: string, i: number) => (
                              <span
                                key={i}
                                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
