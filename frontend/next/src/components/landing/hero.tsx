'use client';

import { ArrowRight, FileText, TrendingUp } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';

import { useScrollAnimation } from '~/hooks/use-scroll-animation';

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="bg-background relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary gradient orb */}
        <div className="bg-primary/20 animate-glow-pulse absolute top-20 right-10 h-72 w-72 rounded-full blur-3xl" />
        {/* Secondary gradient orb */}
        <div
          className="bg-primary/10 animate-glow-pulse absolute bottom-0 left-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: '2s' }}
        />
        {/* Accent orb */}
        <div className="bg-accent/15 animate-float-slow absolute top-1/3 left-10 h-64 w-64 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className={`mb-4 inline-block ${isVisible ? 'animate-slide-down' : 'opacity-0'}`}>
          <span className="bg-primary/10 border-primary/20 text-primary animate-shimmer inline-block rounded-full border px-4 py-2 text-sm font-medium">
            Master Your Interview
          </span>
        </div>

        <h1
          className={`text-foreground mb-6 text-4xl leading-tight font-bold text-balance transition-all duration-700 sm:text-5xl lg:text-6xl ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}>
          Land Your{' '}
          <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        <p
          className={`text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-balance transition-all duration-700 sm:text-xl ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}>
          The all-in-one platform to validate your resume against job descriptions, take mock
          technical assessments, and practice 1-on-1 with an AI Interviewer. Stop guessing, start
          preparing.
        </p>

        <Button
          size="lg"
          className={`bg-primary text-primary-foreground hover:bg-primary/90 mb-16 transform gap-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            isVisible ? 'animate-scale-in' : 'scale-95 opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}>
          Start Practicing for Free
          <ArrowRight className="h-5 w-5" />
        </Button>

        <div
          className={`relative mx-auto max-w-2xl transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.5s' }}>
          <div className="from-primary/20 to-primary/10 absolute inset-0 rounded-2xl bg-linear-to-r blur-xl" />
          <div className="glass-effect animate-float relative transform rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-3">
                  <FileText className="text-primary h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground text-sm">Match Score</p>
                  <p className="text-foreground text-2xl font-bold">95%</p>
                </div>
              </div>
              <div className="bg-primary/5 border-primary/20 flex items-center gap-2 rounded-full border px-4 py-2">
                <TrendingUp className="text-primary h-4 w-4 animate-pulse" />
                <span className="text-primary text-sm font-medium">Resume Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
