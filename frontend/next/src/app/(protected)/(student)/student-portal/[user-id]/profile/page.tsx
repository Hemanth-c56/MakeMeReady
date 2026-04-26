'use client';

import React, { useState, useEffect } from 'react';
import api from '~/lib/api';
import { Loader2 } from 'lucide-react';
import { AchievementsCard } from '~/components/student-portal/profile/achievements-card';
import { ActivityHistory } from '~/components/student-portal/profile/interview-history';
import { ProfileHeader } from '~/components/student-portal/profile/profile-header';

export default function StudentProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/users/me/profile');
        if (res && res.data) {
          setUser(res.data.user);
          setBadges(res.data.badges || []);
          
          const formatTimeAgo = (dateStr: string) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 60) return `${Math.max(1, diffMins)} minutes ago`;
            const diffHrs = Math.floor(diffMins / 60);
            if (diffHrs < 24) return `${diffHrs} hours ago`;
            const diffDays = Math.floor(diffHrs / 24);
            return `${diffDays} days ago`;
          };

          const activities = res.data.activityHistory || [];
          activities.forEach((act: any) => {
             if (act.time) {
                act.time = formatTimeAgo(act.time);
             }
          });
          setActivityHistory(activities);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto space-y-8">
        <ProfileHeader user={user} />
        <AchievementsCard user={user} badges={badges} />
        <ActivityHistory activities={activityHistory} />
      </div>
    </div>
  );
}
