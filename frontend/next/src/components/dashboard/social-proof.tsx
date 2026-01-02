"use client"

import { Card } from "~/shared/shadcn/card"
import { useScrollAnimation } from "~/hooks/use-scroll-animation"

export function SocialProof() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-background border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Trusted by Students</h2>
          <p className="text-lg text-muted-foreground">Thousands of candidates are acing their interviews</p>
        </div>

        <Card
          className={`bg-card border border-border p-8 text-center transition-all duration-700 ${
            isVisible ? "animate-scale-in" : "opacity-0 scale-95"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
            <div className={`transition-all duration-700 ${isVisible ? "animate-stagger-1" : "opacity-0"}`}>
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">10,000+</p>
              <p className="text-muted-foreground">Mock Interviews Conducted</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border"></div>
            <div className={`transition-all duration-700 ${isVisible ? "animate-stagger-2" : "opacity-0"}`}>
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">95%</p>
              <p className="text-muted-foreground">Average Resume Match Score</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-border"></div>
            <div className={`transition-all duration-700 ${isVisible ? "animate-stagger-3" : "opacity-0"}`}>
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">4.8/5</p>
              <p className="text-muted-foreground">Student Satisfaction Rating</p>
            </div>
          </div>
        </Card>

        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-muted-foreground mb-6">Trusted by students aiming for top-tier product companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Google", "Meta", "Amazon", "Microsoft", "Apple"].map((company, idx) => (
              <span
                key={company}
                className={`text-muted-foreground/60 font-medium text-sm transition-all duration-700 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
