import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/Toast';
import { ExecutiveHub } from './components/hub/ExecutiveHub';
import { HospitalLanding } from './components/hospital/HospitalLanding';
import { EcommerceLanding } from './components/ecommerce/EcommerceLanding';
import { VoltDriveLanding } from './components/voltdrive/VoltDriveLanding';

const MainLayout = () => {
  const { currentView } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main Content Area switched dynamically */}
      <main className="flex-1">
        {currentView === 'hub' && <ExecutiveHub />}
        {currentView === 'hospital' && <HospitalLanding />}
        {currentView === 'ecommerce' && <EcommerceLanding />}
        {currentView === 'voltdrive' && <VoltDriveLanding />}
      </main>

      {/* Auth Modal for specific business login and role privilege switching */}
      <AuthModal />

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
