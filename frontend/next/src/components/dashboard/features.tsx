"use client";

import { Card } from "~/shared/shadcn/card";
import { FileText, Bot, Code, Sliders } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";

const features = [
  {
    title: "ATS & JD Analyzer",
    description:
      "Upload your resume and a target Job Description. We tell you exactly if you are a match and what keywords you are missing.",
    icon: FileText,
    size: "large",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "1-on-1 AI Interviewer",
    description:
      "Experience a realistic interview tailored to your specific domain. Choose your difficulty, answer via voice, and get instant feedback.",
    icon: Bot,
    size: "large",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Technical & Aptitude Tests",
    description:
      "From coding challenges to logical reasoning. Validate your skills before the real exam.",
    icon: Code,
    size: "default",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "You Control the Difficulty",
    description:
      "Customize your domain and difficulty level to match your target roles and skill level.",
    icon: Sliders,
    size: "default",
    color: "from-green-500 to-emerald-500",
  },
];

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-glow-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why MakeMeReady?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed to build your confidence and skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLarge = feature.size === "large";
            const staggerClasses = [
              "animate-stagger-1",
              "animate-stagger-2",
              "animate-stagger-3",
              "animate-stagger-4",
            ];

            return (
              <Card
                key={idx}
                className={`p-8 bg-card border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  isLarge ? "md:col-span-1" : ""
                } ${
                  hoveredIndex === idx
                    ? "shadow-xl scale-105"
                    : "hover:shadow-lg hover:scale-102"
                } ${isVisible ? staggerClasses[idx] : "opacity-0"}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative flex flex-col h-full">
                  <div
                    className={`p-3 w-fit rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:shadow-lg transition-all duration-300 transform ${
                      hoveredIndex === idx ? "scale-110" : ""
                    }`}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-balance group-hover:text-foreground/80 transition-colors duration-300">
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
