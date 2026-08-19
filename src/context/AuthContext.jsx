import React, { createContext, useContext, useState, useEffect } from 'react';
import { businesses } from '../data/businessData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current active view: 'hub' | 'hospital' | 'ecommerce' | 'garments'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('omnicorp_view') || 'hub';
  });

  // Master Executive User session
  const [masterUser, setMasterUser] = useState(() => {
    const saved = localStorage.getItem('omnicorp_master_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alexander Sterling',
      email: 'alexander.s@omnicorpgroup.com',
      role: 'Group Chairman & Chief Executive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: false,
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  });

  // Business-specific sessions (Requires division owner login first before website access)
  const [businessSessions, setBusinessSessions] = useState({
    hospital: { isLoggedIn: false, role: 'Chief Medical Officer / Owner', email: 'chief.doctor@auracare.med' },
    ecommerce: { isLoggedIn: false, role: 'Founder & E-Commerce Director', email: 'executive@nextrend.store' },
    voltdrive: { isLoggedIn: false, role: 'VP of Automotive & Fleet Operations', email: 'fleet.director@voltdrive.com' },
  });

  // Active Auth Modal state
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    targetBusinessId: null,
  });

  // Notification Toast state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch view with smooth scroll to top
  const navigateTo = (viewId) => {
    setCurrentView(viewId);
    localStorage.setItem('omnicorp_view', viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewId !== 'hub') {
      const biz = businesses.find(b => b.id === viewId);
      if (biz) {
        addToast(`Switched to ${biz.name} portal`, 'success');
      }
    } else {
      addToast('Returned to Executive Master Hub', 'info');
    }
  };

  // Open login modal for specific business
  const openBusinessLoginModal = (businessId) => {
    setAuthModalState({
      isOpen: true,
      targetBusinessId: businessId
    });
  };

  const closeBusinessLoginModal = () => {
    setAuthModalState({
      isOpen: false,
      targetBusinessId: null
    });
  };

  // Authenticate into a specific business
  const loginToBusiness = (businessId, email, role) => {
    const updatedSessions = {
      ...businessSessions,
      [businessId]: {
        isLoggedIn: true,
        email: email || businesses.find(b => b.id === businessId)?.credentials.defaultEmail,
        role: role || businesses.find(b => b.id === businessId)?.credentials.role,
        loginTime: new Date().toLocaleTimeString()
      }
    };
    setBusinessSessions(updatedSessions);
    localStorage.setItem('omnicorp_business_sessions', JSON.stringify(updatedSessions));
    closeBusinessLoginModal();
    navigateTo(businessId);
    addToast(`Authenticated successfully into ${businesses.find(b => b.id === businessId)?.name}`, 'success');
  };

  // Log out from specific business
  const logoutFromBusiness = (businessId) => {
    const updatedSessions = {
      ...businessSessions,
      [businessId]: {
        isLoggedIn: false,
        email: null,
        role: null
      }
    };
    setBusinessSessions(updatedSessions);
    localStorage.setItem('omnicorp_business_sessions', JSON.stringify(updatedSessions));
    addToast(`Logged out from ${businesses.find(b => b.id === businessId)?.name}`, 'warning');
  };

  // Master Login / Logout
  const masterLogin = (email) => {
    // Always reset all business sessions on fresh master login
    const freshSessions = {
      hospital: { isLoggedIn: false, role: 'Chief Medical Officer / Owner', email: 'chief.doctor@auracare.med' },
      ecommerce: { isLoggedIn: false, role: 'Founder & E-Commerce Director', email: 'executive@nextrend.store' },
      voltdrive: { isLoggedIn: false, role: 'VP of Automotive & Fleet Operations', email: 'fleet.director@voltdrive.com' },
    };
    setBusinessSessions(freshSessions);
    localStorage.removeItem('omnicorp_business_sessions');

    const updated = {
      name: 'Alexander Sterling',
      email: email || 'alexander.s@omnicorpgroup.com',
      role: 'Group Chairman & Chief Executive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMasterUser(updated);
    localStorage.setItem('omnicorp_master_user', JSON.stringify(updated));
    setCurrentView('hub');
    localStorage.setItem('omnicorp_view', 'hub');
    addToast('Welcome back, Executive Chairman!', 'success');
  };

  const masterLogout = () => {
    // Reset all individual business sessions on logout
    const freshSessions = {
      hospital: { isLoggedIn: false, role: 'Chief Medical Officer / Owner', email: 'chief.doctor@auracare.med' },
      ecommerce: { isLoggedIn: false, role: 'Founder & E-Commerce Director', email: 'executive@nextrend.store' },
      voltdrive: { isLoggedIn: false, role: 'VP of Automotive & Fleet Operations', email: 'fleet.director@voltdrive.com' },
    };
    setBusinessSessions(freshSessions);
    localStorage.removeItem('omnicorp_business_sessions');

    const updated = { ...masterUser, isLoggedIn: false };
    setMasterUser(updated);
    localStorage.setItem('omnicorp_master_user', JSON.stringify(updated));
    setCurrentView('hub');
    localStorage.setItem('omnicorp_view', 'hub');
    addToast('Executive session ended.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        currentView,
        navigateTo,
        masterUser,
        masterLogin,
        masterLogout,
        businessSessions,
        loginToBusiness,
        logoutFromBusiness,
        authModalState,
        openBusinessLoginModal,
        closeBusinessLoginModal,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
