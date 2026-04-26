'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Mic, MicOff, PhoneMissed, Settings, Video, VideoOff } from 'lucide-react';

import { Badge } from '~/shared/shadcn/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/shared/shadcn/tooltip';

export default function InterviewRoom() {
  const params = useParams() || {};
  const router = useRouter();
  const sessionId = (params['interview-id'] as string) || '';

  const [isMuted, setIsMuted] = useState(true); // default mic is off
  const [cameraOff, setCameraOff] = useState(false);
  const [time, setTime] = useState('00:00');
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('Connecting to your interviewer...');
  const [showExitTooltip, setShowExitTooltip] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Synthesizer on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log("Speech voices loaded");
      };
    }
  }, []);

  // Initialize WebSocket connected to backend
  useEffect(() => {
    if (!sessionId) return;
    
    // In production, we'd use environment variables for WS URL
    const wsUrl = process.env.NEXT_PUBLIC_API_URL 
      ? process.env.NEXT_PUBLIC_API_URL.replace('http', 'ws') 
      : 'ws://localhost:8000/api/v1';

    const ws = new WebSocket(`${wsUrl}/interviews/ws/${sessionId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to AI Interview Server');
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const question = payload.next_question;
        const feedback = payload.feedback;
        
        console.log("Agent:", payload);
        
        setTranscript(question); // Display agent's question
        handleTTS(question); // Speak it!

      } catch (err) {
        console.error("Failed to parse websocket message:", err);
      }
    };

    ws.onerror = (error) => {
      // In React Strict Mode, the cleanup function may call ws.close() while CONNECTING.
      // The browser specification mandates firing an 'error' event in this scenario.
      // We ignore the error if the socket is closing or closed.
      if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) return;
      console.warn("WebSocket connection issue:", error);
    };

    return () => {
      ws.close();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // kill speaking on unmount
      }
    };
  }, [sessionId]);

  // Handle Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition && !recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsMuted(false);
          // If the AI was speaking, we stop it so the user can answer properly
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsAgentSpeaking(false);
          }
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for(let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
          setIsMuted((prevMuted) => {
            // If the user hasn't explicitly muted, we should restart recognition to keep listening
            return prevMuted;
          });
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleTTS = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    // Prioritize distinctive interviewer accents (UK/AU English)
    const voice = voices.find(v => 
      v.name.includes("UK English Female") || 
      v.name.includes("Hazel") || 
      v.name.includes("Karen") || // Australian
      v.lang === 'en-GB' || 
      v.lang === 'en-AU'
    ) || voices[0];
    
    if (voice) utterance.voice = voice;
    
    // Slow down the speaking rate slightly for a more thoughtful interviewer tone
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => setIsAgentSpeaking(true);
    utterance.onend = () => setIsAgentSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    
    if (isMuted) {
      setTranscript("Listening...");
      recognitionRef.current.start();
      setIsMuted(false);
    } else {
      recognitionRef.current.stop();
      setIsMuted(true);
      
      // Send the finalized transcript to the AI backend
      if (transcript && transcript !== "Listening..." && wsRef.current) {
        wsRef.current.send(transcript);
        setTranscript("Analyzing your response...");
      }
    }
  };

  const endInterview = () => {
    wsRef.current?.close();
    router.push(`/student-interview/${params['user-id'] || 'me'}/interview/${sessionId}/summary`);
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        const [mins, secs] = prev.split(':').map(Number);
        const totalSecs = mins * 60 + secs + 1;
        const newMins = Math.floor(totalSecs / 60);
        const newSecs = totalSecs % 60;
        return `${newMins.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`;
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
            Voice Session
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
        <div className={`relative mb-12 h-40 w-40 transition-transform duration-500 ${isAgentSpeaking ? 'scale-110' : 'scale-100'}`}>
          {/* Outer glow effect */}
          <div className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-300 ${isAgentSpeaking ? 'bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-60 animate-pulse' : 'bg-linear-to-r from-indigo-600 via-purple-500 to-rose-500 opacity-40'}`}></div>

          {/* Main orb with gradient */}
          <div className={`absolute inset-0 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${isAgentSpeaking ? 'bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-600 animate-[pulse_1.5s_ease-in-out_infinite]' : 'bg-linear-to-br from-indigo-500 via-purple-600 to-rose-500 animate-[pulse_3s_ease-in-out_infinite]'}`}>
            {/* Inner glow */}
            <div className="h-32 w-32 rounded-full bg-white/10 blur-sm"></div>
          </div>

          {/* Center element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border border-white/20 bg-white/20 backdrop-blur-sm"></div>
          </div>
        </div>

        <div className="mb-8 max-w-2xl px-8 text-center">
          <p className="animate-fade-in text-2xl leading-relaxed font-light text-white">
            {transcript}
          </p>
        </div>

        <div className="h-8">
          {!isMuted && !isAgentSpeaking && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
              Listening... Tap Mic when done.
            </div>
          )}
          {isAgentSpeaking && (
            <div className="flex items-center gap-2 text-sm font-medium text-teal-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-teal-400"></span>
              Agent is speaking...
            </div>
          )}
        </div>
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
          {/* Mic Toggle (Push to Talk logic) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleMic}
                  className={`relative overflow-hidden rounded-full p-6 transition-all duration-300 shadow-lg ${
                    !isMuted
                      ? 'bg-rose-500 scale-110 shadow-rose-500/50 text-white animate-pulse'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                  
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6 relative z-10" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>{!isMuted ? 'Stop Recording & Submit' : 'Start Speaking'}</TooltipContent>
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
                      ? 'bg-red-500/30 text-red-500 hover:bg-red-500/40'
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
                  onClick={endInterview}
                  className="flex items-center gap-2 rounded-full bg-red-500/80 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600">
                  <PhoneMissed className="h-5 w-5" />
                  Exit Interview
                </button>
              </TooltipTrigger>
              <TooltipContent>End the session early and view feedback.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

