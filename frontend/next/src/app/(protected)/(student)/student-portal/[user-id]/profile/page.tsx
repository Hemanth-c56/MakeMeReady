'use client';

import { AchievementsCard } from '~/components/student-portal/profile/achievements-card';
import { ActivityHistory } from '~/components/student-portal/profile/interview-history';
import { ProfileHeader } from '~/components/student-portal/profile/profile-header';

export default function StudentProfile() {
  // Mock user data
  const user = {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'SC',
    currentAtsScore: 78,
    totalSessions: 14,
    focusAreas: [
      { category: 'Domain Specific', count: 6, color: 'bg-chart-1' },
      { category: 'HR Round', count: 3, color: 'bg-chart-4' },
      { category: 'CS Fundamentals', count: 5, color: 'bg-chart-3' }
    ]
  };

  const badges = [
    { id: 1, label: '100 Day Streak', icon: '🔥' },
    { id: 2, label: 'System Design Pro', icon: '🏗️' },
    { id: 3, label: 'Algorithm Master', icon: '⚡' },
    { id: 4, label: 'Interview Ready', icon: '🎯' }
  ];

  const activityHistory = [
    {
      id: 1,
      title: 'Job Match Analysis',
      description: 'Analyzed Senior Developer role at TechCorp',
      time: '2 hours ago',
      icon: '📊',
      feedback: {
        matchScore: 82,
        matchedKeywords: ['System Design', 'React', 'Node.js', 'AWS'],
        missingKeywords: ['Docker', 'Kubernetes'],
        recommendations: 'Strong match! Consider adding containerization experience.'
      }
    },
    {
      id: 2,
      title: 'Mock Interview',
      description: 'Completed System Design interview',
      time: '1 day ago',
      icon: '🎤',
      feedback: {
        score: 78,
        duration: '45 minutes',
        strengths: ['Clear thinking', 'Good communication'],
        improvements: ['Add more edge cases', 'Deeper analysis needed'],
        feedback: 'Good overall performance. Work on edge cases.'
      }
    },
    {
      id: 3,
      title: 'Resume Audit',
      description: 'Uploaded and audited new resume v3.2',
      time: '3 days ago',
      icon: '📄',
      feedback: {
        atsScore: 85,
        strengths: ['Well-formatted', 'Good keywords'],
        improvements: ['Add more quantified achievements'],
        suggestions: 'Your resume is ATS-friendly!'
      }
    },
    {
      id: 4,
      title: 'Puzzle Solved',
      description: 'Completed 5 Rapid Fire drills',
      time: '5 days ago',
      icon: '🧩',
      feedback: {
        solved: 4,
        total: 5,
        accuracy: 80,
        avgTime: '18 seconds',
        topicsStrength: ['Logic', 'Patterns']
      }
    },
    {
      id: 5,
      title: 'Fundamentals Practice',
      description: 'Practiced Operating Systems topics',
      time: '1 week ago',
      icon: '📚',
      feedback: {
        topicsCovered: ['Process Management', 'Memory Allocation'],
        questionsAnswered: 12,
        accuracy: 75,
        nextTopics: ['Deadlock Prevention', 'Virtual Memory']
      }
    }
  ];

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
