import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { AuthModal } from './components/common/AuthModal';
import { ToastContainer } from './components/common/Toast';
import { ExecutiveHub } from './components/hub/ExecutiveHub';
import { HospitalLanding } from './components/hospital/HospitalLanding';
import { HospitalOwnerLogin } from './components/hospital/HospitalOwnerLogin';
import { EcommerceLanding } from './components/ecommerce/EcommerceLanding';
import { EcommerceOwnerLogin } from './components/ecommerce/EcommerceOwnerLogin';
import { VoltDriveLanding } from './components/voltdrive/VoltDriveLanding';
import { VoltDriveOwnerLogin } from './components/voltdrive/VoltDriveOwnerLogin';
import { MasterLogin } from './components/auth/MasterLogin';

const MainLayout = () => {
  const { 
    currentView, 
    masterUser, 
    businessSessions, 
    loginToBusiness, 
    navigateTo 
  } = useAuth();

  // 1. MASTER LOGIN STAGE: If owner is not authenticated into the Master Hub
  if (!masterUser?.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
        <MasterLogin />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Top Universal Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. EXECUTIVE HUB STAGE: All 3 Businesses Displayed */}
        {currentView === 'hub' && <ExecutiveHub />}

        {/* 3. HOSPITAL BUSINESS FLOW: Owner Login First -> Then Hospital Website */}
        {currentView === 'hospital' && (
          !businessSessions.hospital?.isLoggedIn ? (
            <HospitalOwnerLogin 
              onLoginSuccess={() => loginToBusiness('hospital')} 
              onBack={() => navigateTo('hub')} 
            />
          ) : (
            <HospitalLanding />
          )
        )}

        {/* 4. E-COMMERCE BUSINESS FLOW: Owner Login First -> Then E-Commerce Website */}
        {currentView === 'ecommerce' && (
          !businessSessions.ecommerce?.isLoggedIn ? (
            <EcommerceOwnerLogin 
              onLoginSuccess={() => loginToBusiness('ecommerce')} 
              onBack={() => navigateTo('hub')} 
            />
          ) : (
            <EcommerceLanding />
          )
        )}

        {/* 5. VOLTDRIVE EV MOBILITY FLOW: Owner Login First -> Then VoltDrive Website */}
        {currentView === 'voltdrive' && (
          !businessSessions.voltdrive?.isLoggedIn ? (
            <VoltDriveOwnerLogin 
              onLoginSuccess={() => loginToBusiness('voltdrive')} 
              onBack={() => navigateTo('hub')} 
            />
          ) : (
            <VoltDriveLanding />
          )
        )}
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
