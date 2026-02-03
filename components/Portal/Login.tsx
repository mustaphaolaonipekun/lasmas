
import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
  onLogin: (user: any) => void;
  onGoToSignup: () => void;
  lecturers: any[];
  students: any[];
}

const Login: React.FC<LoginProps> = ({ onBack, onLogin, onGoToSignup, lecturers, students }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Lecturer' | 'Student' | 'Admin'>('Lecturer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulation delay for premium feel
    setTimeout(() => {
      let isValid = false;
      let userData: any = null;

      if (role === 'Admin') {
        if (username === 'admin@gmail.com' && password === 'password') {
          isValid = true;
          userData = {
            email: username,
            name: 'System Administrator',
            role: 'Admin'
          };
        } else {
          setError("Invalid Admin credentials.");
        }
      } else if (role === 'Student') {
        const foundStudent = students.find(s => s.matric === username.trim());
        if (foundStudent) {
          // Check password against the first part of the name (Surname)
          const surname = foundStudent.name.split(' ')[0]?.toLowerCase();
          if (password.toLowerCase() === surname) {
            isValid = true;
            userData = {
              ...foundStudent,
              email: `${username}@student.lasustech.edu.ng`,
              role: 'Student'
            };
          } else {
            setError(`Incorrect password for ${foundStudent.name}. Check your Surname spelling.`);
          }
        } else {
          setError("Matric number not recognized in the Digital Registry.");
        }
      } else if (role === 'Lecturer') {
        const found = lecturers.find(l => 
          l.email.toLowerCase() === username.trim().toLowerCase() && 
          l.password === password
        );
        
        if (found) {
          isValid = true;
          userData = found;
        } else {
          setError("Lecturer credentials not found. Ensure your account is registered.");
        }
      }

      if (isValid && userData) {
        onLogin(userData);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 hero-gradient font-['Urbanist']">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 md:p-12 border border-indigo-50 animate-fade-in">
        <button onClick={onBack} className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-10 flex items-center gap-2 group">
          <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">LASMAS Access</h2>
          <p className="text-slate-500 mt-2 font-medium">Institutional Authentication</p>
        </div>

        <div className="flex bg-slate-50 p-1.5 rounded-[1.8rem] mb-8 border border-slate-100 shadow-inner">
          {(['Lecturer', 'Student', 'Admin'] as const).map(r => (
            <button 
              key={r} 
              onClick={() => {
                setRole(r);
                setError(null);
                setUsername('');
                setPassword('');
              }} 
              className={`flex-1 py-3.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${role === r ? 'bg-white text-indigo-600 shadow-md scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Dynamic Student Credential Instruction */}
        {role === 'Student' && (
          <div className="mb-8 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 animate-fade-in relative overflow-hidden">
            <div className="flex items-start gap-4">
               <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xs shrink-0 shadow-lg animate-pulse">ℹ️</div>
               <div>
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Portal Entry Guide</h4>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                    Username: <span className="text-indigo-600">Matric Number</span><br/>
                    Password: <span className="text-indigo-600">Surname (lowercase)</span>
                  </p>
               </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] border border-rose-100 flex items-center gap-3 animate-shake">
            <span className="text-lg">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <input 
              type="text" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300 shadow-sm" 
              placeholder={role === 'Student' ? "Enter Matric Number" : "Institutional Email"} 
            />
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300 shadow-sm" 
              placeholder={role === 'Student' ? "Enter Surname" : "Secure Password"} 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 mt-4 disabled:opacity-50 hover:bg-indigo-700 hover:scale-[1.01] transition-all"
          >
            {loading ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>

        {role === 'Lecturer' && (
          <div className="mt-10 text-center animate-fade-in">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Unregistered Staff? <br/>
              <button onClick={onGoToSignup} className="text-indigo-600 font-black mt-2 hover:underline">Apply for Academic Onboarding</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
