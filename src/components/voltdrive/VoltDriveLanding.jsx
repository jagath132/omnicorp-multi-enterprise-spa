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
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  TrendingUp, 
  DollarSign,
  Fuel,
  Leaf,
  LogIn,
  LogOut,
  Navigation,
  Wind,
  Thermometer,
  Sliders,
  Radio,
  PlugZap
} from 'lucide-react';

export const VoltDriveLanding = () => {
  const { navigateTo, addToast, logoutFromBusiness } = useAuth();
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

  // Range Calculator State
  const [rangeState, setRangeState] = useState({
    selectedVehicleIdx: 0,
    dailyKm: 80,
    drivingStyle: 'normal', // 'eco' | 'normal' | 'sport'
    acUsage: 'moderate',    // 'off' | 'moderate' | 'full'
    terrain: 'city',        // 'city' | 'highway' | 'mixed'
  });

  // Charging Station Filter State
  const [chargingFilter, setChargingFilter] = useState('All');

  const filteredVehicles = selectedCategory === 'All Vehicles'
    ? voltdriveData.vehicles
    : voltdriveData.vehicles.filter(v => v.category === selectedCategory);

  // Range Calculator Logic
  const rangeBaseKm = [520, 480, 560, 430]; // base WLTP range per vehicle model in km
  const styleMultiplier = rangeState.drivingStyle === 'eco' ? 1.12 : rangeState.drivingStyle === 'sport' ? 0.78 : 1.0;
  const acMultiplier = rangeState.acUsage === 'off' ? 1.06 : rangeState.acUsage === 'full' ? 0.88 : 1.0;
  const terrainMultiplier = rangeState.terrain === 'city' ? 0.92 : rangeState.terrain === 'highway' ? 1.05 : 0.98;
  const estimatedRangeKm = Math.round(
    rangeBaseKm[rangeState.selectedVehicleIdx] * styleMultiplier * acMultiplier * terrainMultiplier
  );
  const daysPerCharge = Math.floor(estimatedRangeKm / rangeState.dailyKm);
  const annualChargeCost = Math.round((365 / (daysPerCharge || 1)) * 12); // ~$12 per full charge

  // Mock Charging Stations
  const chargingStations = [
    { id: 1, name: 'VoltDrive Supercharger - Manhattan Hub', type: 'Supercharger', power: '350 kW', available: 6, total: 8, distance: '0.4 mi', status: 'Available', waitTime: null },
    { id: 2, name: 'NexCharge Express - Midtown West', type: 'DC Fast Charge', power: '150 kW', available: 2, total: 6, distance: '1.2 mi', status: 'Busy', waitTime: '~12 min' },
    { id: 3, name: 'GreenGrid Level 2 - Columbus Circle', type: 'Level 2 AC', power: '22 kW', available: 4, total: 4, distance: '1.8 mi', status: 'Available', waitTime: null },
    { id: 4, name: 'VoltDrive Supercharger - Brooklyn Bridge', type: 'Supercharger', power: '350 kW', available: 0, total: 10, distance: '3.1 mi', status: 'Full', waitTime: '~25 min' },
    { id: 5, name: 'OmniCharge Corporate Depot - FiDi', type: 'DC Fast Charge', power: '200 kW', available: 3, total: 5, distance: '3.9 mi', status: 'Available', waitTime: null },
    { id: 6, name: 'EcoPlug Level 2 - Central Park South', type: 'Level 2 AC', power: '11 kW', available: 1, total: 3, distance: '0.9 mi', status: 'Busy', waitTime: '~8 min' },
  ];
  const filteredStations = chargingFilter === 'All' ? chargingStations : chargingStations.filter(s => s.type === chargingFilter);

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
              onClick={() => logoutFromBusiness('voltdrive')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 text-xs font-bold shadow-md shadow-black/20 transition-all duration-200 group active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              <span>Sign Out</span>
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
        {/* 5. REAL-TIME RANGE CALCULATOR */}
        <div className="mb-16">
          <div className="glass-panel border border-cyan-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
                <Gauge className="w-3.5 h-3.5" />
                <span>Intelligent Range Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">Real-Time EV Range Calculator</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Adjust your driving profile to get a personalized range estimate for your selected model.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="lg:col-span-2 space-y-6">

                {/* Vehicle Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Select Vehicle Model</label>
                  <div className="grid grid-cols-2 gap-3">
                    {voltdriveData.vehicles.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setRangeState(prev => ({ ...prev, selectedVehicleIdx: idx }))}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          rangeState.selectedVehicleIdx === idx
                            ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{v.name}</div>
                        <div className="text-[11px] text-cyan-400 font-mono mt-0.5">{rangeBaseKm[idx]} km base range</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Daily Distance */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-300">Daily Driving Distance</label>
                    <span className="text-base font-bold font-mono text-cyan-400">{rangeState.dailyKm} km/day</span>
                  </div>
                  <input
                    type="range" min="10" max="300" step="5"
                    value={rangeState.dailyKm}
                    onChange={(e) => setRangeState(prev => ({ ...prev, dailyKm: Number(e.target.value) }))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10 km (City commute)</span><span>150 km (Long haul)</span><span>300 km (Road trip)</span>
                  </div>
                </div>

                {/* Driving Style / AC / Terrain */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2"><Wind className="w-3 h-3 inline mr-1" />Driving Style</label>
                    <div className="flex flex-col gap-2">
                      {[['eco','🌿 Eco'],['normal','⚡ Normal'],['sport','🏎 Sport']].map(([val, label]) => (
                        <button key={val} onClick={() => setRangeState(prev => ({ ...prev, drivingStyle: val }))}
                          className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                            rangeState.drivingStyle === val ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}>{label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2"><Thermometer className="w-3 h-3 inline mr-1" />AC / Climate</label>
                    <div className="flex flex-col gap-2">
                      {[['off','❄ AC Off'],['moderate','🌤 Moderate'],['full','🔥 Full Blast']].map(([val, label]) => (
                        <button key={val} onClick={() => setRangeState(prev => ({ ...prev, acUsage: val }))}
                          className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                            rangeState.acUsage === val ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}>{label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2"><Navigation className="w-3 h-3 inline mr-1" />Road Type</label>
                    <div className="flex flex-col gap-2">
                      {[['city','🏙 City'],['mixed','🛣 Mixed'],['highway','🛤 Highway']].map(([val, label]) => (
                        <button key={val} onClick={() => setRangeState(prev => ({ ...prev, terrain: val }))}
                          className={`py-2 rounded-xl border text-xs font-semibold transition-all ${
                            rangeState.terrain === val ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}>{label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Output */}
              <div className="bg-slate-950 rounded-3xl p-6 border border-cyan-500/40 flex flex-col justify-between shadow-xl space-y-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Estimated Range</span>
                  <div className="text-5xl font-extrabold font-heading text-white mt-2">
                    {estimatedRangeKm} <span className="text-lg text-slate-400 font-normal">km</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{Math.round(estimatedRangeKm * 0.621)} miles per full charge</p>

                  {/* Range Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>0</span><span>{rangeBaseKm[rangeState.selectedVehicleIdx]} km (Max)</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (estimatedRangeKm / rangeBaseKm[rangeState.selectedVehicleIdx]) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300"><BatteryCharging className="w-4 h-4 text-cyan-400" />Days per charge:</span>
                      <span className="font-mono font-bold text-white text-sm">{daysPerCharge > 0 ? `${daysPerCharge} day${daysPerCharge > 1 ? 's' : ''}` : '< 1 day'}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300"><Leaf className="w-4 h-4 text-emerald-400" />Annual charge cost:</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">~${annualChargeCost}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300"><TrendingUp className="w-4 h-4 text-amber-400" />vs Petrol savings:</span>
                      <span className="font-mono font-bold text-amber-400 text-sm">+${Math.round(annualChargeCost * 3.8).toLocaleString()}/yr</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => addToast(`Range profile saved for ${voltdriveData.vehicles[rangeState.selectedVehicleIdx]?.name}!`, 'success')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Save My Range Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. NEARBY CHARGING STATION FINDER */}
        <div className="mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white">Nearby Charging Stations</h3>
              <p className="text-xs text-slate-400 mt-0.5">Live availability of VoltDrive-network chargers near your current location</p>
            </div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Supercharger', 'DC Fast Charge', 'Level 2 AC'].map(f => (
                <button key={f} onClick={() => setChargingFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    chargingFilter === f ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}>{f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredStations.map(station => {
              const availPct = (station.available / station.total) * 100;
              const statusColor = station.status === 'Available' ? 'emerald' : station.status === 'Busy' ? 'amber' : 'rose';
              return (
                <div key={station.id} className="bg-slate-900/80 rounded-3xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <PlugZap className={`w-4 h-4 text-${statusColor}-400 shrink-0`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider text-${statusColor}-400 px-2 py-0.5 rounded-full bg-${statusColor}-500/10 border border-${statusColor}-500/20`}>
                          {station.status}{station.waitTime ? ` · ${station.waitTime}` : ''}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm leading-tight">{station.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{station.type} · {station.power}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-cyan-400 font-mono">{station.distance}</div>
                      <div className="text-[10px] text-slate-500">away</div>
                    </div>
                  </div>

                  {/* Availability Bar */}
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Charger Availability</span>
                      <span className="font-mono font-bold text-white">{station.available}/{station.total} ports free</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${statusColor}-500 transition-all`}
                        style={{ width: `${availPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToast(`Navigating to ${station.name}`, 'info')}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />Navigate
                    </button>
                    <button
                      onClick={() => addToast(`Reserved a port at ${station.name}!`, 'success')}
                      disabled={station.status === 'Full'}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Reserve Port
                    </button>
                  </div>
                </div>
              );
            })}
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
