
import React from 'react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate?.('landing')}>
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  L
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">LASMAS</span>
              </div>
              <p className="text-slate-500 leading-relaxed mb-8 max-w-sm">
                Empowering the Lagos State University of Science and Technology with cutting-edge attendance solutions. Built for students, verified by staff.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">in</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">𝕏</div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">Navigation</h4>
              <ul className="space-y-4 text-slate-600 text-sm font-bold">
                <li><button onClick={() => onNavigate?.('landing')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px]">Home</button></li>
                <li><button onClick={() => onNavigate?.('how-it-works')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px]">How it Works</button></li>
                <li><button onClick={() => onNavigate?.('our-team')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px]">Our Team</button></li>
                <li><button onClick={() => onNavigate?.('why-lasmas')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest text-[10px]">Why LASMAS</button></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-6">Campus Helpdesk</h4>
              <p className="text-sm text-slate-500 mb-6">Encountering enrollment issues? Visit your Departmental Office or contact our technical team.</p>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md">
                Get Support
              </button>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-xs font-medium">
            <p>© {new Date().getFullYear()} Lausustech. Tailored for LASUSTECH.</p>
            <div className="flex gap-8 mt-4 sm:mt-0">
               <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
