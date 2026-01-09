'use client';

import { Lightbulb, MessageCircle, Sparkles, Users } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';

export function HrCommunication() {
  const handleStartSession = () => {
    console.log('Starting HR & Behavioral Round session');
  };

  return (
    <div className="w-full">
      <Card className="via-background to-background relative overflow-hidden border-rose-200 bg-linear-to-br from-rose-50 transition-shadow duration-300 hover:shadow-lg">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-bl from-rose-100/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-linear-to-tr from-pink-100/20 to-transparent blur-3xl" />

        <div className="relative p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left section: Title and description */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/50 bg-rose-100/50 px-3 py-1">
                <Sparkles className="h-3 w-3 text-rose-600" />
                <span className="text-xs font-medium text-rose-700">Soft Skills Training</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground text-3xl font-bold tracking-tight">
                  HR & Communication Studio
                </h3>
                <p className="text-muted-foreground text-lg">
                  Master behavioral questions, situational responses, and communication excellence.
                  Build confidence in HR and behavioral rounds.
                </p>
              </div>

              {/* Feature bullets */}
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-muted-foreground text-sm">Communication Skills</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-muted-foreground text-sm">Behavioral Scenarios</span>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-muted-foreground text-sm">Real-world Situations</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span className="text-muted-foreground text-sm">Expert Feedback</span>
                </div>
              </div>
            </div>

            {/* Right section: CTA Button */}
            <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-6">
              <div className="hidden h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-rose-200 to-pink-200 shadow-lg md:flex">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <Button
                onClick={handleStartSession}
                className="h-auto bg-linear-to-r from-rose-500 to-pink-500 px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-pink-600 hover:shadow-xl">
                Start Session
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
