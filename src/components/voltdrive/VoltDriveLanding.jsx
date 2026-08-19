import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { voltdriveData } from '../../data/businessData';
import { VoltDriveLogin } from './VoltDriveLogin';
import { 
  Zap, 
  Car, 
  Gauge, 
  BatteryCharging, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  TrendingUp, 
  DollarSign,
  Fuel,
  Leaf,
  LogIn
} from 'lucide-react';

export const VoltDriveLanding = () => {
  const { navigateTo, addToast } = useAuth();
  const [showLoginView, setShowLoginView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Vehicles');
  const [testDriveModal, setTestDriveModal] = useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = useState(voltdriveData.vehicles[0]);

  // Test Drive Form
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    phone: '',
    serviceType: 'VIP Test Drive at Showroom',
    vehicleId: 'ev-1',
    date: '2026-08-22',
    slot: '11:00 AM',
    location: 'VoltDrive Manhattan Flagship Showroom'
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Fleet Leasing Calculator State
  const [fleetSize, setFleetSize] = useState(10);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [leaseTerm, setLeaseTerm] = useState(36); // months

  const filteredVehicles = selectedCategory === 'All Vehicles'
    ? voltdriveData.vehicles
    : voltdriveData.vehicles.filter(v => v.category === selectedCategory);

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    addToast(`Test Drive / Chauffeur booking confirmed for ${bookingForm.clientName}! Details sent via SMS.`, 'success');
    setTimeout(() => {
      setBookingConfirmed(false);
      setTestDriveModal(false);
    }, 2500);
  };

  const openDriveModal = (vehicle) => {
    setSelectedVehicleForDrive(vehicle);
    setBookingForm(prev => ({ ...prev, vehicleId: vehicle.id }));
    setTestDriveModal(true);
  };

  // Leasing calculations
  const baseMonthly = selectedModelIndex === 0 ? 1190 : selectedModelIndex === 1 ? 890 : selectedModelIndex === 2 ? 1450 : 549;
  const termDiscount = leaseTerm === 48 ? 0.90 : leaseTerm === 36 ? 0.95 : 1.0;
  const monthlyPerVehicle = Math.round(baseMonthly * termDiscount);
  const totalMonthlyFleet = monthlyPerVehicle * fleetSize;
  const annualFuelSavings = Math.round(fleetSize * 3200); // approx $3,200 saved per EV/year vs petrol

  if (showLoginView) {
    return <VoltDriveLogin onBackToShowroom={() => setShowLoginView(false)} />;
  }

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-300 bg-slate-950 text-slate-100 font-sans">
      {/* 1. VoltDrive Top Telematics Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-950 to-blue-950 border-b border-cyan-500/20 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="flex items-center gap-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2.5 py-0.5 rounded-full font-bold">
              <Zap className="w-3.5 h-3.5" /> 100% ZERO-EMISSION MOBILITY
            </span>
            <span className="hidden sm:inline">Global Fleet Telematics: 480+ Connected Commercial & VIP Vehicles</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">120 Superchargers Online</span>
            </div>

            <button
              onClick={() => navigateTo('hub')}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Hub</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 2. Main Branding Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-900/70 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-extrabold text-white">VoltDrive Mobility & Fleet Logistics</h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  EV Automotive
                </span>
              </div>
              <p className="text-xs text-slate-400">Tier-1 Luxury Electric Dealership & Corporate Fleet Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                document.getElementById('fleet-calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Fleet Lease Estimator</span>
            </button>

            <button
              onClick={() => openDriveModal(voltdriveData.vehicles[0])}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Book VIP Test Drive</span>
            </button>
          </div>
        </div>

        {/* 3. Hero Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-8 sm:p-12 mb-12 glow-hospital">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1400"
            alt="VoltDrive Electric Vehicle"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-35 mix-blend-overlay"
          />

          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen 800V Architecture & Megawatt Charging</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
              Electrify Your Journey. <span className="text-cyan-400">Command the Fleet.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unrivaled acceleration, ultra-long-range luxury, and seamless corporate fleet leasing. Experience the future of sustainable high-performance mobility.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all"
              >
                <Car className="w-4 h-4" />
                <span>Explore Vehicle Showroom</span>
              </button>
            </div>

            {/* Fast Telemetry Specs */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold font-heading text-cyan-400">1.98s</div>
                <div className="text-xs text-slate-400">0 - 60 MPH Acceleration</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-heading text-white">520 mi</div>
                <div className="text-xs text-slate-400">Single Charge Range</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-heading text-emerald-400">15 min</div>
                <div className="text-xs text-slate-400">10-80% Supercharge</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. VIRTUAL VEHICLE SHOWROOM */}
        <div id="showroom" className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-2xl font-heading font-extrabold text-white">Virtual Vehicle Showroom</h3>
              <p className="text-xs text-slate-400">Select any model to view 360° technical specifications and book an instant trial</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {voltdriveData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="relative h-64 overflow-hidden bg-slate-950">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                        {vehicle.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 text-right">
                      <div className="text-xl font-extrabold font-heading text-white">{vehicle.price}</div>
                      <div className="text-xs text-cyan-400 font-medium">or {vehicle.leasePrice} Lease</div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-5">
                    <div>
                      <span className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">{vehicle.category}</span>
                      <h4 className="text-xl font-bold font-heading text-white mt-0.5">{vehicle.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{vehicle.drivetrain}</p>
                    </div>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-4 gap-2 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
                      <div>
                        <div className="text-xs text-slate-400">0-60 MPH</div>
                        <div className="text-sm font-bold text-white font-mono mt-0.5">{vehicle.acceleration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Range</div>
                        <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{vehicle.range}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Power</div>
                        <div className="text-sm font-bold text-white font-mono mt-0.5">{vehicle.horsepower}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Charge 80%</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{vehicle.chargeTime}</div>
                      </div>
                    </div>

                    {/* Highlight Features */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      {vehicle.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={() => openDriveModal(vehicle)}
                    className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Car className="w-4 h-4" />
                    <span>Book Test Drive / Chauffeur</span>
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('fleet-calculator')?.scrollIntoView({ behavior: 'smooth' });
                      addToast(`Selected ${vehicle.name} for fleet lease estimation`, 'info');
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                  >
                    Lease Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. INTERACTIVE FLEET LEASING ESTIMATOR */}
        <div id="fleet-calculator" className="mb-16">
          <div className="glass-panel border border-cyan-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Commercial & Enterprise Fleet Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Calculate Corporate EV Fleet Lease & Fuel Savings
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Customize your enterprise fleet volume, vehicle model, and lease tenure to see real-time zero-emission savings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="lg:col-span-2 space-y-6">
                {/* Fleet Size Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300">Fleet Size (Number of Vehicles)</label>
                    <span className="text-base font-bold font-mono text-cyan-400">{fleetSize} EVs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={fleetSize}
                    onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 Vehicle (VIP)</span>
                    <span>25 Fleet</span>
                    <span>50 Logistics</span>
                    <span>100+ Enterprise</span>
                  </div>
                </div>

                {/* Model Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Selected EV Model</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {voltdriveData.vehicles.map((v, idx) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedModelIndex(idx)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedModelIndex === idx
                            ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{v.name}</div>
                        <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{v.leasePrice} base</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lease Term */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Lease Duration</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { term: 24, label: '24 Months (Standard)' },
                      { term: 36, label: '36 Months (Save 5%)' },
                      { term: 48, label: '48 Months (Save 10%)' }
                    ].map((item) => (
                      <button
                        key={item.term}
                        type="button"
                        onClick={() => setLeaseTerm(item.term)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          leaseTerm === item.term
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Output Card */}
              <div className="bg-slate-950 rounded-3xl p-6 border border-cyan-500/40 flex flex-col justify-between shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Estimated Fleet Cost</span>
                  <div className="text-3xl font-extrabold font-heading text-white mt-1">
                    ${totalMonthlyFleet.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    ${monthlyPerVehicle.toLocaleString()}/mo per vehicle on a {leaseTerm}-month lease.
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Leaf className="w-4 h-4 text-emerald-400" />
                        <span>Annual Gas Savings:</span>
                      </span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        +${annualFuelSavings.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <BatteryCharging className="w-4 h-4 text-cyan-400" />
                        <span>Supercharger Credits:</span>
                      </span>
                      <span className="font-semibold text-white">Included Unlimited</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span>Bumper-to-Bumper Care:</span>
                      </span>
                      <span className="font-semibold text-white">Full 24/7 Coverage</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToast(`Commercial Fleet Proposal for ${fleetSize} vehicles submitted to enterprise desk!`, 'success');
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Generate Official Fleet Proposal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. ENTERPRISE FLEET PACKAGES */}
        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-heading font-bold text-white">Corporate Enterprise Packages</h3>
            <p className="text-xs text-slate-400">Turnkey electric mobility solutions tailored for corporate executives and logistics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {voltdriveData.fleetPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 inline-block mb-3">
                    {pkg.size}
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white">{pkg.tier}</h4>
                  <div className="text-sm font-bold text-cyan-400 font-mono mt-1 mb-4">{pkg.baseRate}</div>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => addToast(`Enrolled in ${pkg.tier} inquiry`, 'info')}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors text-center"
                >
                  Inquire Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. BOOK TEST DRIVE / CHAUFFEUR MODAL */}
      {testDriveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base">Schedule VIP Test Drive / Chauffeur</h3>
                <p className="text-xs text-cyan-400">{selectedVehicleForDrive?.name}</p>
              </div>
              <button
                onClick={() => setTestDriveModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-lg">VIP Booking Confirmed!</h4>
                <p className="text-xs text-slate-300">
                  Your concierge specialist will prepare the vehicle at {bookingForm.location}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-4 pt-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Sterling"
                      value={bookingForm.clientName}
                      onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-3829"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Service Type</label>
                  <select
                    value={bookingForm.serviceType}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>VIP Test Drive at Showroom</option>
                    <option>Executive Chauffeur Airport Transfer</option>
                    <option>Corporate Fleet Evaluation (48-Hour Trial)</option>
                    <option>Doorstep Delivery & Demonstration</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Time Slot</label>
                    <select
                      value={bookingForm.slot}
                      onChange={(e) => setBookingForm({ ...bookingForm, slot: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>02:00 PM</option>
                      <option>04:30 PM</option>
                      <option>06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Location / Showroom</label>
                  <select
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>VoltDrive Manhattan Flagship Showroom</option>
                    <option>VoltDrive Beverly Hills Experience Center</option>
                    <option>VoltDrive London Mayfair Gallery</option>
                    <option>Client Residence / Executive Office (Doorstep)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-600/30"
                  >
                    Confirm VIP Experience Booking
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
