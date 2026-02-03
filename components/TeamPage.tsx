
import React, { useState } from 'react';

interface TeamMember {
  name: string;
  matric: string;
  dept: 'Mechatronics' | 'Civil';
  role?: string;
  avatar: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  // Mechatronics
  { name: 'Olaonipekun Mustapha Olaitan', matric: '250407010075', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070191063-1dafba78-050d-4a3f-959e-e8011354c513.jpg' },
  { name: 'Sanusi Yusuf Olatunji', matric: '250407010071', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070213307-69adfcae-4ff2-4c3a-a8ef-9725a03efe17.jpg' },
  { name: 'Oseni Mary Zainab', matric: '250407010062', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070619986-a05ed515-85b3-4dc1-9672-4c032690f38e.jpg' },
  { name: 'Alagbe Hamzah Adegbola', matric: '250407010074', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070241102-dca765fd-c3fd-497c-bda9-10caa29a83fd.jpg' },
  { name: 'Emmanuel Donnie Stone', matric: '250407010066', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070675182-c1103fd0-1060-4394-8506-4970a668a15a.jpg' },
  { name: 'Omojola Ogunorunyimika', matric: '250407010047', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070648390-b4f8b511-2af3-430a-9c7c-862b974a73e3.jpg' },
  { name: 'Adiatu Olamide', matric: '250407010046', dept: 'Mechatronics', avatar: 'https://image2url.com/r2/default/images/1770070299944-8a3ed310-037b-4000-b71c-0b860ef15ce3.jpg' },
  
  // Civil
  { name: 'Osunkoya Ayodele', matric: '250403010008', dept: 'Civil', avatar: 'https://picsum.photos/seed/edu1/100/300' },
  { name: 'Williams Omowumi', matric: '250403010045', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770070098916-5fa98cd0-b105-4303-ada7-0b11f7721ac9.jpg' },
  { name: 'Adewale Sheriff Adedimeji', matric: '250403010046', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770083433577-304adf65-a1a9-47e3-8a18-f3bba3389987.jpeg' },
  { name: 'Oduleye Abdulwariz', matric: '250403010059', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770070543483-f2228951-e3b5-4917-968b-10c26e1993fb.jpg' },
  { name: 'Orupabo Joshua', matric: '250403010071', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071017988-25521a1f-54d9-4750-91dc-fca9552a97d3.jpg' },
  { name: 'Ogunlami Eyitayo Samuel', matric: '250403010076', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071440336-45dca352-a984-4f8e-906f-48b7e882600e.jpg' },
  { name: 'Aminu Seun Nafiu', matric: '250403010078', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071591538-2ba6f49c-ff0e-4740-956e-5a9312bf5e19.jpg' },
  { name: 'Moses Godspower', matric: '250403010082', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071119315-518d0eaf-8de0-4ed3-89e0-b93047deed64.jpg' },
  { name: 'Adeolisa Muslimah', matric: '250403010083', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071043645-56706dab-2857-4b57-8c31-b7743220a2ab.jpg' },
  { name: 'Arikawe Atanda G', matric: '250403010087', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071480389-63bff860-e44d-49d4-9ad2-b84eecc850a1.jpg' },
  { name: 'Ojo Ayodeji Gideon', matric: '250403010089', dept: 'Civil', avatar: 'https://picsum.photos/seed/edu1/100/100' },
  { name: 'Avoseh Oluwatosin', matric: '250403010090', dept: 'Civil', avatar: 'https://image2url.com/r2/default/images/1770071254871-10742d53-8e50-4a7f-90a1-71c23be9d8e5.jpg' },
];

const TeamPage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Mechatronics' | 'Civil'>('All');

  const filteredMembers = TEAM_MEMBERS.filter(m => filter === 'All' || m.dept === filter);

  return (
    <div className="py-24 relative overflow-hidden min-h-screen">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500 rounded-[3rem] blur-3xl animate-float"></div>
         <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
             <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
             System Architects
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
             Meet the <span className="text-indigo-600">LASMAS</span> Team
           </h1>
           <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
             The brilliant innovators behind the Lagos State University of Science and Technology Smart Attendance System.
           </p>

           {/* 3D Interactive Mascot/Icon Container */}
           <div className="mt-12 flex justify-center perspective-1000">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-4xl md:text-6xl animate-float border-4 border-indigo-50 relative group cursor-pointer transition-transform hover:scale-110">
                 🏛️
                 <div className="absolute -inset-4 border-2 border-indigo-100 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                 <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full whitespace-nowrap shadow-xl">
                    LASUSTECH Ikorodu
                 </div>
              </div>
           </div>
        </div>

        {/* Interactive Filter */}
        <div className="flex justify-center gap-4 mb-16">
          {(['All', 'Mechatronics', 'Civil'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105' : 'bg-white text-slate-400 hover:text-indigo-600 border border-slate-100 shadow-sm'}`}
            >
              {f === 'All' ? 'Full Squad' : `${f} Engineering`}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative perspective-1000 h-64"
            >
              {/* 3D Rotating Card Container */}
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-12">
                
                {/* Front Side */}
                <div className="absolute inset-0 bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50 backface-hidden flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      {member.dept === 'Mechatronics' || member.dept === 'Civil' ? <img src={member.avatar} alt={member.name} className="w-full h-full rounded-2xl" /> : '🏗️'}
                   </div>
                   <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight">{member.name}</h3>
                   <div className="flex flex-col gap-1 items-center">
                     <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest opacity-80">
                        {member.dept} Engineering
                     </p>
                     {/* Matric Number is now always visible */}
                     <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[9px] font-black border border-slate-100 tracking-wider">
                        {member.matric}
                     </span>
                   </div>
                   
                   {/* Micro-interaction bio/detail */}
                   <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Active Member</p>
                   </div>
                </div>

                {/* Glassy Neon Outline Effect on Group Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Feature Note */}
        <div className="mt-24 text-center">
           <div className="inline-block p-10 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white/80 shadow-inner max-w-3xl mx-auto">
              <p className="text-slate-500 font-medium italic">
                "United by a common goal to digitize the LASUSTECH experience. This team represents the synergy of engineering precision and innovative software development."
              </p>
           </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-12 {
          transform: rotateY(12deg) rotateX(4deg);
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
