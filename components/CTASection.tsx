
import React from 'react';

interface CTASectionProps {
  onStart: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onStart }) => {
  return (
    <div className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto bg-indigo-50 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-300/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-600 text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Ready to manage?
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            Take control of your <br />
            <span className="text-indigo-600">academic registers today.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={onStart}
                className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
             >
                Login to LASMAS
             </button>
          </div>
        </div>

        {/* Central Hub Visualization */}
        <div className="mt-20 relative max-w-lg mx-auto">
           <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl mx-auto flex items-center justify-center border-4 border-indigo-100 z-20 relative">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                 <span className="text-2xl font-bold">L</span>
              </div>
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-indigo-100 rounded-full"></div>
           <div className="absolute top-0 left-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl border border-indigo-50 animate-float">👤</div>
           <div className="absolute bottom-10 right-0 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl border border-indigo-50 animate-float" style={{animationDelay: '1s'}}>📍</div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
