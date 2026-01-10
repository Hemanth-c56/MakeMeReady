'use client';

import { ArrowRight } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';

import { useScrollAnimation } from '~/hooks/use-scroll-animation';

export function Footer() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer
      ref={ref}
      className="bg-background border-border border-t px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div
            className={`transition-all duration-700 md:col-span-2 ${
              isVisible ? 'animate-fade-in-left' : '-translate-x-8 opacity-0'
            }`}>
            <h2 className="text-foreground mb-4 text-2xl font-bold text-balance sm:text-3xl">
              Ready to crack the code?
            </h2>
            <p className="text-muted-foreground mb-6 text-balance">
              Join thousands of successful candidates who landed their dream jobs
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full gap-2 sm:w-auto">
              Join MakeMeReady Today
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'animate-fade-in-right' : 'translate-x-8 opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}>
            <h3 className="text-foreground mb-4 font-semibold">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Security', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? 'animate-fade-in-right' : 'translate-x-8 opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}>
            <h3 className="text-foreground mb-4 font-semibold">Company</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Contact', 'Careers'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-border border-t pt-8 transition-all duration-700 ${
            isVisible ? 'animate-fade-in-up' : 'translate-y-8 opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © 2026 MakeMeReady. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors">
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
