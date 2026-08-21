import React, { createContext, useContext, useState, useEffect } from 'react';
import { businesses } from '../data/businessData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Clean up legacy localStorage keys to prevent stale page restores across browser restarts
  try {
    localStorage.removeItem('omnicorp_view');
    localStorage.removeItem('omnicorp_business_sessions');
  } catch (e) {}

  // Business-specific sessions (Stored in sessionStorage so browser close automatically resets authentication)
  const [businessSessions, setBusinessSessions] = useState(() => {
    const saved = sessionStorage.getItem('omnicorp_business_sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      hospital: { isLoggedIn: false, role: 'Chief Medical Officer / Owner', email: 'chief.doctor@auracare.med' },
      ecommerce: { isLoggedIn: false, role: 'Founder & E-Commerce Director', email: 'executive@nextrend.store' },
      voltdrive: { isLoggedIn: false, role: 'VP of Automotive & Fleet Operations', email: 'fleet.director@voltdrive.com' },
    };
  });

  // Current active view: 'hub' | 'hospital' | 'ecommerce' | 'voltdrive'
  // Using sessionStorage ensures that closing the mobile browser or tab resets back to 'hub' (all business cards)
  const [currentView, setCurrentView] = useState(() => {
    const savedView = sessionStorage.getItem('omnicorp_view');
    // If no view is saved, or if saved view is an unauthenticated business sub-portal, return to 'hub'
    if (!savedView || savedView === 'hub') return 'hub';
    return savedView;
  });

  // Master Executive User session
  const [masterUser, setMasterUser] = useState(() => {
    const saved = sessionStorage.getItem('omnicorp_master_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, isLoggedIn: true };
      } catch (e) {
        // ignore parsing errors
      }
    }
    return {
      name: 'Alexander Sterling',
      email: 'alexander.s@omnicorpgroup.com',
      role: 'Group Chairman & Chief Executive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
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
    sessionStorage.setItem('omnicorp_view', viewId);
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
    sessionStorage.setItem('omnicorp_business_sessions', JSON.stringify(updatedSessions));
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
    sessionStorage.setItem('omnicorp_business_sessions', JSON.stringify(updatedSessions));
    navigateTo('hub');
    addToast(`Signed out of ${businesses.find(b => b.id === businessId)?.name}`, 'warning');
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
    sessionStorage.removeItem('omnicorp_business_sessions');

    const updated = {
      name: 'Alexander Sterling',
      email: email || 'alexander.s@omnicorpgroup.com',
      role: 'Group Chairman & Chief Executive',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isLoggedIn: true,
      lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMasterUser(updated);
    sessionStorage.setItem('omnicorp_master_user', JSON.stringify(updated));
    setCurrentView('hub');
    sessionStorage.setItem('omnicorp_view', 'hub');
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
    sessionStorage.removeItem('omnicorp_business_sessions');

    const updated = { ...masterUser, isLoggedIn: true };
    setMasterUser(updated);
    sessionStorage.setItem('omnicorp_master_user', JSON.stringify(updated));
    setCurrentView('hub');
    sessionStorage.setItem('omnicorp_view', 'hub');
    addToast('Reset all business sessions.', 'info');
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
