'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '~/shared/shadcn/button';

import { Features } from '~/components/landing/features';
import { Footer } from '~/components/landing/footer';
import { Hero } from '~/components/landing/hero';
import { HowItWorks } from '~/components/landing/how-it-works';
import { SocialProof } from '~/components/landing/social-proof';

import MainLogo from '../../../../public/assets/main-logo.png';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="bg-background">
      <nav className="bg-background/80 border-border/50 sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="group flex cursor-pointer items-center gap-3 transition-transform duration-300 hover:scale-105">
              <Image
                src={MainLogo}
                alt="MakeMeReady"
                className="w-55 transition-all group-data-[collapsible=icon]:hidden"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                onClick={() => {
                  router.push('/sign-in');
                }}>
                Sign In
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 transform shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => {
                  router.push('/sign-up');
                }}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Footer />
    </main>
  );
}
