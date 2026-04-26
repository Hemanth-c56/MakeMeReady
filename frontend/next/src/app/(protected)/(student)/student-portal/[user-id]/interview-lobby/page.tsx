'use client';

import { CsFundamentals } from '~/components/student-portal/interview-lobby/cs-fundamentals';
import { JobDescriptionBased } from '~/components/student-portal/interview-lobby/description-based';
import { DomainTracks } from '~/components/student-portal/interview-lobby/domain-tracks';
import { HrCommunication } from '~/components/student-portal/interview-lobby/hr-communication';

export default function InterviewLobby() {
  return (
    <div className="w-full min-w-0 p-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-foreground text-4xl font-bold tracking-tight">Interview Lobby</h2>
          <p className="text-muted-foreground text-lg">
            Choose your battleground. Customize your session to match your goals.
          </p>
        </div>

        <JobDescriptionBased />

        <div className="via-primary/20 my-8 h-px w-full bg-linear-to-r from-transparent to-transparent" />

        <DomainTracks />

        <div className="via-primary/20 my-8 h-px w-full bg-linear-to-r from-transparent to-transparent" />

        <CsFundamentals />

        <div className="via-primary/20 my-8 h-px w-full bg-linear-to-r from-transparent to-transparent" />

        <HrCommunication />
      </div>
    </div>
  );
}
