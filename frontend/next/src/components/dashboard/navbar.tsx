import { CheckCircle2 } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';

export function Navbar() {
  return (
    <nav className="bg-background/80 border-border/50 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-3 transition-transform duration-300 hover:scale-105">
            <div className="from-primary to-primary/80 flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br transition-shadow duration-300 group-hover:shadow-lg">
              <CheckCircle2 className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-foreground text-xl font-bold">MakeMeReady</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transform shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
