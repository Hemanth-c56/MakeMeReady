'use client';

import { useState } from 'react';

import { Settings, Sparkles, Upload } from 'lucide-react';

import { Card } from '~/shared/shadcn/card';

import { useScrollAnimation } from '~/hooks/use-scroll-animation';

const steps = [
  {
    number: 1,
    title: 'Upload Resume & JD',
    description: 'Share your resume and job description to get started',
    icon: Upload
  },
  {
    number: 2,
    title: 'Select Domain & Difficulty',
    description: 'Choose your field and challenge level',
    icon: Settings
  },
  {
    number: 3,
    title: 'Receive AI Feedback & Improve',
    description: 'Get detailed insights and practice with AI interviewer',
    icon: Sparkles
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="bg-background relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/10 animate-glow-pulse absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/10 animate-float-slow absolute right-1/4 bottom-20 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}>
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to master your interview
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-6 md:flex-row">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const staggerClasses = ['animate-stagger-1', 'animate-stagger-2', 'animate-stagger-3'];

            return (
              <div
                key={idx}
                className={`flex flex-1 flex-col transition-all duration-700 ${
                  isVisible ? staggerClasses[idx] : 'opacity-0'
                }`}>
                <Card
                  className={`bg-card group relative flex-1 cursor-pointer overflow-hidden border p-8 transition-all duration-300 ${
                    isActive
                      ? 'border-primary scale-105 shadow-xl'
                      : 'border-border hover:border-primary/20 hover:shadow-lg'
                  }`}
                  onMouseEnter={() => setActiveStep(idx)}>
                  <div
                    className={`from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'group-hover:opacity-50'
                    }`}
                  />

                  <div className="relative mb-4 flex items-start gap-4">
                    <div
                      className={`bg-primary/10 flex h-12 w-12 transform items-center justify-center rounded-full transition-all duration-300 ${
                        isActive ? 'bg-primary/30 scale-125' : 'group-hover:scale-110'
                      }`}>
                      <Icon
                        className={`h-6 w-6 transition-all duration-300 ${
                          isActive ? 'text-primary scale-125' : 'text-primary group-hover:scale-110'
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-primary/60 group-hover:text-primary'
                        }`}>
                        Step {step.number}
                      </p>
                      <h3 className="text-foreground group-hover:text-primary mt-1 text-xl font-semibold transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground/80 text-balance transition-colors duration-300">
                    {step.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
