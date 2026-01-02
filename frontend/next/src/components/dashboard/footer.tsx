"use client";

import { Button } from "~/shared/shadcn/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "~/hooks/use-scroll-animation";

export function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer
      ref={ref}
      className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div
            className={`md:col-span-2 transition-all duration-700 ${
              isVisible ? "animate-fade-in-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
              Ready to crack the code?
            </h2>
            <p className="text-muted-foreground mb-6 text-balance">
              Join thousands of successful candidates who landed their dream
              jobs
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 w-full sm:w-auto"
            >
              Join MakeMeReady Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "animate-fade-in-right" : "opacity-0 translate-x-8"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Security", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "animate-fade-in-right" : "opacity-0 translate-x-8"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {["Home", "About", "Contact", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-border pt-8 transition-all duration-700 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 MakeMeReady. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
