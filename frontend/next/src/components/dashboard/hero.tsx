"use client";

import { Button } from "~/shared/shadcn/button";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";

export function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orb */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow-pulse" />
        {/* Secondary gradient orb */}
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: "2s" }}
        />
        {/* Accent orb */}
        <div className="absolute top-1/3 left-10 w-64 h-64 bg-accent/15 rounded-full blur-2xl animate-float-slow" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`mb-4 inline-block ${
            isVisible ? "animate-slide-down" : "opacity-0"
          }`}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary animate-shimmer">
            Master Your Interview
          </span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          Land Your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
            Dream Job
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          The all-in-one platform to validate your resume against job
          descriptions, take mock technical assessments, and practice 1-on-1
          with an AI Interviewer. Stop guessing, start preparing.
        </p>

        <Button
          size="lg"
          className={`bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mb-16 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
            isVisible ? "animate-scale-in" : "opacity-0 scale-95"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          Start Practicing for Free
          <ArrowRight className="w-5 h-5" />
        </Button>

        <div
          className={`relative max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.5s" }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/10 rounded-2xl blur-xl" />
          <div className="relative glass-effect rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-float">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Match Score</p>
                  <p className="text-2xl font-bold text-foreground">95%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/20">
                <TrendingUp className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Resume Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
