// Complete enterprise datasets for the 3 business divisions: Hospital, E-Commerce, and EV Automotive

export const businesses = [
  {
    id: 'hospital',
    name: 'AuraCare Multi-Specialty Hospital',
    tagline: 'Advanced Clinical Excellence & Compassionate Healthcare',
    category: 'Healthcare & Diagnostics',
    themeColor: 'teal',
    accentColor: 'from-teal-500 to-cyan-500',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    iconName: 'Activity',
    heroImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
    description: 'A 450-bed tertiary care healthcare network equipped with robotic surgical systems, 24/7 cardiac emergency triage, and comprehensive digital outpatient care.',
    credentials: {
      defaultEmail: 'chief.doctor@auracare.med',
      role: 'Chief Medical Officer / Owner',
      accessLevel: 'Super Administrator'
    },
    stats: [
      { label: 'Active Inpatients', value: '384 / 450', change: '+8.2%', isPositive: true },
      { label: 'Daily OPD Footfall', value: '1,240', change: '+14%', isPositive: true },
      { label: 'Surgeries Scheduled Today', value: '28', change: 'On Track', isPositive: true },
      { label: 'ER Bed Availability', value: '12 Beds', change: 'Normal', isPositive: true }
    ],
    quickLinks: ['Book Doctor Consultation', 'Emergency Triage', 'Diagnostic Lab Reports', 'Pharmacy Direct']
  },
  {
    id: 'ecommerce',
    name: 'NexTrend Direct & Retail Commerce',
    tagline: 'Next-Gen Omnichannel E-Commerce & Consumer Lifestyle',
    category: 'Digital Retail & Marketplace',
    themeColor: 'purple',
    accentColor: 'from-purple-500 to-pink-500',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    iconName: 'ShoppingBag',
    heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
    description: 'High-growth direct-to-consumer lifestyle and electronics brand with multi-channel fulfillment across 18 countries and 99.4% next-day delivery dispatch.',
    credentials: {
      defaultEmail: 'executive@nextrend.store',
      role: 'Founder & E-Commerce Director',
      accessLevel: 'Full Merchant Access'
    },
    stats: [
      { label: 'Today\'s Gross Revenue', value: '$84,920', change: '+22.4%', isPositive: true },
      { label: 'Live Active Carts', value: '4,180', change: '+18.1%', isPositive: true },
      { label: 'Pending Shipments', value: '312 Orders', change: '89% Packed', isPositive: true },
      { label: 'Avg. Order Value (AOV)', value: '$118.50', change: '+5.6%', isPositive: true }
    ],
    quickLinks: ['Flash Sales Live', 'Trending Catalog', 'Warehouse Dispatch', 'Global Shipments']
  },
  {
    id: 'voltdrive',
    name: 'VoltDrive Mobility & Fleet Logistics',
    tagline: 'Next-Gen Electric Vehicle Dealership & Luxury Fleet Transport',
    category: 'EV Automotive & Luxury Fleet',
    themeColor: 'cyan',
    accentColor: 'from-cyan-500 to-blue-600',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    iconName: 'Zap',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    description: 'Flagship EV automotive showroom, corporate executive chauffeur mobility, and ultra-fast Megawatt commercial freight transport logistics.',
    credentials: {
      defaultEmail: 'fleet.director@voltdrive.com',
      role: 'VP of Automotive & Fleet Operations',
      accessLevel: 'Enterprise Fleet Admin'
    },
    stats: [
      { label: 'Active EV Fleet', value: '480+ Vehicles', change: '98.4% Deployed', isPositive: true },
      { label: 'Supercharging Network', value: '120 Hubs', change: '99.9% Uptime', isPositive: true },
      { label: 'Monthly Zero-Emission Miles', value: '4.8M Miles', change: '+28.4%', isPositive: true },
      { label: 'Corporate Fleet Contracts', value: '34 Enterprises', change: '6 In Pipeline', isPositive: true }
    ],
    quickLinks: ['Virtual Showroom', 'Book Test Drive', 'Executive Chauffeur', 'Fleet Lease Calculator']
  }
];

// Hospital Specific Data
export const hospitalData = {
  departments: [
    { name: 'Cardiology & Heart Institute', icon: 'HeartPulse', doctors: 14, beds: 80, opdWaitTime: '15 mins' },
    { name: 'Neurology & Neurosurgery', icon: 'Brain', doctors: 10, beds: 60, opdWaitTime: '20 mins' },
    { name: 'Orthopedics & Joint Replacement', icon: 'Bone', doctors: 12, beds: 75, opdWaitTime: '10 mins' },
    { name: 'Pediatrics & Neonatal ICU', icon: 'Baby', doctors: 9, beds: 50, opdWaitTime: '5 mins' },
    { name: 'Oncology & Radiation Therapy', icon: 'Dna', doctors: 8, beds: 65, opdWaitTime: '15 mins' },
    { name: '24/7 Emergency & Critical Care', icon: 'Siren', doctors: 18, beds: 45, opdWaitTime: 'Immediate' }
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Evelyn Vance, MD, FACC',
      specialty: 'Chief of Interventional Cardiology',
      experience: '22 Years Exp.',
      rating: '4.9 (480 reviews)',
      available: 'Today 2:30 PM',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      fees: '$120'
    },
    {
      id: 'doc-2',
      name: 'Dr. Marcus Thorne, MS, MCh',
      specialty: 'Senior Consultant Neurosurgeon',
      experience: '18 Years Exp.',
      rating: '4.95 (390 reviews)',
      available: 'Tomorrow 10:00 AM',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
      fees: '$150'
    },
    {
      id: 'doc-3',
      name: 'Dr. Priya Sharma, MD, DCH',
      specialty: 'Head of Pediatric & Neonatal Medicine',
      experience: '15 Years Exp.',
      rating: '4.9 (620 reviews)',
      available: 'Today 4:00 PM',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300',
      fees: '$95'
    }
  ]
};

// E-Commerce Specific Data
export const ecommerceData = {
  categories: ['All Departments', 'Electronics & Audio', 'Smart Wearables', 'Fashion & Apparel', 'Home & Kitchen', 'Footwear', 'Beauty & Care'],
  heroBanners: [
    {
      id: 1,
      title: 'Mega Summer Electronics & Tech Sale',
      subtitle: 'Up to 50% off on flagship smartwatches, studio ANC headphones, and smart home audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1600',
      ctaText: 'Shop Prime Deals',
      category: 'Electronics & Audio'
    },
    {
      id: 2,
      title: 'Luxury Autumn & Winter Fashion Week',
      subtitle: 'Explore designer outerwear, organic cotton knitwear, and technical accessories',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600',
      ctaText: 'Explore Trends',
      category: 'Fashion & Apparel'
    },
    {
      id: 3,
      title: 'High-Performance Athletic Footwear',
      subtitle: 'Engineered carbon soles, breathable mesh, and ultralight marathon ergonomics',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600',
      ctaText: 'Shop Footwear',
      category: 'Footwear'
    }
  ],
  quadCards: [
    {
      title: 'Upgrade your home workspace',
      items: [
        { label: 'Studio Audio', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=300' },
        { label: 'Smart Lamps', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=300' },
        { label: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=300' },
        { label: 'Backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300' }
      ],
      linkText: 'See more tech essentials'
    },
    {
      title: 'Fashion & Everyday Styles',
      items: [
        { label: 'Outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300' },
        { label: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300' },
        { label: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300' },
        { label: 'Caps & Bags', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=300' }
      ],
      linkText: 'Shop fashion deals'
    },
    {
      title: 'Top rated in Smart Gadgets',
      items: [
        { label: 'Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300' },
        { label: 'Trackers', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=300' },
        { label: 'Wireless Hubs', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300' },
        { label: 'Power Banks', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=300' }
      ],
      linkText: 'Explore all gadgets'
    },
    {
      title: 'Prime Gaming & Audio',
      items: [
        { label: 'Gaming Mics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=300' },
        { label: 'Hi-Fi Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300' },
        { label: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=300' },
        { label: 'Chairs', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=300' }
      ],
      linkText: 'Shop gaming & entertainment'
    }
  ],
  products: [
    {
      id: 'prod-1',
      title: 'AuraSphere ANC Wireless Studio Headphones with Spatial Audio',
      category: 'Electronics & Audio',
      price: 249.99,
      originalPrice: 329.99,
      rating: 4.8,
      reviews: 1420,
      stock: 45,
      prime: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      badge: 'Best Seller',
      dealBadge: 'Save 24%'
    },
    {
      id: 'prod-2',
      title: 'Vanguard Chrono Pro Titanium Smartwatch with ECG & GPS',
      category: 'Smart Wearables',
      price: 389.00,
      originalPrice: 450.00,
      rating: 4.9,
      reviews: 890,
      stock: 22,
      prime: true,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      badge: 'Amazon\'s Choice',
      dealBadge: 'Limited time deal'
    },
    {
      id: 'prod-3',
      title: 'Nomad Ergonomic Daily Technical Backpack - Waterproof 25L',
      category: 'Fashion & Apparel',
      price: 135.00,
      originalPrice: 160.00,
      rating: 4.7,
      reviews: 640,
      stock: 80,
      prime: true,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
      badge: 'Top Rated',
      dealBadge: 'Save 16%'
    },
    {
      id: 'prod-4',
      title: 'Apex Glide Carbon Knit Minimalist Running Sneakers',
      category: 'Footwear',
      price: 179.99,
      originalPrice: 219.99,
      rating: 4.85,
      reviews: 975,
      stock: 38,
      prime: true,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      badge: 'Best Seller',
      dealBadge: 'Deal of the Day'
    },
    {
      id: 'prod-5',
      title: 'SonicPulse Wireless Earbuds with Environmental Noise Cancellation',
      category: 'Electronics & Audio',
      price: 79.99,
      originalPrice: 119.99,
      rating: 4.6,
      reviews: 2150,
      stock: 95,
      prime: true,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
      badge: 'Popular',
      dealBadge: '33% Off'
    },
    {
      id: 'prod-6',
      title: 'UrbanTech Weatherproof Field Jacket - Breathable Micro-Twill',
      category: 'Fashion & Apparel',
      price: 195.00,
      originalPrice: 260.00,
      rating: 4.75,
      reviews: 512,
      stock: 28,
      prime: true,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      badge: 'New Arrival',
      dealBadge: '25% Off'
    },
    {
      id: 'prod-7',
      title: 'Lumina Minimalist Desk Lamp with Wireless Qi Fast Charging',
      category: 'Home & Kitchen',
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.65,
      reviews: 830,
      stock: 64,
      prime: true,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
      badge: 'Amazon\'s Choice',
      dealBadge: 'Save 30%'
    },
    {
      id: 'prod-8',
      title: 'AeroMech RGB Wireless Mechanical Keyboard - Tactile Switches',
      category: 'Electronics & Audio',
      price: 129.99,
      originalPrice: 169.99,
      rating: 4.9,
      reviews: 1840,
      stock: 42,
      prime: true,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600',
      badge: 'Editor\'s Choice',
      dealBadge: 'Save $40'
    }
  ]
};

// VoltDrive EV Automotive & Luxury Fleet Logistics Specific Data
export const voltdriveData = {
  categories: ['All Vehicles', 'Hyper-Sedans', 'Executive SUVs', 'VIP Chauffeur Limousines', 'Commercial Freight'],
  vehicles: [
    {
      id: 'ev-1',
      name: 'VoltDrive GT Apex Hyper-Sedan',
      category: 'Hyper-Sedans',
      price: '$118,500',
      leasePrice: '$1,190/mo',
      acceleration: '1.98s',
      range: '520 Miles',
      topSpeed: '200 MPH',
      horsepower: '1,020 HP',
      chargeTime: '15 mins (10-80%)',
      drivetrain: 'Tri-Motor All-Wheel Drive',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      badge: 'Flagship Performance',
      features: ['Autopilot Level 4 Ready', 'Carbon Ceramic Brakes', 'Panoramic Smart Glass Roof', 'Nappa Leather Interior']
    },
    {
      id: 'ev-2',
      name: 'AeroPulse X-700 Executive SUV',
      category: 'Executive SUVs',
      price: '$94,900',
      leasePrice: '$890/mo',
      acceleration: '3.2s',
      range: '460 Miles',
      topSpeed: '165 MPH',
      horsepower: '750 HP',
      chargeTime: '18 mins (10-80%)',
      drivetrain: 'Dual-Motor Intelligent AWD',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      badge: 'Best Seller',
      features: ['Air Suspension with Terrain AI', '7-Seat Executive Configuration', '32-Speaker Acoustic Sound', 'Tow Rating 5,500 lbs']
    },
    {
      id: 'ev-3',
      name: 'Lumina Grand VIP Chauffeur Limousine',
      category: 'VIP Chauffeur Limousines',
      price: '$142,000',
      leasePrice: '$1,450/mo',
      acceleration: '3.8s',
      range: '490 Miles',
      topSpeed: '155 MPH',
      horsepower: '680 HP',
      chargeTime: '20 mins (10-80%)',
      drivetrain: 'Silent Dual-Motor Ultra-Smooth',
      image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&q=80&w=800',
      badge: 'VIP Chauffeur Choice',
      features: ['Executive Reclining Rear Seats', 'Champagne Chiller & Privacy Partition', 'Acoustic Noise Canceling Glass', '24/7 On-Demand Chauffeur Service']
    },
    {
      id: 'ev-4',
      name: 'CyberCargo Megawatt Commercial Freight Van',
      category: 'Commercial Freight',
      price: '$68,500',
      leasePrice: '$549/mo',
      acceleration: '5.4s',
      range: '380 Miles',
      topSpeed: '120 MPH',
      horsepower: '450 HP',
      chargeTime: '25 mins (Megawatt DC)',
      drivetrain: 'Heavy-Duty Rear Direct Drive',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
      badge: 'Fleet Standard',
      features: ['4,200 lbs Max Payload Capacity', 'Automated RFID Fleet Telematics', 'Zero Emission Tax Incentives', 'Rapid Modular Shelving System']
    }
  ],
  fleetPackages: [
    {
      tier: 'Executive Corporate Pool',
      size: '5 - 15 Vehicles',
      baseRate: '$799/mo per vehicle',
      features: ['All-inclusive scheduled maintenance', 'Full comprehensive insurance', 'Mobile EV charging support', '24/7 dedicated account manager']
    },
    {
      tier: 'Luxury Chauffeur & VIP Hospitality',
      size: '15 - 50 Vehicles',
      baseRate: '$699/mo per vehicle',
      features: ['White-glove chauffeur dispatch app', 'VIP Lumina & AeroPulse mix', 'Priority Supercharger access', 'Fleet telematics & GPS analytics']
    },
    {
      tier: 'Enterprise Green Freight Logistics',
      size: '50+ Commercial Vans',
      baseRate: '$549/mo per vehicle',
      features: ['Megawatt depot charging installation', 'Automated route optimization AI', 'Carbon credit certification', '99.9% fleet uptime SLA guarantee']
    }
  ]
};
