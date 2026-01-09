'use client';

import { useState } from 'react';

import { Check, Database } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import { Card } from '~/shared/shadcn/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/shared/shadcn/dialog';
import { Label } from '~/shared/shadcn/label';
import { SmartTagInput } from '~/shared/components/smart-tag-input';

const fundamentalTopics = [
  {
    category: 'Operating Systems',
    suggestions: [
      'Paging',
      'Deadlocks',
      'Scheduling',
      'Memory Management',
      'Process Management',
      'Context Switching'
    ]
  },
  {
    category: 'DBMS',
    suggestions: [
      'Normalization',
      'Transactions',
      'ACID',
      'Indexing',
      'Query Optimization',
      'Join Algorithms'
    ]
  },
  {
    category: 'Computer Networks',
    suggestions: ['TCP/IP', 'OSI Model', 'HTTP/HTTPS', 'DNS', 'Routing', 'Load Balancing']
  },
  {
    category: 'OOP',
    suggestions: [
      'Inheritance',
      'Polymorphism',
      'Encapsulation',
      'Design Patterns',
      'SOLID Principles',
      'Abstraction'
    ]
  }
];

export function CsFundamentals() {
  const [open, setOpen] = useState(false);
  const [selectedFundamentals, setSelectedFundamentals] = useState<Set<string>>(new Set());
  //eslint-disable-next-line
  const [selectedTopicsByCategory, setSelectedTopicsByCategory] = useState<
    Record<string, string[]>
  >({});

  const handleTagsChange = (category: string, tags: string[]) => {
    setSelectedTopicsByCategory((prev) => ({
      ...prev,
      [category]: tags
    }));
  };

  const toggleFundamental = (category: string) => {
    const updated = new Set(selectedFundamentals);
    if (updated.has(category)) {
      updated.delete(category);
      setSelectedTopicsByCategory((prev) => {
        const newState = { ...prev };
        delete newState[category];
        return newState;
      });
    } else {
      updated.add(category);
    }
    setSelectedFundamentals(updated);
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="group relative cursor-pointer overflow-hidden border-2 border-dashed border-emerald-300 bg-linear-to-br from-emerald-50/50 via-emerald-50/20 to-transparent transition-all hover:border-emerald-500 hover:shadow-lg">
        <div className="space-y-6 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 transition-colors group-hover:bg-emerald-200">
              <Database className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-foreground text-2xl font-bold md:text-3xl">
                The Gym - CS Fundamentals
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Core theory training to strengthen your foundation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {fundamentalTopics.map((topic) => (
              <div key={topic.category} className="space-y-2">
                <p className="text-foreground text-xs font-bold tracking-wider uppercase">
                  {topic.category}
                </p>
                <div className="space-y-1">
                  {topic.suggestions.slice(0, 2).map((item) => (
                    <p key={item} className="text-muted-foreground text-xs">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-sm font-semibold text-emerald-600 transition-transform group-hover:translate-x-1">
              Start drilling fundamentals
            </span>
            <Button variant="outline" size="sm">
              Enter The Gym
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CS Fundamentals - The Gym</DialogTitle>
            <DialogDescription>
              Select the fundamentals you want to practice, then customize topics for each.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Fundamentals</Label>
              <p className="text-muted-foreground text-sm">Choose which subjects to practice</p>
              <div className="grid grid-cols-2 gap-3">
                {fundamentalTopics.map((topic) => (
                  <button
                    key={topic.category}
                    onClick={() => toggleFundamental(topic.category)}
                    className={`rounded-lg border-2 p-3 text-left transition-all ${
                      selectedFundamentals.has(topic.category)
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-semibold">{topic.category}</span>
                      {selectedFundamentals.has(topic.category) && (
                        <Check className="text-primary h-5 w-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedFundamentals.size > 0 && (
              <div className="border-border space-y-6 border-t pt-4">
                <div>
                  <Label className="mb-4 block text-base font-semibold">Customize Topics</Label>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Leave empty to test the entire subject
                  </p>
                </div>
                {fundamentalTopics.map((subject) => {
                  if (!selectedFundamentals.has(subject.category)) return null;
                  return (
                    <div
                      key={subject.category}
                      className="border-border space-y-3 border-b pb-4 last:border-b-0 last:pb-0">
                      <Label className="text-foreground font-semibold">{subject.category}</Label>
                      <SmartTagInput
                        suggestions={subject.suggestions}
                        onTagsChange={(tags) => handleTagsChange(subject.category, tags)}
                        placeholder={`Search topics like ${subject.suggestions.slice(0, 2).join(', ')}...`}
                        helperText="Leave empty to test the entire subject."
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <Button
              className="h-11 w-full text-base font-semibold"
              onClick={() => setOpen(false)}
              disabled={selectedFundamentals.size === 0}>
              {selectedFundamentals.size === 0
                ? 'Select at least one fundamental'
                : 'Start Drilling'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
