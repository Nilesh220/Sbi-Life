/* ============================================================
   SBI Life IdeationX 2026 — Data Store
   All API_HOOK comments mark where real Supabase calls go
   ============================================================ */

export const IdeationXData = {

  /* ── Competition Config ──────────────────────────────────── */
  config: {
    edition: 3,
    year: 2026,
    tagline: "Bharat Begins With An Idea",
    currentPhase: 2, // 1=Induction, 2=Registration, 3=B School Eval, 4=National Qualifier, 5=Semi-Finals
    phases: [
      { id: 1, name: "Campus Induction",    date: "Aug 2026",  done: true  },
      { id: 2, name: "Campus Registration", date: "Sep 2026",  done: false, active: true },
      { id: 3, name: "B School Evaluation", date: "Oct 2026",  done: false },
      { id: 4, name: "National Qualifiers", date: "Nov 2026",  done: false },
      { id: 5, name: "Semi-Finals",         date: "Dec 2026",  done: false },
      { id: 6, name: "Grand Finale",        date: "Jan 2027",  done: false, locked: true }
    ],
    keyDates: [
      { date: "Aug 1, 2026",  event: "Campus Induction Begins",         status: "done"   },
      { date: "Sep 1, 2026",  event: "Registration Opens",              status: "active" },
      { date: "Sep 30, 2026", event: "Registration Deadline",           status: "upcoming"},
      { date: "Oct 15, 2026", event: "B School-Level Evaluation Starts", status: "upcoming" },
      { date: "Nov 1, 2026",  event: "Top-3 Per B School Announced",     status: "upcoming"},
      { date: "Nov 15, 2026", event: "National Qualifier Results",      status: "upcoming"},
      { date: "Dec 10, 2026", event: "Semi-Finals (Virtual)",           status: "upcoming"},
      { date: "Jan 2027",     event: "Grand Finale (Details Coming)",   status: "upcoming"},
    ]
  },

  /* ── Live Counters ────────────────────────────────────────── */
  counters: {
    colleges:    200,
    students:    300000,
    entries:     50000,
    shortlisted: 600
  },

  /* ── Challenge Themes ─────────────────────────────────────── */
  themes: [
    {
      id: 1,
      name: "Kirana to Coverage",
      icon: "🏪",
      color: "#FF6B1A",
      glow: "rgba(255,107,26,0.3)",
      gradient: "linear-gradient(135deg, rgba(255,107,26,0.2), rgba(255,62,0,0.08))",
      hook: "What if the neighbourhood Kirana store became India's most trusted Insurance Mitra?",
      brief: "800 million Indians live in semi-urban and rural India. Most have never met an insurance agent. But they know their Kirana store owner. Design an innovation that uses the existing trust of local commerce — Kirana stores, pharmacies, cooperative banks — to distribute life insurance at the last mile.",
      prompts: [
        "Map a day in the life of a village Kirana store owner and identify 3 insurance touchpoints.",
        "Design the simplest possible insurance product a Kirana owner could explain in 60 seconds.",
        "What digital tool would help a Kirana Mitra track renewals and earn referral income?"
      ],
      entries: 1124
    },
    {
      id: 2,
      name: "Women as Wealth Architects",
      icon: "👩‍💼",
      color: "#C855FF",
      glow: "rgba(200,85,255,0.3)",
      gradient: "linear-gradient(135deg, rgba(200,85,255,0.18), rgba(120,0,200,0.06))",
      hook: "What if every ASHA worker, every SHG member, every homemaker was financially protected — and financially empowering others?",
      brief: "Women make 70% of household decisions in India but own less than 20% of life insurance policies. From ASHA workers to gig economy participants to homemakers — there's an untapped segment that sits at the intersection of trust, community, and financial exclusion. Solve for them.",
      prompts: [
        "Interview 3 women in your city across different income levels about their relationship with life insurance.",
        "Design a 'financial protection passport' for a woman entering the gig economy.",
        "How would you gamify saving behavior for an SHG (Self Help Group) to unlock insurance access?"
      ],
      entries: 876
    },
    {
      id: 3,
      name: "GenZ & the Protection Gap",
      icon: "📱",
      color: "#00D4B8",
      glow: "rgba(0,212,184,0.3)",
      gradient: "linear-gradient(135deg, rgba(0,212,184,0.18), rgba(0,168,232,0.06))",
      hook: "Gen Z buys sneakers with EMI. Why not life insurance with a swipe?",
      brief: "India's 18–30 age cohort is the largest it has ever been. They invest in crypto, buy travel insurance for trips, and use BNPL for gadgets — but life insurance penetration in this segment is under 5%. Design a product, experience, or distribution innovation that makes protection feel as natural as a UPI payment.",
      prompts: [
        "Build a UX prototype of an insurance product that could be sold entirely through Instagram Stories.",
        "What would a 'life insurance score' look like if it worked like a CIBIL score for young Indians?",
        "Design a life insurance product for a 22-year-old freelance content creator with no fixed income."
      ],
      entries: 1456
    },
    {
      id: 4,
      name: "Climate & the Uninsured Farmer",
      icon: "🌾",
      color: "#F5C842",
      glow: "rgba(245,200,66,0.3)",
      gradient: "linear-gradient(135deg, rgba(245,200,66,0.18), rgba(255,138,0,0.06))",
      hook: "When climate destroys a harvest, it also destroys a family's future. Life insurance must show up before the flood.",
      brief: "India has 120 million farming households. Climate change is increasing mortality risk in agricultural communities — floods, heatwaves, crop failure, debt, and farmer suicides are tragically linked. Design an innovation connecting life insurance to the agricultural ecosystem, where premiums, claims, and distribution are built around farming cycles and rural digital infrastructure.",
      prompts: [
        "Map the 'financial shock journey' of a farming family after a flood and identify where life insurance could intervene.",
        "Design a life insurance product tied to weather data that auto-adjusts premiums based on climate risk.",
        "How could the PM-Kisan database be used ethically to identify and reach uninsured farming families?"
      ],
      entries: 762
    },
    {
      id: 5,
      name: "The Invisible Workforce",
      icon: "🚗",
      color: "#00B5EF",
      glow: "rgba(0,181,239,0.3)",
      gradient: "linear-gradient(135deg, rgba(0,181,239,0.18), rgba(41,32,117,0.08))",
      hook: "Zomato delivers your dinner. Ola drops you home. Who insures their tomorrow?",
      brief: "India has 80+ million gig economy workers — delivery agents, cab drivers, domestic workers, construction labourers, street vendors. They are the backbone of urban India. They have no employer, no PF, no safety net. Design a life insurance solution that works for India's informal workforce — where the product, premium, and claim process fits their irregular income, digital literacy, and daily reality.",
      prompts: [
        "Spend a day with a delivery partner and map every financial risk they face in 24 hours.",
        "Design a 'micro-life insurance' product where a ₹5 daily contribution provides meaningful cover.",
        "How could platform companies (Zomato, Ola, Swiggy) be structured as insurance distributors for their own workers?"
      ],
      entries: 654
    }
  ],

  /* ── Past Winners (Idea Hub) ──────────────────────────────── */
  pastWinners: [
    {
      id: "w1",
      edition: 2,
      year: 2025,
      title: "Three-Pillar Growth Strategy",
      college: "SPJIMR Mumbai",
      theme: "Insurance Penetration",
      summary: "An innovative expansion framework featuring 'PAN-Plus' account bundling, 'Evolve' flexible policies for Gen Z/gig workers, and AI/WhatsApp digital agent tools.",
      icon: "📦",
      isWinner: true,
      rankText: "National Champion"
    },
    {
      id: "w2",
      edition: 2,
      year: 2025,
      title: "ValueVerse",
      college: "IIM Shillong",
      theme: "Customer Value Protection",
      summary: "An innovative customer value protection solution designed to expand coverage and address the life insurance needs of underpenetrated demographics.",
      icon: "🌉",
      isWinner: false,
      rankText: "National 1st Runner-Up"
    },
    {
      id: "w3",
      edition: 2,
      year: 2025,
      title: "Impromptu Micro-Insurance",
      college: "IIM Lucknow",
      theme: "Rural Distribution",
      summary: "A digital micro-insurance ecosystem integrating local village logistics networks to enable swift, trusted onboarding for rural populations.",
      icon: "🌾",
      isWinner: false,
      rankText: "National 2nd Runner-Up"
    },
    {
      id: "w5",
      edition: 2,
      year: 2025,
      title: "ASHA Protection Framework",
      college: "MICA Ahmedabad",
      theme: "Women Architects",
      summary: "A community-focused micro-insurance model empowering local ASHA workers and self-help groups as trusted brand advocates to scale women's insurance coverage.",
      icon: "👩‍💼",
      isWinner: false,
      rankText: "National 2nd Runner-Up"
    },
    {
      id: "w4",
      edition: 1,
      year: 2024,
      title: "InsurBridge",
      college: "XIME Bangalore",
      theme: "Hyperlocal Distribution",
      summary: "A hyperlocal insurance distribution model using trained 'Bima Sakhi' (women micro-entrepreneurs) as last-mile agents, reducing CAC by 68% in tier-3 markets.",
      icon: "🤝",
      isWinner: true,
      rankText: "National Champion"
    }
  ],

  /* ── Leaderboard (Hall of Fame Archive) ──────────────────── */
  leaderboard: [
    { rank: 1,  college: "SPJIMR Mumbai",          entry: "GigShield Pro",   theme: "Invisible Workforce",  phase: "Winner (2.0)", city: "Mumbai" },
    { rank: 2,  college: "IIM Shillong",           entry: "AgriLife360",     theme: "Climate & Farmer",     phase: "Runner-Up (2.0)", city: "Shillong" },
    { rank: 3,  college: "IIM Lucknow",            entry: "DigiShield Parampara", theme: "Kirana to Coverage",  phase: "2nd Runner-Up (2.0)", city: "Lucknow" },
    { rank: 3,  college: "MICA Ahmedabad",         entry: "Bima Sakhi Connect", theme: "Women Architects",     phase: "2nd Runner-Up (2.0)", city: "Ahmedabad" },
    { rank: 4,  college: "XIME Bangalore",         entry: "Mitra360",        theme: "Kirana to Coverage",   phase: "Winner (1.0)", city: "Bangalore" },
    { rank: 5,  college: "FMS Delhi",              entry: "SwipeLife",       theme: "GenZ Protection",      phase: "Finalist (2.0)", city: "Delhi"     },
    { rank: 6,  college: "IIM Bangalore",          entry: "KiranaInsure",    theme: "Kirana to Coverage",   phase: "Finalist (2.0)", city: "Bangalore" },
    { rank: 7,  college: "IIFT Delhi",             entry: "BoltCover",       theme: "Invisible Workforce",  phase: "Finalist (2.0)", city: "Delhi"     },
    { rank: 8,  college: "TISS Mumbai",            entry: "SHGFirst",        theme: "Women Architects",     phase: "Finalist (2.0)", city: "Mumbai"    },
    { rank: 9,  college: "MDI Gurgaon",            entry: "TapInsure",       theme: "GenZ Protection",      phase: "Finalist (2.0)", city: "Gurgaon"   },
    { rank: 10, college: "IIM Kozhikode",          entry: "RainCover",       theme: "Climate & Farmer",     phase: "Finalist (2.0)", city: "Kozhikode" },
    { rank: 11, college: "SP Jain Mumbai",         entry: "FlexLife",        theme: "GenZ Protection",      phase: "Qualifier (2.0)", city: "Mumbai"    },
    { rank: 12, college: "Great Lakes Chennai",    entry: "AgriPulse",       theme: "Climate & Farmer",     phase: "Qualifier (2.0)", city: "Chennai"   },
    { rank: 13, college: "SIBM Pune",              entry: "DidiCover",       theme: "Women Architects",     phase: "Qualifier (2.0)", city: "Pune"      },
    { rank: 14, college: "NMIMS Mumbai",           entry: "DeliverSafe",     theme: "Invisible Workforce",  phase: "Qualifier (2.0)", city: "Mumbai"    },
    { rank: 15, college: "IMT Ghaziabad",          entry: "NeighborLife",    theme: "Kirana to Coverage",   phase: "Qualifier (2.0)", city: "Ghaziabad" },
  ],

  /* ── Learning Modules ────────────────────────────────────── */
  modules: [
    { id: 1, icon: "🔍", title: "Problem Identification",       duration: "25 min", xp: 100, color: "#FF6B1A", bg: "rgba(255,107,26,0.12)", status: "complete", desc: "Learn to identify real-world problems worth solving." },
    { id: 2, icon: "💡", title: "DIVE Framework",               duration: "40 min", xp: 200, color: "#C855FF", bg: "rgba(200,85,255,0.12)", status: "complete", desc: "Discover, Ideate, Validate, Elevate — the IdeationX thinking model." },
    { id: 3, icon: "🧠", title: "Design Thinking",              duration: "35 min", xp: 150, color: "#00D4B8", bg: "rgba(0,212,184,0.12)", status: "active",   desc: "Human-centred design methods for insurance innovation." },
    { id: 4, icon: "📊", title: "Research Fundamentals",        duration: "30 min", xp: 120, color: "#F5C842", bg: "rgba(245,200,66,0.12)", status: "locked",   desc: "Primary and secondary research techniques for Bharat markets." },
    { id: 5, icon: "📖", title: "Storytelling & Pitching",      duration: "45 min", xp: 180, color: "#FF6B1A", bg: "rgba(255,107,26,0.12)", status: "locked",   desc: "Craft narratives that move juries, investors, and partners." },
    { id: 6, icon: "🎤", title: "Public Speaking",              duration: "30 min", xp: 120, color: "#00B5EF", bg: "rgba(0,181,239,0.12)", status: "locked",   desc: "Presentation skills and stage presence masterclass." },
    { id: 7, icon: "📐", title: "Presentation Design",          duration: "25 min", xp: 100, color: "#C855FF", bg: "rgba(200,85,255,0.12)", status: "locked",   desc: "Visual communication and slide design that stands out." },
    { id: 8, icon: "💰", title: "Financial Literacy",           duration: "40 min", xp: 160, color: "#F5C842", bg: "rgba(245,200,66,0.12)", status: "locked",   desc: "Unit economics, business models, and insurance-specific finance." },
  ],

  /* ── Mentors ──────────────────────────────────────────────── */
  mentors: [
    { name: "Ravi Krishnamurthy", role: "Chief Innovation Officer", company: "SBI Life Insurance", avatar: "RK", color: "#FF6B1A", session: "Aug 18, 2026 — 4:00 PM", topic: "Building for Bharat: Why Insurance is the Next Frontier" },
    { name: "Priya Shankar",       role: "Partner",                  company: "McKinsey & Co.",    avatar: "PS", color: "#C855FF", session: "Sep 2, 2026 — 5:00 PM",  topic: "Cracking the Last-Mile Distribution Problem" },
    { name: "Arjun Mehta",         role: "Co-Founder",               company: "PolicyBazaar",      avatar: "AM", color: "#00D4B8", session: "Sep 15, 2026 — 6:00 PM", topic: "InsurTech: What Students Get Wrong (And Right)" },
    { name: "Sunitha Rao",         role: "VP Digital Products",      company: "SBI Life Insurance", avatar: "SR", color: "#F5C842", session: "Oct 1, 2026 — 4:30 PM",  topic: "From Idea to MVP: A Product Manager's Playbook" },
    { name: "Dr. Vivek Bindra",    role: "Business Coach",           company: "Bada Business",     avatar: "VB", color: "#00B5EF", session: "Oct 20, 2026 — 5:00 PM", topic: "Pitching to Win: The IdeationX Winning Formula" },
  ],

  /* ── Campus Calendar ─────────────────────────────────────── */
  campusCalendar: [
    { college: "IIM Ahmedabad",           city: "Ahmedabad", state: "Gujarat",         date: "Aug 5",  month: "Aug", day: "5",  status: "done"     },
    { college: "IIM Bangalore",           city: "Bangalore", state: "Karnataka",       date: "Aug 7",  month: "Aug", day: "7",  status: "done"     },
    { college: "SPJIMR Mumbai",           city: "Mumbai",    state: "Maharashtra",     date: "Aug 8",  month: "Aug", day: "8",  status: "done"     },
    { college: "FMS Delhi",               city: "Delhi",     state: "Delhi",           date: "Aug 10", month: "Aug", day: "10", status: "done"     },
    { college: "XLRI Jamshedpur",         city: "Jamshedpur",state: "Jharkhand",       date: "Aug 12", month: "Aug", day: "12", status: "done"     },
    { college: "IIM Kolkata",             city: "Kolkata",   state: "West Bengal",     date: "Aug 14", month: "Aug", day: "14", status: "done"     },
    { college: "MDI Gurgaon",             city: "Gurgaon",   state: "Haryana",         date: "Aug 15", month: "Aug", day: "15", status: "done"     },
    { college: "TISS Mumbai",             city: "Mumbai",    state: "Maharashtra",     date: "Aug 18", month: "Aug", day: "18", status: "done"     },
    { college: "Great Lakes Chennai",     city: "Chennai",   state: "Tamil Nadu",      date: "Aug 20", month: "Aug", day: "20", status: "done"     },
    { college: "MICA Ahmedabad",          city: "Ahmedabad", state: "Gujarat",         date: "Aug 22", month: "Aug", day: "22", status: "done"     },
    { college: "NMIMS Mumbai",            city: "Mumbai",    state: "Maharashtra",     date: "Aug 25", month: "Aug", day: "25", status: "done"     },
    { college: "Symbiosis Pune",          city: "Pune",      state: "Maharashtra",     date: "Aug 27", month: "Aug", day: "27", status: "done"     },
    { college: "IMT Ghaziabad",           city: "Ghaziabad", state: "Uttar Pradesh",   date: "Aug 28", month: "Aug", day: "28", status: "done"     },
    { college: "IIFT Delhi",              city: "Delhi",     state: "Delhi",           date: "Sep 1",  month: "Sep", day: "1",  status: "done"     },
    { college: "SP Jain Mumbai",          city: "Mumbai",    state: "Maharashtra",     date: "Sep 3",  month: "Sep", day: "3",  status: "done"     },
    { college: "IIM Lucknow",             city: "Lucknow",   state: "Uttar Pradesh",   date: "Sep 5",  month: "Sep", day: "5",  status: "done"     },
    { college: "SIBM Pune",               city: "Pune",      state: "Maharashtra",     date: "Sep 8",  month: "Sep", day: "8",  status: "done"     },
    { college: "Welingkar Mumbai",        city: "Mumbai",    state: "Maharashtra",     date: "Sep 10", month: "Sep", day: "10", status: "done"     },
    { college: "Amity Noida",             city: "Noida",     state: "Uttar Pradesh",   date: "Sep 12", month: "Sep", day: "12", status: "done"     },
    { college: "IRMA Anand",              city: "Anand",     state: "Gujarat",         date: "Sep 14", month: "Sep", day: "14", status: "done"     },
    { college: "XIME Bangalore",          city: "Bangalore", state: "Karnataka",       date: "Sep 15", month: "Sep", day: "15", status: "done"     },
    { college: "IIM Indore",              city: "Indore",    state: "Madhya Pradesh",  date: "Sep 18", month: "Sep", day: "18", status: "done"     },
    { college: "FORE School Delhi",       city: "Delhi",     state: "Delhi",           date: "Sep 20", month: "Sep", day: "20", status: "done"     },
    { college: "IIM Shillong",            city: "Shillong",  state: "Meghalaya",       date: "Sep 22", month: "Sep", day: "22", status: "done"     },
    { college: "BIT Mesra Ranchi",        city: "Ranchi",    state: "Jharkhand",       date: "Sep 25", month: "Sep", day: "25", status: "upcoming" },
    { college: "NIT Trichy",              city: "Trichy",    state: "Tamil Nadu",      date: "Sep 27", month: "Sep", day: "27", status: "upcoming" },
    { college: "BITS Pilani",             city: "Pilani",    state: "Rajasthan",       date: "Sep 28", month: "Sep", day: "28", status: "upcoming" },
    { college: "IIT Bombay (MBA)",        city: "Mumbai",    state: "Maharashtra",     date: "Sep 30", month: "Sep", day: "30", status: "upcoming" },
    { college: "IIT Delhi (MBA)",         city: "Delhi",     state: "Delhi",           date: "Oct 2",  month: "Oct", day: "2",  status: "upcoming" },
    { college: "Jadavpur University",     city: "Kolkata",   state: "West Bengal",     date: "Oct 4",  month: "Oct", day: "4",  status: "upcoming" },
  ],

  /* ── Community Posts ─────────────────────────────────────── */
  communityPosts: [
    { id: 1, name: "Aisha Khan",    college: "FMS Delhi",          avatar: "AK", color: "#FF6B1A", time: "2h ago",  text: "🔥 Just finished the DIVE Framework module — the 'Validate' step completely changed how I think about our idea. Anyone else working on the GenZ theme? Would love to connect and exchange notes!", likes: 34, replies: 12, theme: "GenZ Protection" },
    { id: 2, name: "Rohan Mehta",   college: "MICA Ahmedabad",     avatar: "RM", color: "#C855FF", time: "4h ago",  text: "Team of 2 looking for a third member with product/design background. We're building on the Kirana to Coverage theme — we have the distribution model, need someone to help design the user journey 🙏", likes: 21, replies: 8,  theme: "Kirana to Coverage" },
    { id: 3, name: "Priya Nair",    college: "XLRI Jamshedpur",    avatar: "PN", color: "#00D4B8", time: "6h ago",  text: "💡 Bharat Challenge of the week: Spent 3 hours at a local mandi interviewing farmers. The insight that hit me — most farmers think life insurance is 'for city people'. The branding problem is as big as the product problem.", likes: 67, replies: 23, theme: "Climate & Farmer" },
    { id: 4, name: "Vikram Singh",  college: "IIM Lucknow",        avatar: "VS", color: "#F5C842", time: "8h ago",  text: "Just uploaded our submission! 10 weeks of research, 3 failed prototypes, and one eureka moment at 2am. Whatever happens in the evaluation, this process has been incredible. #IdeationX2026 #BharatBeginsWithAnIdea", likes: 89, replies: 31, theme: "Invisible Workforce" },
    { id: 5, name: "Sneha Reddy",   college: "NMIMS Mumbai",       avatar: "SR", color: "#00B5EF", time: "12h ago", text: "Resource Library gold: The Customer Persona worksheet completely transformed our research approach. We went from generic assumptions to actual interviews. 5/5 would recommend to every team 📋", likes: 45, replies: 14, theme: "Women Architects" },
  ],

  /* ── Bharat Weekly Challenges ─────────────────────────────── */
  weeklyChallenges: [
    {
      week: 8,
      title: "The 60-Second Pitch Challenge",
      prompt: "Record a 60-second video pitch of your IdeationX idea to a sceptical jury member. No slides. No props. Just you, your conviction, and your idea. What's the single most important thing you'd say?",
      deadline: "2026-10-20",
      submissions: 234,
      featured: [
        { name: "Aisha K.", college: "FMS Delhi", snippet: "Our farmers don't need more government schemes. They need the confidence that their family will eat even if they don't come home. That's what we're building." },
        { name: "Rohan M.", college: "MICA Ahmedabad", snippet: "The Kirana store owner knows your family better than any bank or insurance company ever will. We're just finally letting them help." }
      ]
    }
  ],

  /* ── Innovation Score Badges ──────────────────────────────── */
  badges: [
    { id: 1, icon: "fire", name: "First Step",      desc: "Completed profile",           earned: true  },
    { id: 2, icon: "book", name: "Learner",          desc: "First module complete",       earned: true  },
    { id: 3, icon: "brain", name: "DIVE Master",      desc: "DIVE Framework certified",    earned: true  },
    { id: 4, icon: "chat", name: "Community Voice",  desc: "First community post",        earned: true  },
    { id: 5, icon: "target", name: "Bharat Challenger",desc: "Weekly challenge submitted",  earned: true  },
    { id: 6, icon: "handshake", name: "Mentor Hour",      desc: "First live session attended", earned: false },
    { id: 7, icon: "document", name: "Submitter",        desc: "Entry submitted",             earned: false },
    { id: 8, icon: "star", name: "Qualifier",        desc: "Advanced to National Round",  earned: false },
    { id: 9, icon: "trophy", name: "Semi-Finalist",    desc: "Top 30 nationwide",           earned: false },
    { id: 10, icon: "medal", name: "Champion",        desc: "IdeationX 2026 Winner",       earned: false },
  ],

  /* ── Resources ────────────────────────────────────────────── */
  resources: [
    { icon: "🔍", name: "Research Template",           type: "XLSX", size: "142 KB", downloads: 2341 },
    { icon: "📊", name: "Presentation Template",       type: "PPTX", size: "4.2 MB", downloads: 3892 },
    { icon: "📋", name: "Business Model Canvas",       type: "PDF",  size: "280 KB", downloads: 2876 },
    { icon: "📈", name: "SWOT Template",               type: "DOCX", size: "98 KB",  downloads: 1654 },
    { icon: "👤", name: "Customer Persona Worksheet",  type: "PDF",  size: "312 KB", downloads: 2190 },
    { icon: "🎯", name: "Pitch Deck Template",         type: "PPTX", size: "6.8 MB", downloads: 4210 },
    { icon: "🗺️", name: "Problem Statement Canvas",   type: "PDF",  size: "198 KB", downloads: 1987 },
  ]
};

// Freeze for safety
Object.freeze(IdeationXData);
