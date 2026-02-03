
import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Engr. Folashade Alake",
      role: "Dean, Faculty of Engineering",
      text: "LASMAS has completely removed the chaos of manual attendance sheets during large lectures. We now have 100% accurate data for our graduating classes.",
      rating: 5,
      avatar: "https://picsum.photos/seed/edu1/100/100"
    },
    {
      name: "Tobi Adeyemi",
      role: "300L Student, Computer Science",
      text: "The student portal is amazing. I can check my attendance status for every course and know exactly if I'm eligible for exams without visiting the HOD's office.",
      rating: 5,
      avatar: "https://picsum.photos/seed/student1/100/100"
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 text-indigo-600 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Voice of LASUSTECH
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Trusted by the <span className="text-indigo-600">Academic Community</span>
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed max-w-md">
              From administrative efficiency to student accountability, LASMAS is redefining the university experience for thousands of Ikorodu-based students.
            </p>
            <div className="flex items-center gap-8">
               <div>
                  <h4 className="text-3xl font-bold text-slate-900">15k+</h4>
                  <p className="text-slate-500 text-sm">Enrolled Students</p>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div>
                  <h4 className="text-3xl font-bold text-slate-900">20+</h4>
                  <p className="text-slate-500 text-sm">Departments Onboarded</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-50" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                    <div className="flex gap-1 mt-1">
                       {[...Array(t.rating)].map((_, i) => (
                         <span key={i} className="text-amber-400 text-xs">★</span>
                       ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
