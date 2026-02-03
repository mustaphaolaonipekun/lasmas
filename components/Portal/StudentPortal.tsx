
import React, { useState, useEffect } from 'react';

// Global Storage Keys
const KEY_MODULES = 'LASMAS_MODULES_DB';
const KEY_SESSIONS = 'LASMAS_SESSIONS_REGISTRY';

interface StudentPortalProps {
  user: any;
  onLogout: () => void;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ user, onLogout }) => {
  const [modules, setModules] = useState<any[]>(() => {
    const saved = localStorage.getItem(KEY_MODULES);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSessions, setActiveSessions] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem(KEY_SESSIONS);
    return saved ? JSON.parse(saved) : {};
  });

  const [view, setView] = useState<'dashboard' | 'attendance'>('dashboard');
  const [inputCode, setInputCode] = useState('');
  const [locStatus, setLocStatus] = useState<'idle' | 'code-entry' | 'checking' | 'verified' | 'error'>('idle');
  const [distance, setDistance] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [canBypass, setCanBypass] = useState(false);
  const [errorType, setErrorType] = useState<'permission' | 'timeout' | 'signal' | 'classroom' | null>(null);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === KEY_MODULES && e.newValue) setModules(JSON.parse(e.newValue));
      if (e.key === KEY_SESSIONS && e.newValue) setActiveSessions(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const enrolledCourses = modules.filter(m => 
    m.students.some((s: any) => s.matric === user.matric)
  ).map(m => {
    const studentData = m.students.find((s: any) => s.matric === user.matric);
    const currentWeek = m.config.week;
    const attendedCount = studentData.attendance.slice(0, currentWeek).filter((a: any) => a === 1).length;
    const perc = currentWeek > 0 ? Math.round((attendedCount / currentWeek) * 100) : 0;
    let statusBadge = 'Pending';
    let statusColor = 'bg-slate-50 text-slate-500 border-slate-100';
    const isFinalized = m.finalizedDeptsByWeek?.[currentWeek]?.includes(studentData.dept);
    if (!isFinalized && currentWeek >= 3) {
      statusBadge = 'Pending Audit';
      statusColor = 'bg-amber-50 text-amber-600 border-amber-50';
    } else if (currentWeek < 3) {
      statusBadge = 'On Track ✓';
      statusColor = 'bg-indigo-50 text-indigo-600 border-indigo-50';
    } else if (perc >= 75) {
      statusBadge = 'Eligible ✓';
      statusColor = 'bg-emerald-50 text-emerald-600 border-emerald-50';
    } else {
      statusBadge = 'Ineligible ✗';
      statusColor = 'bg-rose-50 text-rose-600 border-rose-50';
    }
    return { ...m, studentData, stats: { attended: attendedCount, percentage: perc, totalWeeks: currentWeek, statusBadge, statusColor } };
  });

  const overallAvg = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.stats.percentage, 0) / enrolledCourses.length) 
    : 0;

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const markAttendanceSuccess = (sessionToUse: any, dist: number) => {
    setDistance(dist);
    setLocStatus('verified');
    const latestModules = JSON.parse(localStorage.getItem(KEY_MODULES) || '[]');
    const updatedModules = latestModules.map((m: any) => {
      if (m.id === sessionToUse.moduleId) {
        return {
          ...m,
          students: m.students.map((s: any) => {
            if (s.matric === user.matric) {
              const newAttendance = [...s.attendance];
              newAttendance[m.config.week - 1] = 1;
              return { ...s, attendance: newAttendance };
            }
            return s;
          })
        };
      }
      return m;
    });
    localStorage.setItem(KEY_MODULES, JSON.stringify(updatedModules));
    setModules(updatedModules);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setErrorType(null);
    setLocStatus('checking');
    
    // SYNC REGISTRY
    const registry = JSON.parse(localStorage.getItem(KEY_SESSIONS) || '{}');
    const studentInput = inputCode.trim().toUpperCase();
    
    // DEMO LOGIC: Allow any code to proceed to GPS check
    // Try to find the actual session matching the code first
    let foundSession: any = Object.values(registry).find((s: any) => 
      s.code.toUpperCase() === studentInput && s.status === 'active'
    );

    // If matching code isn't found, pick ANY active session so GPS logic has a reference point
    if (!foundSession) {
      foundSession = Object.values(registry).find((s: any) => s.status === 'active');
    }

    // If NO session exists at all (lecturer hasn't started anything), 
    // we use a mock reference (LASUSTECH Ikorodu coordinates) to allow the demo to continue
    if (!foundSession) {
      foundSession = {
        moduleId: 'DEMO-FALLBACK',
        course: 'General Session',
        lecturerCoords: { latitude: 6.6432, longitude: 3.5135 }, // University Coords
        status: 'active'
      };
    }

    // Proceed to GPS verification - the user will either succeed or see the classroom error
    setTimeout(() => {
      triggerGPSVerification(foundSession);
    }, 800);
  };

  const triggerGPSVerification = (sessionToUse: any) => {
    if (!navigator.geolocation) {
      setErrorMsg("GPS not supported by this browser.");
      setLocStatus('error');
      setCanBypass(true);
      return;
    }
    
    const options = { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d = calculateDistance(pos.coords.latitude, pos.coords.longitude, sessionToUse.lecturerCoords.latitude, sessionToUse.lecturerCoords.longitude);
        
        // Use a strict 25m radius for the "same classroom" effect
        if (d <= 25) { 
          markAttendanceSuccess(sessionToUse, d);
        } else {
          setLocStatus('error');
          setDistance(d);
          setErrorType('classroom');
          setErrorMsg("You're not in same classroom with lecturer; move closer < 2m");
          setCanBypass(true);
        }
      },
      (err) => {
        setLocStatus('error');
        setCanBypass(true);
        if(err.code === err.PERMISSION_DENIED) {
           setErrorType('permission');
           setErrorMsg("Location access denied. Please click the 'Lock' icon and 'Allow' location.");
        } else {
           setErrorType('signal');
           setErrorMsg("GPS Signal Failed. Ensure your phone's Location (GPS) is ON.");
        }
      },
      options
    );
  };

  const handleManualSync = () => {
    setLocStatus('checking');
    const registry = JSON.parse(localStorage.getItem(KEY_SESSIONS) || '{}');
    const foundSession = Object.values(registry).find((s: any) => s.status === 'active') || {
      moduleId: 'DEMO-FALLBACK',
      lecturerCoords: { latitude: 6.6432, longitude: 3.5135 }
    };
    setTimeout(() => {
      markAttendanceSuccess(foundSession, 0);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Urbanist'] overflow-x-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-10 py-10 lg:py-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 lg:mb-16 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-xl">{user.name.charAt(0)}</div>
            <div>
              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2">Student Hub</h1>
              <p className="text-slate-500 font-black text-[9px] lg:text-[11px] uppercase tracking-[0.25em]">{user.name} • {user.matric}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => { setView(view === 'dashboard' ? 'attendance' : 'dashboard'); setLocStatus('idle'); setInputCode(''); setErrorMsg(null); }} className={`flex-1 md:flex-none px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all shadow-sm ${view === 'dashboard' ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-100 hover:bg-indigo-700' : 'bg-white text-slate-900 border-slate-100'}`}>
              {view === 'dashboard' ? 'Mark Attendance' : 'Academic Hub'}
            </button>
            <button onClick={onLogout} className="px-8 py-4 bg-white text-rose-500 rounded-full font-black text-[10px] uppercase tracking-widest border border-rose-50 hover:bg-rose-50 transition-all">Sign Out</button>
          </div>
        </header>

        {view === 'dashboard' ? (
          <div className="animate-fade-in space-y-10 lg:space-y-16">
            <div className="bg-slate-900 p-8 lg:p-14 rounded-[3rem] lg:rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
               <div className="relative z-10 text-center md:text-left">
                  <p className="text-indigo-400 font-black text-[10px] lg:text-xs uppercase tracking-[0.3em] mb-4">Academic Status</p>
                  <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">Institutional Average: <span className="text-indigo-400">{overallAvg}%</span></h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tracking {enrolledCourses.length} Registered Modules</p>
               </div>
               <div className="relative z-10 flex items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 shrink-0">
                  <div className="text-center">
                    <p className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Registry Audit</p>
                    <p className="text-3xl font-black text-emerald-400 uppercase">On Track</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {enrolledCourses.length > 0 ? enrolledCourses.map(course => (
                <div key={course.id} className="bg-white p-8 lg:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl border border-slate-100 shadow-inner">📖</div>
                    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${course.stats.statusColor}`}>
                      {course.stats.statusBadge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{course.config.course}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">{course.config.semester} Semester • Week {course.config.week}</p>
                  <div className="mb-10 flex items-center gap-6 bg-slate-50 p-6 rounded-[2.5rem] shadow-inner">
                    <div className="flex-1 text-center"><p className="text-[8px] font-black text-slate-400 uppercase mb-1">Attended</p><p className="text-xl font-black">{course.stats.attended}</p></div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex-1 text-center"><p className="text-[8px] font-black text-slate-400 uppercase mb-1">Compliance</p><p className="text-xl font-black">{course.stats.percentage}%</p></div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No Active Modules Found</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-[4rem] p-12 lg:p-20 border border-slate-100 shadow-2xl animate-fade-in text-center relative overflow-hidden">
             {(locStatus === 'idle' || locStatus === 'code-entry') && (
               <>
                 <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-5xl shadow-inner border border-indigo-100">🔐</div>
                 <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Verify Code</h2>
                 <p className="text-slate-500 mb-12 font-bold leading-relaxed px-4 text-sm">
                    Enter the 6-digit session code to log your presence, make sure you're in same class with lecturer and you login before the time counter stops.
                 </p>
                 <form onSubmit={handleVerifyCode} className="space-y-8">
                   <input 
                    type="text" 
                    maxLength={6} 
                    placeholder="XXXXXX" 
                    value={inputCode} 
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())} 
                    className="w-full text-center py-8 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] text-5xl font-black tracking-[0.4em] text-indigo-600 outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:tracking-normal shadow-inner" 
                   />
                   <button 
                    type="submit" 
                    disabled={inputCode.length < 1} 
                    className="w-full py-8 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-indigo-100 disabled:opacity-30 hover:bg-indigo-700 transition-all uppercase tracking-widest active:scale-95"
                   >
                     Verify Signal 🛰️
                   </button>
                 </form>
               </>
             )}
             {locStatus === 'checking' && (
               <div className="py-20 flex flex-col items-center">
                 <div className="w-24 h-24 border-8 border-indigo-50 border-t-indigo-600 rounded-full animate-spin mb-10 shadow-2xl"></div>
                 <h3 className="text-2xl font-black text-slate-900">Validating Signal...</h3>
                 <p className="text-slate-400 text-xs font-bold mt-4 animate-pulse uppercase">Establishing Registry Uplink</p>
               </div>
             )}
             {locStatus === 'verified' && (
               <div className="py-10 text-center animate-fade-in">
                 <div className="w-28 h-28 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-6xl shadow-xl border border-emerald-100">✅</div>
                 <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Success!</h3>
                 <p className="text-slate-500 mb-12 font-medium text-lg leading-relaxed max-w-sm mx-auto">Your attendance has been recorded for this session. Keep up the good work!</p>
                 <button onClick={() => setView('dashboard')} className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">Return to Records</button>
               </div>
             )}
             {locStatus === 'error' && (
               <div className="py-10 text-center animate-fade-in px-4">
                 <div className="w-28 h-28 bg-rose-50 text-rose-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-6xl shadow-xl border border-rose-100">
                   {errorType === 'classroom' ? '📍' : errorType === 'permission' ? '🚫' : '⚠️'}
                 </div>
                 <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    {errorType === 'classroom' ? 'Range Error' : 'Verification Failed'}
                 </h3>
                 <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2.5rem] mb-12 text-rose-700 text-[11px] font-black uppercase tracking-widest leading-relaxed shadow-inner text-center">
                    {errorMsg}
                 </div>
                 <div className="flex flex-col gap-4">
                    <button onClick={() => {setLocStatus('idle'); setErrorMsg(null); setErrorType(null);}} className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">Try Again</button>
                    {canBypass && (
                      <button onClick={handleManualSync} className="w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                        Request Manual Proximity Override
                      </button>
                    )}
                 </div>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;
