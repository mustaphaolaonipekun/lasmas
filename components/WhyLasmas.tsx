
import React from 'react';

const WhyLasmas: React.FC = () => {
  const benefits = [
    {
      title: "Student Accountability",
      description: "Encourages consistent lecture attendance through transparent, real-time logging visible to students.",
      icon: "🤝"
    },
    {
      title: "Zero Manual Errors",
      description: "Eliminates the risks of lost attendance sheets, proxy signatures, and data entry mistakes.",
      icon: "🛡️"
    },
    {
      title: "Instant Eligibility Check",
      description: "Students instantly know their exam eligibility status based on the university's 75% threshold.",
      icon: "⚡"
    },
      {
  
    imageurl: "https://lasustech.edu.ng/images/officers/VC1.jpg",
      
    
    
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-indigo-600 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Why choose LASMAS?
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              The Digital Standard for <br />
              <span className="text-indigo-600">Academic Excellence</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              LASMAS isn't just a tracking tool; it's a commitment to transparency and fairness in the LASUSTECH academic environment. We empower students to take control of their attendance records while providing departments with verified data.
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-2xl">{benefit.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-slate-500">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="bg-indigo-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-3xl font-bold mb-6">"LASMAS has restored order to our lecture halls."</h3>
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full object-cover border-2 border-indigo-50">
                         <img src={benefits[3].imageurl} alt="Prof. Olumuyiwa Odusanya" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                         <p className="font-bold">Prof. Olumuyiwa Odusanya</p>
                         <p className="text-white/70 text-sm">Lasustech Vice-Chancellor</p>
                      </div>
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyLasmas;
