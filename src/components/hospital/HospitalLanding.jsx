import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { hospitalData } from '../../data/businessData';
import { HospitalLogin } from './HospitalLogin';
import { 
  Activity, 
  HeartPulse, 
  Brain, 
  Bone, 
  Baby, 
  Dna, 
  Siren, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  X,
  User,
  LogIn,
  LogOut
} from 'lucide-react';

const deptIcons = {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Dna,
  Siren
};

export const HospitalLanding = () => {
  const { navigateTo, addToast, logoutFromBusiness } = useAuth();
  const [showLoginView, setShowLoginView] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    department: 'Cardiology & Heart Institute',
    date: '2026-08-20',
    slot: '10:30 AM'
  });
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setAppointmentSuccess(true);
    addToast(`Appointment scheduled successfully with ${selectedDoctor ? selectedDoctor.name : bookingForm.department}!`, 'success');
    setTimeout(() => {
      setAppointmentSuccess(false);
      setSelectedDoctor(null);
    }, 2500);
  };

  if (showLoginView) {
    return <HospitalLogin onBackToHospital={() => setShowLoginView(false)} />;
  }

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-300">
      {/* Hospital Top Emergency & Direct Bar */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-950 to-teal-950 border-b border-teal-500/20 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-300">
            <span className="flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
              <Siren className="w-3.5 h-3.5" /> 24/7 EMERGENCY TRIAGE
            </span>
            <span className="hidden sm:inline">Trauma & Cardiac Care Helpline: +1 (800) 420-CARE</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">ER Beds: 12 Available</span>
            </div>
            
            {/* Patient & Staff Portal Login Button */}
            <button
              onClick={() => setShowLoginView(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Portal Login</span>
            </button>

            <button
              onClick={() => logoutFromBusiness('hospital')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Hospital Branding Header */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-bold text-white">AuraCare Multi-Specialty Hospital</h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Healthcare Div.
                </span>
              </div>
              <p className="text-xs text-slate-400">NABH & JCI Accredited Tertiary Care Center</p>
            </div>
          </div>
        </div>

        {/* PUBLIC HOSPITAL LANDING PAGE */}
        <div className="space-y-12 animate-in fade-in">
          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-teal-500/30 p-8 sm:p-12 glow-hospital">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1400"
              alt="Hospital Facility"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
            />

            <div className="relative z-10 max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>World-Class Medical Pioneers & Robotics</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
                Where Compassionate Care Meets <span className="text-teal-400">Clinical Innovation</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Providing cutting-edge tertiary medical solutions with over 450 critical beds, AI-assisted diagnostics, and internationally trained medical specialists.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    document.getElementById('doctor-directory')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-teal-500/25 flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Specialist Consultation</span>
                </button>
              </div>

              {/* Live Fast Facts */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-bold font-heading text-white">450+</div>
                  <div className="text-xs text-slate-400">Tertiary ICU & General Beds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-teal-400">99.2%</div>
                  <div className="text-xs text-slate-400">Post-Op Recovery Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">120+</div>
                  <div className="text-xs text-slate-400">Super-Specialist Surgeons</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Directory Grid */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-white">Centres of Clinical Excellence</h3>
              <p className="text-xs text-slate-400">Advanced diagnostic laboratories and dedicated specialist institutes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {hospitalData.departments.map((dept, idx) => {
                const DeptIcon = deptIcons[dept.icon] || Activity;
                return (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-teal-500/40 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                        <DeptIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Avg OPD Wait: {dept.opdWaitTime}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">{dept.name}</h4>
                    
                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>{dept.doctors} Specialists</span>
                      <span>•</span>
                      <span>{dept.beds} Dedicated Beds</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Doctor Consultation Directory */}
          <div id="doctor-directory">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white">Chief Medical Specialists</h3>
                <p className="text-xs text-slate-400">Schedule immediate direct consultation with department directors</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hospitalData.doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300';
                        }}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/30 bg-slate-800"
                      />
                      <div>
                        <h4 className="font-bold text-white text-base">{doc.name}</h4>
                        <p className="text-xs text-teal-400">{doc.specialty}</p>
                        <span className="text-[11px] text-slate-400">{doc.experience}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-4">
                      <div className="flex justify-between text-slate-300">
                        <span>Patient Satisfaction:</span>
                        <span className="font-semibold text-amber-400">{doc.rating}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Next Slot:</span>
                        <span className="font-semibold text-emerald-400">{doc.available}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Consultation Fee:</span>
                        <span className="font-mono text-white">{doc.fees}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600/20 hover:bg-teal-600 text-teal-300 hover:text-white border border-teal-500/40 text-xs font-bold transition-all text-center"
                  >
                    Book Appointment Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-slate-900 border border-teal-500/40 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base">Schedule Consultation</h3>
                <p className="text-xs text-teal-400">{selectedDoctor.name}</p>
              </div>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appointmentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-lg">Consultation Confirmed!</h4>
                <p className="text-xs text-slate-300">Appointment token generated & SMS sent to patient phone.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.patientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Time Slot</label>
                    <select
                      value={bookingForm.slot}
                      onChange={(e) => setBookingForm({ ...bookingForm, slot: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option>10:30 AM</option>
                      <option>02:00 PM</option>
                      <option>04:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors shadow-lg shadow-teal-600/30"
                  >
                    Confirm Doctor Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
