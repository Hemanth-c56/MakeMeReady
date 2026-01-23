'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Lightbulb, RotateCw } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
import { Button } from '~/shared/shadcn/button';

// Mock puzzle data
const PUZZLE_DATA = [
  {
    id: 1,
    category: 'Mathematics',
    categoryColor: 'bg-blue-100 text-blue-900',
    question: 'You have a 3L jug and a 5L jug. How do you measure exactly 4L of water?',
    hint: 'Think about the difference between the two volumes.',
    answer:
      'Fill the 5L, pour into 3L. You have 2L left in the 5L jug. Empty the 3L. Pour the 2L into the 3L. Fill the 5L again. Pour into 3L until full (requires 1L). You are left with exactly 4L in the big jug.'
  },
  {
    id: 2,
    category: 'Logic',
    categoryColor: 'bg-purple-100 text-purple-900',
    question:
      'A woman shoots her husband, then holds him underwater for 5 minutes. Right after, they go out to eat. How is this possible?',
    hint: 'Think about the context of her job.',
    answer: 'She is a photographer. She shot his photograph underwater using a camera.'
  },
  {
    id: 3,
    category: 'Probability',
    categoryColor: 'bg-green-100 text-green-900',
    question:
      'If you have a bowl with 6 red marbles and 4 blue marbles, what is the probability of drawing 2 red marbles in a row without replacement?',
    hint: 'Calculate the first draw, then the second draw, and multiply them.',
    answer:
      'First draw: 6/10. Second draw: 5/9. Probability = (6/10) × (5/9) = 30/90 = 1/3 or approximately 33.33%.'
  },
  {
    id: 4,
    category: 'Riddle',
    categoryColor: 'bg-amber-100 text-amber-900',
    question: 'What has hands but cannot clap?',
    hint: 'Think about something that measures time.',
    answer: 'A clock. It has hour and minute hands but cannot perform the action of clapping.'
  },
  {
    id: 5,
    category: 'Pattern',
    categoryColor: 'bg-pink-100 text-pink-900',
    question: 'What comes next in the sequence: 2, 3, 5, 7, 11, 13, ?',
    hint: 'These are all unique types of numbers.',
    answer: '17. This is a sequence of prime numbers. The next prime after 13 is 17.'
  }
];

export default function LogicVault() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedPuzzles, setCompletedPuzzles] = useState(0);

  const currentPuzzle = PUZZLE_DATA[currentIndex];
  const isLastPuzzle = currentIndex === PUZZLE_DATA.length - 1;

  const handleNext = () => {
    if (isLastPuzzle) {
      // Reset to show completion or restart
      setCurrentIndex(0);
      setIsFlipped(false);
      setShowHint(false);
      setCompletedPuzzles(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowHint(false);
    }
    setCompletedPuzzles(completedPuzzles + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setCompletedPuzzles(0);
  };

  return (
    <div className="from-background via-background to-primary/5 flex min-h-screen flex-col items-center justify-center bg-linear-to-br p-4">
      {/* Progress indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex gap-2">
        {PUZZLE_DATA.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-8'
                : index < currentIndex
                  ? 'bg-primary/50 w-4'
                  : 'bg-border w-4'
            }`}
            layoutId="progress"
          />
        ))}
      </motion.div>

      {/* Card Stack Container */}
      <div className="relative h-96 w-full max-w-md">
        <AnimatePresence mode="popLayout">
          {/* Background cards (stacked effect) */}
          {[2, 1].map((offset) => (
            <motion.div
              key={`stack-${offset}`}
              className="bg-card border-border absolute inset-0 rounded-2xl border shadow-lg"
              initial={{ y: offset * 12, opacity: 0.5 }}
              animate={{ y: offset * 12, opacity: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ zIndex: -offset }}
            />
          ))}

          {/* Main card */}
          <motion.div
            key={currentPuzzle.id}
            initial={{ x: 500, opacity: 0, rotateZ: 20 }}
            animate={{ x: 0, opacity: 1, rotateZ: 0 }}
            exit={{ x: -500, opacity: 0, rotateZ: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0">
            <motion.div
              className="bg-card border-border flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border p-8 shadow-xl"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 300 }}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => !isFlipped && setIsFlipped(true)}>
              {/* Front of card */}
              <motion.div
                style={{ backfaceVisibility: 'hidden' }}
                className="flex h-full flex-col justify-between">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <Badge className={`${currentPuzzle.categoryColor} border-0`}>
                    {currentPuzzle.category}
                  </Badge>
                  <span className="text-muted-foreground text-xs font-semibold">
                    {currentIndex + 1} / {PUZZLE_DATA.length}
                  </span>
                </div>

                {/* Question */}
                <div className="flex-1">
                  <p className="text-foreground text-2xl leading-relaxed font-bold text-balance">
                    {currentPuzzle.question}
                  </p>
                </div>

                {/* Hint section */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                      <p className="text-sm text-amber-900 dark:text-amber-100">
                        <span className="font-semibold">Hint: </span>
                        {currentPuzzle.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHint(!showHint);
                    }}
                    className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    className="flex-1">
                    Reveal Solution
                  </Button>
                </div>
              </motion.div>

              {/* Back of card */}
              <motion.div
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 flex h-full flex-col justify-between p-8">
                {/* Header */}
                <div className="mb-6">
                  <Badge className="border-0 bg-emerald-100 text-emerald-900">Solution</Badge>
                </div>

                {/* Answer */}
                <div className="flex-1">
                  <p className="text-lg leading-relaxed font-semibold text-balance text-emerald-900 dark:text-emerald-100">
                    {currentPuzzle.answer}
                  </p>
                </div>

                {/* Next button */}
                <Button
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="flex w-full items-center justify-center gap-2">
                  {isLastPuzzle ? 'Restart' : 'Next Puzzle'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">
          {completedPuzzles > 0 &&
            `${completedPuzzles} puzzle${completedPuzzles !== 1 ? 's' : ''} completed`}
        </p>
        {completedPuzzles > 0 && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 bg-transparent">
            <RotateCw className="h-4 w-4" />
            Restart All
          </Button>
        )}
      </motion.div>
    </div>
  );
}
