'use client';

import { Card } from '~/shared/shadcn/card';

import { useScrollAnimation } from '~/hooks/use-scroll-animation';

export function SocialProof() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="bg-background border-border border-y px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}>
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl">
            Trusted by Students
          </h2>
          <p className="text-muted-foreground text-lg">
            Thousands of candidates are acing their interviews
          </p>
        </div>

        <Card
          className={`bg-card border-border border p-8 text-center transition-all duration-700 ${
            isVisible ? 'animate-scale-in' : 'scale-95 opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center justify-around gap-8 sm:flex-row">
            <div
              className={`transition-all duration-700 ${isVisible ? 'animate-stagger-1' : 'opacity-0'}`}>
              <p className="text-primary mb-2 text-4xl font-bold sm:text-5xl">10,000+</p>
              <p className="text-muted-foreground">Mock Interviews Conducted</p>
            </div>
            <div className="bg-border hidden h-16 w-px sm:block"></div>
            <div
              className={`transition-all duration-700 ${isVisible ? 'animate-stagger-2' : 'opacity-0'}`}>
              <p className="text-primary mb-2 text-4xl font-bold sm:text-5xl">95%</p>
              <p className="text-muted-foreground">Average Resume Match Score</p>
            </div>
            <div className="bg-border hidden h-16 w-px sm:block"></div>
            <div
              className={`transition-all duration-700 ${isVisible ? 'animate-stagger-3' : 'opacity-0'}`}>
              <p className="text-primary mb-2 text-4xl font-bold sm:text-5xl">4.8/5</p>
              <p className="text-muted-foreground">Student Satisfaction Rating</p>
            </div>
          </div>
        </Card>

        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}>
          <p className="text-muted-foreground mb-6">
            Trusted by students aiming for top-tier product companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple'].map((company, idx) => (
              <span
                key={company}
                className={`text-muted-foreground/60 text-sm font-medium transition-all duration-700 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
