import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ecommerceData } from '../../data/businessData';
import { AmazonSignIn } from './AmazonSignIn';
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
  ArrowRight
} from 'lucide-react';

export const EcommerceLanding = () => {
  const { navigateTo, addToast } = useAuth();

  // Authentication State
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('nextrend_customer_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alexander Sterling',
      email: 'alexander.s@omnicorpgroup.com',
      isLoggedIn: true,
      primeMember: true,
      cartCount: 2
    };
  });

  const [showSignInView, setShowSignInView] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const accountRef = useRef(null);

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

  const handleLoginSuccess = (user) => {
    setCustomerUser(user);
    setShowSignInView(false);
  };

  const handleLogout = () => {
    const guestUser = { name: null, email: null, isLoggedIn: false, primeMember: false };
    setCustomerUser(guestUser);
    localStorage.removeItem('nextrend_customer_user');
    setAccountMenuOpen(false);
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
      setShowSignInView(true);
      addToast('Please sign in to proceed with Prime 1-Click checkout', 'info');
      return;
    }
    setCheckoutComplete(true);
    addToast('Order placed successfully! Tracking link sent to your email.', 'success');
    setTimeout(() => {
      setCart([]);
      setCheckoutComplete(false);
      setCartOpen(false);
    }, 2500);
  };

  // Filtered Products
  const filteredProducts = ecommerceData.products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesDept = selectedDept === 'All Departments' || product.category === selectedDept;
    const matchesSearch = !searchQuery || product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDept && matchesSearch;
  });

  // If user requested full Amazon Sign-In page
  if (showSignInView) {
    return (
      <AmazonSignIn
        onLoginSuccess={handleLoginSuccess}
        onBackToStore={() => setShowSignInView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1111] text-slate-100 font-sans pb-16">
      {/* 1. AMAZON MAIN HEADER BAR */}
      <header className="relative z-20 bg-[#131921] border-b border-slate-800 text-white select-none">
        <div className="max-w-[1500px] mx-auto px-4 py-2 flex items-center justify-between gap-3 text-xs">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="flex items-center gap-1.5 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left group"
            >
              <div className="flex flex-col">
                <div className="flex items-center font-heading font-black text-xl tracking-tight text-white leading-none">
                  <span>nex</span><span className="text-[#febd69]">trend</span>
                  <span className="text-[10px] text-slate-400 font-normal ml-0.5">.store</span>
                </div>
                {/* Curved smile arrow under logo */}
                <div className="w-16 h-1.5 bg-gradient-to-r from-transparent via-[#febd69] to-transparent rounded-full mt-0.5" />
              </div>
            </button>
          </div>

          {/* Deliver To Location */}
          <div className="hidden lg:flex items-center gap-1.5 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all cursor-pointer">
            <MapPin className="w-4 h-4 text-slate-300 mt-1 shrink-0" />
            <div className="leading-tight">
              <div className="text-[11px] text-slate-400">Deliver to {customerUser?.isLoggedIn ? customerUser.name.split(' ')[0] : 'Guest'}</div>
              <div className="font-bold text-slate-100 text-xs">New York 10001</div>
            </div>
          </div>

          {/* Amazon Search Bar */}
          <div className="flex-1 max-w-3xl flex items-center h-10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69]">
            {/* Category Dropdown */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="h-full bg-slate-200 hover:bg-slate-300 text-slate-900 text-xs px-2.5 font-medium border-r border-slate-300 focus:outline-none cursor-pointer hidden sm:block max-w-[130px] truncate"
            >
              {ecommerceData.categories.map((dept, i) => (
                <option key={i} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NexTrend Prime products, electronics, fashion..."
              className="flex-1 h-full px-3 bg-white text-slate-900 text-xs focus:outline-none"
            />

            {/* Orange Search Button */}
            <button
              onClick={() => {}}
              className="h-full px-5 bg-[#febd69] hover:bg-[#f3a847] text-slate-950 flex items-center justify-center transition-colors shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4 text-slate-900" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center gap-1 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all cursor-pointer">
            <span className="text-sm">🇺🇸</span>
            <span className="font-bold text-xs">EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* Account & Lists (Amazon Hover/Click Dropdown) */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex flex-col items-start p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left"
            >
              <span className="text-[11px] text-slate-300 leading-tight">
                Hello, {customerUser?.isLoggedIn ? customerUser.name.split(' ')[0] : 'sign in'}
              </span>
              <div className="flex items-center gap-1 font-bold text-xs text-white leading-tight">
                <span>Account & Lists</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </button>

            {/* Amazon Account Dropdown Menu */}
            {accountMenuOpen && (
              <div className="absolute right-0 mt-1 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                {/* Sign In CTA Banner */}
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
                        onClick={() => { setShowSignInView(true); setAccountMenuOpen(false); }}
                        className="w-full py-2 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all"
                      >
                        Sign in
                      </button>
                      <p className="text-[11px] text-slate-400 mt-2">
                        New customer?{' '}
                        <button
                          onClick={() => { setShowSignInView(true); setAccountMenuOpen(false); }}
                          className="text-amber-400 hover:underline"
                        >
                          Start here.
                        </button>
                      </p>
                    </div>
                  )}
                </div>

                {/* Dropdown 2 Columns: Lists & Account */}
                <div className="grid grid-cols-2 gap-4 py-3 text-xs border-b border-slate-800">
                  <div>
                    <h4 className="font-bold text-white mb-2 text-xs">Your Lists</h4>
                    <ul className="space-y-1.5 text-slate-400 text-[11px]">
                      <li className="hover:text-amber-400 cursor-pointer">Create a Wish List</li>
                      <li className="hover:text-amber-400 cursor-pointer">Wish from Any Website</li>
                      <li className="hover:text-amber-400 cursor-pointer">Baby & Wedding Registry</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-2 text-xs">Your Account</h4>
                    <ul className="space-y-1.5 text-slate-400 text-[11px]">
                      <li className="hover:text-amber-400 cursor-pointer" onClick={() => addToast('Navigating to Your Orders', 'info')}>Your Orders</li>
                      <li className="hover:text-amber-400 cursor-pointer">Your Recommendations</li>
                      <li className="hover:text-amber-400 cursor-pointer">Prime Membership</li>
                      <li className="hover:text-amber-400 cursor-pointer">Keep Shopping For</li>
                    </ul>
                  </div>
                </div>

                {/* Sign Out / Switch Session */}
                {customerUser?.isLoggedIn && (
                  <div className="pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-xs text-rose-400 hover:bg-rose-500/10 p-2 rounded-xl transition-colors font-medium"
                    >
                      Sign Out of NexTrend
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            onClick={() => addToast('Viewing your recent Amazon & NexTrend orders', 'info')}
            className="hidden sm:flex flex-col items-start p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-left"
          >
            <span className="text-[11px] text-slate-300 leading-tight">Returns</span>
            <span className="font-bold text-xs text-white leading-tight">& Orders</span>
          </button>

          {/* Amazon Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1.5 p-2 rounded-lg hover:ring-1 hover:ring-white transition-all text-white font-bold"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              <span className="absolute -top-1 right-1 bg-[#febd69] text-slate-950 text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </div>
            <span className="text-xs font-bold hidden sm:inline">Cart</span>
          </button>
        </div>

        {/* 2. SUB-NAV MENU BAR */}
        <div className="bg-[#232f3e] px-4 py-1.5 flex items-center justify-between text-xs text-slate-200 border-t border-slate-700/60 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 font-bold hover:text-amber-400 py-1 px-2 rounded hover:ring-1 hover:ring-white transition-all"
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>

            <div className="flex items-center gap-3 text-slate-300 text-xs">
              <button onClick={() => setActiveCategory('All')} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'All' ? 'font-bold text-amber-400' : ''}`}>
                Today's Deals
              </button>
              <button onClick={() => setActiveCategory('Electronics & Audio')} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Electronics & Audio' ? 'font-bold text-amber-400' : ''}`}>
                Electronics
              </button>
              <button onClick={() => setActiveCategory('Fashion & Apparel')} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Fashion & Apparel' ? 'font-bold text-amber-400' : ''}`}>
                Fashion
              </button>
              <button onClick={() => setActiveCategory('Smart Wearables')} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Smart Wearables' ? 'font-bold text-amber-400' : ''}`}>
                Smart Wearables
              </button>
              <button onClick={() => setActiveCategory('Home & Kitchen')} className={`hover:text-white py-1 px-1.5 rounded ${activeCategory === 'Home & Kitchen' ? 'font-bold text-amber-400' : ''}`}>
                Home & Living
              </button>
              <span className="hidden md:inline text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Prime Day Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigateTo('hub')}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 py-1 px-2 rounded hover:ring-1 hover:ring-white transition-all font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Executive Hub</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO PROMOTIONAL BANNER (AMAZON CAROUSEL) */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1111] via-[#0f1111]/40 to-transparent" />
              
              <div className="absolute top-12 left-6 sm:left-12 max-w-xl space-y-3 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 text-amber-400 border border-amber-400/40 text-xs font-bold backdrop-blur-md">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Prime Event</span>
                </span>

                <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white leading-tight drop-shadow-md">
                  {banner.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed drop-shadow">
                  {banner.subtitle}
                </p>

                <button
                  onClick={() => {
                    setActiveCategory(banner.category);
                    document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-lg border border-[#FCD200] transition-all"
                >
                  {banner.ctaText}
                </button>
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={() => setCurrentBanner(prev => (prev - 1 + ecommerceData.heroBanners.length) % ecommerceData.heroBanners.length)}
            className="absolute left-2 top-1/3 -translate-y-1/2 z-20 w-10 h-16 bg-black/40 hover:bg-black/70 text-white rounded-r flex items-center justify-center border border-slate-700/50 backdrop-blur-sm"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentBanner(prev => (prev + 1) % ecommerceData.heroBanners.length)}
            className="absolute right-2 top-1/3 -translate-y-1/2 z-20 w-10 h-16 bg-black/40 hover:bg-black/70 text-white rounded-l flex items-center justify-center border border-slate-700/50 backdrop-blur-sm"
          >
            ›
          </button>
        </div>
      </div>

      {/* 4. AMAZON 4-GRID QUAD CARDS (Overlapping Hero) */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-24 sm:-mt-36 relative z-20 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ecommerceData.quadCards.map((quad, idx) => (
            <div
              key={idx}
              className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-heading font-bold text-white mb-3 leading-snug">
                  {quad.title}
                </h3>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {quad.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      onClick={() => {
                        setSearchQuery(item.label);
                        document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="cursor-pointer group"
                    >
                      <div className="h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-1">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[11px] text-slate-300 font-medium group-hover:text-amber-400 transition-colors">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 text-left flex items-center gap-1 pt-2 border-t border-slate-800"
              >
                <span>{quad.linkText}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. TODAY'S DEALS LIGHTNING STRIP */}
      <div className="max-w-[1500px] mx-auto px-4 mb-10">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-lg font-heading font-bold text-white">Today's Deals</span>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" /> Ends in 04h : 22m : 18s
              </span>
            </div>
            <span className="text-xs text-slate-400">Prime early access unlocked</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {ecommerceData.products.map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item)}
                className="min-w-[200px] sm:min-w-[220px] bg-slate-950 p-3.5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="h-32 rounded-xl overflow-hidden mb-2 bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white mb-1.5">
                    {item.dealBadge}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-white text-base">${item.price}</span>
                    <span className="text-xs text-slate-500 line-through">${item.originalPrice}</span>
                  </div>
                  <p className="text-xs text-slate-300 truncate font-medium mt-1">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. MAIN PRODUCT CATALOG GRID (AMAZON STYLE) */}
      <div id="products-grid" className="max-w-[1500px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-heading font-extrabold text-white">Results & Top Recommendations</h2>
            <p className="text-xs text-slate-400">
              Price and other details may vary based on product size and color.
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Electronics & Audio', 'Smart Wearables', 'Fashion & Apparel', 'Home & Kitchen', 'Footwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#febd69] text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden p-5 flex flex-col justify-between shadow-lg transition-all group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {prod.badge}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">In Stock</span>
                </div>

                {/* Image */}
                <div className="h-52 rounded-2xl overflow-hidden bg-slate-950 mb-4 relative">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug hover:text-amber-400 cursor-pointer transition-colors">
                  {prod.title}
                </h3>

                {/* Star Ratings */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-200">{prod.rating}</span>
                  <span className="text-xs text-slate-500">({prod.reviews.toLocaleString()})</span>
                </div>

                {/* Prime Badge */}
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-blue-400">
                  <span className="text-[#00A8E1] font-extrabold italic">✓prime</span>
                  <span className="text-slate-400 text-[11px] font-normal">FREE One-Day Delivery</span>
                </div>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xs text-slate-300 font-bold self-start mt-0.5">$</span>
                  <span className="text-2xl font-bold font-heading text-white">{Math.floor(prod.price)}</span>
                  <span className="text-xs text-slate-300 font-bold self-start mt-0.5">
                    {(prod.price % 1).toFixed(2).substring(1)}
                  </span>
                  <span className="text-xs text-slate-500 line-through ml-2">${prod.originalPrice}</span>
                </div>
              </div>

              {/* Amazon Yellow Add to Cart Button */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => addToCart(prod)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs shadow-md border border-[#FCD200] transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. SHOPPING CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md h-full bg-[#131921] border-l border-slate-700 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">Shopping Cart ({cartItemCount} items)</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Bar */}
              <div className="mt-4 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Your order qualifies for <strong>FREE Prime Express Delivery!</strong></span>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">Your NexTrend Cart is empty.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-start gap-3">
                        <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white line-clamp-2">{item.title}</h4>
                          <div className="text-xs font-bold text-amber-400 mt-1">${item.price}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                        <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                          <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-white px-1">-</button>
                          <span className="font-bold text-white">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-white px-1">+</button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-rose-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal ({cartItemCount} items):</span>
                  <span className="font-bold font-mono text-white text-base">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutComplete}
                  className="w-full py-3 rounded-xl bg-gradient-to-b from-[#FFD814] to-[#F7CA00] hover:from-[#F7CA00] hover:to-[#E8BD00] text-slate-950 font-bold text-xs border border-[#FCD200] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{checkoutComplete ? 'Placing Prime Order...' : `Proceed to Checkout ($${cartTotal.toFixed(2)})`}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. AMAZON SIDEBAR DRAWER (☰ ALL) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-80 h-full bg-[#192231] border-r border-slate-700 flex flex-col justify-between text-white p-5 overflow-y-auto">
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
                onClick={() => { setShowSignInView(true); setSidebarOpen(false); }}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs text-center border border-slate-700"
              >
                {customerUser?.isLoggedIn ? 'Switch Amazon / NexTrend Account' : 'Sign In to NexTrend'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. AMAZON MULTI-COLUMN FOOTER */}
      <footer className="mt-16 bg-[#232f3e] text-slate-300 text-xs">
        {/* Back to top */}
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

        {/* Footer Bottom Logo & Copyright */}
        <div className="border-t border-slate-700/60 bg-[#131921] py-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="font-heading font-black text-xl tracking-tight text-white">nex</span>
            <span className="font-heading font-black text-xl tracking-tight text-[#febd69]">trend</span>
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
