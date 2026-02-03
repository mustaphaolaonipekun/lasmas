
import React from 'react';

interface HeroProps {
   onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
   return (
      <div className="relative pt-32 pb-20 overflow-hidden hero-gradient">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.25em] mb-8 animate-fade-in shadow-sm">
               <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
               LASUSTECH SMART ATTENDANCE SYSTEM
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
               Smart Attendance Management System<br />
               <span className="flex items-center justify-center gap-4">
                  for <span className="bg-indigo-600 text-white px-6 py-2 rounded-2xl shadow-xl transform -rotate-2">Lecturers</span>
               </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-12">
               LASMAS (LASUSTECH Smart Attendance System) is an advanced digital attendance platform designed to streamline student attendance management.          
            </p>

            <div className="flex justify-center gap-4 mb-16">
               <button
                  onClick={onStart}
                  className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-xl"
               >
                  Get Started
               </button>
            </div>

            {/* Mockup Section */}
            <div className="relative mt-20 max-w-5xl mx-auto">
               <div className="bg-slate-900 rounded-[3rem] p-4 shadow-2xl relative z-10 mx-auto w-full md:w-[800px] h-[550px] md:h-[650px] overflow-hidden">
                  <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden relative">
                     {/* Internal App UI Mock */}
                     <div className="p-8 text-left h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4 shrink-0">
                           <div>
                              <h3 className="text-xl font-bold text-slate-900">Live Attendance Feed</h3>
                              <p className="text-xs text-slate-500 font-medium">Ikorodu Campus - Engineering Hall A</p>
                           </div>
                           <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg animate-pulse">
                              LIVE
                           </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6 text-center shrink-0">
                           <div className="bg-indigo-50 p-4 rounded-2xl">
                              <p className="text-slate-500 text-[10px] mb-1 uppercase font-bold tracking-wider">Present</p>
                              <h4 className="text-xl font-bold text-indigo-600">142</h4>
                           </div>
                           <div className="bg-slate-50 p-4 rounded-2xl">
                              <p className="text-slate-500 text-[10px] mb-1 uppercase font-bold tracking-wider">Absent</p>
                              <h4 className="text-xl font-bold text-rose-600">10</h4>
                           </div>
                           <div className="bg-emerald-50 p-4 rounded-2xl">
                              <p className="text-slate-500 text-[10px] mb-1 uppercase font-bold tracking-wider">Exam Eligibility</p>
                              <h4 className="text-xl font-bold text-emerald-600">120</h4>
                           </div>
                        </div>

                        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                           {[
                              { name: "Olaonipekun Mustapha", id: "250407010075", status: "Present", color: "bg-emerald-100 text-emerald-700", img: "https://image2url.com/r2/default/images/1770070191063-1dafba78-050d-4a3f-959e-e8011354c513.jpg" },
                              { name: "Sanusi Yusuf", id: "250407010071", status: "Abesnt", color: "bg-rose-100 text-rose-700", img: "https://image2url.com/r2/default/images/1770070213307-69adfcae-4ff2-4c3a-a8ef-9725a03efe17.jpg" },
                              { name: "oduleye Abd Wariz", id: "250407010074", status: "Absent", color: "bg-rose-100 text-rose-700", img: "https://image2url.com/r2/default/images/1770070543483-f2228951-e3b5-4917-968b-10c26e1993fb.jpg" },
                              { name: "Adegbola Hamzah", id: "250407010066", status: "Present", color: "bg-emerald-100 text-emerald-700", img: "https://image2url.com/r2/default/images/1770070241102-dca765fd-c3fd-497c-bda9-10caa29a83fd.jpg" },
                              { name: "Oseni Mary Zainab", id: "250407010062", status: "Absent", color: "bg-rose-100 text-rose-700", img: "https://image2url.com/r2/default/images/1770070619986-a05ed515-85b3-4dc1-9672-4c032690f38e.jpg" },
                              { name: "Williams Omowumi", id: "250403010045", status: "Present", color: "bg-emerald-100 text-emerald-700", img: "https://image2url.com/r2/default/images/1770070098916-5fa98cd0-b105-4303-ada7-0b11f7721ac9.jpg" }
                           ].map((student, i) => (
                              <div key={i} className="flex justify-between items-center p-3 border border-slate-50 rounded-xl hover:bg-slate-50 transition-colors">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-100 shadow-sm">
                                       <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                       <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                                       <p className="text-[10px] text-slate-500 font-medium">{student.id}</p>
                                    </div>
                                 </div>
                                 <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${student.color}`}>
                                    {student.status}
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Hero;
