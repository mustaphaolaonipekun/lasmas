
import React, { useState, useEffect } from 'react';

const SocialProof: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Prof Olaonipekun Mustapha",
      role: "Dean Engineering",
      text: " Managing a class of 200+ students used to be a nightmare. With LASMAS, the register is automated and verified by GPS. It's a game-changer for staff.",
      img: "https://image2url.com/r2/default/images/1770070191063-1dafba78-050d-4a3f-959e-e8011354c513.jpg",
      rating: 5
    },
    {
      name: "Oduleye Abdulwariz",
      role: "Civil Engineering Student (250403010045)",
      text: "The transparency is incredible. I know exactly when I've reached the 75% threshold for my exams. It's simplified my entire academic life at LASUSTECH.",
      img: "https://image2url.com/r2/default/images/1770070543483-f2228951-e3b5-4917-968b-10c26e1993fb.jpg",
      rating: 5
    },
    {
      name: "Oseni Mary Zainab",
      role: " Mechatronics Student (250404710075)",
      text: "LASMAS has completely changed how I track my lectures. No more worrying about missing signatures; I can see my 'Present' status instantly on my phone",
      img: "https://image2url.com/r2/default/images/1770070619986-a05ed515-85b3-4dc1-9672-4c032690f38e.jpg",
      rating: 5
    },
    {
      name: "Sanusi Yusuf",
      role: "Mechatronics Student (250407010071)",
      text: "The GPS verification is smart. It ensures that only those physically in the hall are marked. It's the fairest system we've ever had.",
      img: "https://image2url.com/r2/default/images/1770070213307-69adfcae-4ff2-4c3a-a8ef-9725a03efe17.jpg",
      rating: 5
    }
  ];

  // Auto-swipe logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const institutionalLogos = [
    { icon: "🌾", label: "Agriculture" },
    { icon: "📈", label: "Applied Science" },
    { icon: "🔬", label: "Basic Science" },
    { icon: "⚙️", label: "Engineering" },
    { icon: "🏗️", label: "Environmental Design" }
  ];

  return (
    <div className="bg-white">
      {/* 1. Institutional Logos Section */}
      <div className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-[800] text-[#374151] tracking-tight">
            Our solution is built for students across...
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 items-center opacity-40 grayscale hover:opacity-100 transition-all duration-700">
          {institutionalLogos.map((logo, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer w-32 md:w-40">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300 shadow-sm border border-slate-100">
                {logo.icon}
              </div>
              <span className="text-[11px] font-[800] text-slate-500 uppercase tracking-[0.15em] text-center leading-tight">
                Faculty of <br/> {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Testimonial Section */}
      <div className="py-24 bg-slate-50/50 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Testimonial
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
              We provide all the advantage that can simplify all your academic records and attendance support without any further issues
            </p>
          </div>

          {/* Swiping Testimonial Display */}
          <div className="relative h-[450px] md:h-[350px] flex justify-center items-center">
            {testimonials.map((t, i) => {
              const isCenter = i === activeIndex;
              const isLeft = i === (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isRight = i === (activeIndex + 1) % testimonials.length;
              
              let positionClasses = "opacity-0 scale-75 translate-x-full pointer-events-none";
              if (isCenter) positionClasses = "opacity-100 scale-100 translate-x-0 z-20";
              if (isLeft) positionClasses = "opacity-30 scale-90 -translate-x-full z-10 hidden md:flex";
              if (isRight) positionClasses = "opacity-30 scale-90 translate-x-full z-10 hidden md:flex";

              return (
                <div 
                  key={i} 
                  className={`absolute w-full max-w-2xl p-10 rounded-[2.5rem] border bg-white transition-all duration-1000 ease-in-out flex flex-col justify-between shadow-xl ${
                    isCenter ? 'border-purple-100 bg-purple-50/20' : 'border-slate-100'
                  } ${positionClasses}`}
                >
                  <div>
                    <div className="flex justify-center mb-6">
                      <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, starI) => (
                          <span key={starI} className="text-amber-400 text-lg">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-center text-base md:text-lg leading-relaxed mb-10 font-medium italic">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                      <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-black text-slate-900 text-lg leading-none mb-1">{t.name}</h4>
                      <p className="text-[10px] font-black text-[#8B5CF6] uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-10 bg-[#8B5CF6]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
              >
                <span className="sr-only">Go to slide {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
