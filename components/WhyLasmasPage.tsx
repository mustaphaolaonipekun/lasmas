
import React from 'react';

interface WhyLasmasPageProps {
  onStart?: () => void;
}

const WhyLasmasPage: React.FC<WhyLasmasPageProps> = ({ onStart }) => {
  return (
    <div className="py-24 relative overflow-hidden min-h-screen bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* 1. Hero Section */}
        <section className="text-center mb-32 animate-fade-in">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
             Digital Transformation
           </div>
           <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight leading-none">
             Why <span className="text-indigo-600">LASMAS?</span>
           </h1>
           <p className="text-slate-500 max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed mb-12">
             Revolutionizing Attendance at LASUSTECH with smart, 3D technology.
           </p>
           
           <div className="relative h-64 md:h-96 flex items-center justify-center perspective-1000">
              <div className="relative group cursor-pointer transform-style-3d hover:rotate-y-12 transition-transform duration-1000">
                 {/* Floating 3D-ish Elements */}
                 <div className="w-48 h-64 md:w-64 md:h-80 bg-white rounded-[3rem] shadow-2xl border-4 border-indigo-50 flex flex-col items-center justify-center animate-float relative z-10">
                    <span className="text-7xl mb-4">👨‍🏫</span>
                    <div className="w-3/4 h-2 bg-slate-100 rounded-full mb-2"></div>
                    <div className="w-1/2 h-2 bg-indigo-500 rounded-full"></div>
                 </div>
                 <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-indigo-600 rounded-[2.5rem] shadow-xl flex items-center justify-center text-5xl md:text-6xl z-20 animate-float" style={{ animationDelay: '1s' }}>
                    📱
                 </div>
                 <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-emerald-500 rounded-[2.5rem] shadow-xl flex items-center justify-center text-4xl md:text-5xl z-20 animate-float" style={{ animationDelay: '2s' }}>
                    ✅
                 </div>
              </div>
           </div>
        </section>

        {/* 2. Current Problems in Traditional Attendance */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">The Failure of Tradition</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Why the old manual system is holding us back</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: "⏰", title: "Time Consuming", desc: "Manual roll-calling wastes up to 15 minutes of valuable lecture time.", color: "bg-rose-50 text-rose-600" },
                { icon: "🧮", title: "Miscalculations", desc: "Human errors lead to unfair results and disputed eligibility statuses.", color: "bg-orange-50 text-orange-600" },
                { icon: "📁", title: "Decentralized", desc: "Data is scattered across papers and logbooks, impossible to audit easily.", color: "bg-amber-50 text-amber-600" },
                { icon: "🫣", title: "Unnoticed Absence", desc: "Students fall behind when tracking isn't transparent and real-time.", color: "bg-slate-50 text-slate-600" },
                { icon: "🕵️", title: "Low Verification", desc: "Lecturers cannot easily confirm if every signature is genuine.", color: "bg-indigo-50 text-indigo-600" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                   <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                      {item.icon}
                   </div>
                   <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
              <div className="bg-rose-600 p-10 rounded-[3rem] shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="text-6xl mb-4 animate-pulse">⚠️</span>
                 <h3 className="text-2xl font-black mb-2">System Inefficiency</h3>
                 <p className="text-rose-100 text-xs font-bold uppercase tracking-widest">Calculated Risk: High</p>
              </div>
           </div>
        </section>

        {/* 3. Our Solution: LASMAS Infographic */}
        <section className="mb-32">
           <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
              <div className="relative z-10">
                 <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">The LASMAS Workflow</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Integrated 3D solution ecosystem</p>
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
                    {/* Flow Lines (Desktop only) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 -translate-y-1/2 opacity-20"></div>
                    
                    {[
                      { step: 1, icon: "👨‍🏫", text: "Lecturer Initiates Session", sub: "Unique Code Generated" },
                      { step: 2, icon: "🛰️", text: "GPS + Code Validation", sub: "Student Check-in" },
                      { step: 3, icon: "📊", text: "Real-time Logging", sub: "Instant Database Uplink" },
                      { step: 4, icon: "✅", text: "Auto-Eligibility Check", sub: "75% Bar Verification" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                         <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center text-4xl md:text-5xl mb-6 shadow-2xl group-hover:bg-indigo-600 group-hover:scale-110 transition-all cursor-default">
                            {item.icon}
                         </div>
                         <div className="absolute -top-4 -right-4 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-black border-2 border-slate-900">
                            {item.step}
                         </div>
                         <h4 className="font-black text-lg mb-2">{item.text}</h4>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{item.sub}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* 4. Why LASMAS Is the Best */}
        <section className="mb-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                    Engineered for <br/>
                    <span className="text-indigo-600">Accuracy & Trust</span>
                 </h2>
                 <div className="space-y-6">
                    {[
                      { title: "Anti-Cheating Architecture", desc: "Multi-factor verification using unique codes, real-time GPS coordinates, and time-stamped signatures.", icon: "🛡️" },
                      { title: "Zero Manual Stress", desc: "Remove the burden of manual data entry. Let the system calculate everything instantly.", icon: "🧘" },
                      { title: "Professional Intelligence", desc: "Beautifully responsive UI with automated reports ready for Senate and Faculty meetings.", icon: "🧠" }
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-[2.5rem] hover:bg-white transition-all group">
                         <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{feat.icon}</div>
                         <div>
                            <h4 className="text-lg font-black text-slate-900 mb-1">{feat.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="bg-white p-4 rounded-[4rem] shadow-2xl border-4 border-slate-100 perspective-1000">
                    <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden transform group-hover:rotate-x-12 transition-transform duration-700">
                       <h3 className="text-3xl font-black mb-6">99.9% Reliable Data</h3>
                       <div className="space-y-4">
                          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                             <div className="h-full bg-white w-full animate-pulse"></div>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Verification Success Rate</span>
                             <span className="text-2xl font-black">Verified ✓</span>
                          </div>
                       </div>
                       <div className="mt-12 flex gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">⚡</div>
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">🔐</div>
                          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">🛰️</div>
                       </div>
                    </div>
                 </div>
                 {/* Decorative floating dots */}
                 <div className="absolute -top-10 -right-10 w-20 h-20 bg-indigo-100 rounded-full blur-2xl animate-pulse"></div>
              </div>
           </div>
        </section>

        {/* 5. Impact / Benefits */}
        <section className="mb-32">
           <div className="bg-white rounded-[4rem] border border-slate-100 p-12 md:p-20 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                 {[
                   { val: "60%", label: "Stress Reduction", icon: "😌", color: "text-indigo-600" },
                   { val: "100%", label: "Accuracy Rate", icon: "🎯", color: "text-emerald-600" },
                   { val: "4x", label: "Faster Recording", icon: "⚡", color: "text-amber-600" },
                   { val: "0", label: "Paper Waste", icon: "🌱", color: "text-green-600" }
                 ].map((stat, i) => (
                   <div key={i} className="group">
                      <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{stat.icon}</div>
                      <h4 className={`text-5xl font-black ${stat.color} mb-2`}>{stat.val}</h4>
                      <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 6. CTA / Final Section */}
        <section className="text-center animate-fade-in">
           <div className="bg-indigo-600 rounded-[5rem] p-16 md:p-24 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-50"></div>
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Join the Future of Attendance <br/> with LASMAS</h2>
                 <p className="text-indigo-100 max-w-xl mx-auto text-lg md:text-xl font-medium mb-12">
                    Start your digital transition today. Empower your students and streamline your academic staff workflow.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                      onClick={onStart}
                      className="px-12 py-5 bg-white text-indigo-600 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                    >
                       Get Started Now
                    </button>
                    <button 
                      onClick={onStart}
                      className="px-12 py-5 bg-indigo-700 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:bg-indigo-800 transition-all border border-indigo-500/30"
                    >
                       Learn More
                    </button>
                 </div>
              </div>
              
              {/* Rotating element placeholder */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float"></div>
           </div>
        </section>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-12 { transform: rotateY(12deg) rotateX(4deg); }
        .rotate-x-12 { transform: rotateX(12deg); }
      `}</style>
    </div>
  );
};

export default WhyLasmasPage;
