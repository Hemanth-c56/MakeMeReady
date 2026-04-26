'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CheckCircle2 } from 'lucide-react';

import MainLogo from '../../../../public/assets/main-logo.png';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="bg-muted relative flex min-h-screen w-full items-center lg:flex-row">
      <div className="bg-accent/15 animate-float-slow pointer-events-none absolute -top-20 -left-20 h-90 w-120 rounded-full blur-2xl" />
      <div className="border-border hidden h-screen w-full flex-col justify-between border-r bg-white p-10 lg:flex lg:w-[60%] xl:w-[60%]">
        <div
          className="text-primary z-10 flex w-fit cursor-pointer items-center gap-2 text-2xl font-bold tracking-tight lg:text-4xl"
          onClick={() => {
            router.push('/');
          }}>
          <Image
            src={MainLogo}
            alt="MakeMeReady"
            className="w-65 transition-all group-data-[collapsible=icon]:hidden"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
            Ace your next <br />
            <span className="text-primary">Technical Interview.</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Stop guessing if you are ready. Upload your resume, paste the job description, and let
            our AI conduct a realistic mock interview tailored just for you.
          </p>

          <div className="space-y-4 pt-4">
            <FeatureItem text="Resume vs JD Analysis" />
            <FeatureItem text="One-on-One AI Interviews" />
            <FeatureItem text="Technical Assessments" />
          </div>
        </div>

        <div className="border-border border-t pt-6">
          <p className="text-muted-foreground text-sm italic">
            "Success is where preparation and opportunity meet."
          </p>
        </div>
      </div>
      <div className="bg-muted flex w-full flex-1 flex-col items-center justify-center px-3 py-10 lg:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="text-foreground/80 flex items-center gap-3">
      <div className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full">
        <CheckCircle2 size={14} />
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
}
