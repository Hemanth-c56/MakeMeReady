'use client';

import { useEffect, useState } from 'react';

import { Clock, Heart, TrendingUp, Zap } from 'lucide-react';

import { Button } from '~/shared/shadcn/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/shared/shadcn/select';
import { SmartTagInput } from '~/shared/components/smart-tag-input';

type GameState = 'menu' | 'playing' | 'gameOver';

interface Question {
  id: string;
  code: string;
  options: string[];
  correct: number;
  topic: string;
}

const DUMMY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    code: 'console.log(1 + "1" - 1)',
    options: ['11', '1', '0', '"11"'],
    correct: 1,
    topic: 'javascript'
  },
  {
    id: 'q2',
    code: 'const arr = [1, 2, 3]\narr.length = 0\nconsole.log(arr)',
    options: ['[1, 2, 3]', '[]', 'undefined', 'error'],
    correct: 1,
    topic: 'javascript'
  },
  {
    id: 'q3',
    code: 'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'error', 'None'],
    correct: 1,
    topic: 'python'
  },
  {
    id: 'q4',
    code: 'SELECT * FROM users\nWHERE age > NULL',
    options: ['All rows', 'No rows', 'Error', 'Depends on DB'],
    correct: 1,
    topic: 'sql'
  },
  {
    id: 'q5',
    code: 'Design a cache:\n- 1M requests/sec\n- 70% hit rate\n- 1KB per entry',
    options: ['Redis cluster', 'Memcached only', 'Both work', 'Need more info'],
    correct: 3,
    topic: 'system design'
  }
];

const TOPIC_SUGGESTIONS = [
  'JavaScript',
  'Python',
  'SQL',
  'System Design',
  'Arrays',
  'Strings',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Sorting'
];

const TIMER_OPTIONS = [
  { value: '10', label: '10 seconds' },
  { value: '20', label: '20 seconds' },
  { value: '30', label: '30 seconds' }
];

export default function RapidFirePage() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [timerDuration, setTimerDuration] = useState<number>(20);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing' || showFeedback) return;

    if (timeLeft === 0) {
      // Time's up - skip question and lose a life
      setLives((prev) => prev - 1);
      setStreak(0);

      // Move to next question or end game
      if (questionIndex < DUMMY_QUESTIONS.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setTimeLeft(timerDuration);
        setSelectedAnswer(null);
      } else {
        setGameState('gameOver');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState, showFeedback, questionIndex, timerDuration]);

  const startGame = () => {
    if (selectedTopics.length === 0) return;
    setGameState('playing');
    setScore(0);
    setLives(3);
    setQuestionIndex(0);
    setTimeLeft(timerDuration);
    setStreak(0);
    setTotalAnswered(0);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowFeedback(true);
    setTotalAnswered(totalAnswered + 1);

    const currentQuestion = DUMMY_QUESTIONS[questionIndex];
    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setLives(lives - 1);
      setStreak(0);
    }

    setTimeout(() => {
      if (lives > (isCorrect ? 0 : 1) && questionIndex < DUMMY_QUESTIONS.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(timerDuration);
      } else {
        setGameState('gameOver');
      }
    }, 1200);
  };

  const resetGame = () => {
    setGameState('menu');
    setSelectedTopics([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(timerDuration);
  };

  // Menu State
  if (gameState === 'menu') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
        <div className="min-h-screen w-full space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="flex items-center justify-center gap-2 text-4xl font-bold text-slate-900 dark:text-white">
              <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              Rapid Fire Drills
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Select topics and choose your timer. Test your technical intuition.
            </p>
          </div>

          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Select Topics
              </label>
              <SmartTagInput
                suggestions={TOPIC_SUGGESTIONS}
                onTagsChange={setSelectedTopics}
                placeholder="Search or add custom topics..."
                helperText="Select at least one topic to start drilling."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white">
                Time per Question
              </label>
              <Select
                value={timerDuration.toString()}
                //eslint-disabl-next-line
                onValueChange={(val) => setTimerDuration(Number.parseInt(val))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timer" />
                </SelectTrigger>
                <SelectContent>
                  {TIMER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Start Button */}
          <Button
            onClick={startGame}
            disabled={selectedTopics.length === 0}
            className="w-full bg-indigo-600 py-6 text-lg text-white hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Start Sprint
          </Button>
        </div>
      </div>
    );
  }

  // Playing State
  if (gameState === 'playing') {
    const currentQuestion = DUMMY_QUESTIONS[questionIndex];
    const progress = ((timerDuration - timeLeft) / timerDuration) * 100;

    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
        {/* Top Timer Bar */}
        <div className="relative h-2 overflow-hidden bg-slate-200 dark:bg-slate-800">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-red-500' : 'bg-indigo-600 dark:bg-indigo-500'
            }`}
            style={{ width: `${Math.max(0, 100 - progress)}%` }}
          />
        </div>

        {/* HUD Stats */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Score:
              </span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {score}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span
                className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`h-6 w-6 ${i < lives ? 'fill-red-500 text-red-500' : 'text-slate-300 dark:text-slate-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl space-y-6">
            {/* Question Card - Dark Background */}
            <div className="overflow-auto rounded-lg bg-slate-900 p-6 font-mono text-sm dark:bg-slate-950">
              <pre className="wrap-break-word whitespace-pre-wrap text-slate-300">
                <span className="text-pink-400">{currentQuestion.code}</span>
              </pre>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQuestion.correct;
                const isWrong = isSelected && !isCorrect;

                let bgClass =
                  'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700';
                let textClass = 'text-slate-900 dark:text-white';

                if (showFeedback) {
                  if (isCorrect) {
                    bgClass = 'bg-emerald-100 dark:bg-emerald-900/30 border-2 border-emerald-500';
                    textClass = 'text-emerald-900 dark:text-emerald-100';
                  } else if (isWrong) {
                    bgClass = 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500';
                    textClass = 'text-red-900 dark:text-red-100';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showFeedback}
                    className={`rounded-lg p-4 font-semibold transition-all ${bgClass} ${textClass} ${
                      !showFeedback && !isSelected ? 'cursor-pointer' : ''
                    }`}>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Over State
  if (gameState === 'gameOver') {
    const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 dark:bg-slate-900">
        <div className="w-full max-w-2xl space-y-8">
          {/* Headline */}
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-white">
              Session Complete!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Great effort. Time to review.</p>
          </div>

          {/* Scorecard */}
          <div className="rounded-lg border-2 border-indigo-200 bg-white p-8 text-center dark:border-indigo-900 dark:bg-slate-800">
            <div className="mb-2 text-6xl font-bold text-indigo-600 dark:text-indigo-400">
              {score}/{DUMMY_QUESTIONS.length}
            </div>
            <div className="text-slate-600 dark:text-slate-400">Correct Answers</div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Timer</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">
                {timerDuration}s
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{accuracy}%</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 text-center dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Streak</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{streak}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={startGame}
              className="flex-1 bg-indigo-600 py-6 text-lg text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
              Retry Sprint
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="flex-1 border-2 bg-transparent py-6 text-lg text-slate-900 dark:text-white">
              Change Topics
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
