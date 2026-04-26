'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '~/lib/api';

import { CheckCircle2, ChevronLeft, MessageSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { Button } from '~/shared/shadcn/button';
import { Badge } from '~/shared/shadcn/badge';
import { Skeleton } from '~/shared/shadcn/skeleton';

export default function InterviewSummary() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params['interview-id'] as string;
  const userId = params['user-id'] as string;

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get(`/interviews/${sessionId}`);
        setSessionData(res.data.session);
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Failed to fetch interview details", err);
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) fetchSession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-4xl space-y-4">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="mb-4 h-12 w-12 text-rose-500" />
        <h2 className="text-2xl font-bold">Session Not Found</h2>
        <Button onClick={() => router.push(`/student-portal/${userId}/profile`)} className="mt-4">
          Return to Profile
        </Button>
      </div>
    );
  }

  // Filter out the initial welcome message from the agent to calculate total questions
  const qaPairs = [];
  let currentQ: any = null;

  for (const msg of messages) {
    if (msg.role === 'agent') {
      currentQ = msg;
    } else if (msg.role === 'user' && currentQ) {
      qaPairs.push({
        question: currentQ.content,
        answer: msg.content,
        feedback: currentQ.feedback_json || {} // Agent's evaluation comes in the NEXT agent message typically, but let's just display what we have for now
      });
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2 cursor-pointer hover:underline" onClick={() => router.push(`/student-portal/${userId}/profile`)}>
              <ChevronLeft className="h-4 w-4" /> Back to Dashboard
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Interview Completed</h1>
            <p className="text-muted-foreground mt-1 text-lg">
              {sessionData.domain} • {sessionData.difficulty}
            </p>
          </div>
          <Badge variant="secondary" className="px-4 py-2 text-sm max-w-fit">
            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
            Session Saved
          </Badge>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-indigo-500" />
            Conversation Review
          </h2>
          
          {messages.map((msg, idx) => {
            if (msg.role === 'user') {
              const agentEval = messages.slice(idx).find(m => m.role === 'agent' && m.feedback_json);

              return (
                <Card key={msg.id} className="overflow-hidden border-none shadow-md">
                  <div className="bg-slate-900 p-6 text-white">
                    <p className="text-sm font-medium text-slate-400 mb-2">Your Answer</p>
                    <p className="text-lg leading-relaxed">{msg.content}</p>
                  </div>
                  
                  {agentEval && agentEval.feedback_json && (
                    <CardContent className="bg-white p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">AI Feedback</p>
                          <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                            {agentEval.feedback_json.feedback || "Good attempt."}
                          </p>
                        </div>
                        <div className="space-y-2 rounded-lg bg-emerald-50 p-4 border border-emerald-100">
                          <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Better Way to Say It</p>
                          <p className="text-emerald-900 leading-relaxed text-sm">
                            {agentEval.feedback_json.better_answer || "N/A"}
                          </p>
                        </div>
                      </div>
                      
                      {agentEval.feedback_json.filler_words_detected?.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider">Filler Words Detected</p>
                          <div className="flex flex-wrap gap-2">
                            {agentEval.feedback_json.filler_words_detected.map((word: string, wIdx: number) => (
                              <Badge key={wIdx} variant="outline" className="border-rose-200 text-rose-600 bg-rose-50">
                                {word}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
