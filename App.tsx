
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import WhyLasmas from './components/WhyLasmas';
import WhyLasmasPage from './components/WhyLasmasPage';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Login from './components/Portal/Login';
import LecturerPortal from './components/Portal/LecturerPortal';
import StudentPortal from './components/Portal/StudentPortal';
import AdminDashboard from './components/Portal/AdminDashboard';
import Signup from './components/Portal/Signup';
import TeamPage from './components/TeamPage';

// Standardized Global Keys
const KEY_LECTURERS = 'LASMAS_LECTURERS_DB';
const KEY_MODULES = 'LASMAS_MODULES_DB';
const KEY_SESSIONS = 'LASMAS_SESSIONS_REGISTRY';
const SESSION_USER = 'LASMAS_ACTIVE_USER';
const SESSION_VIEW = 'LASMAS_CURRENT_VIEW';

const MASTER_STAFF_DATABASE = [
  { 
    id: 'S1', 
    name: 'Engr. Dr. Yakubu Olawale Bankole', 
    faculty: 'Faculty of Engineering', 
    email: 'y.bankole@lasustech.edu.ng', 
    status: 'verified', 
    role: 'Lecturer', 
    password: 'password',
    profilePic: 'https://i.pravatar.cc/150?u=S1' 
  },
  { 
    id: 'S11', 
    name: 'Prof. Olamade Olumuyiwa Owolabi', 
    faculty: 'Faculty of Applied Science', 
    email: 'o.owolabi@lasustech.edu.ng', 
    status: 'verified', 
    role: 'Lecturer', 
    password: 'password',
    profilePic: 'https://i.pravatar.cc/150?u=S11'
  },
  { 
    id: 'S100', 
    name: 'Admin User', 
    faculty: 'Faculty of Engineering', 
    email: 'admin@gmail.com', 
    status: 'verified', 
    role: 'Admin', 
    password: 'password',
    profilePic: 'https://i.pravatar.cc/150?u=admin' 
  }
];

const generateStudentDB = () => {
  const students: any[] = [
    { name: 'Emmanuel Donnie Stone', matric: '250407010066', dept: 'Mechatronics Engineering', initials: 'ES', image: 'https://i.pravatar.cc/150?u=250407010066' },
    { name: 'Oseni Mary Zainab', matric: '250407010062', dept: 'Mechatronics Engineering', initials: 'OZ', image: 'https://i.pravatar.cc/150?u=250407010062' },
    { name: 'Sanusi Yusuf Olatunji', matric: '250407010071', dept: 'Mechatronics Engineering', initials: 'SY', image: 'https://i.pravatar.cc/150?u=250407010071' },
    { name: 'Omojola Ogunorunyimika', matric: '250407010047', dept: 'Mechatronics Engineering', initials: 'OO', image: 'https://i.pravatar.cc/150?u=250407010047' },
    { name: 'Adiatu Olamide', matric: '250407010046', dept: 'Mechatronics Engineering', initials: 'AO', image: 'https://i.pravatar.cc/150?u=250407010046' },
    { name: 'Olaonipekun Mustapha Olaitan', matric: '250407010075', dept: 'Mechatronics Engineering', initials: 'OM', image: 'https://i.pravatar.cc/150?u=250407010075' },
    { name: 'Alagbe Hamzah Adegbola', matric: '250407010074', dept: 'Mechatronics Engineering', initials: 'AA', image: 'https://i.pravatar.cc/150?u=250407010074' },
    { name: 'Osunkoya Ayodele', matric: '250403010008', dept: 'Civil & Construction Engineering', initials: 'OA', image: 'https://i.pravatar.cc/150?u=250403010008' },
    { name: 'Williams Omowumi', matric: '250403010045', dept: 'Civil & Construction Engineering', initials: 'WO', image: 'https://i.pravatar.cc/150?u=250403010045' },
    { name: 'Adewale Sheriff Adedimeji', matric: '250403010046', dept: 'Civil & Construction Engineering', initials: 'AS', image: 'https://i.pravatar.cc/150?u=250403010046' },
    { name: 'Oduleye Abdulwariz', matric: '250403010059', dept: 'Civil & Construction Engineering', initials: 'OA', image: 'https://i.pravatar.cc/150?u=250403010059' },
    { name: 'Orupabo Joshua', matric: '250403010071', dept: 'Civil & Construction Engineering', initials: 'OJ', image: 'https://i.pravatar.cc/150?u=250403010071' },
    { name: 'Ogunlami Eyitayo Samuel', matric: '250403010076', dept: 'Civil & Construction Engineering', initials: 'OS', image: 'https://i.pravatar.cc/150?u=250403010076' },
    { name: 'Aminu Seun Nafiu', matric: '250403010078', dept: 'Civil & Construction Engineering', initials: 'AN', image: 'https://i.pravatar.cc/150?u=250403010078' },
    { name: 'Moses Godspower', matric: '250403010082', dept: 'Civil & Construction Engineering', initials: 'MG', image: 'https://i.pravatar.cc/150?u=250403010082' },
    { name: 'Adeolisa Muslimah', matric: '250403010083', dept: 'Civil & Construction Engineering', initials: 'AM', image: 'https://i.pravatar.cc/150?u=250403010083' },
    { name: 'Arikawe Atanda.G', matric: '250403010087', dept: 'Civil & Construction Engineering', initials: 'AG', image: 'https://i.pravatar.cc/150?u=250403010087' },
    { name: 'Ojo Ayodeji Gideon', matric: '250403010089', dept: 'Civil & Construction Engineering', initials: 'OG', image: 'https://i.pravatar.cc/150?u=250403010089' },
    { name: 'Avoseh Oluwatosin', matric: '250403010090', dept: 'Civil & Construction Engineering', initials: 'AO', image: 'https://i.pravatar.cc/150?u=250403010090' },
  ];
  return students;
};

const MASTER_STUDENT_DATABASE = generateStudentDB();

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'portal' | 'how-it-works' | 'our-team' | 'why-lasmas'>(() => {
    const savedView = sessionStorage.getItem(SESSION_VIEW);
    return (savedView) ? savedView as any : 'landing';
  });

  const [user, setUser] = useState<any>(() => {
    const savedUser = sessionStorage.getItem(SESSION_USER);
    try { return savedUser ? JSON.parse(savedUser) : null; } catch { return null; }
  });

  const [lecturers, setLecturers] = useState<any[]>(() => {
    const saved = localStorage.getItem(KEY_LECTURERS);
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      const merged = MASTER_STAFF_DATABASE.map(m => {
        const savedVersion = parsed.find((p: any) => p.email.toLowerCase() === m.email.toLowerCase());
        return savedVersion || m;
      });
      parsed.forEach((p: any) => {
        if (!merged.find(m => m.email.toLowerCase() === p.email.toLowerCase())) {
          merged.push(p);
        }
      });
      return merged;
    } catch {
      return MASTER_STAFF_DATABASE;
    }
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === KEY_LECTURERS && e.newValue) {
        setLecturers(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (user && user.role === 'Lecturer') {
      const currentLecturerData = lecturers.find(l => l.email.toLowerCase() === user.email.toLowerCase());
      if (currentLecturerData && currentLecturerData.status !== user.status) {
        setUser(currentLecturerData);
      }
    }
  }, [lecturers, user]);

  useEffect(() => {
    localStorage.setItem(KEY_LECTURERS, JSON.stringify(lecturers));
  }, [lecturers]);

  useEffect(() => {
    if (user) sessionStorage.setItem(SESSION_USER, JSON.stringify(user));
    else sessionStorage.removeItem(SESSION_USER);
    sessionStorage.setItem(SESSION_VIEW, view);
  }, [user, view]);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setView('portal');
  };

  const handleSignup = (newLecturer: any) => {
    const lecturerData = { ...newLecturer, id: 'L-' + Date.now(), status: 'pending', role: 'Lecturer', password: newLecturer.password || 'password' };
    setLecturers(prev => [...prev, lecturerData]);
    setUser(lecturerData);
    setView('portal'); 
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    sessionStorage.removeItem(SESSION_USER);
    sessionStorage.removeItem(SESSION_VIEW);
  };

  if (view === 'signup') return <Signup onBack={() => setView('landing')} onSignup={handleSignup} />;
  if (view === 'login') return (
    <Login 
      onBack={() => setView('landing')} 
      onLogin={handleLoginSuccess} 
      onGoToSignup={() => setView('signup')} 
      lecturers={lecturers}
      students={MASTER_STUDENT_DATABASE} 
    />
  );

  if (view === 'portal' && user) {
    if (user.role === 'Admin') {
      return (
        <AdminDashboard 
          user={user} 
          lecturers={lecturers} 
          setLecturers={setLecturers} 
          onLogout={handleLogout} 
          onBack={() => setView('landing')}
          studentDatabase={MASTER_STUDENT_DATABASE}
        />
      );
    }
    
    if (user.role === 'Lecturer') {
      if (user.status === 'pending') {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 hero-gradient font-['Urbanist']">
            <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-10 lg:p-16 border border-indigo-50 shadow-2xl text-center animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-amber-400"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-10 relative">
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping"></div>
                  <img src={user.profilePic} className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-xl relative z-10" alt="" />
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white">⚖️</div>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 leading-none">Identity Under Review</h2>
                <p className="text-slate-500 font-medium mb-12 text-lg">
                  Welcome, <span className="text-indigo-600 font-black">{user.name}</span>. Your application for academic access is currently being audited by the <span className="font-bold">LASUSTECH Staff Registry</span>.
                </p>
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] mb-12 text-left">
                   <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Verification Steps</h4>
                   <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</span> Credentials Transmitted Successfully</li>
                      <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</span> Appointment Documents Uploaded</li>
                      <li className="flex items-center gap-3 text-xs font-bold text-slate-600"><span className="w-5 h-5 bg-white border-2 border-amber-400 text-amber-600 rounded-full flex items-center justify-center text-[10px] animate-pulse">●</span> Registry Final Audit (Pending)</li>
                   </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="py-4 px-8 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Waiting for Institutional Approval...</div>
                  <button onClick={handleLogout} className="text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline mt-4">Cancel Request & Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (user.status === 'declined') {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 hero-gradient font-['Urbanist']">
            <div className="max-w-xl w-full bg-white rounded-[3.5rem] p-10 lg:p-16 border border-rose-50 shadow-2xl text-center animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-10 relative grayscale">
                  <img src={user.profilePic} className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-xl relative z-10" alt="" />
                  <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white">✕</div>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 leading-none">Access Denied</h2>
                <p className="text-slate-500 font-medium mb-12 text-lg">
                   We regret to inform you, <span className="text-rose-600 font-black">{user.name}</span>, that your application for academic staff onboarding has been <span className="font-bold">Declined</span> by the Academic Registry.
                </p>
                <div className="bg-rose-50 border border-rose-100 p-8 rounded-[2.5rem] mb-12 text-left">
                   <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4">Registry Notes</h4>
                   <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      The institutional audit team found inconsistencies in the provided credentials or appointment letter. Access to the LASMAS hub is restricted to verified university staff only.
                   </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="py-4 px-8 bg-rose-100 rounded-full text-[10px] font-black uppercase tracking-widest text-rose-600">Verification Rejected by Registry</div>
                  <button onClick={handleLogout} className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 mt-4">Sign Out & Contact Support</button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (user.status === 'verified') {
        return <LecturerPortal user={user} onLogout={handleLogout} studentDatabase={MASTER_STUDENT_DATABASE} />;
      }
    }
    return <StudentPortal user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col font-['Urbanist']">
      <Navbar 
        onSignIn={() => setView('login')} 
        onHowItWorks={() => setView('how-it-works')}
        onHome={() => setView('landing')}
        onTeam={() => setView('our-team')}
        onWhyLasmas={() => setView('why-lasmas')}
        onNavigate={(v:any) => setView(v)}
        currentView={view}
      />
      <main className="flex-grow">
        {view === 'landing' ? (
          <>
            <section id="home"><Hero onStart={() => setView('login')} /></section>
            <SocialProof />
            <WhyLasmas />
            <CTASection onStart={() => setView('login')} />
          </>
        ) : view === 'how-it-works' ? (
          <div className="pt-20 hero-gradient min-h-screen bg-slate-50"><HowItWorks /></div>
        ) : view === 'our-team' ? (
          <div className="pt-20 hero-gradient min-h-screen bg-slate-50"><TeamPage /></div>
        ) : (
          <div className="pt-20 hero-gradient min-h-screen bg-slate-50"><WhyLasmasPage onStart={() => setView('login')} /></div>
        )}
      </main>
      <Footer onNavigate={(v: any) => setView(v)} />
    </div>
  );
};

export default App;
