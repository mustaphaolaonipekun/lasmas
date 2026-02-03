import React, { useState, useRef } from "react";

interface SignupProps {
  onBack: () => void;
  onSignup: (data: any) => void;
}

const FACULTIES = [
  "Faculty of Engineering",
  "Faculty of Agriculture",
  "Faculty of Applied Science",
  "Faculty of Basic Science",
  "Faculty of Environmental Design and Technology",
];

const Signup: React.FC<SignupProps> = ({ onBack, onSignup }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    faculty: FACULTIES[0],
    idProof: "",
    profilePic: "",
  });

  const handleNext = () => setStep(2);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Passport too large. Please select a photo under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, idProof: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSignup(formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 hero-gradient">
      {loading && (
        <div className="fixed inset-0 bg-indigo-600/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center text-white p-6 text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xs tracking-widest uppercase">
              Registry
            </div>
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">
            Authenticating Identity
          </h2>
          <p className="text-indigo-100 max-w-sm text-lg font-medium leading-relaxed">
            Securely transmitting your data to the LASUSTECH Academic Registry.
          </p>
        </div>
      )}

      <div className="w-full max-w-xl bg-white rounded-[3.5rem] shadow-2xl p-10 md:p-14 border border-indigo-50 animate-fade-in relative z-10">
        <button
          onClick={onBack}
          disabled={loading}
          className="text-slate-400 font-black text-xs mb-10 hover:text-indigo-600 transition-colors flex items-center gap-2 group uppercase tracking-widest"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Exit
        </button>

        <div className="mb-12 text-center">
          <div className="flex gap-3 mb-8 max-w-[100px] mx-auto">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= 1 ? "bg-indigo-600" : "bg-slate-100"}`}
            ></div>
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${step >= 2 ? "bg-indigo-600" : "bg-slate-100"}`}
            ></div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Staff Onboarding
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
            Stage {step} of 2
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="animate-fade-in space-y-5">
              <div className="flex flex-col items-center mb-8">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition-all overflow-hidden relative group shadow-inner"
                >
                  {formData.profilePic ? (
                    <>
                      <img
                        src={formData.profilePic}
                        alt="Passport"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold uppercase transition-opacity">
                        Change
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl mb-1">📸</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center px-4 leading-tight">
                        Passport Photo
                      </span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Academic Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300"
                />
                <input
                  type="email"
                  placeholder="Staff Email (@lasustech.edu.ng)"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300"
                />
                <input
                  type="password"
                  placeholder="Secure Portal Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-700 placeholder:text-slate-300"
                />
              </div>
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !formData.name ||
                  !formData.email ||
                  !formData.password ||
                  !formData.profilePic
                }
                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 mt-8 disabled:opacity-50 hover:bg-indigo-700 transition-all"
              >
                Proceed to Department
              </button>
            </div>
          ) : (
            <div className="animate-fade-in space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4 text-center">
                    Institutional Faculty
                  </label>
                  <select
                    value={formData.faculty}
                    onChange={(e) =>
                      setFormData({ ...formData, faculty: e.target.value })
                    }
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:border-indigo-600 focus:bg-white transition-all font-black text-slate-700 shadow-sm cursor-pointer"
                  >
                    {FACULTIES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  onClick={() => docInputRef.current?.click()}
                  className="p-10 border-2 border-dashed border-slate-200 rounded-[3rem] text-center bg-slate-50/50 hover:border-indigo-300 transition-colors cursor-pointer"
                >
                  {formData.idProof ? (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
                        <span className="text-3xl">✅</span>
                      </div>
                      <h4 className="text-slate-900 font-black mb-2 text-sm uppercase tracking-widest">
                        Document Selected
                      </h4>
                      <p className="text-slate-400 text-[10px] font-bold">
                        Click to replace
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-50">
                        <span className="text-3xl">📄</span>
                      </div>
                      <h4 className="text-slate-900 font-black mb-2 text-sm uppercase tracking-widest">
                        Appointment Document
                      </h4>
                      <p className="text-slate-400 text-[10px] mb-8 font-bold">
                        PDF or Image Scan of your Employment Letter
                      </p>
                    </>
                  )}
                  <input
                    ref={docInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    required
                    onChange={handleDocUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[2rem] font-black hover:bg-slate-200 transition-colors uppercase tracking-widest text-[10px]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.idProof}
                  className="flex-1 py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-100 disabled:opacity-50 uppercase tracking-widest text-[10px]"
                >
                  Confirm Submission
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
