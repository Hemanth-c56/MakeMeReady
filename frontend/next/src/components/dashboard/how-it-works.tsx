"use client";

import { Card } from "~/shared/shadcn/card";
import { Upload, Settings, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";

const steps = [
  {
    number: 1,
    title: "Upload Resume & JD",
    description: "Share your resume and job description to get started",
    icon: Upload,
  },
  {
    number: 2,
    title: "Select Domain & Difficulty",
    description: "Choose your field and challenge level",
    icon: Settings,
  },
  {
    number: 3,
    title: "Receive AI Feedback & Improve",
    description: "Get detailed insights and practice with AI interviewer",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to master your interview
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const staggerClasses = [
              "animate-stagger-1",
              "animate-stagger-2",
              "animate-stagger-3",
            ];

            return (
              <div
                key={idx}
                className={`flex-1 flex flex-col transition-all duration-700 ${
                  isVisible ? staggerClasses[idx] : "opacity-0"
                }`}
              >
                <Card
                  className={`flex-1 p-8 bg-card border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? "border-primary shadow-xl scale-105"
                      : "border-border hover:border-primary/20 hover:shadow-lg"
                  }`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "group-hover:opacity-50"
                    }`}
                  />

                  <div className="relative flex items-start gap-4 mb-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 transition-all duration-300 transform ${
                        isActive
                          ? "scale-125 bg-primary/30"
                          : "group-hover:scale-110"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive
                            ? "text-primary scale-125"
                            : "text-primary group-hover:scale-110"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-primary"
                            : "text-primary/60 group-hover:text-primary"
                        }`}
                      >
                        Step {step.number}
                      </p>
                      <h3 className="text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-balance group-hover:text-foreground/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </Card>
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center pt-6">
                    <ChevronRight
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive
                          ? "text-primary scale-150"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
