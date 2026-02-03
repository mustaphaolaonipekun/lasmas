
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSignIn: () => void;
  onHowItWorks: () => void;
  onHome: () => void;
  onTeam: () => void;
  onWhyLasmas: () => void;
  onNavigate: (view: any) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn, onHowItWorks, onHome, onTeam, onWhyLasmas, onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center rounded-full px-6 py-3 border shadow-sm transition-all duration-300 bg-white/80 backdrop-blur-md border-slate-100`}>
            {/* Logo */}
            <button onClick={onHome} className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors text-slate-900`}>LASMAS</span>
            </button>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest transition-colors text-slate-600`}>
              <button onClick={onHome} className={`hover:text-indigo-600 transition-colors ${currentView === 'landing' ? 'text-indigo-600' : ''}`}>Home</button>
              <button onClick={onHowItWorks} className={`hover:text-indigo-600 transition-colors ${currentView === 'how-it-works' ? 'text-indigo-600' : ''}`}>How it Works</button>
              <button onClick={onTeam} className={`hover:text-indigo-600 transition-colors ${currentView === 'our-team' ? 'text-indigo-600' : ''}`}>Our Team</button>
              <button onClick={onWhyLasmas} className={`hover:text-indigo-600 transition-colors ${currentView === 'why-lasmas' ? 'text-indigo-600' : ''}`}>Why LASMAS</button>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex items-center gap-4">
              <button 
                onClick={onSignIn}
                className="hidden sm:block bg-indigo-600 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Sign In
              </button>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-900 border border-slate-100 shadow-sm"
              >
                <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[110] transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)}></div>
        
        <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl p-10 flex flex-col transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold tracking-tight text-slate-900">LASMAS</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 flex-grow">
            {[
              { label: 'Home', action: onHome, active: currentView === 'landing' },
              { label: 'How it Works', action: onHowItWorks, active: currentView === 'how-it-works' },
              { label: 'Our Team', action: onTeam, active: currentView === 'our-team' },
              { label: 'Why LASMAS', action: onWhyLasmas, active: currentView === 'why-lasmas' }
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => handleMobileNav(item.action)}
                className={`text-left py-4 px-6 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-slate-100">
            <button 
              onClick={() => handleMobileNav(onSignIn)}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-colors"
            >
              Secure Portal Login
            </button>
            <p className="mt-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Lasustech Institutional Standard
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
