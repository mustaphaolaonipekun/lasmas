
import React, { useState } from 'react';

interface AdminDashboardProps {
  user: any;
  lecturers: any[];
  setLecturers: React.Dispatch<React.SetStateAction<any[]>>;
  onLogout: () => void;
  onBack: () => void;
  studentDatabase: any[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, lecturers, setLecturers, onLogout, onBack, studentDatabase }) => {
  const [reviewLecturer, setReviewLecturer] = useState<any | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'verifications' | 'staff' | 'students'>('verifications');
  const [fullDocView, setFullDocView] = useState<string | null>(null);

  const verifyLecturer = (id: string, status: 'verified' | 'declined') => {
    setLecturers(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    setReviewLecturer(null);
  };

  const navTo = (t: any) => {
    setActiveTab(t);
    setIsMobileMenuOpen(false);
  };

  const pendingQueue = lecturers.filter(l => l.status === 'pending');
  const staffDirectory = lecturers.filter(l => l.status === 'verified');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-['Urbanist'] relative overflow-x-hidden">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[80] w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-xl active:scale-90 transition-all"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-[85vw] max-w-xs bg-white border-r border-slate-100 p-8 flex flex-col z-[70] transition-transform duration-500 ease-in-out lg:static lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-indigo-600 transition-all group"
        >
          <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">←</span>
          Exit Registry
        </button>

        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-12 bg-indigo-600 rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">A</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Registry</span>
        </div>
        
        <nav className="space-y-3 flex-grow">
          <button 
            onClick={() => navTo('verifications')}
            className={`w-full text-left px-7 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'verifications' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            🛡️ Verifications ({pendingQueue.length})
          </button>
          <button 
            onClick={() => navTo('staff')}
            className={`w-full text-left px-7 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'staff' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            👥 Staff Hub ({staffDirectory.length})
          </button>
          <button 
            onClick={() => navTo('students')}
            className={`w-full text-left px-7 py-5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'students' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            🎓 Student Index
          </button>
        </nav>
        
        <div className="mt-auto">
          <button onClick={onLogout} className="w-full py-5 text-rose-500 font-black text-[10px] uppercase tracking-widest border-2 border-rose-50 rounded-[2rem] hover:bg-rose-50 transition-colors active:scale-95">Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto w-full custom-scrollbar">
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-stretch md:items-center bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden gap-8">
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-3">Audit Terminal</h1>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm tracking-wide uppercase opacity-60">
              {activeTab === 'students' ? 'Institutional Registry' : activeTab === 'staff' ? 'Staff Compliance Hub' : 'Live Identity Audit Queue'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
             <div className="bg-slate-50 px-8 py-5 rounded-[2rem] border border-slate-100 text-center flex-grow shadow-inner">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</p>
                <p className="text-xl md:text-3xl font-black text-indigo-600 leading-none">{studentDatabase.length}</p>
             </div>
             <div className="bg-slate-900 px-8 py-5 rounded-[2rem] text-center flex-grow shadow-2xl">
                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Queue</p>
                <p className="text-xl md:text-3xl font-black text-white leading-none">{pendingQueue.length}</p>
             </div>
          </div>
        </header>

        {activeTab === 'verifications' && (
          <section className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            <h3 className="text-[10px] md:text-[11px] font-black text-slate-900 mb-8 flex items-center justify-center md:justify-start gap-3 uppercase tracking-[0.3em] ml-2">
              <span className={`w-2.5 h-2.5 rounded-full ${pendingQueue.length > 0 ? 'bg-amber-500 animate-pulse' : 'bg-slate-200'}`}></span>
              Identity Review Queue
            </h3>
            
            {pendingQueue.length === 0 ? (
              <div className="bg-white p-16 md:p-32 rounded-[3.5rem] md:rounded-[5rem] border-2 border-dashed border-slate-100 text-center shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl grayscale opacity-30">📭</div>
                <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.4em]">Audit Queue Completely Cleared</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
                {pendingQueue.map(l => (
                  <div key={l.id} className="bg-white p-8 md:p-10 rounded-[3rem] md:rounded-[4rem] border border-slate-50 shadow-sm flex flex-col hover:shadow-xl transition-all relative group overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 text-center sm:text-left">
                      <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 flex items-center justify-center shrink-0 shadow-xl">
                        {l.profilePic ? <img src={l.profilePic} alt="" className="w-full h-full object-cover" /> : <span className="text-3xl font-black text-slate-200">{l.name.charAt(0)}</span>}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-black text-slate-900 text-xl md:text-2xl leading-tight mb-2">{l.name}</h4>
                        <p className="text-[10px] md:text-xs text-slate-400 font-bold mb-4 uppercase tracking-widest">{l.email}</p>
                        <span className="inline-block px-4 py-2 bg-slate-50 text-slate-500 text-[9px] font-black rounded-full uppercase tracking-widest border border-slate-100">{l.faculty}</span>
                      </div>
                    </div>
                    <button onClick={() => setReviewLecturer(l)} className="w-full py-5 md:py-6 bg-slate-900 text-white rounded-[1.8rem] md:rounded-[2rem] font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-indigo-600 active:scale-95 transition-all">
                      👁️ Review Credentials
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'staff' && (
          <section className="animate-fade-in max-w-6xl mx-auto">
            <h3 className="text-[10px] md:text-[11px] font-black text-slate-400 mb-8 uppercase tracking-[0.4em] ml-2 text-center md:text-left">Institutional Staff Hub</h3>
            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 overflow-hidden shadow-sm">
               <div className="overflow-x-auto custom-scrollbar overscroll-contain">
                <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Academic Personnel</th>
                        <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {staffDirectory.map(l => (
                        <tr key={l.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => setReviewLecturer(l)}>
                          <td className="px-8 py-8">
                            <div className="flex items-center gap-4">
                              <img src={l.profilePic} className="w-12 h-12 rounded-xl border border-slate-100 shadow-sm group-hover:scale-110 transition-transform" alt="" />
                              <div>
                                <p className="font-black text-slate-900 text-base leading-tight">{l.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{l.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-8 text-right">
                            <span className={`px-5 py-2.5 text-[9px] font-black rounded-full uppercase tracking-widest border-2 shadow-sm ${l.status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-50' : 'bg-amber-50 text-amber-600 border-amber-50'}`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
               </div>
            </div>
          </section>
        )}

        {activeTab === 'students' && (
          <section className="animate-fade-in space-y-12 max-w-6xl mx-auto">
            <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 leading-none">Enrollment Index</h3>
               <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-12">Registry Master Data Feed</p>
               <div className="space-y-4">
                  {studentDatabase.map((s, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-center p-6 md:p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-indigo-200 hover:bg-white transition-all gap-6">
                       <div className="flex items-center gap-5 w-full sm:w-auto">
                          <img src={s.image} className="w-12 h-12 rounded-xl grayscale group-hover:grayscale-0 transition-all border border-slate-200" alt="" />
                          <div>
                             <p className="font-black text-slate-900 text-base leading-tight">{s.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">{s.matric}</p>
                          </div>
                       </div>
                       <div className="w-full sm:w-auto">
                        <span className="block sm:inline-block px-6 py-2 bg-white text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-50 shadow-sm text-center">Verified Registry</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        )}
      </main>

      {/* Review Modal */}
      {reviewLecturer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 font-['Urbanist'] overflow-hidden">
           <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setReviewLecturer(null)}></div>
           <div className="relative bg-white w-full max-w-6xl h-full max-h-[96vh] rounded-[2.5rem] md:rounded-[4rem] shadow-2xl flex flex-col overflow-hidden animate-hero">
              <div className="p-8 md:p-10 flex justify-between items-center border-b border-slate-100 bg-white sticky top-0 z-20 gap-6">
                 <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
                    <img src={reviewLecturer.profilePic} className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-4 border-slate-50 shadow-lg object-cover shrink-0" alt="" />
                    <div className="min-w-0">
                       <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-none truncate">{reviewLecturer.name}</h2>
                       <p className="text-indigo-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2 truncate">Identity Registry Audit</p>
                    </div>
                 </div>
                 <button onClick={() => setReviewLecturer(null)} className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 text-lg transition-all active:scale-90 shrink-0">✕</button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-slate-50/30 custom-scrollbar overscroll-contain">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Personnel Info Card */}
                    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col">
                       <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center lg:text-left">Official Credentials</h3>
                       <div className="space-y-6 flex-grow">
                          {[
                            {l: 'Name', v: reviewLecturer.name}, 
                            {l: 'Email', v: reviewLecturer.email}, 
                            {l: 'Faculty', v: reviewLecturer.faculty},
                            {l: 'Access', v: reviewLecturer.status.toUpperCase()}
                          ].map((it, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-slate-50 gap-1 sm:gap-4">
                               <span className="text-[11px] font-bold text-slate-500">{it.l}</span>
                               <span className="text-sm font-black text-slate-900 truncate">{it.v}</span>
                            </div>
                          ))}
                       </div>
                       
                       <div className="mt-12 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Passport Scan</p>
                          <img 
                            src={reviewLecturer.profilePic} 
                            className="w-full h-48 rounded-[1.8rem] object-cover border-4 border-white shadow-md cursor-pointer hover:scale-[1.02] transition-transform" 
                            alt=""
                            onClick={() => setFullDocView(reviewLecturer.profilePic)}
                          />
                       </div>
                    </div>

                    {/* Legal Document Card */}
                    <div className="bg-slate-900 p-8 md:p-10 rounded-[3rem] flex flex-col text-white min-h-[500px] lg:min-h-0 overflow-hidden">
                       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                          <div className="text-center sm:text-left">
                             <h3 className="text-xl font-black leading-none">Appointment Letter</h3>
                             <p className="text-indigo-400 text-[10px] uppercase tracking-[0.2em] mt-2">Institutional Proof of Work</p>
                          </div>
                          <span className="bg-white/10 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-center">Registry Vault</span>
                       </div>
                       
                       <div className="flex-grow relative bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden flex items-center justify-center p-6 group">
                          {reviewLecturer.idProof ? (
                             <>
                               <img 
                                src={reviewLecturer.idProof} 
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all group-hover:scale-105" 
                                alt="" 
                               />
                               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button 
                                    onClick={() => setFullDocView(reviewLecturer.idProof)}
                                    className="px-8 py-3 bg-white text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
                                  >
                                    View Full Scan
                                  </button>
                               </div>
                             </>
                          ) : (
                             <div className="text-center p-12">
                                <span className="text-6xl mb-6 block">📄</span>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Document in Vault</p>
                             </div>
                          )}
                       </div>
                       
                       <p className="mt-8 text-[10px] text-slate-500 font-medium italic text-center max-w-sm mx-auto leading-relaxed">
                        Verification requires visible university institutional stamps and authorized signatures. 
                       </p>
                    </div>
                 </div>
              </div>

              {reviewLecturer.status === 'pending' && (
                 <div className="p-8 md:p-10 border-t border-slate-100 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 sticky bottom-0 z-20">
                    <button onClick={() => verifyLecturer(reviewLecturer.id, 'verified')} className="py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.01] active:scale-95 transition-all shadow-emerald-100">Approve Access</button>
                    <button onClick={() => verifyLecturer(reviewLecturer.id, 'declined')} className="py-6 bg-white text-rose-500 border-2 border-rose-100 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-rose-50 active:scale-95 transition-all">Decline Review</button>
                 </div>
              )}
           </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {fullDocView && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/98 backdrop-blur-3xl p-6 md:p-12 animate-fade-in">
           <button 
            onClick={() => setFullDocView(null)}
            className="absolute top-10 right-10 w-16 h-16 bg-white text-slate-900 rounded-full flex items-center justify-center text-3xl shadow-2xl z-[210] active:scale-90 transition-transform"
           >
             ✕
           </button>
           <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={fullDocView} 
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]" 
                alt="" 
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
