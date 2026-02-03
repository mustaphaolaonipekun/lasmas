
import React, { useState, useEffect } from 'react';

// Global Storage Keys
const KEY_MODULES = 'LASMAS_MODULES_DB';
const KEY_SESSIONS = 'LASMAS_SESSIONS_REGISTRY';

interface Module {
  id: string;
  lecturerId: string;
  lecturerName: string;
  config: {
    semester: string;
    level: string;
    depts: string[];
    course: string;
    week: number;
    duration: number;
  };
  students: any[];
  lockedWeeks: number[];
  finalizedDeptsByWeek: Record<number, string[]>;
  createdAt: number;
}

interface LecturerPortalProps {
  user: any;
  onLogout: () => void;
  studentDatabase: any[];
}

const DEPARTMENTS_BY_FACULTY: Record<string, string[]> = {
  'Faculty of Agriculture': ['Agricultural Economics and Farm Management', 'Crop Protection', 'Horticulture and Landscape Management', 'Agricultural Extension and Rural Development', 'Aquaculture and Fisheries Management'],
  'Faculty of Applied Science': ['Banking & Finance', 'Economic Sciences', 'Accounting', 'Mass Communication', 'Business Administration', 'Insurance and Actuarial Sciences', 'Tourism and Hospitality Management', 'Office and Information Management', 'Marketing'],
  'Faculty of Basic Science': ['Physical Sciences', 'Computer Science', 'Chemical Sciences', 'Mathematical Sciences', 'Biological Sciences'],
  'Faculty of Engineering': ['Mechanical Engineering', 'Chemical Engineering', 'Mechatronics Engineering', 'Civil & Construction Engineering', 'Electrical and Electronic Engineering', 'Agricultural Engineering', 'Biotechnology and Food Sciences'],
  'Faculty of Environmental Design and Technology': ['Quantity Surveying', 'Architecture', 'Urban and Regional Planning', 'Estate Management and Valuation', 'Arts and Industrial Design', 'Building Technology']
};

const LecturerPortal: React.FC<LecturerPortalProps> = ({ user, onLogout, studentDatabase }) => {
  const [modules, setModules] = useState<Module[]>(() => {
    const saved = localStorage.getItem(KEY_MODULES);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSessions, setActiveSessions] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem(KEY_SESSIONS);
    return saved ? JSON.parse(saved) : {};
  });

  const [view, setView] = useState<'dashboard' | 'setup' | 'marking' | 'report'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMarkingDept, setActiveMarkingDept] = useState<string | null>(null);
  const [setup, setSetup] = useState({ semester: '1st', level: '100 Level', depts: [] as string[], course: '', week: 1, duration: 30 });
  const [timeLeft, setTimeLeft] = useState<string>('00:00');
  const [showDurationPicker, setShowDurationPicker] = useState<string | null>(null);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);

  const activeModule = modules.find(m => m.id === activeModuleId);
  const myModules = modules.filter(m => m.lecturerId === user.id || m.lecturerId === user.email);
  const myCurrentSession = activeModuleId ? activeSessions[activeModuleId] : null;

  // Check if current week for active dept is already finalized
  const isCurrentWeekFinalized = activeModule && activeMarkingDept 
    ? activeModule.finalizedDeptsByWeek?.[activeModule.config.week]?.includes(activeMarkingDept)
    : false;

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === KEY_MODULES && e.newValue) setModules(JSON.parse(e.newValue));
      if (e.key === KEY_SESSIONS && e.newValue) setActiveSessions(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_MODULES, JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    if (!myCurrentSession || myCurrentSession.status !== 'active') return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = myCurrentSession.endTime - now;
      if (diff <= 0) {
        stopActiveSession();
        clearInterval(interval);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [myCurrentSession, activeModuleId]);

  const finalizeRollCall = () => {
    if (!activeModuleId || !activeMarkingDept || !activeModule) return;
    
    const currentWeek = activeModule.config.week;
    const updatedModules = modules.map(m => {
      if (m.id === activeModuleId) {
        const finalized = m.finalizedDeptsByWeek || {};
        const deptsForWeek = finalized[currentWeek] || [];
        
        if (!deptsForWeek.includes(activeMarkingDept)) {
          return {
            ...m,
            finalizedDeptsByWeek: {
              ...finalized,
              [currentWeek]: [...deptsForWeek, activeMarkingDept]
            }
          };
        }
      }
      return m;
    });

    setModules(updatedModules);
    setShowFinalizeConfirm(false);
  };

  const handleDownloadCSV = () => {
    if (!activeModule) return;
    const headers = "Name,Matric Number,Department,Attendance %,Status\n";
    const rows = activeModule.students.map(s => {
      const total = activeModule.config.week;
      const present = s.attendance.slice(0, total).filter((a: any) => a === 1).length;
      const perc = Math.round((present / total) * 100) || 0;
      const isFinalized = activeModule.finalizedDeptsByWeek?.[total]?.includes(s.dept);
      const statusText = isFinalized ? (perc >= 75 ? 'Eligible' : 'Ineligible') : 'Pending';
      return `"${s.name}","${s.matric}","${s.dept}",${perc}%,${statusText}`;
    }).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeModule.config.course.replace(/\s+/g, '_')}_Attendance.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTXT = () => {
    if (!activeModule) return;
    let content = `LASUSTECH SMART ATTENDANCE SYSTEM (LASMAS)\nOFFICIAL ELIGIBILITY REPORT\n==========================================\n\nCourse: ${activeModule.config.course}\nLecturer: ${activeModule.lecturerName}\nLevel: ${activeModule.config.level}\nSemester: ${activeModule.config.semester}\nDate Generated: ${new Date().toLocaleDateString()}\n\n${'STUDENT NAME'.padEnd(30)} | ${'MATRIC'.padEnd(15)} | ${'ATTENDANCE'.padEnd(12)} | ${'STATUS'}\n${'-'.repeat(30)}-|-${'-'.repeat(15)}-|-${'-'.repeat(12)}-|-${'-'.repeat(10)}\n`;
    activeModule.students.forEach(s => {
      const total = activeModule.config.week;
      const present = s.attendance.slice(0, total).filter((a: any) => a === 1).length;
      const perc = (Math.round((present / total) * 100) || 0) + '%';
      const isFinalized = activeModule.finalizedDeptsByWeek?.[total]?.includes(s.dept);
      const statusText = isFinalized ? (perc.replace('%', '') >= '75' ? 'ELIGIBLE' : 'INELIGIBLE') : 'PENDING';
      content += `${s.name.slice(0, 30).padEnd(30)} | ${s.matric.padEnd(15)} | ${perc.padEnd(12)} | ${statusText}\n`;
    });
    content += `\n\n------------------------------------------\nRegistry Stamp: [LASMAS-VERIFIED-SYSTEM]\n------------------------------------------`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${activeModule.config.course.replace(/\s+/g, '_')}_Report.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateOTC = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const initSession = (module: Module, minutes: number) => {
    const registry = JSON.parse(localStorage.getItem(KEY_SESSIONS) || '{}');
    const totalDuration = minutes * 60000;
    const fallbackCoords = { latitude: 6.6432, longitude: 3.5135 };
    const startSessionWithCoords = (coords: { latitude: number, longitude: number }) => {
      const newSession = {
        moduleId: module.id,
        course: module.config.course,
        code: generateOTC(),
        lecturerCoords: coords,
        startTime: Date.now(),
        endTime: Date.now() + totalDuration,
        durationMinutes: minutes,
        status: 'active'
      };
      const updatedSessions = { ...registry, [module.id]: newSession };
      localStorage.setItem(KEY_SESSIONS, JSON.stringify(updatedSessions));
      setActiveSessions(updatedSessions);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => startSessionWithCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => startSessionWithCoords(fallbackCoords),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      startSessionWithCoords(fallbackCoords);
    }
  };

  const startMarking = () => {
    const filteredStudents = studentDatabase.filter(s => setup.depts.includes(s.dept));
    const classList = filteredStudents.map(s => ({ ...s, id: s.matric, attendance: Array.from({ length: 15 }, () => null) }));
    const newModule: Module = {
      id: 'MOD-' + Date.now(),
      lecturerId: user.id || user.email,
      lecturerName: user.name,
      config: { ...setup },
      students: classList,
      lockedWeeks: [],
      finalizedDeptsByWeek: {},
      createdAt: Date.now()
    };
    const updatedModules = [...modules, newModule];
    localStorage.setItem(KEY_MODULES, JSON.stringify(updatedModules));
    setModules(updatedModules);
    setActiveModuleId(newModule.id);
    setActiveMarkingDept(setup.depts[0]);
    initSession(newModule, setup.duration);
    setView('marking');
    setIsMobileMenuOpen(false);
    setSetup({ semester: '1st', level: '100 Level', depts: [], course: '', week: 1, duration: 30 });
  };

  const handleLaunchCourse = (moduleId: string, targetView: 'marking' | 'report') => {
    setActiveModuleId(moduleId);
    setActiveMarkingDept(null);
    setView(targetView);
    setIsMobileMenuOpen(false);
    if (targetView === 'marking') {
      const targetModule = modules.find(m => m.id === moduleId);
      if (targetModule && activeSessions[moduleId]?.status !== 'active') {
        setShowDurationPicker(moduleId);
      }
    }
    window.scrollTo(0, 0);
  };

  const startCustomSession = (moduleId: string, mins: number) => {
    const targetModule = modules.find(m => m.id === moduleId);
    if (targetModule) {
      initSession(targetModule, mins);
      setShowDurationPicker(null);
    }
  };

  const stopActiveSession = () => {
    if (!activeModuleId) return;
    const registry = JSON.parse(localStorage.getItem(KEY_SESSIONS) || '{}');
    delete registry[activeModuleId];
    localStorage.setItem(KEY_SESSIONS, JSON.stringify(registry));
    setActiveSessions(registry);
  };

  const setAttendanceStatus = (studentId: string, status: number) => {
    if (!activeModule || !activeMarkingDept || isCurrentWeekFinalized) return;
    const updatedModules = modules.map(m => {
      if (m.id === activeModuleId) {
        return {
          ...m,
          students: m.students.map(s => s.id === studentId ? { 
            ...s, 
            attendance: s.attendance.map((a: any, i: number) => i === m.config.week - 1 ? status : a) 
          } : s)
        };
      }
      return m;
    });
    setModules(updatedModules);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    if (!activeModuleId) return;
    const updatedModules = modules.map(m => {
      if (m.id === activeModuleId) {
        const currentWeek = m.config.week;
        const newWeek = direction === 'prev' ? Math.max(1, currentWeek - 1) : Math.min(15, currentWeek + 1);
        return { ...m, config: { ...m.config, week: newWeek } };
      }
      return m;
    });
    setModules(updatedModules);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-['Urbanist'] relative">
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        className="lg:hidden fixed bottom-6 right-6 z-[80] w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform active:scale-90"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-[70] bg-white border-r border-slate-100 flex flex-col p-8 transition-all duration-500 lg:static lg:w-80 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[85vw] max-w-xs' : '-translate-x-full w-0'}`}>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">L</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">LASMAS</span>
        </div>
        <nav className="space-y-2 flex-grow">
          <button onClick={() => {setView('dashboard'); setIsMobileMenuOpen(false);}} className={`w-full text-left px-7 py-5 rounded-[1.8rem] transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${view === 'dashboard' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>📚 My Courses</button>
          <button onClick={() => {setView('setup'); setIsMobileMenuOpen(false);}} className={`w-full text-left px-7 py-5 rounded-[1.8rem] transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${view === 'setup' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>➕ Add Course</button>
          {activeModuleId && (
            <div className="mt-8 pt-8 border-t border-slate-100 space-y-2">
              <button onClick={() => {setView('marking'); setIsMobileMenuOpen(false);}} className={`w-full text-left px-7 py-5 rounded-[1.8rem] transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${view === 'marking' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>📋 Attendance</button>
              <button onClick={() => {setView('report'); setIsMobileMenuOpen(false);}} className={`w-full text-left px-7 py-5 rounded-[1.8rem] transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${view === 'report' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>📊 Eligibility</button>
            </div>
          )}
        </nav>
        <button onClick={onLogout} className="mt-8 py-5 text-rose-500 font-black text-[10px] uppercase tracking-widest border-2 border-rose-50 rounded-[1.8rem] hover:bg-rose-50 transition-colors">Sign Out</button>
      </aside>

      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto w-full custom-scrollbar">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-stretch md:items-center bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-none mb-2">
              {view === 'dashboard' ? `${user.name}'s Hub` : view === 'setup' ? 'Institutional Onboarding' : activeModule?.config.course}
            </h1>
            <p className="text-indigo-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.25em]">{user.faculty}</p>
          </div>
          {myCurrentSession && (
            <div className="bg-slate-900 p-6 md:p-8 md:px-10 rounded-[2rem] md:rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-2xl">
               <div className="flex flex-col items-center">
                  <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Time Left</p>
                  <p className="text-2xl md:text-3xl font-black font-mono leading-none">{timeLeft}</p>
               </div>
               <div className="hidden md:block w-px h-10 bg-white/10"></div>
               <div className="flex flex-col items-center">
                  <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">Session Code</p>
                  <p className="text-2xl md:text-3xl font-black tracking-[0.2em] leading-none">{myCurrentSession.code}</p>
               </div>
               <button onClick={stopActiveSession} className="w-full md:w-auto px-8 py-3 bg-rose-500 text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95">End Session</button>
            </div>
          )}
        </header>

        {view === 'dashboard' && (
          <div className="animate-fade-in">
            {myModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myModules.map(m => (
                  <div key={m.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-xl">📖</div>
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[8px] font-black uppercase tracking-widest">{m.config.level}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600">{m.config.course}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{m.config.semester} Semester • Week {m.config.week}</p>
                    <div className="space-y-3 mt-auto">
                      <button onClick={() => handleLaunchCourse(m.id, 'marking')} className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-colors">Launch Session</button>
                      <button onClick={() => handleLaunchCourse(m.id, 'report')} className="w-full py-4 bg-white text-slate-900 border border-slate-100 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Eligibility Hub</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 md:p-24 rounded-[3rem] border-2 border-dashed border-slate-100 text-center max-w-4xl mx-auto shadow-sm">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-4xl md:text-6xl shadow-inner border border-indigo-100">🏫</div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">Academic Records</h3>
                <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed mb-12 max-w-md mx-auto">No modules registered yet. Start by onboarding a course to track attendance.</p>
                <button onClick={() => setView('setup')} className="w-full md:w-auto px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all">Setup First Module</button>
              </div>
            )}
          </div>
        )}

        {view === 'marking' && activeModule && (
          <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
             {!myCurrentSession && (
               <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in shadow-inner text-center md:text-left">
                 <div className="flex flex-col md:flex-row items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">⏱️</div>
                   <div>
                     <h4 className="font-black text-indigo-900 uppercase text-xs tracking-widest">Session Ready</h4>
                     <p className="text-[10px] font-bold text-indigo-400">Generate a unique code to begin Week {activeModule.config.week} roll-call.</p>
                   </div>
                 </div>
                 <button onClick={() => setShowDurationPicker(activeModule.id)} className="w-full md:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all active:scale-95">Open Roll-Call</button>
               </div>
             )}

             <div className="flex flex-wrap gap-2 md:gap-3">
                {activeModule.config.depts.map(d => (
                  <button key={d} onClick={() => setActiveMarkingDept(d)} className={`flex-grow md:flex-none px-6 py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 transition-all ${activeMarkingDept === d ? 'bg-slate-900 text-white border-slate-900 shadow-lg':'bg-white text-slate-400 border-slate-100 hover:border-indigo-100'}`}>{d}</button>
                ))}
             </div>
             
             <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 md:p-12 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
                   <div className="text-center md:text-left">
                      <h3 className="text-xl font-black text-slate-900 mb-1">{activeMarkingDept || 'Registry Feed'}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                         <span className={`w-2 h-2 ${isCurrentWeekFinalized ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'} rounded-full`}></span>
                         <p className={`text-[10px] font-black ${isCurrentWeekFinalized ? 'text-emerald-600' : 'text-indigo-600'} uppercase tracking-widest`}>
                           {isCurrentWeekFinalized ? `Finalized Week ${activeModule.config.week}` : `Live Syncing Week ${activeModule.config.week}`}
                         </p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-3 md:gap-4 bg-white p-2 rounded-full shadow-sm border border-slate-100">
                      <button onClick={() => changeWeek('prev')} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full font-black text-base active:scale-90 transition-transform">←</button>
                      <span className="px-4 text-[10px] font-black text-slate-900 uppercase">Wk {activeModule.config.week}</span>
                      <button onClick={() => changeWeek('next')} className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-full font-black text-base active:scale-90 transition-transform">→</button>
                   </div>
                </div>
                
                {activeMarkingDept ? (
                  <>
                  <div className="divide-y divide-slate-50 px-4 md:px-8 max-h-[60vh] overflow-y-auto custom-scrollbar overscroll-contain">
                     {activeModule.students.filter(s => s.dept === activeMarkingDept).map(s => {
                       const current = s.attendance[activeModule.config.week - 1];
                       return (
                         <div key={s.id} className="py-6 flex flex-col sm:flex-row justify-between items-center gap-6 group transition-all duration-300">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                               <div className="relative shrink-0">
                                  <img src={s.image} alt="" className="w-14 h-14 rounded-2xl border-2 border-slate-50 shadow-sm object-cover" />
                                  {current === 1 && <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-[10px] text-white animate-fade-in">✓</div>}
                               </div>
                               <div className="text-left">
                                  <p className="font-black text-slate-900 leading-tight">{s.name}</p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{s.matric}</p>
                               </div>
                            </div>
                            
                            <div className="flex gap-2 w-full sm:w-auto">
                               <button onClick={() => setAttendanceStatus(s.id, 1)} disabled={isCurrentWeekFinalized} className={`flex-1 sm:w-32 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all duration-300 ${current === 1 ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-50 text-slate-300 border border-slate-100 hover:bg-emerald-50 hover:text-emerald-500'} disabled:opacity-50`}>
                                 {current === 1 ? 'Present ✓' : 'Mark In'}
                               </button>
                               <button onClick={() => setAttendanceStatus(s.id, 0)} disabled={isCurrentWeekFinalized} className={`flex-1 sm:w-32 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all duration-300 ${current === 0 ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-50 text-slate-300 border border-slate-100 hover:bg-rose-50 hover:text-rose-500'} disabled:opacity-50`}>
                                 {current === 0 ? 'Absent ✗' : 'Mark Out'}
                               </button>
                            </div>
                         </div>
                       );
                     })}
                  </div>
                  {!isCurrentWeekFinalized && (
                    <div className="p-8 md:p-12 bg-slate-50/30 border-t border-slate-50 flex flex-col items-center">
                       <button onClick={() => setShowFinalizeConfirm(true)} className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                         🛡️ Finalize Roll Call & Audit Week
                       </button>
                       <p className="mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Locked data will be calculated for institutional eligibility</p>
                    </div>
                  )}
                  </>
                ) : (
                  <div className="p-20 text-center"><p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">Select a department to view the live register</p></div>
                )}
             </div>
          </div>
        )}

        {view === 'setup' && (
          <div className="max-w-2xl bg-white p-8 md:p-14 rounded-[3rem] border border-slate-100 shadow-xl animate-fade-in mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-10 text-center md:text-left">Institutional Onboarding</h3>
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Semester</label>
                    <select value={setup.semester} onChange={e => setSetup({...setup, semester: e.target.value})} className="w-full p-5 bg-slate-50 rounded-[1.8rem] border-none font-black text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all">
                       <option>1st Semester</option><option>2nd Semester</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-4">Level</label>
                    <select value={setup.level} onChange={e => setSetup({...setup, level: e.target.value})} className="w-full p-5 bg-slate-50 rounded-[1.8rem] border-none font-black text-slate-700 outline-none shadow-inner focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all">
                       {['100', '200', '300', '400', '500'].map(l => <option key={l}>{l} Level</option>)}
                    </select>
                 </div>
               </div>
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Course Title</label>
                  <input type="text" placeholder="e.g. CSC 311 - Advanced Algorithms" value={setup.course} onChange={e => setSetup({...setup, course: e.target.value})} className="w-full p-5 bg-slate-50 rounded-[1.8rem] border-none font-black text-slate-700 outline-none placeholder:text-slate-300 shadow-inner focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all" />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Session Duration</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[15, 30, 45, 60].map(m => (
                      <button key={m} onClick={() => setSetup({...setup, duration: m})} className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${setup.duration === m ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-50 hover:border-indigo-100'}`}>
                        {m}m
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Authorized Departments</label>
                  <div className="flex flex-wrap gap-2">
                     {(DEPARTMENTS_BY_FACULTY[user.faculty] || []).map(d => (
                       <button key={d} onClick={() => setSetup({...setup, depts: setup.depts.includes(d)?setup.depts.filter(i=>i!==d):[...setup.depts,d]})} className={`px-5 py-3 rounded-full text-[9px] font-black transition-all border-2 ${setup.depts.includes(d)?'bg-indigo-600 text-white border-indigo-600 shadow-lg':'bg-white text-slate-400 border-slate-100 hover:border-indigo-50 hover:text-indigo-500'}`}>{d}</button>
                     ))}
                  </div>
               </div>
               <button onClick={startMarking} disabled={!setup.course || setup.depts.length===0} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl disabled:opacity-50 active:scale-95 transition-all mt-4">Register Academic Module</button>
            </div>
          </div>
        )}

        {view === 'report' && activeModule && (
          <div className="animate-fade-in space-y-8 max-w-6xl mx-auto">
             <div className="bg-white p-8 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                   <div className="text-center md:text-left">
                      <h3 className="text-2xl font-black text-slate-900 mb-1 leading-none">Exam Eligibility Report</h3>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                         <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                         <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Registry Compliance Audit</p>
                      </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button onClick={handleDownloadCSV} className="w-full sm:flex-1 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95">📥 .CSV Export</button>
                      <button onClick={handleDownloadTXT} className="w-full sm:flex-1 px-8 py-4 bg-white text-slate-900 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95">📄 .TXT Audit</button>
                   </div>
                </div>

                <div className="space-y-4">
                   {activeModule.students.map(s => {
                      const total = activeModule.config.week;
                      const present = s.attendance.slice(0, total).filter((a: any) => a === 1).length;
                      const perc = Math.round((present / total) * 100) || 0;
                      const isFinalized = activeModule.finalizedDeptsByWeek?.[total]?.includes(s.dept);
                      const statusText = isFinalized ? (perc >= 75 ? 'Eligible ✓' : 'Ineligible ✗') : 'Pending Audit';
                      const statusColor = isFinalized ? (perc >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700') : 'bg-amber-100 text-amber-700';
                      return (
                        <div key={s.id} className="p-6 bg-slate-50 rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center gap-6 group transition-all hover:bg-white border border-transparent hover:border-slate-100 shadow-sm">
                           <div className="flex items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                              <img src={s.image} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0" alt="" />
                              <div>
                                 <p className="font-black text-slate-900 text-base leading-tight">{s.name}</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{s.matric}</p>
                              </div>
                           </div>
                           <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto">
                              <div className="text-center sm:text-right">
                                 <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Attendance</p>
                                 <p className={`text-xl font-black ${isFinalized ? (perc >= 75 ? 'text-emerald-600' : 'text-rose-600') : 'text-amber-600'}`}>{perc}%</p>
                              </div>
                              <div className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest min-w-[120px] text-center shadow-sm ${statusColor}`}>{statusText}</div>
                           </div>
                        </div>
                      );
                   })}
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Finalization */}
      {showFinalizeConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowFinalizeConfirm(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-12 md:p-16 shadow-2xl text-center border border-slate-100">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-indigo-100">🔒</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Finalize Attendance?</h3>
            <p className="text-slate-500 mb-10 font-medium text-sm leading-relaxed">
              This will lock the Week {activeModule?.config.week} register for {activeMarkingDept}. Data will be transmitted to the Registry for eligibility calculation. This action cannot be undone.
            </p>
            <div className="flex flex-col gap-4">
              <button onClick={finalizeRollCall} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-600 transition-all">Yes, Commit to Registry</button>
              <button onClick={() => setShowFinalizeConfirm(false)} className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors">Go Back</button>
            </div>
          </div>
        </div>
      )}

      {showDurationPicker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowDurationPicker(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-12 md:p-16 shadow-2xl animate-hero text-center border border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Set Registry Timer</h3>
            <p className="text-slate-500 mb-10 font-medium text-sm">Define how long students have to check in before the register locks.</p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[15, 30, 45, 60, 90, 120].map(m => (
                <button key={m} onClick={() => startCustomSession(showDurationPicker, m)} className="py-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 font-black text-slate-700 hover:bg-indigo-600 hover:text-white transition-all uppercase text-[10px] tracking-widest shadow-sm active:scale-95">{m}m</button>
              ))}
            </div>
            <button onClick={() => setShowDurationPicker(null)} className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-500 transition-colors">Cancel Session Open</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturerPortal;
