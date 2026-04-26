'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '~/lib/api';

import { Award, Brain, CheckCircle2, TrendingUp, Loader2 } from 'lucide-react';

import { ActivityStats } from '~/components/student-portal/dashboard/activity-stats';
import { ChartsSection } from '~/components/student-portal/dashboard/charts-section';
import { Leaderboard } from '~/components/student-portal/dashboard/leaderboard';
import { PumpStats } from '~/components/student-portal/dashboard/pump-stats';

function page() {
  const params = useParams() || {};
  const userId = params['user-id'] as string;
  
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [readinessScore, setReadinessScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [statsCards, setStatsCards] = useState<any[]>([]);
  const [consistencyData, setConsistencyData] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [skillData, setSkillData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        // Using Promise.all to fetch personal stats, global leaderboard, and profile details concurrently
        const [dashRes, leadRes, userRes] = await Promise.all([
          api.get('/users/me/dashboard'),
          api.get('/users/global/leaderboard'),
          api.get('/users/me')
        ]);
        
        const dash = dashRes.data;
        const lead = leadRes.data;
        const user = userRes.data;
        
        setUserName(user.full_name || user.email || 'Student');
        setReadinessScore(Math.round(dash.average_drill_score || 0));
        setStreak(dash.current_streak || 0); 
        setSkillData(dash.skill_data || []);
        
        setStatsCards([
          {
            label: 'Interviews Completed',
            value: dash.interviews_completed,
            trend: 'Total recorded',
            icon: Brain,
            color: 'from-blue-50 to-transparent border-blue-200'
          },
          {
            label: 'Drills Completed',
            value: dash.drills_completed,
            trend: 'Total recorded',
            icon: CheckCircle2,
            color: 'from-emerald-50 to-transparent border-emerald-200'
          },
          {
            label: 'Assessments Taken',
            value: dash.drills_completed + dash.interviews_completed,
            trend: 'Total activity',
            icon: Award,
            color: 'from-amber-50 to-transparent border-amber-200'
          },
          {
            label: 'Resume Score',
            value: dash.resume_score,
            total: 100,
            trend: 'Latest upload',
            icon: TrendingUp,
            color: 'from-rose-50 to-transparent border-rose-200'
          }
        ]);
        
        setConsistencyData(dash.consistency_data.reverse()); // Reverse back to chronological order (Sun -> Sat)
        
        // Flag the current user in the leaderboard
        const mappedLeaderboard = lead.map((entry: any) => ({
          ...entry,
          isCurrentUser: entry.user_id === user.id
        }));
        
        setLeaderboard(mappedLeaderboard);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, [userId]);

  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

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
