'use client';

import React from 'react';

import { Award, Brain, CheckCircle2, TrendingUp } from 'lucide-react';

import { ActivityStats } from '~/components/student-portal/dashboard/activity-stats';
import { ChartsSection } from '~/components/student-portal/dashboard/charts-section';
import { Leaderboard } from '~/components/student-portal/dashboard/leaderboard';
import { PumpStats } from '~/components/student-portal/dashboard/pump-stats';

function page() {
  const userName = 'Hemanth Kumar';
  const readinessScore = 65;
  const streak = 7;

  const statsCards = [
    {
      label: 'Interviews Completed',
      value: 24,
      trend: '+2 this week',
      icon: Brain,
      color: 'from-blue-50 to-transparent border-blue-200'
    },
    {
      label: 'Puzzles Solved',
      value: 156,
      trend: '+12 this week',
      icon: CheckCircle2,
      color: 'from-emerald-50 to-transparent border-emerald-200'
    },
    {
      label: 'Assessments Taken',
      value: 18,
      trend: '+1 this week',
      icon: Award,
      color: 'from-amber-50 to-transparent border-amber-200'
    },
    {
      label: 'Resume Score',
      value: 72,
      total: 100,
      trend: '+2 this week',
      icon: TrendingUp,
      color: 'from-rose-50 to-transparent border-rose-200'
    }
  ];

  const consistencyData = [
    { day: 'Mon', interviews: 2, puzzles: 8 },
    { day: 'Tue', interviews: 1, puzzles: 12 },
    { day: 'Wed', interviews: 3, puzzles: 15 },
    { day: 'Thu', interviews: 2, puzzles: 10 },
    { day: 'Fri', interviews: 4, puzzles: 18 },
    { day: 'Sat', interviews: 1, puzzles: 6 },
    { day: 'Sun', interviews: 2, puzzles: 9 }
  ];

  const skillData = [
    { skill: 'DSA', value: 78 },
    { skill: 'System Design', value: 62 },
    { skill: 'Behavioral', value: 85 },
    { skill: 'SQL', value: 55 },
    { skill: 'Puzzles', value: 72 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Rodriguez', interviews: 42, assessments: 12, puzzles: 145, total: 199 },
    { rank: 2, name: 'Jordan Blake', interviews: 38, assessments: 15, puzzles: 128, total: 181 },
    {
      rank: 3,
      name: 'Sarah Chen',
      interviews: 24,
      assessments: 18,
      puzzles: 156,
      total: 198,
      isCurrentUser: true
    },
    { rank: 4, name: 'Taylor Kim', interviews: 35, assessments: 11, puzzles: 142, total: 188 },
    { rank: 5, name: 'Morgan Lee', interviews: 28, assessments: 10, puzzles: 135, total: 173 }
  ];

  return (
    <div className="w-full min-w-0 p-6">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-foreground text-3xl font-bold">Welcome back, {userName}!</h2>
          <p className="text-muted-foreground">Here's your interview prep progress at a glance.</p>
        </div>

        <PumpStats userName={userName} readinessScore={readinessScore} streak={streak} />

        <ActivityStats statsCards={statsCards} />

        <ChartsSection consistencyData={consistencyData} skillData={skillData} />

        <Leaderboard leaderboard={leaderboard} />
      </div>
    </div>
  );
}

export default page;
