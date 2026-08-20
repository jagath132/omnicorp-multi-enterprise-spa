import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ecommerceData } from '../../data/businessData';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  ChevronDown, 
  Menu, 
  Star, 
  ArrowLeft, 
  X, 
  Check, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  Flame, 
  Tag, 
  Clock, 
  User, 
  ChevronRight,
  Package,
  Heart,
  HelpCircle,
  Truck,
  ArrowRight,
  LogOut
} from 'lucide-react';

export const EcommerceLanding = () => {
  const { navigateTo, addToast, logoutFromBusiness } = useAuth();

  // Authentication State (Default: Signed Out / Guest)
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('nextrend_customer_user');
    return saved ? JSON.parse(saved) : {
      name: null,
      email: null,
      isLoggedIn: false,
      primeMember: false,
      cartCount: 0
    };
  });

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const accountRef = useRef(null);

  const handleAutoCustomerLogin = () => {
    const userData = {
      name: 'Alexander Sterling',
      email: 'alexander.s@omnicorpgroup.com',
      isLoggedIn: true,
      primeMember: true,
      cartCount: 1
    };
    localStorage.setItem('nextrend_customer_user', JSON.stringify(userData));
    setCustomerUser(userData);
    addToast('Welcome back, Alexander Sterling! Successfully signed in.', 'success');
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [activeCategory, setActiveCategory] = useState('All');

  // Carousel & Cart State
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cart, setCart] = useState([
    {
      id: 'prod-1',
      title: 'AuraSphere ANC Wireless Studio Headphones with Spatial Audio',
      price: 249.99,
      qty: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      prime: true
    }
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // New Payment, Orders, and Tracking State
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'checkout' | 'orders' | 'track'
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nextrend_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });
  
  const [activeOrderForTracking, setActiveOrderForTracking] = useState(null);
  const [cancelConfirmId, setCancelConfirmId] = useState(null);
  const [returnState, setReturnState] = useState({}); // { [orderId]: { open: bool, reason: string, submitted: bool } }
  
  const [shippingForm, setShippingForm] = useState({
    fullName: 'Alexander Sterling',
    address: '42 Wallaby Way',
    city: 'Sydney',
    zip: '2000',
    phone: '+1 (555) 019-2834',
    cardName: 'Alexander Sterling',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/29',
    cardCvv: '007',
    paymentMethod: 'card' // 'card' | 'wallet' | 'cod'
  });

  // Auto rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % ecommerceData.heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Close account menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Purge stale mock orders from localStorage (old hardcoded Smartwatch order)
  useEffect(() => {
    const saved = localStorage.getItem('nextrend_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasStaleOrder = parsed.some(o =>
          o.items && o.items.some(item => item.id === 'prod-2')
        );
        if (hasStaleOrder) {
          localStorage.removeItem('nextrend_orders');
          setOrders([]);
        }
      } catch (e) {
        localStorage.removeItem('nextrend_orders');
        setOrders([]);
      }
    }
  }, []);


  const handleLogout = () => {
    const guestUser = { name: null, email: null, isLoggedIn: false, primeMember: false };
    setCustomerUser(guestUser);
    localStorage.removeItem('nextrend_customer_user');
    setAccountMenuOpen(false);
    setViewMode('store');
    addToast('Signed out of NexTrend Store', 'info');
  };

  // Add to Cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`Added to Cart: "${product.title}"`, 'success');
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    if (!customerUser?.isLoggedIn) {
      const userData = {
        name: 'Alexander Sterling',
        email: 'alexander.s@omnicorpgroup.com',
        isLoggedIn: true,
        primeMember: true,
        cartCount: 1
      };
      localStorage.setItem('nextrend_customer_user', JSON.stringify(userData));
      setCustomerUser(userData);
      addToast('Welcome back, Alexander Sterling! Successfully signed in.', 'success');
    }
    setCartOpen(false);
    setViewMode('checkout');
    addToast('Entering secure Checkout...', 'info');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutComplete(true);
    addToast('Processing payment authorization...', 'info');

    setTimeout(() => {
      const newOrder = {
        id: `NT-${Math.floor(100000 + Math.random() * 900000)}-PC`,
        date: new Date().toISOString().split('T')[0],
        total: cartTotal,
        status: 'Ordered',
        estDelivery: 'In 2 days by 8 PM',
        trackingProgress: 20,
        timeline: [
          { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'Ordered', detail: 'Order placed, payment authorization successful' }
        ],
        items: [...cart]
      };
      
      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem('nextrend_orders', JSON.stringify(updatedOrders));
      
      setCart([]);
      setCheckoutComplete(false);
      setViewMode('orders');
      addToast('Order placed successfully! Thank you for shopping with NexTrend.', 'success');
    }, 1500);
  };

  const handleAdvanceDelivery = (orderId) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        let nextStatus = o.status;
        let progress = o.trackingProgress;
        let detail = '';
        
        if (o.status === 'Ordered') {
          nextStatus = 'Packed';
          progress = 40;
          detail = 'Package processed and packed at NexTrend fulfillment center';
        } else if (o.status === 'Packed') {
          nextStatus = 'In Transit';
          progress = 70;
          detail = 'Package is on the way to the delivery address';
        } else if (o.status === 'In Transit') {
          nextStatus = 'Out for Delivery';
          progress = 90;
          detail = 'Courier has loaded the package and is out for delivery';
        } else if (o.status === 'Out for Delivery') {
          nextStatus = 'Delivered';
          progress = 100;
          detail = 'Package delivered at front door. Signature verified';
        }
        
        if (nextStatus !== o.status) {
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const updatedTimeline = [{ time: now, status: nextStatus, detail }, ...o.timeline];
          const updatedOrder = { ...o, status: nextStatus, trackingProgress: progress, timeline: updatedTimeline };
          
          if (activeOrderForTracking?.id === orderId) {
            setActiveOrderForTracking(updatedOrder);
          }
          addToast(`Shipment status advanced: ${nextStatus}!`, 'info');
          return updatedOrder;
        }
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('nextrend_orders', JSON.stringify(updated));
  };

  const handleCancelOrder = (orderId) => {
    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('nextrend_orders', JSON.stringify(updated));
    setCancelConfirmId(null);
    if (activeOrderForTracking?.id === orderId) {
      setActiveOrderForTracking(null);
      setViewMode('orders');
    }
    addToast('Order cancelled successfully. Refund will be processed in 3–5 business days.', 'info');
  };

  const handleReturnOrder = (orderId) => {
    const reason = returnState[orderId]?.reason || '';
    if (!reason) {
      addToast('Please select a return reason before submitting.', 'error');
      return;
    }
    const updated = orders.map(o =>
      o.id === orderId ? { ...o, status: 'Return Requested', returnReason: reason } : o
    );
    setOrders(updated);
    localStorage.setItem('nextrend_orders', JSON.stringify(updated));
    setReturnState(prev => ({ ...prev, [orderId]: { ...prev[orderId], submitted: true } }));
    addToast('Return request submitted! A pickup will be scheduled within 24 hours.', 'success');
  };

  // Filtered Products
  const filteredProducts = ecommerceData.products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesDept = selectedDept === 'All Departments' || product.category === selectedDept;
    const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDept && matchesSearch;
  });


  return (
    <div className="min-h-screen pb-24 bg-slate-950 text-slate-100 font-sans selection:bg-[#febd69] selection:text-slate-950">
      
      {/* 1. AMAZON DOCK (Sticky Store Header) */}
      <div className="sticky top-0 z-40 w-full flex flex-col shadow-md">
        {/* Main Nav Header */}
        <header className="bg-[#131921] text-white px-4 py-2 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 h-14">
            
            {/* Logo Section */}
            <button 
              onClick={() => { setViewMode('store'); setActiveCategory('All'); }}
              className="flex items-center gap-1.5 p-1 sm:p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left shrink-0"
            >
              <div className="flex items-end">
                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white leading-none">nex</span>
                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-[#febd69] leading-none">trend</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 hidden md:inline">.store</span>
            </button>

            {/* Delivery address (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left max-w-[150px] shrink-0 select-none">
              <MapPin className="w-5 h-5 text-slate-300 mt-2 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 leading-tight">Deliver to</span>
                <span className="font-bold text-xs leading-tight truncate">{shippingForm.city}, {shippingForm.zip}</span>
              </div>
            </div>

            {/* Search Bar (Desktop / Tablet) */}
            <div className="hidden sm:flex flex-1 items-center h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69] bg-white">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="h-full bg-slate-100 hover:bg-slate-200 border-r border-slate-300 text-slate-700 text-xs px-3 focus:outline-none cursor-pointer shrink-0 max-w-[140px]"
              >
                <option>All Departments</option>
                <option>Electronics & Audio</option>
                <option>Smart Wearables</option>
                <option>Fashion & Apparel</option>
                <option>Home & Kitchen</option>
                <option>Footwear</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NexTrend..."
                className="flex-1 h-full px-3 text-slate-900 text-sm focus:outline-none"
              />
              <button
                onClick={() => {}}
                className="h-full px-5 bg-[#febd69] hover:bg-[#f3a847] text-slate-950 flex items-center justify-center transition-colors shrink-0"
                title="Submit Search"
              >
                <Search className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* Right Header Navigation Widgets */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              
              {/* Language Selector */}
              <div className="hidden md:flex items-center gap-1 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all cursor-pointer font-bold text-xs select-none">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>EN</span>
              </div>

              {/* Account & Lists */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex flex-col items-start p-1.5 sm:p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left"
                >
                  <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight">
                    Hello, {customerUser?.isLoggedIn ? customerUser.name.split(' ')[0] : 'sign in'}
                  </span>
                  <div className="flex items-center gap-0.5 sm:gap-1 font-bold text-xs text-white leading-tight">
                    <span>Account & Lists</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {accountMenuOpen && (
                  <div className="absolute right-0 mt-1 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                    <div className="pb-4 border-b border-slate-800 text-center">
                      {customerUser?.isLoggedIn ? (
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                              {customerUser.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white text-xs">{customerUser.name}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{customerUser.email}</div>
                            </div>
                          </div>
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#febd69]/10 text-[#febd69] border border-[#febd69]/20 text-[10px] font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>Prime Member</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => { handleAutoCustomerLogin(); setAccountMenuOpen(false); }}
                            className="w-full py-2 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all"
                          >
                            Sign in
                          </button>
                          <p className="text-[11px] text-slate-400 mt-2">
                            New customer?{' '}
                            <button
                              onClick={() => { handleAutoCustomerLogin(); setAccountMenuOpen(false); }}
                              className="text-amber-400 hover:underline"
                            >
                              Start here.
                            </button>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
                      <div>
                        <h4 className="font-bold text-white mb-2">Your Lists</h4>
                        <ul className="space-y-2 text-slate-400">
                          <li className="hover:text-amber-400 cursor-pointer">Create a List</li>
                          <li className="hover:text-amber-400 cursor-pointer">Find a List</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Your Account</h4>
                        <ul className="space-y-2 text-slate-400">
                          <li className="hover:text-amber-400 cursor-pointer">Your Account</li>
                          <li 
                            onClick={() => {
                              setAccountMenuOpen(false);
                              if (!customerUser?.isLoggedIn) {
                                handleAutoCustomerLogin();
                                setViewMode('orders');
                              } else {
                                setViewMode('orders');
                              }
                            }}
                            className="hover:text-amber-400 cursor-pointer"
                          >
                            Your Orders
                          </li>
                          {customerUser?.isLoggedIn && (
                            <li className="pt-2 border-t border-slate-800">
                              <button onClick={handleLogout} className="text-rose-400 hover:text-rose-300 font-semibold w-full text-left">
                                Sign Out
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Returns & Orders Header Button */}
              <button
                onClick={() => {
                  if (!customerUser?.isLoggedIn) {
                    handleAutoCustomerLogin();
                    setViewMode('orders');
                  } else {
                    setViewMode('orders');
                  }
                }}
                className="flex flex-col items-start p-1.5 sm:p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left"
              >
                <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight">Returns</span>
                <span className="font-bold text-xs text-white leading-tight">& Orders</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1 p-1.5 sm:p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-white font-bold shrink-0 animate-in fade-in"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  <span className="absolute -top-1 -right-1 bg-[#febd69] text-slate-950 text-[10px] sm:text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                </div>
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>

          {/* Bottom row: Search Bar (MOBILE ONLY) */}
          <div className="flex sm:hidden w-full items-center h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69] bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NexTrend..."
              className="flex-1 h-full px-3 bg-white text-slate-900 text-xs focus:outline-none"
            />
            <button
              onClick={() => {}}
              className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] text-slate-950 flex items-center justify-center transition-colors shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </header>

        {/* 2. SUB-NAV MENU BAR */}
        <div className="bg-[#232f3e] px-4 py-1.5 flex items-center justify-between text-xs text-slate-200 border-t border-slate-700/60 overflow-x-auto scrollbar-none shadow-md">
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 font-bold hover:text-amber-400 py-1 px-2 rounded hover:ring-1 hover:ring-white transition-all"
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>

            <div className="flex items-center gap-3 text-slate-300 text-xs">
              <button onClick={() => { setViewMode('store'); setActiveCategory('All'); }} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'All' && viewMode === 'store' ? 'font-bold text-amber-400' : ''}`}>
                Today's Deals
              </button>
              <button onClick={() => { setViewMode('store'); setActiveCategory('Electronics & Audio'); }} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Electronics & Audio' && viewMode === 'store' ? 'font-bold text-amber-400' : ''}`}>
                Electronics
              </button>
              <button onClick={() => { setViewMode('store'); setActiveCategory('Fashion & Apparel'); }} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Fashion & Apparel' && viewMode === 'store' ? 'font-bold text-amber-400' : ''}`}>
                Fashion
              </button>
              <button onClick={() => { setViewMode('store'); setActiveCategory('Smart Wearables'); }} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Smart Wearables' && viewMode === 'store' ? 'font-bold text-amber-400' : ''}`}>
                Smart Wearables
              </button>
              <button onClick={() => { setViewMode('store'); setActiveCategory('Home & Kitchen'); }} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Home & Kitchen' && viewMode === 'store' ? 'font-bold text-amber-400' : ''}`}>
                Home & Living
              </button>
              <span className="hidden md:inline text-amber-400 font-semibold flex items-center gap-1 select-none">
                <Sparkles className="w-3 h-3" /> Prime Day Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => logoutFromBusiness('ecommerce')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-[#febd69]/40 text-slate-200 hover:text-[#febd69] text-xs font-bold transition-all duration-200 group active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main>
        
        {/* STOREFRONT MODE VIEW */}
        {viewMode === 'store' && (
          <div className="animate-in fade-in duration-300">
            {/* 3. HERO PROMOTIONAL BANNER */}
            <div className="relative max-w-[1500px] mx-auto overflow-hidden">
              <div className="relative h-[320px] sm:h-[420px]">
                {ecommerceData.heroBanners.map((banner, idx) => (
                  <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Editorial Pitch */}
                    <div className="absolute bottom-16 sm:bottom-24 left-4 sm:left-12 z-20 max-w-xl space-y-3 sm:space-y-4">
                      <span className="inline-block text-[10px] sm:text-xs font-bold text-amber-400 bg-slate-950/80 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {banner.category}
                      </span>
                      <h2 className="text-xl sm:text-4xl font-extrabold text-white leading-tight font-heading">
                        {banner.title}
                      </h2>
                      <p className="text-slate-300 text-[11px] sm:text-sm leading-relaxed hidden sm:block">
                        {banner.subtitle}
                      </p>
                      <button
                        onClick={() => setActiveCategory(banner.category)}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-slate-950 font-bold text-[11px] sm:text-xs transition-colors shadow-lg"
                      >
                        {banner.ctaText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. PRODUCT LISTING SECTION */}
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              
              {/* Quad Cards (Amazon style grids) */}
              {activeCategory === 'All' && !searchQuery && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 sm:-mt-24 relative z-20 mb-8 items-stretch select-none">
                  {ecommerceData.quadCards.map((card, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white mb-4 line-clamp-1">{card.title}</h3>
                        <div className="grid grid-cols-2 gap-3.5">
                          {card.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              onClick={() => {
                                const matchedCategory = item.label.includes('Audio') || item.label.includes('Keyboard') ? 'Electronics & Audio' : item.label.includes('Warc') || item.label.includes('Watches') || item.label.includes('Track') ? 'Smart Wearables' : item.label.includes('Outer') || item.label.includes('Bag') ? 'Fashion & Apparel' : 'Home & Kitchen';
                                setActiveCategory(matchedCategory);
                              }}
                              className="group/item cursor-pointer space-y-1.5 text-left"
                            >
                              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                                <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300" />
                              </div>
                              <span className="text-[10px] font-semibold text-slate-400 group-hover/item:text-amber-400 block truncate">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="text-amber-400 hover:text-amber-300 font-bold text-xs mt-5 hover:underline cursor-pointer block">
                        {card.linkText}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Directory List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                      {activeCategory === 'All' ? 'Deals & Trending Products' : `${activeCategory} Collection`}
                    </h3>
                    <p className="text-xs text-slate-400">Prime 1-day delivery and secure payment checkout</p>
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl font-semibold">
                    {filteredProducts.length} Items Found
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 rounded-3xl p-5 flex flex-col justify-between shadow-md transition-all group relative overflow-hidden"
                      >
                        {/* Top Badge & Save Indicator */}
                        <div className="absolute top-3.5 left-3.5 z-20 flex flex-col gap-1.5 select-none">
                          {prod.badge && (
                            <span className="text-[9px] font-bold text-slate-950 bg-[#febd69] px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md">
                              {prod.badge}
                            </span>
                          )}
                          {prod.dealBadge && (
                            <span className="text-[8px] font-bold text-white bg-rose-600 px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md w-fit">
                              {prod.dealBadge}
                            </span>
                          )}
                        </div>

                        <div>
                          {/* Image Container */}
                          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/60 mb-4">
                            <img
                              src={prod.image}
                              alt={prod.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                          </div>

                          {/* Info Block */}
                          <div className="space-y-1.5 text-left">
                            <span className="text-[10px] text-slate-400 font-semibold block">{prod.category}</span>
                            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-relaxed min-h-[40px] group-hover:text-amber-400 transition-colors">
                              {prod.title}
                            </h4>
                            
                            {/* Star Rating */}
                            <div className="flex items-center gap-1 text-[11px] text-amber-400 select-none">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="font-bold">{prod.rating}</span>
                              <span className="text-slate-500 font-semibold">({prod.reviews})</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 text-left space-y-4">
                          {/* Price details */}
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-base sm:text-lg font-black text-white">${prod.price.toFixed(2)}</span>
                            {prod.originalPrice && (
                              <span className="font-mono text-xs text-slate-500 line-through">${prod.originalPrice.toFixed(2)}</span>
                            )}
                          </div>

                          {/* Prime Badge & Buy actions */}
                          <div className="space-y-2">
                            {prod.prime && (
                              <div className="flex items-center gap-1.5 select-none">
                                <span className="text-[9px] font-black italic bg-blue-600 text-white px-1.5 py-0.2 rounded-md shadow-inner">PRIME</span>
                                <span className="text-[10px] text-slate-400 font-medium">FREE One-Day Delivery</span>
                              </div>
                            )}

                            <button
                              onClick={() => addToCart(prod)}
                              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#F7CA00] to-[#E8BD00] hover:from-[#E8BD00] hover:to-[#D4A300] text-slate-950 font-bold text-xs shadow-md border border-[#D8B000] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-24 border border-dashed border-slate-800 rounded-3xl text-center text-slate-500 space-y-2">
                    <Search className="w-12 h-12 text-slate-700 mx-auto animate-bounce" />
                    <h4 className="font-bold text-white">No matches found for "{searchQuery}"</h4>
                    <p className="text-xs">Try selecting a different department filter or checking spelling.</p>
                  </div>
                )}
              </div>
            </div>

            {/* 8. SIDEBAR SIDE MENU */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
                <div onClick={() => setSidebarOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <div className="relative w-80 bg-slate-900 border-r border-slate-700 flex flex-col justify-between p-5 animate-in slide-in-from-left duration-250">
                  <div>
                    {/* User Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white">
                            Hello, {customerUser?.isLoggedIn ? customerUser.name : 'Sign In'}
                          </div>
                          <div className="text-[10px] text-slate-400">Prime Executive Account</div>
                        </div>
                      </div>
                      <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Departments Navigation */}
                    <div className="py-4 space-y-4 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-2">
                          Digital Content & Devices
                        </h4>
                        <ul className="space-y-2 text-slate-200">
                          <li className="hover:text-amber-400 cursor-pointer flex justify-between">NexTrend Studio Audio <ChevronRight className="w-3.5 h-3.5 text-slate-500" /></li>
                          <li className="hover:text-amber-400 cursor-pointer flex justify-between">Vanguard Smart Wearables <ChevronRight className="w-3.5 h-3.5 text-slate-500" /></li>
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <h4 className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-2">
                          Shop By Department
                        </h4>
                        <ul className="space-y-2 text-slate-200">
                          {['Electronics & Audio', 'Smart Wearables', 'Fashion & Apparel', 'Home & Kitchen', 'Footwear'].map((dept, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                setViewMode('store');
                                setActiveCategory(dept);
                                setSidebarOpen(false);
                              }}
                              className="hover:text-amber-400 cursor-pointer flex justify-between"
                            >
                              <span>{dept}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-700 text-xs">
                    <button
                      onClick={() => { handleAutoCustomerLogin(); setSidebarOpen(false); }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs text-center border border-slate-700"
                    >
                      {customerUser?.isLoggedIn ? 'Switch Amazon / NexTrend Account' : 'Sign In to NexTrend'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT PAYMENT SCREEN */}
        {viewMode === 'checkout' && (
          <div className="max-w-[1150px] mx-auto px-4 py-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setViewMode('store')}
                className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold transition-colors text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-xs font-semibold">Secure Checkout (SSL Encrypted)</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Review & Complete Your Order</h2>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column Fields */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Shipping Details */}
                <div className="bg-[#1b2530] border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 mb-4 border-b border-slate-800 pb-3">
                    <div className="p-2 rounded-lg bg-[#febd69]/10 text-[#febd69]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-sm">1. Delivery Address</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-400 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.zip}
                          onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-[#1b2530] border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 mb-4 border-b border-slate-800 pb-3">
                    <div className="p-2 rounded-lg bg-[#febd69]/10 text-[#febd69]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-sm">2. Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Payment Option</label>
                        <select
                          value={shippingForm.paymentMethod}
                          onChange={(e) => setShippingForm({ ...shippingForm, paymentMethod: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69] cursor-pointer"
                        >
                          <option value="card">Credit or Debit Card</option>
                          <option value="wallet">NexTrend Prime 1-Click Wallet</option>
                          <option value="cod">Cash on Delivery (COD)</option>
                        </select>
                      </div>

                      {shippingForm.paymentMethod === 'card' && (
                        <>
                          <div>
                            <label className="block text-slate-400 mb-1">Card Number</label>
                            <input
                              type="text"
                              required
                              value={shippingForm.cardNumber}
                              onChange={(e) => setShippingForm({ ...shippingForm, cardNumber: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-slate-400 mb-1">Expiry Date</label>
                              <input
                                type="text"
                                required
                                placeholder="MM/YY"
                                value={shippingForm.cardExpiry}
                                onChange={(e) => setShippingForm({ ...shippingForm, cardExpiry: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 mb-1">CVV</label>
                              <input
                                type="text"
                                required
                                placeholder="123"
                                value={shippingForm.cardCvv}
                                onChange={(e) => setShippingForm({ ...shippingForm, cardCvv: e.target.value })}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#febd69]"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {shippingForm.paymentMethod === 'card' ? (
                      <div className="h-44 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 border border-slate-700 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">NexTrend Prime Card</span>
                            <div className="w-10 h-7 bg-amber-500/20 border border-amber-500/40 rounded-md mt-2 flex items-center justify-center font-bold text-slate-300 text-[10px] tracking-wider">
                              CHIP
                            </div>
                          </div>
                          <span className="font-bold text-white text-base tracking-widest">VISA</span>
                        </div>

                        <div>
                          <div className="font-mono text-base tracking-widest text-white mt-4">
                            {shippingForm.cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div className="flex justify-between items-end mt-4">
                            <div>
                              <span className="text-[8px] text-slate-400 block uppercase">Cardholder</span>
                              <span className="font-bold text-white text-xs block truncate max-w-[140px]">
                                {shippingForm.fullName || 'Alexander Sterling'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-[8px] text-slate-400 block uppercase">Expires</span>
                              <span className="font-bold text-white text-xs block font-mono">
                                {shippingForm.cardExpiry || 'MM/YY'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-44 rounded-2xl bg-slate-950 border border-slate-800 p-5 flex flex-col justify-center items-center text-center gap-3 select-none">
                        <span className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                          <Check className="w-6 h-6" />
                        </span>
                        <span className="text-xs font-bold text-white">
                          {shippingForm.paymentMethod === 'wallet' ? 'Prime 1-Click Wallet Selected' : 'Cash on Delivery Selected'}
                        </span>
                        <span className="text-[10px] text-slate-400">No card inputs required</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Items */}
                <div className="bg-[#1b2530] border border-slate-800 rounded-2xl p-6">
                  <h3 className="font-bold text-white text-sm mb-4 border-b border-slate-800 pb-3">3. Review Items & Shipping</h3>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-900/60 last:border-none last:pb-0">
                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0 select-none" />
                        <div>
                          <h4 className="font-bold text-white text-xs line-clamp-2 leading-relaxed">{item.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="font-mono text-amber-400 font-bold">${item.price.toFixed(2)}</span>
                            <span className="text-slate-400">Qty: {item.qty}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Summary box */}
              <div className="space-y-6">
                <div className="bg-[#1b2530] border border-slate-800 rounded-2xl p-6 sticky top-24 select-none">
                  <h3 className="font-bold text-white text-sm mb-4 pb-2 border-b border-slate-800">Order Summary</h3>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Items ({cartItemCount}):</span>
                      <span className="font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping & Handling:</span>
                      <span className="text-emerald-400">FREE (Prime)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Import Fee Deposit:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-3 text-sm font-bold text-white">
                      <span>Order Total:</span>
                      <span className="font-mono text-amber-400">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 mt-6">
                    <button
                      type="submit"
                      disabled={checkoutComplete}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {checkoutComplete ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Your Prime Order</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-3 leading-relaxed">
                      By placing your order, you agree to NexTrend's conditions of use and privacy notice.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* YOUR ORDERS HISTORY VIEW */}
        {viewMode === 'orders' && (
          <div className="max-w-[1150px] mx-auto px-4 py-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setViewMode('store')}
                className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold transition-colors text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Shopping</span>
              </button>
              <h2 className="text-2xl font-bold text-white font-heading">Your Orders</h2>
            </div>

            <div className="space-y-6">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-[#1b2530] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                    {/* Order header information */}
                    <div className="bg-[#232f3e]/80 border-b border-slate-800 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 select-none">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Order Placed</span>
                        <p className="font-semibold text-white mt-1">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total paid</span>
                        <p className="font-mono font-bold text-white mt-1">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ship To</span>
                        <p className="font-semibold text-teal-400 mt-1">{shippingForm.fullName}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Order ID</span>
                        <p className="font-mono text-[11px] text-slate-300 mt-1">{order.id}</p>
                      </div>
                    </div>

                    {/* Order Body Details */}
                    <div className="p-5 flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase border ${
                            order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">• Estimated delivery: {order.estDelivery}</span>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0 select-none" />
                              <div>
                                <h4 className="font-bold text-white text-xs line-clamp-2 leading-relaxed">{item.title}</h4>
                                <div className="flex items-center gap-4 mt-2 text-xs">
                                  <span className="font-mono text-slate-300">${item.price.toFixed(2)}</span>
                                  <span className="text-slate-500">Qty: {item.qty}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Side Tracking action */}
                      <div className="w-full md:w-56 flex flex-col gap-2.5 shrink-0 justify-center">
                        <button
                          onClick={() => {
                            setActiveOrderForTracking(order);
                            setViewMode('track');
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#febd69] hover:bg-[#f3a847] text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Package</span>
                        </button>

                        {order.status !== 'Delivered' && order.status !== 'Return Requested' && (
                          <button
                            onClick={() => handleAdvanceDelivery(order.id)}
                            className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-750 text-xs font-semibold transition-all active:scale-[0.98]"
                          >
                            Simulate Next Stage
                          </button>
                        )}

                        {/* Cancel Order Button — only for non-delivered, non-return orders */}
                        {order.status !== 'Delivered' && order.status !== 'Return Requested' && (
                          cancelConfirmId === order.id ? (
                            <div className="bg-rose-950/60 border border-rose-500/30 rounded-xl p-3 space-y-2">
                              <p className="text-[11px] text-rose-300 font-semibold text-center">Cancel this order?</p>
                              <p className="text-[10px] text-rose-400/70 text-center">This action cannot be undone.</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold transition-all active:scale-95"
                                >
                                  Yes, Cancel
                                </button>
                                <button
                                  onClick={() => setCancelConfirmId(null)}
                                  className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-700 transition-all active:scale-95"
                                >
                                  Keep Order
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setCancelConfirmId(order.id)}
                              className="w-full py-2 px-4 rounded-xl bg-transparent hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 border border-rose-500/30 hover:border-rose-500/50 text-xs font-semibold transition-all active:scale-[0.98]"
                            >
                              Cancel Order
                            </button>
                          )
                        )}

                        {/* Return Items — only for Delivered orders */}
                        {order.status === 'Delivered' && (
                          returnState[order.id]?.submitted ? (
                            <div className="bg-teal-950/60 border border-teal-500/30 rounded-xl p-3 text-center space-y-1">
                              <p className="text-[11px] text-teal-300 font-bold">Return Requested ✓</p>
                              <p className="text-[10px] text-teal-400/70">Pickup scheduled within 24 hrs. Refund in 5–7 days.</p>
                            </div>
                          ) : returnState[order.id]?.open ? (
                            <div className="bg-slate-950/80 border border-slate-700 rounded-xl p-3 space-y-3">
                              <p className="text-[11px] text-white font-bold">Return Items</p>
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1">Reason for Return</label>
                                <select
                                  value={returnState[order.id]?.reason || ''}
                                  onChange={(e) => setReturnState(prev => ({ ...prev, [order.id]: { ...prev[order.id], reason: e.target.value } }))}
                                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-[10px] focus:outline-none focus:border-[#febd69] cursor-pointer"
                                >
                                  <option value="">Select a reason...</option>
                                  <option value="Damaged on arrival">Damaged on arrival</option>
                                  <option value="Wrong item delivered">Wrong item delivered</option>
                                  <option value="Item not as described">Item not as described</option>
                                  <option value="No longer needed">No longer needed</option>
                                  <option value="Ordered by mistake">Ordered by mistake</option>
                                  <option value="Better price available">Better price available</option>
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleReturnOrder(order.id)}
                                  className="flex-1 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold transition-all active:scale-95"
                                >
                                  Submit Return
                                </button>
                                <button
                                  onClick={() => setReturnState(prev => ({ ...prev, [order.id]: { open: false, reason: '' } }))}
                                  className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-700 transition-all active:scale-95"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setReturnState(prev => ({ ...prev, [order.id]: { open: true, reason: '' } }))}
                              className="w-full py-2 px-4 rounded-xl bg-transparent hover:bg-teal-500/10 text-teal-400 hover:text-teal-300 border border-teal-500/30 hover:border-teal-500/50 text-xs font-semibold transition-all active:scale-[0.98]"
                            >
                              Return Items
                            </button>
                          )
                        )}

                        {/* Return Requested badge */}
                        {order.status === 'Return Requested' && (
                          <div className="bg-teal-950/60 border border-teal-500/30 rounded-xl p-3 text-center space-y-1">
                            <p className="text-[11px] text-teal-300 font-bold">Return In Progress</p>
                            <p className="text-[10px] text-teal-400/70">Reason: {order.returnReason}</p>
                            <p className="text-[10px] text-teal-400/50">Pickup scheduled. Refund in 5–7 days.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 bg-[#1b2530] border border-slate-800 rounded-3xl text-center text-slate-500 space-y-4">
                  <Package className="w-16 h-16 text-slate-755 mx-auto" />
                  <h3 className="text-lg font-bold text-white">No Orders Placed Yet</h3>
                  <p className="text-xs">Go back to the catalog and select products to check out.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PACKAGE SHIPMENT TRACKING VIEW */}
        {viewMode === 'track' && activeOrderForTracking && (
          <div className="max-w-[850px] mx-auto px-4 py-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setViewMode('orders')}
                className="flex items-center gap-1 text-slate-400 hover:text-white font-semibold transition-colors text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Orders</span>
              </button>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-xs font-semibold">Tracking ID: {activeOrderForTracking.id}</span>
            </div>

            <div className="bg-[#1b2530] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
              {/* Header Information */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 select-none">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Delivery</span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2 font-heading">
                    <Clock className="w-5 h-5 text-[#febd69] animate-pulse" />
                    <span>{activeOrderForTracking.estDelivery}</span>
                  </h3>
                </div>
                <div className="text-sm">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold text-right">Courier Network</span>
                  <span className="font-bold text-teal-400 mt-1 block">NexTrend Air Prime Logistics</span>
                </div>
              </div>

              {/* Progress Bar Visual */}
              <div className="space-y-4 select-none">
                <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-slate-400">
                  <span className={activeOrderForTracking.trackingProgress >= 20 ? 'text-teal-400 font-bold' : ''}>Ordered</span>
                  <span className={activeOrderForTracking.trackingProgress >= 40 ? 'text-teal-400 font-bold' : ''}>Packed</span>
                  <span className={activeOrderForTracking.trackingProgress >= 70 ? 'text-teal-400 font-bold' : ''}>Shipped</span>
                  <span className={activeOrderForTracking.trackingProgress >= 90 ? 'text-teal-400 font-bold' : ''}>Out for Delivery</span>
                  <span className={activeOrderForTracking.trackingProgress >= 100 ? 'text-emerald-400 font-bold' : ''}>Delivered</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                      activeOrderForTracking.status === 'Delivered' 
                        ? 'from-emerald-500 to-teal-400' 
                        : 'from-blue-600 via-teal-500 to-[#febd69]'
                    }`}
                    style={{ width: `${activeOrderForTracking.trackingProgress}%` }}
                  />
                </div>
              </div>

              {/* Timeline Updates */}
              <div className="space-y-5">
                <h4 className="font-bold text-white text-sm pb-2 border-b border-slate-800">Shipment Activity Log</h4>
                
                <div className="relative border-l border-slate-800 ml-3 pl-6 space-y-6">
                  {activeOrderForTracking.timeline.map((log, idx) => (
                    <div key={idx} className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                        idx === 0 
                          ? 'bg-[#1b2530] border-teal-500 text-teal-400 animate-pulse' 
                          : 'bg-[#232f3e] border-slate-800 text-slate-500'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      </span>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{log.status}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{log.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation triggers */}
              {activeOrderForTracking.status !== 'Delivered' && (
                <div className="pt-6 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => handleAdvanceDelivery(activeOrderForTracking.id)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#febd69] hover:text-white border border-slate-750 text-xs font-bold transition-all active:scale-[0.98]"
                  >
                    Simulate Next Shipment Stage
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* 5. SHOPPING CART DRAWER (Slide-over) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-250">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  <h3 className="font-bold text-white text-base font-heading">Shopping Cart ({cartItemCount})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length > 0 ? (
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 flex gap-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0 select-none" />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-white text-xs line-clamp-2 leading-relaxed">{item.title}</h4>
                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="font-mono text-xs font-bold text-amber-400">${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Adjust quantities */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1">
                            <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-white font-bold text-xs" title="Decrease Qty">-</button>
                            <span className="text-xs font-bold text-white min-w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-white font-bold text-xs" title="Increase Qty">+</button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-400 text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-slate-500 space-y-3">
                  <ShoppingCart className="w-12 h-12 text-slate-800 mx-auto" />
                  <p className="text-xs font-medium">Your NexTrend cart is empty.</p>
                </div>
              )}
            </div>

            {/* Cart footer totals */}
            <div className="pt-4 border-t border-slate-800 space-y-4 select-none">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Subtotal:</span>
                <span className="font-mono font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. AMAZON MULTI-COLUMN FOOTER */}
      <footer className="mt-16 bg-[#232f3e] text-slate-300 text-xs">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-3.5 bg-[#37475a] hover:bg-[#485769] text-center font-semibold text-xs text-white transition-colors"
        >
          Back to top
        </button>

        <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:underline cursor-pointer">About NexTrend Group</li>
              <li className="hover:underline cursor-pointer">Careers & Leadership</li>
              <li className="hover:underline cursor-pointer">OmniCorp Multi-Enterprise</li>
              <li className="hover:underline cursor-pointer">Sustainability & ESG</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:underline cursor-pointer">Sell products on NexTrend</li>
              <li className="hover:underline cursor-pointer">Sell apps on NexTrend Appstore</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate Partner</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">NexTrend Payment Products</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:underline cursor-pointer">NexTrend Business Card</li>
              <li className="hover:underline cursor-pointer">Shop with Reward Points</li>
              <li className="hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:underline cursor-pointer">NexTrend Currency Converter</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="hover:underline cursor-pointer">NexTrend and COVID-19</li>
              <li className="hover:underline cursor-pointer">Your Account & Security</li>
              <li className="hover:underline cursor-pointer">Your Orders & Returns</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Help & 24/7 Customer Care</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/60 bg-[#131921] py-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-heading font-black text-xl tracking-tight text-white font-sans">nex</span>
            <span className="font-heading font-black text-xl tracking-tight text-[#febd69] font-sans">trend</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] text-slate-400">
            <a href="#conditions" className="hover:underline">Conditions of Use</a>
            <a href="#privacy" className="hover:underline">Privacy Notice</a>
            <a href="#interest" className="hover:underline">Interest-Based Ads</a>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026, NexTrend.store, Inc. or its OmniCorp affiliates
          </p>
        </div>
      </footer>

    </div>
  );
};
