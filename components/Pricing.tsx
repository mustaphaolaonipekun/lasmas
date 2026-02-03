
import React, { useState } from 'react';

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Department Plan",
      price: isYearly ? "450" : "499",
      description: "Ideal for individual departments looking to digitize their attendance register for up to 500 students.",
      features: ["Biometric Enrollment", "Basic Attendance Reports", "Student Portal Access", "Email Support"]
    },
    {
      name: "Faculty Pro",
      price: isYearly ? "1200" : "1499",
      description: "Comprehensive solution for entire faculties with multiple lecture halls and complex scheduling needs.",
      features: ["Unlimited Halls", "Exam Eligibility Engine", "Real-time Dashboard", "Departmental Sync", "Priority Support"],
      popular: true
    },
    {
      name: "University Institutional",
      price: isYearly ? "4500" : "4999",
      description: "The full LASMAS power for the entire LASUSTECH campus, covering all colleges and vocational centers.",
      features: ["Full Campus Integration", "Cloud API for Portal", "Mobile Scanning App", "Dedicated Success Manager", "Custom Hardware Support"]
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-indigo-600 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Investment
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Tailored for <span className="text-indigo-600">Scale</span>
          </h2>
          <p className="text-slate-500 mb-10">Choose a deployment model that fits your faculty or institutional scope.</p>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-full mb-12">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${!isYearly ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Semester
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${isYearly ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Academic Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-[2.5rem] border ${plan.popular ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-white'} shadow-lg flex flex-col`}>
              {plan.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-4">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₦{plan.price}k</span>
                <span className="text-slate-500 text-sm">/ {isYearly ? 'Session' : 'Semester'}</span>
              </div>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">{plan.description}</p>
              
              <button className={`w-full py-4 rounded-full font-bold mb-10 transition-all ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'}`}>
                Inquire Deployment
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
