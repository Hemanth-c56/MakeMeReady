'use client';

import { useEffect, useState } from 'react';

import { Mic, MicOff, PhoneMissed, Settings, Video, VideoOff } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/shared/shadcn/tooltip';

export default function InterviewRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [time, setTime] = useState('14:05');
  //eslint-disable-next-line
  const [isUserSpeaking, setIsUserSpeaking] = useState(true);
  const [showExitTooltip, setShowExitTooltip] = useState(false);
  //eslint-disable-next-line
  const [transcript, setTranscript] = useState(
    'Can you walk me through a recent project where you had to optimize performance?'
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        const [mins, secs] = prev.split(':').map(Number);
        const totalSecs = mins * 60 + secs + 1;
        const newMins = Math.floor(totalSecs / 60);
        const newSecs = totalSecs % 60;
        return `${newMins}:${newSecs.toString().padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute top-0 right-0 left-0 z-40 bg-linear-to-b from-slate-900/60 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 py-6">
          {/* Left: Live Session Badge */}
          <Badge className="border border-red-500/50 bg-red-500/20 text-red-400 transition-all hover:bg-red-500/30">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
            Live Session
          </Badge>

          {/* Center: Timer */}
          <div className="font-mono text-5xl font-bold tracking-widest text-white">{time}</div>

          {/* Right: Settings Icon */}
          <button className="p-2 text-slate-400 transition-colors hover:text-white">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        {/* Animated Orb Container */}
        <div className="relative mb-12 h-40 w-40">
          {/* Outer glow effect */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-indigo-600 via-purple-500 to-rose-500 opacity-40 blur-2xl"></div>

          {/* Main orb with gradient */}
          <div className="absolute inset-0 flex animate-[pulse_3s_ease-in-out_infinite] items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-purple-600 to-rose-500 shadow-2xl">
            {/* Inner glow */}
            <div className="h-32 w-32 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 opacity-80 blur-sm"></div>
          </div>

          {/* Center element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"></div>
          </div>
        </div>

        <div className="mb-8 max-w-2xl px-8 text-center">
          <p className="animate-fade-in text-2xl leading-relaxed font-light text-white">
            {transcript}
          </p>
        </div>

        {isUserSpeaking && (
          <div className="flex items-center gap-2 text-sm font-medium text-green-400">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            You are speaking...
          </div>
        )}
      </div>

      <div className="fixed right-8 bottom-32 z-30">
        <div className="relative">
          <div className="flex h-48 w-40 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-linear-to-br from-slate-800 to-slate-900 shadow-2xl">
            {cameraOff ? (
              <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                <VideoOff className="h-8 w-8" />
                <span className="text-xs font-medium">Camera Off</span>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-700 to-slate-800">
                <div className="flex h-full w-full items-center justify-center bg-slate-700/50">
                  <span className="text-sm text-slate-400">You</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2 transform">
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-8 py-4 shadow-2xl backdrop-blur-xl">
          {/* Mic Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`rounded-full p-4 transition-all duration-300 ${
                    isMuted
                      ? 'bg-red-500/30 text-red-400 hover:bg-red-500/40'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{isMuted ? 'Unmute' : 'Mute'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Camera Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  className={`rounded-full p-4 transition-all duration-300 ${
                    cameraOff
                      ? 'bg-red-500/30 text-red-400 hover:bg-red-500/40'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                  {cameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Divider */}
          <div className="h-8 w-px bg-white/10"></div>

          {/* End Interview Button */}
          <TooltipProvider>
            <Tooltip open={showExitTooltip} onOpenChange={setShowExitTooltip}>
              <TooltipTrigger asChild>
                <button
                  onMouseEnter={() => setShowExitTooltip(true)}
                  onMouseLeave={() => setShowExitTooltip(false)}
                  className="flex items-center gap-2 rounded-full bg-red-500/80 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600">
                  <PhoneMissed className="h-5 w-5" />
                  End Interview
                </button>
              </TooltipTrigger>
              <TooltipContent>This will submit your session.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
