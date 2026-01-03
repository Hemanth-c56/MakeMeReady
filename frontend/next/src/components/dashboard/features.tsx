'use client';

import { useState } from 'react';

import { Bot, Code, FileText, Sliders } from 'lucide-react';

import { Card } from '~/shared/shadcn/card';

import { useScrollAnimation } from '~/hooks/use-scroll-animation';

const features = [
  {
    title: 'ATS & JD Analyzer',
    description:
      'Upload your resume and a target Job Description. We tell you exactly if you are a match and what keywords you are missing.',
    icon: FileText,
    size: 'large',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: '1-on-1 AI Interviewer',
    description:
      'Experience a realistic interview tailored to your specific domain. Choose your difficulty, answer via voice, and get instant feedback.',
    icon: Bot,
    size: 'large',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Technical & Aptitude Tests',
    description:
      'From coding challenges to logical reasoning. Validate your skills before the real exam.',
    icon: Code,
    size: 'default',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'You Control the Difficulty',
    description:
      'Customize your domain and difficulty level to match your target roles and skill level.',
    icon: Sliders,
    size: 'default',
    color: 'from-green-500 to-emerald-500'
  }
];

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="bg-background relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/5 animate-float absolute top-1/2 right-0 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-accent/5 animate-glow-pulse absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}>
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">Why MakeMeReady?</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Comprehensive tools designed to build your confidence and skills
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            const staggerClasses = [
              'animate-stagger-1',
              'animate-stagger-2',
              'animate-stagger-3',
              'animate-stagger-4'
            ];

            return (
              <Card
                key={idx}
                className={`bg-card border-border hover:border-primary/40 group relative cursor-pointer overflow-hidden border p-8 transition-all duration-300 ${
                  isLarge ? 'md:col-span-1' : ''
                } ${
                  hoveredIndex === idx ? 'scale-105 shadow-xl' : 'hover:scale-102 hover:shadow-lg'
                } ${isVisible ? staggerClasses[idx] : 'opacity-0'}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                <div className="relative flex h-full flex-col">
                  <div
                    className={`bg-primary/10 group-hover:bg-primary/20 mb-4 w-fit transform rounded-lg p-3 transition-all duration-300 group-hover:shadow-lg ${
                      hoveredIndex === idx ? 'scale-110' : ''
                    }`}>
                    <Icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-semibold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground/80 text-balance transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
