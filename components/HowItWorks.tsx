
import React, { useState, useEffect, useRef } from 'react';

interface Scene {
  id: number;
  title: string;
  description: string;
  overlay: string;
  icon: string;
  color: string;
}

const SCENES: Scene[] = [
  {
    id: 1,
    title: "Classroom Setup",
    description: "The lecturer logs into the LASMAS portal and initiates the attendance module for the specific course and level.",
    overlay: "Lecturer starts attendance session",
    icon: "👨‍🏫",
    color: "bg-indigo-600"
  },
  {
    id: 2,
    title: "Secure Code Generation",
    description: "A unique 6-digit authentication code is generated. This code is dynamic and expires automatically after a set duration.",
    overlay: "A secure, time-limited code is generated: 884-209",
    icon: "🔐",
    color: "bg-purple-600"
  },
  {
    id: 3,
    title: "Student Check-In",
    description: "Students open their mobile portal and enter the displayed code along with their matriculation details.",
    overlay: "Students enter details to check in",
    icon: "📱",
    color: "bg-blue-600"
  },
  {
    id: 4,
    title: "Location Verification",
    description: "The system runs a background GPS check to ensure the student is physically present within the 30m classroom radius.",
    overlay: "Location is verified to prevent fraud",
    icon: "📍",
    color: "bg-emerald-600"
  },
  {
    id: 5,
    title: "Instant Recording",
    description: "Once verified, the student's status is immediately updated to 'Present' in the centralized university database.",
    overlay: "Attendance is recorded instantly",
    icon: "✅",
    color: "bg-teal-600"
  },
  {
    id: 6,
    title: "Live Monitoring",
    description: "The lecturer monitors the attendance feed in real-time, watching the present/absent counters update instantly.",
    overlay: "Lecturers monitor attendance in real time",
    icon: "📊",
    color: "bg-cyan-600"
  },
  {
    id: 7,
    title: "Session Closure",
    description: "When the lecture ends or the timer hits zero, the session locks and no further check-ins are permitted.",
    overlay: "Session closes automatically",
    icon: "🔒",
    color: "bg-rose-600"
  },
  {
    id: 8,
    title: "Eligibility Calculation",
    description: "The system calculates the cumulative percentage. Students hitting the 75% threshold receive their digital exam permits.",
    overlay: "System calculates exam eligibility",
    icon: "📜",
    color: "bg-indigo-900"
  }
];

const HowItWorks: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<any>(null);

  const SCENE_DURATION = 5000; // 5 seconds per scene

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / (SCENE_DURATION / 100));
        });
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, currentScene]);

  const handleNext = () => {
    setCurrentScene((prev) => (prev + 1) % SCENES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setProgress(0);
  };

  const jumpToScene = (index: number) => {
    setCurrentScene(index);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const scene = SCENES[currentScene];

  return (
    <div className="py-24 relative overflow-hidden" id="how-it-works">
      {/* Dynamic Background Overlay - Adjusted for light theme */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-full transition-colors duration-1000 ${scene.color.replace('bg-', 'bg-opacity-20 bg-')}`}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Operational Walkthrough
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            How <span className="text-indigo-500">LASMAS</span> Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Experience the step-by-step digital transformation of the LASUSTECH attendance lifecycle.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Walkthrough "Monitor" - Kept dark for contrast and device feel */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-8 border-white group overflow-hidden">
              {/* Internal Screen Content */}
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative flex flex-col">
                
                {/* Scene Rendering */}
                <div className="flex-grow relative flex items-center justify-center p-8">
                  {/* Scene 1: Classroom Setup */}
                  {currentScene === 0 && (
                    <div className="animate-fade-in flex flex-col items-center">
                      <div className="w-48 h-32 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-5xl shadow-inner">💻</div>
                      <div className="w-40 h-3 bg-slate-200 rounded-full mb-2"></div>
                      <div className="w-24 h-3 bg-indigo-500 rounded-full"></div>
                    </div>
                  )}

                  {/* Scene 2: Code Gen */}
                  {currentScene === 1 && (
                    <div className="animate-fade-in flex flex-col items-center">
                      <div className="text-6xl font-black text-indigo-600 mb-4 tracking-[0.2em] animate-float">884-209</div>
                      <div className="px-6 py-2 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-rose-100">Expiring in 04:59</div>
                    </div>
                  )}

                  {/* Scene 3: Student Check-In */}
                  {currentScene === 2 && (
                    <div className="animate-fade-in flex gap-6">
                      <div className="w-20 h-40 bg-slate-900 rounded-3xl p-2 border-2 border-slate-800 shadow-xl">
                         <div className="w-full h-full bg-white rounded-2xl p-2">
                            <div className="w-full h-2 bg-slate-100 rounded mb-2"></div>
                            <div className="w-full h-4 bg-indigo-50 rounded mb-4"></div>
                            <div className="w-full h-6 bg-indigo-600 rounded"></div>
                         </div>
                      </div>
                      <div className="w-20 h-40 bg-slate-900 rounded-3xl p-2 border-2 border-slate-800 shadow-xl mt-8">
                         <div className="w-full h-full bg-white rounded-2xl p-2">
                            <div className="w-full h-2 bg-slate-100 rounded mb-2"></div>
                            <div className="w-full h-4 bg-indigo-50 rounded mb-4"></div>
                            <div className="w-full h-6 bg-indigo-600 rounded"></div>
                         </div>
                      </div>
                    </div>
                  )}

                  {/* Scene 4: GPS */}
                  {currentScene === 3 && (
                    <div className="animate-fade-in relative">
                       <div className="w-48 h-48 rounded-full border-4 border-emerald-500/20 flex items-center justify-center animate-pulse">
                          <div className="w-32 h-32 rounded-full border-2 border-emerald-500/40 flex items-center justify-center">
                             <div className="text-4xl">📍</div>
                          </div>
                       </div>
                       <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">Within 30m Range</div>
                    </div>
                  )}

                  {/* Scene 5: Success */}
                  {currentScene === 4 && (
                    <div className="animate-fade-in flex flex-col items-center">
                       <div className="w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-emerald-200 animate-float">✓</div>
                       <p className="mt-8 font-black text-slate-900 uppercase tracking-widest text-sm">Attendance Logged</p>
                    </div>
                  )}

                  {/* Scene 6: Dashboard */}
                  {currentScene === 5 && (
                    <div className="animate-fade-in w-full max-w-xs space-y-4">
                       <div className="flex justify-between items-end gap-2 h-32">
                          <div className="bg-indigo-600 w-full rounded-t-lg transition-all duration-1000" style={{ height: '80%' }}></div>
                          <div className="bg-indigo-400 w-full rounded-t-lg transition-all duration-1000" style={{ height: '40%' }}></div>
                          <div className="bg-indigo-200 w-full rounded-t-lg transition-all duration-1000" style={{ height: '95%' }}></div>
                          <div className="bg-indigo-600 w-full rounded-t-lg transition-all duration-1000" style={{ height: '65%' }}></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Present</p>
                             <p className="text-lg font-black text-indigo-600">42/50</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl">
                             <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rate</p>
                             <p className="text-lg font-black text-indigo-600">84%</p>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Scene 7: Locked */}
                  {currentScene === 6 && (
                    <div className="animate-fade-in flex flex-col items-center">
                       <div className="text-7xl mb-6">🔒</div>
                       <div className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Register Locked</div>
                    </div>
                  )}

                  {/* Scene 8: Report */}
                  {currentScene === 7 && (
                    <div className="animate-fade-in w-full max-w-sm">
                       <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-xl">
                          <div className="flex justify-between mb-4">
                             <span className="font-black text-xs uppercase tracking-widest text-slate-900">Final Compliance</span>
                             <span className="font-black text-xs text-emerald-600">75% THRESHOLD MET</span>
                          </div>
                          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
                             <div className="h-full bg-emerald-500 w-[82%] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                          </div>
                          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Generate Exam Permit</button>
                       </div>
                    </div>
                  )}

                  {/* Global Overlay Title */}
                  <div className="absolute top-8 left-8 right-8 text-center pointer-events-none">
                    <span className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/10">
                      {scene.overlay}
                    </span>
                  </div>
                </div>

                {/* Progress Bar (Bottom of Screen) */}
                <div className="h-2 bg-slate-100 relative">
                  <div className="h-full bg-indigo-600 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Player Controls Layer (Visible on Hover) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                <button onClick={handlePrev} className="text-white hover:text-indigo-400 transition-colors font-black text-sm">Prev</button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center text-white text-lg">
                  {isPlaying ? '⏸' : '▶️'}
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={handleNext} className="text-white hover:text-indigo-400 transition-colors font-black text-sm">Next</button>
              </div>
            </div>
          </div>

          {/* Description Content */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className={`w-16 h-16 ${scene.color} rounded-3xl flex items-center justify-center text-3xl shadow-2xl shadow-indigo-500/20 border-2 border-white/20 transition-all duration-500`}>
                {scene.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {scene.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {scene.description}
              </p>
            </div>

            {/* Steps Indicator */}
            <div className="grid grid-cols-4 gap-4">
              {SCENES.map((s, idx) => (
                <button 
                  key={s.id} 
                  onClick={() => jumpToScene(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentScene ? 'bg-indigo-500 w-full' : 'bg-slate-200 w-full hover:bg-slate-300'}`}
                >
                  <span className="sr-only">Step {s.id}</span>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Scene</p>
                  <span className="text-slate-900 font-black text-xl">0{scene.id} <span className="text-slate-300">/ 08</span></span>
               </div>
               <button 
                 onClick={() => jumpToScene(0)}
                 className="px-8 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
               >
                 Replay Intro
               </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Anti-Fraud GPS", desc: "Forced location matching between lecturer and student coordinates.", icon: "📍" },
             { title: "Smart Thresholds", desc: "Automated calculation of the university's 75% exam attendance bar.", icon: "📈" },
             { title: "Registry Sync", desc: "Direct, tamper-proof uplink to institutional administrative records.", icon: "🏛️" }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-xl hover:scale-[1.02] transition-all group">
                <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                <h4 className="text-slate-900 font-black text-xl mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
