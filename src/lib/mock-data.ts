import type {
  Worker,
  Category,
  Booking,
  Job,
  JobOffer,
  DisputeItem,
  NotificationItem,
  ConversationItem,
  MessageItem,
} from "@/types";

export const CATEGORIES: Category[] = [
  {
    name: "Electrician",
    slug: "electrician",
    icon: "⚡",
    description: "Wiring, DB box, short circuit repairs, UPS & generator wiring, solar connections.",
    workerCount: 142,
    avgHourlyRate: 600,
  },
  {
    name: "Plumber",
    slug: "plumber",
    icon: "🚿",
    description: "Pipe fittings, water tank installation, sanitary ware, emergency leak repairs.",
    workerCount: 118,
    avgHourlyRate: 550,
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    icon: "🪚",
    description: "Doors, windows, bespoke furniture, kitchen cabinets, polish and woodwork repair.",
    workerCount: 89,
    avgHourlyRate: 700,
  },
  {
    name: "AC Repair & HVAC",
    slug: "ac-repair",
    icon: "❄️",
    description: "Inverter AC servicing, gas refilling, compressor replacement, split AC installation.",
    workerCount: 95,
    avgHourlyRate: 850,
  },
  {
    name: "Solar Technician",
    slug: "solar-technician",
    icon: "☀️",
    description: "On-grid/hybrid solar setup, inverter settings, battery bank balancing, net-metering.",
    workerCount: 64,
    avgHourlyRate: 950,
  },
  {
    name: "Painter & Polish",
    slug: "painter",
    icon: "🎨",
    description: "Interior/exterior emulsion, weather sheet, texture paint, wood lacquer polishing.",
    workerCount: 76,
    avgHourlyRate: 500,
  },
  {
    name: "Mason & Tile Worker",
    slug: "mason",
    icon: "🧱",
    description: "Floor and bathroom tiling, brick masonry, plastering, ceiling repair, marble fixing.",
    workerCount: 82,
    avgHourlyRate: 800,
  },
  {
    name: "Auto Mechanic",
    slug: "mechanic",
    icon: "🔧",
    description: "Engine tuning, brake servicing, suspension, car electrician, doorstep inspection.",
    workerCount: 57,
    avgHourlyRate: 750,
  },
  {
    name: "Home Tutor",
    slug: "tutor",
    icon: "📚",
    description: "Matric, FSc, O/A Levels, Quran & Tajweed tutors, verified university graduates.",
    workerCount: 110,
    avgHourlyRate: 650,
  },
  {
    name: "Computer & Mobile",
    slug: "computer-repair",
    icon: "💻",
    description: "Laptop screen/battery repair, Windows/Mac reinstall, phone hardware & software.",
    workerCount: 48,
    avgHourlyRate: 700,
  },
  {
    name: "CCTV & Security",
    slug: "cctv-technician",
    icon: "📹",
    description: "IP camera installation, DVR/NVR configuration, mobile live view setup.",
    workerCount: 39,
    avgHourlyRate: 800,
  },
  {
    name: "Cleaner & Pest Control",
    slug: "cleaner",
    icon: "🧹",
    description: "Deep house cleaning, water tank disinfection, sofa/carpet wash, fumigation.",
    workerCount: 52,
    avgHourlyRate: 450,
  },
];

export const WORKERS: Worker[] = [
  {
    id: "w1",
    name: "Rahim Gul",
    category: "Electrician",
    city: "Peshawar",
    district: "Peshawar",
    area: "Hayatabad, Phase 4 (UC-78)",
    hourlyRate: 600,
    fixedPriceLabel: "Rs 2,500 Complete DB & Wiring Check",
    rating: 4.9,
    trustScore: 96,
    jobsCompleted: 214,
    responseRate: 98,
    responseTimeMin: 12,
    languages: ["Pashto", "Urdu", "Hindko"],
    bio: "14 years wiring homes and commercial plazas across Hayatabad and University Town. Specialises in 3-phase circuits, inverter load balancing, and solar-ready breaker boards. Certified by Peshawar Electric Inspectorate.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: true,
    isAvailable: true,
    coordinates: { lat: 34.008, lng: 71.487 },
    vouches: [
      {
        id: "v1",
        role: "Elder",
        name: "Haji Sher Bahadur",
        voucherTitle: "Chief Elder, Hayatabad Council of Elders (Hujra Jirga)",
        relationship: "Family neighbour for 18 years; known since childhood",
        verifiedSince: "Jan 2021",
        trustScore: 98,
        phoneVerified: true,
        notes: "Honest, reliable craftsman. Has wired my family hujra and multiple mosque extensions without charging excess.",
      },
      {
        id: "v2",
        role: "Imam",
        name: "Qari Abdul Wahab",
        voucherTitle: "Khateeb, Jamia Masjid Bilal (Hayatabad Phase 4)",
        relationship: "Regular congregant & maintains mosque electric setup",
        verifiedSince: "Aug 2022",
        trustScore: 95,
        phoneVerified: true,
        notes: "Punctual, trustworthy and strictly avoids unfair material markups.",
      },
      {
        id: "v3",
        role: "Senior Worker",
        name: "Ustad Naseem Khan",
        voucherTitle: "Master Electrician (KP Technical Board Lead)",
        relationship: "Former apprentice (2009-2013), now independent master",
        verifiedSince: "Mar 2020",
        trustScore: 96,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p1",
        title: "Complete 1 Kanal Solar DB & Inverter Setup",
        description: "Organised rewiring with automatic failover ATS switch and surge protection.",
        afterPhoto: "https://picsum.photos/seed/elec1/600/400",
      },
      {
        id: "p2",
        title: "Short Circuit Emergency Repair & Breaker Replacement",
        description: "Replaced burnt main breaker with certified Schneider unit.",
        beforePhoto: "https://picsum.photos/seed/burn1/600/400",
        afterPhoto: "https://picsum.photos/seed/fixed1/600/400",
      },
    ],
    certificates: [
      {
        id: "c1",
        title: "Diploma in Electrical Technology",
        issuedBy: "Government Polytechnic Institute Peshawar",
        year: 2011,
      },
      {
        id: "c2",
        title: "Solar PV Installer Certification",
        issuedBy: "NAVTTC Pakistan",
        year: 2019,
      },
    ],
    reviews: [
      {
        id: "r1",
        customerName: "Dr. Asadullah Khan",
        customerCity: "Peshawar",
        rating: 5,
        date: "2 days ago",
        comment: "Rahim Bhai fixed our UPS tripping issue in 45 minutes. Super polite, arrived on time, and charged very fair price.",
        jobType: "Inverter Load Balancing",
      },
      {
        id: "r2",
        customerName: "Tariq Mehmood (Diaspora UK)",
        customerCity: "Manchester / Peshawar House",
        rating: 5,
        date: "1 week ago",
        comment: "Booked from UK for my elderly mother's house in Hayatabad. Rahim sent before/after photos and was vouched by Haji Sher Bahadur. Very reassuring experience!",
        jobType: "House Rewiring",
      },
    ],
  },
  {
    id: "w2",
    name: "Bakht Zada",
    category: "Plumber",
    city: "Mardan",
    district: "Mardan",
    area: "Sheikh Maltoon Town, Sector B (UC-14)",
    hourlyRate: 500,
    fixedPriceLabel: "Rs 1,800 Water Tank Fitting & Leak Stop",
    rating: 4.8,
    trustScore: 93,
    jobsCompleted: 167,
    responseRate: 96,
    responseTimeMin: 15,
    languages: ["Pashto", "Urdu"],
    bio: "Specialist in PPRC and UPVC high-pressure piping, concealed leakage detection, bathroom sanitary installation, and booster pumps.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: true,
    isAvailable: true,
    coordinates: { lat: 34.198, lng: 72.04 },
    vouches: [
      {
        id: "v4",
        role: "Elder",
        name: "Malik Fazal Rehman",
        voucherTitle: "Union Council Elder & Merchant Association Mardan",
        relationship: "Known family for 20+ years",
        verifiedSince: "Feb 2021",
        trustScore: 94,
        phoneVerified: true,
        notes: "Bakht Zada is known across Sheikh Maltoon for impeccable work ethic and honest rate quotes.",
      },
      {
        id: "v5",
        role: "Imam",
        name: "Maulana Shamsher Ali",
        voucherTitle: "Imam, Jamia Masjid Al-Farooq (Mardan)",
        relationship: "Community member and trusted mosque volunteer",
        verifiedSince: "May 2022",
        trustScore: 92,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p3",
        title: "Concealed Bathroom Wall Leakage Fix",
        description: "Thermal pipe inspection without breaking unnecessary tile work.",
        beforePhoto: "https://picsum.photos/seed/leak1/600/400",
        afterPhoto: "https://picsum.photos/seed/tile1/600/400",
      },
    ],
    certificates: [
      {
        id: "c3",
        title: "Sanitary Fitting & Pipe Technician",
        issuedBy: "KP Vocational Training Authority",
        year: 2014,
      },
    ],
    reviews: [
      {
        id: "r3",
        customerName: "Engr. Noman Ali",
        customerCity: "Mardan",
        rating: 5,
        date: "3 days ago",
        comment: "Detected a stubborn pipe leakage that two other plumbers failed to locate. Highly recommend!",
        jobType: "Concealed Leak Repair",
      },
    ],
  },
  {
    id: "w3",
    name: "Shahid Iqbal",
    category: "AC Repair & HVAC",
    city: "Peshawar",
    district: "Peshawar",
    area: "University Town / Tahkal (UC-45)",
    hourlyRate: 800,
    fixedPriceLabel: "Rs 3,200 Inverter AC Chemical Wash & Gas Top-up",
    rating: 4.8,
    trustScore: 95,
    jobsCompleted: 189,
    responseRate: 99,
    responseTimeMin: 10,
    languages: ["Urdu", "Pashto", "English"],
    bio: "Certified HVAC specialist for Gree, Haier, Dawlance, and Kenwood inverter units. Dedicated pressure-testing equipment for eco-friendly R32/R410a gas refilling.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: true,
    isAvailable: true,
    coordinates: { lat: 34.015, lng: 71.524 },
    vouches: [
      {
        id: "v6",
        role: "Elder",
        name: "Haji Sher Bahadur",
        voucherTitle: "Chief Elder, Hayatabad Council of Elders",
        relationship: "Maintains AC systems across all our community halls",
        verifiedSince: "May 2021",
        trustScore: 97,
        phoneVerified: true,
      },
      {
        id: "v7",
        role: "Senior Worker",
        name: "Master Zarshad Khan",
        voucherTitle: "President, KP Refrigeration & AC Union",
        relationship: "Certified union peer with 10+ years clean record",
        verifiedSince: "Jan 2020",
        trustScore: 95,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p4",
        title: "Split AC Inverter PCB Board Diagnostics",
        description: "Replaced blown capacitor and cleaned outdoor condenser coil.",
        afterPhoto: "https://picsum.photos/seed/ac1/600/400",
      },
    ],
    certificates: [
      {
        id: "c4",
        title: "Refrigeration & Air Conditioning Master Level",
        issuedBy: "City & Guilds / TEVTA",
        year: 2016,
      },
    ],
    reviews: [
      {
        id: "r4",
        customerName: "Fawad Bacha",
        customerCity: "Peshawar",
        rating: 5,
        date: "Yesterday",
        comment: "Excellent service. AC cooling is back to sub-zero temperatures. Clear pricing breakdown provided up front.",
        jobType: "Chemical Service & Gas Refill",
      },
    ],
  },
  {
    id: "w4",
    name: "Gulzar Ahmad",
    category: "Solar Technician",
    city: "Swat",
    district: "Swat",
    area: "Mingora Bazaar & Saidu Sharif",
    hourlyRate: 900,
    fixedPriceLabel: "Rs 15,000 Complete 6kW System Health Audit",
    rating: 4.9,
    trustScore: 97,
    jobsCompleted: 145,
    responseRate: 97,
    responseTimeMin: 20,
    languages: ["Pashto", "Urdu"],
    bio: "Solar engineer with 8 years experience across Swat, Bahrain, and Shangla. Tier-1 panel angle calibration, lithium battery BMS setup, and hybrid inverter fine tuning.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: false,
    isAvailable: true,
    coordinates: { lat: 34.771, lng: 72.36 },
    vouches: [
      {
        id: "v8",
        role: "Elder",
        name: "Miangul Sheharyar",
        voucherTitle: "Community Elder & Saidu Sharif Council",
        relationship: "Installed solar micro-grids for valley villages",
        verifiedSince: "Apr 2021",
        trustScore: 98,
        phoneVerified: true,
      },
      {
        id: "v9",
        role: "Union Council Official",
        name: "Arshad Khan Swati",
        voucherTitle: "Secretary, Union Council Mingora-3",
        relationship: "Verified identity and community works record",
        verifiedSince: "Nov 2022",
        trustScore: 96,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p5",
        title: "10kW Hybrid Solar Installation with Tier-1 Jinko Panels",
        description: "Optimized roof tilt angle for maximum winter and summer yield.",
        afterPhoto: "https://picsum.photos/seed/solar1/600/400",
      },
    ],
    certificates: [
      {
        id: "c5",
        title: "Renewable Energy Technology",
        issuedBy: "University of Engineering & Technology Peshawar",
        year: 2017,
      },
    ],
    reviews: [
      {
        id: "r5",
        customerName: "Sardar Ali Khan",
        customerCity: "Swat",
        rating: 5,
        date: "4 days ago",
        comment: "Gulzar fixed our inverter battery cutoff settings. Our electricity bills dropped by 70%. Best solar technician in Swat.",
        jobType: "Inverter Optimization",
      },
    ],
  },
  {
    id: "w5",
    name: "Ustad Mukhtiar Ali",
    category: "Carpenter",
    city: "Peshawar",
    district: "Peshawar",
    area: "Gulbahar & Kohati Gate (UC-19)",
    hourlyRate: 700,
    fixedPriceLabel: "Rs 4,000 Custom Door Fitting & Lock Set",
    rating: 4.7,
    trustScore: 92,
    jobsCompleted: 310,
    responseRate: 94,
    responseTimeMin: 25,
    languages: ["Pashto", "Hindko", "Urdu"],
    bio: "22 years of traditional Peshawari woodcraft, modern modular kitchen fabrication, solid deodar wood doors, and sofa frame structural repairs.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: false,
    isAvailable: true,
    coordinates: { lat: 34.003, lng: 71.578 },
    vouches: [
      {
        id: "v10",
        role: "Elder",
        name: "Haji Mir Alam",
        voucherTitle: "President, Timber Market Association Peshawar",
        relationship: "Known and worked together for 25 years",
        verifiedSince: "Jan 2019",
        trustScore: 95,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p6",
        title: "Solid Deodar Entrance Door & Brass Lock Fitting",
        description: "Handcrafted carved frame with high-gloss natural polish.",
        afterPhoto: "https://picsum.photos/seed/wood1/600/400",
      },
    ],
    certificates: [],
    reviews: [
      {
        id: "r6",
        customerName: "Imran Yousafzai",
        customerCity: "Peshawar",
        rating: 5,
        date: "1 week ago",
        comment: "Flawless woodworking. The kitchen cabinets look showroom ready.",
        jobType: "Kitchen Cabinets",
      },
    ],
  },
  {
    id: "w6",
    name: "Naveed Khan",
    category: "Mason & Tile Worker",
    city: "Abbottabad",
    district: "Abbottabad",
    area: "Mandian & Supply Road (UC-3)",
    hourlyRate: 750,
    fixedPriceLabel: "Rs 5,500 Bathroom Floor & Wall Tiling (Standard)",
    rating: 4.9,
    trustScore: 94,
    jobsCompleted: 122,
    responseRate: 96,
    responseTimeMin: 18,
    languages: ["Hindko", "Urdu", "Pashto"],
    bio: "Specialist in porcelain, ceramic, and granite tile installation with laser level precision. Complete waterproofing and moisture barrier application.",
    isVerified: true,
    cnicVerified: true,
    faceVerified: true,
    emergencyService: false,
    isAvailable: true,
    coordinates: { lat: 34.168, lng: 73.221 },
    vouches: [
      {
        id: "v11",
        role: "Imam",
        name: "Qari Masood Abbasi",
        voucherTitle: "Khateeb, Jamia Masjid Mandian",
        relationship: "Built the mosque ablution area with precision",
        verifiedSince: "Aug 2022",
        trustScore: 96,
        phoneVerified: true,
      },
    ],
    portfolio: [
      {
        id: "p7",
        title: "Granite Kitchen Counter & Wall Subway Tiling",
        description: "Laser-aligned backsplash with epoxy waterproof grout.",
        afterPhoto: "https://picsum.photos/seed/tile2/600/400",
      },
    ],
    certificates: [],
    reviews: [
      {
        id: "r7",
        customerName: "Khurram Shahzad",
        customerCity: "Abbottabad",
        rating: 5,
        date: "2 weeks ago",
        comment: "Super smooth tile joints, zero lippage. Cleaned up thoroughly after finishing.",
        jobType: "Bathroom Tiling",
      },
    ],
  },
];

export const JOBS: Job[] = [
  {
    id: "job-101",
    customerId: "u-cust1",
    customerName: "Ayesha Bibi",
    customerCity: "Peshawar",
    customerArea: "Hayatabad Phase 2, Sector J",
    title: "Main DB Breaker Tripping & Inverter Setup",
    category: "Electrician",
    budget: 3500,
    urgency: "Emergency",
    description: "The main breaker trips whenever the solar inverter switches to battery load. Need a verified master electrician to inspect the ATS and separate neutral wires.",
    voiceNoteUrl: "/audio/sample-urdu-electric.mp3",
    voiceDurationSec: 34,
    isDiaspora: false,
    status: "OPEN",
    createdAt: "2 hours ago",
    offersCount: 3,
    offers: [
      {
        id: "off-1",
        jobId: "job-101",
        workerId: "w1",
        workerName: "Rahim Gul",
        workerCategory: "Electrician",
        workerTrustScore: 96,
        workerRating: 4.9,
        price: 3200,
        estimatedTime: "Today within 1 hour",
        message: "Salam sister. I am in Phase 4 Hayatabad and can reach you in 20 minutes with testing equipment to isolate the neutral leakage.",
        status: "pending",
        createdAt: "1 hour ago",
      },
      {
        id: "off-2",
        jobId: "job-101",
        workerId: "w3",
        workerName: "Shahid Iqbal",
        workerCategory: "Electrician",
        workerTrustScore: 95,
        workerRating: 4.8,
        price: 3500,
        estimatedTime: "Today at 4:00 PM",
        message: "Can bring digital load analyser to fix the ATS wiring properly.",
        status: "pending",
        createdAt: "45 mins ago",
      },
    ],
  },
  {
    id: "job-102",
    customerId: "u-diaspora1",
    customerName: "Farhan Bangash (Diaspora - Dubai)",
    customerCity: "Mardan",
    customerArea: "Sheikh Maltoon Sector D",
    title: "Underground Water Tank Pump Overhaul for Parents",
    category: "Plumber",
    budget: 4500,
    urgency: "Standard",
    description: "I live in Dubai and need a trustworthy vouched plumber to service the water pump at my elderly parents' house and replace the rusted float valve. Escrow payment via card.",
    voiceNoteUrl: "/audio/sample-pashto-plumb.mp3",
    voiceDurationSec: 42,
    isDiaspora: true,
    diasporaCountry: "United Arab Emirates",
    status: "OPEN",
    createdAt: "5 hours ago",
    offersCount: 2,
    offers: [
      {
        id: "off-3",
        jobId: "job-102",
        workerId: "w2",
        workerName: "Bakht Zada",
        workerCategory: "Plumber",
        workerTrustScore: 93,
        workerRating: 4.8,
        price: 4000,
        estimatedTime: "Tomorrow Morning 10 AM",
        message: "Salam Farhan bhai. I know Sheikh Maltoon very well. I will do full inspection, buy genuine brass valve with receipt, and send you video proof before closing the tank.",
        status: "pending",
        createdAt: "3 hours ago",
      },
    ],
  },
  {
    id: "job-103",
    customerId: "u-cust2",
    customerName: "Kamran Khattak",
    customerCity: "Swat",
    customerArea: "Saidu Sharif, near Civil Hospital",
    title: "6kW Solar Inverter Battery Calibration & Cable Upgrade",
    category: "Solar Technician",
    budget: 8000,
    urgency: "Flexible",
    description: "Upgrading from tubular batteries to Lithium-ion pack on InfiniSolar inverter. Need DC circuit breaker installation and BMS communication setup.",
    isDiaspora: false,
    status: "OPEN",
    createdAt: "1 day ago",
    offersCount: 1,
  },
];

export const BOOKINGS: Booking[] = [
  {
    id: "bk-801",
    workerId: "w1",
    workerName: "Rahim Gul",
    workerCategory: "Electrician",
    customerId: "u-cust1",
    customerName: "Ayesha Bibi",
    customerPhone: "0300-5912345",
    serviceTitle: "Emergency UPS & Breaker Balancing",
    status: "in_progress",
    type: "emergency",
    amount: 3200,
    city: "Peshawar",
    address: "House 42, Street 8, Sector J-3, Hayatabad Phase 2",
    scheduledDate: "Today, Immediate",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    escrow: {
      amount: 3200,
      currency: "PKR",
      status: "funds_held",
      paymentMethod: "JazzCash",
      paymentRef: "JC-9823411082",
      heldAt: new Date(Date.now() - 3600000).toISOString(),
    },
    workProof: {
      beforePhotos: ["https://picsum.photos/seed/dbold/500/350"],
      afterPhotos: [],
      completionNotes: "Arrived on site. Disconnected burnt neutral busbar. Replacing with heavy-duty copper link.",
      gpsCheckInTime: "12:15 PM (Hayatabad Phase 2)",
      submittedAt: new Date(Date.now() - 1800000).toISOString(),
    },
  },
  {
    id: "bk-802",
    workerId: "w3",
    workerName: "Shahid Iqbal",
    workerCategory: "AC Repair & HVAC",
    customerId: "u-diaspora1",
    customerName: "Farhan Bangash",
    customerPhone: "+971-50-1234567 (Diaspora)",
    serviceTitle: "Dual Inverter AC Deep Chemical Service",
    status: "work_submitted",
    type: "scheduled",
    amount: 6000,
    city: "Peshawar",
    address: "House 12, University Town, Peshawar",
    scheduledDate: "Yesterday, 3:00 PM",
    isDiaspora: true,
    diasporaSenderCountry: "United Arab Emirates",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    escrow: {
      amount: 6000,
      currency: "PKR",
      status: "funds_held",
      paymentMethod: "Stripe Card",
      paymentRef: "ST-INT-449102",
      heldAt: new Date(Date.now() - 86400000).toISOString(),
    },
    workProof: {
      beforePhotos: ["https://picsum.photos/seed/acdirty/500/350"],
      afterPhotos: ["https://picsum.photos/seed/acclean/500/350"],
      completionNotes: "Both Gree 1.5-ton units fully dismantled, chemically washed, pressure tested at 140 PSI, cooling at 16°C. Gas levels optimum.",
      submittedAt: new Date(Date.now() - 12000000).toISOString(),
    },
  },
  {
    id: "bk-803",
    workerId: "w2",
    workerName: "Bakht Zada",
    workerCategory: "Plumber",
    customerId: "u-cust3",
    customerName: "Haji Nisar Ahmad",
    customerPhone: "0333-9182734",
    serviceTitle: "Water Tank Float & Pipe Installation",
    status: "completed",
    type: "scheduled",
    amount: 2200,
    city: "Mardan",
    address: "Sheikh Maltoon Town, Mardan",
    scheduledDate: "24 Aug 2026",
    createdAt: "2026-08-24T10:00:00Z",
    escrow: {
      amount: 2200,
      currency: "PKR",
      status: "released",
      paymentMethod: "Easypaisa",
      paymentRef: "EP-88710293",
      heldAt: "2026-08-24T10:00:00Z",
      releasedAt: "2026-08-24T14:30:00Z",
    },
  },
];

export const CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    participantId: "w1",
    participantName: "Rahim Gul (Electrician)",
    participantRole: "Worker",
    participantAvatar: "https://ui-avatars.com/api/?name=Rahim+Gul&background=0f4c4c&color=e8a23d",
    lastMessage: "I have reached outside your street, let me know the gate number.",
    lastMessageTime: "12:14 PM",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "conv-2",
    participantId: "w2",
    participantName: "Bakht Zada (Plumber)",
    participantRole: "Worker",
    participantAvatar: "https://ui-avatars.com/api/?name=Bakht+Zada&background=17706b&color=fff",
    lastMessage: "Voice note received: InshaAllah I will bring the 1-inch PPRC fittings.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: false,
  },
];

export const MESSAGES: Record<string, MessageItem[]> = {
  "conv-1": [
    {
      id: "m1",
      conversationId: "conv-1",
      senderId: "u-cust1",
      senderName: "Ayesha Bibi",
      text: "Salam Rahim Bhai, the DB breaker in the main hallway is tripping whenever the UPS starts charging.",
      isRead: true,
      createdAt: "11:40 AM",
    },
    {
      id: "m2",
      conversationId: "conv-1",
      senderId: "w1",
      senderName: "Rahim Gul",
      audioUrl: "/audio/sample-rahim-response.mp3",
      audioDurationSec: 18,
      text: "🎙️ Voice message (0:18) - 'Walaikum Assalam baji, I am bringing the neutral detector multimeter.'",
      isRead: true,
      createdAt: "11:45 AM",
    },
    {
      id: "m3",
      conversationId: "conv-1",
      senderId: "w1",
      senderName: "Rahim Gul",
      text: "I have reached outside your street, let me know the gate number.",
      isRead: false,
      createdAt: "12:14 PM",
    },
  ],
};

export const DISPUTES: DisputeItem[] = [
  {
    id: "dsp-401",
    bookingId: "bk-990",
    workerName: "Tahir Mehmood (Unverified AC)",
    customerName: "Sohail Jan",
    filedBy: "Customer",
    reason: "Incomplete Work & Gas Leakage Within 24 Hours",
    description: "Technician charged for full gas refill but AC stopped cooling after 6 hours because joint was left loose. Requesting escrow refund or free fix.",
    amount: 4500,
    status: "UNDER_REVIEW",
    evidencePhotos: ["https://picsum.photos/seed/acdispute/500/350"],
    createdAt: "Yesterday, 6:30 PM",
    resolutionNotes: "Admin assigned senior technician Haji Sher Bahadur's guild to re-inspect tomorrow.",
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Funds Deposited to Escrow",
    message: "Rs 3,200 is safely locked in Escrow for your job with Rahim Gul. Release only when satisfied.",
    type: "escrow",
    link: "/bookings/bk-801",
    isRead: false,
    createdAt: "1 hour ago",
  },
  {
    id: "notif-2",
    title: "New Job Offer Received",
    message: "Rahim Gul submitted a proposal (Rs 3,200) for your Hayatabad electrical repair.",
    type: "offer",
    link: "/jobs/job-101",
    isRead: true,
    createdAt: "2 hours ago",
  },
  {
    id: "notif-3",
    title: "Vouch Verified",
    message: "Haji Sher Bahadur approved the elder community vouch for Rahim Gul.",
    type: "vouch",
    link: "/workers/w1",
    isRead: true,
    createdAt: "1 day ago",
  },
];

export const PAKISTAN_LOCATIONS = [
  { province: "Khyber Pakhtunkhwa", district: "Peshawar", tehsils: ["Peshawar City", "Hayatabad", "Cantt", "Saddar", "Chamkani"] },
  { province: "Khyber Pakhtunkhwa", district: "Mardan", tehsils: ["Mardan City", "Takht-i-Bahi", "Katlang", "Rustam", "Garhi Kapura"] },
  { province: "Khyber Pakhtunkhwa", district: "Swat", tehsils: ["Babuzai (Mingora)", "Barikot", "Kabal", "Matta", "Khwazakhela"] },
  { province: "Khyber Pakhtunkhwa", district: "Abbottabad", tehsils: ["Abbottabad City", "Havelian", "Lora"] },
  { province: "Khyber Pakhtunkhwa", district: "Charsadda", tehsils: ["Charsadda City", "Tangi", "Shabqadar"] },
  { province: "Khyber Pakhtunkhwa", district: "Nowshera", tehsils: ["Nowshera Cantt", "Pabbi", "Jehangira"] },
  { province: "Khyber Pakhtunkhwa", district: "Kohat", tehsils: ["Kohat City", "Lachi"] },
  { province: "Federal", district: "Islamabad", tehsils: ["Islamabad Capital", "Zone 1-5"] },
  { province: "Punjab", district: "Rawalpindi", tehsils: ["Rawalpindi City", "Gujar Khan", "Taxila"] },
];

export async function getWorkers(filters?: {
  city?: string;
  category?: string;
  q?: string;
  minTrust?: number;
  emergencyOnly?: boolean;
}): Promise<Worker[]> {
  let list = WORKERS;
  if (filters?.city && filters.city !== "All Cities") {
    list = list.filter((w) => w.city.toLowerCase() === filters.city!.toLowerCase());
  }
  if (filters?.category && filters.category !== "All") {
    list = list.filter(
      (w) =>
        w.category.toLowerCase() === filters.category!.toLowerCase() ||
        w.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }
  if (filters?.minTrust) {
    list = list.filter((w) => w.trustScore >= filters.minTrust!);
  }
  if (filters?.emergencyOnly) {
    list = list.filter((w) => w.emergencyService);
  }
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    list = list.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        w.bio.toLowerCase().includes(q) ||
        w.area.toLowerCase().includes(q) ||
        w.languages.some((l) => l.toLowerCase().includes(q))
    );
  }
  return list;
}

export async function getWorkerById(id: string): Promise<Worker | undefined> {
  return WORKERS.find((w) => w.id === id);
}

export async function getJobs(): Promise<Job[]> {
  return JOBS;
}

export async function getJobById(id: string): Promise<Job | undefined> {
  return JOBS.find((j) => j.id === id);
}

export async function getBookings(): Promise<Booking[]> {
  return BOOKINGS;
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  return BOOKINGS.find((b) => b.id === id);
}
