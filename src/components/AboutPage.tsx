import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeDBackground } from './ThreeDBackground';
import saltIndustryImage from '../assets/images/pearl_coast_salt_industry_1781983273200.jpg';
import giCraftsImage from '../assets/images/traditional_gi_crafts_1782023184184.jpg';
import { 
  Building2, 
  MapPin, 
  Anchor, 
  Waves, 
  Sun, 
  Wind, 
  Sprout, 
  Search, 
  BookOpen, 
  Award, 
  Palette,
  Sparkles, 
  Compass, 
  Heart, 
  Maximize2, 
  Briefcase, 
  GraduationCap, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  Map,
  Layers,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Sub-interfaces for District data
interface Taluk {
  id: string;
  name: string;
  tamilName: string;
  primaryResources: string[];
  category: 'Coastal' | 'Industrial' | 'River Basin / Agri' | 'Dryland / Wind';
  description: string;
  heritage: string;
  stats: string;
  gps: string;
}

interface ResourceCategory {
  title: string;
  category: string;
  statLabel: string;
  statValue: string;
  description: string;
  image: string;
  keyDrivers: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const TALUKS_DATA: Taluk[] = [
  {
    id: 'thoothukudi',
    name: 'Thoothukudi (Tuticorin)',
    tamilName: 'தூத்துக்குடி',
    primaryResources: ['Salt Production', 'Deep-sea Shipping', 'Thermal Power', 'Chemical Plants'],
    category: 'Coastal',
    description: 'The administrative heart and major deep-water port city. Famous for pearl fishing historical legacy, major energy plants, chemical industries, and producing 70% of Tamil Nadu\'s salt across vast coastal salt pans.',
    heritage: 'Home of V.O. Chidambaranar Port Trust and iconic salt works established in pre-colonial eras.',
    stats: 'Produces over 20 Lakh Tonnes of salt annually.',
    gps: '8.7610° N, 78.1348° E'
  },
  {
    id: 'kovilpatti',
    name: 'Kovilpatti',
    tamilName: 'கோவில்பட்டி',
    primaryResources: ['Matchbox Industries', 'Textiles', 'Fireworks', 'Kadalai Mittai (GI)'],
    category: 'Industrial',
    description: 'An aggressive industrial growth center known across India for safety matchbox manufacturing, cotton spinning mills, and traditional fireworks units. Creator of the famous peanut candy "Kovilpatti Kadalai Mittai".',
    heritage: 'Celebrated for Kovilpatti Kadalai Mittai, which holds the official Geographical Indication (GI) tag.',
    stats: 'Over 300+ matchbox manufacturing operations.',
    gps: '9.1764° N, 77.8765° E'
  },
  {
    id: 'tiruchendur',
    name: 'Tiruchendur',
    tamilName: 'திருச்செந்தூர்',
    primaryResources: ['Beach Salt-pans', 'Coir Making', 'Palmyra Products', 'Coastal Tourism'],
    category: 'Coastal',
    description: 'A legendary shoreline town centered on ancient salt extraction, fishing settlements, and massive palm juice collection. It hosts millions of tourists annually at the seaside temple.',
    heritage: 'Famous for the ancient seaside Subramanya Swamy Temple, coconut groves, and hand-woven palm works.',
    stats: 'Handles 4+ Million annual spiritual tourists.',
    gps: '8.4842° N, 78.1218° E'
  },
  {
    id: 'srivaikuntam',
    name: 'Srivaikuntam',
    tamilName: 'ஸ்ரீவைகுண்டம்',
    primaryResources: ['River Bananas', 'Wet-land Paddy', 'Irrigation Canals', 'Clay Pottery'],
    category: 'River Basin / Agri',
    description: 'An agricultural paradise fed directly by the Thamirabarani River. Famous for exporting premium bananas, rich clay soil pottery, and a highly engineered historic canal irrigation architecture.',
    heritage: 'Ancient Srivaikuntanathan temple and Thamirabarani river check-dams powering regional canals.',
    stats: 'Over 12,000 hectares of perennial banana plantations.',
    gps: '8.6318° N, 77.9155° E'
  },
  {
    id: 'ottapidaram',
    name: 'Ottapidaram',
    tamilName: 'ஒட்டப்பிடாரம்',
    primaryResources: ['Dryland Pulses', 'Wind Turbine Farms', 'Cotton Crops', 'Historic Monuments'],
    category: 'Dryland / Wind',
    description: 'The largest taluk by total land area, utilizing vast open layouts for massive wind generator farms. It has dry soil suitable for cotton, black gram, green gram, and sesame.',
    heritage: 'Birthplace of Kappalottiya Thamizhan V.O. Chidambaranar and freedom fighter Veerapandiya Kattabomman.',
    stats: 'Hosts 250+ ultra-capacity green wind turbines.',
    gps: '8.9056° N, 78.0163° E'
  },
  {
    id: 'ettayapuram',
    name: 'Ettayapuram',
    tamilName: 'எட்டயபுரம்',
    primaryResources: ['Handloom Weaving', 'Cotton Cultivation', 'Oil Seeds', 'Folk Music Culture'],
    category: 'Industrial',
    description: 'A major handloom weaving node nestled inside vast cotton-growing rainfed plains. Known globally as a center for poetry, literature, and dryland grain preservation.',
    heritage: 'Historical birthplace of Mahakavi Subramania Bharathiyar, India\'s legendary national poet.',
    stats: 'Home to 5,000+ traditional artisan handloom weavers.',
    gps: '9.1481° N, 77.9944° E'
  },
  {
    id: 'vilathikulam',
    name: 'Vilathikulam',
    tamilName: 'விளாத்திகுளம்',
    primaryResources: ['Gundu Chilli (GI)', 'Dryland Agriculture', 'Charcoal', 'Desalination Schemes'],
    category: 'Dryland / Wind',
    description: 'Globally celebrated for the "Gundu Chilli" (fat round chili strain with GI Application). Cultivates red peppers, millet, and dry crops using highly resilient clay dryland farming methods.',
    heritage: 'Traditional heirloom seed vaults preserving the Vilathikulam Gundu Chilli variety.',
    stats: 'Chilli plantations sprawling over 15,000+ dryland acres.',
    gps: '9.1306° N, 78.1633° E'
  },
  {
    id: 'sathankulam',
    name: 'Sathankulam',
    tamilName: 'சாத்தான்குளம்',
    primaryResources: ['Palmyra Karupatti', 'Dairy Farms', 'Goat Husbandry', 'Palm-tree Handicrafts'],
    category: 'Dryland / Wind',
    description: 'A dedicated palm-tree country producing rich "Karupatti" (sweet Palmyra palm sugar) and traditional fiber products. Heavy dry grazing setups sustain dairy and massive goat herds.',
    heritage: 'Famous for the traditional pot-boiled Palmyra Jaggery (Karupatti) natural sweetener preparation.',
    stats: '3 Lakh+ matured Palmyra palms tapped for sweet nectar.',
    gps: '8.4388° N, 77.9126° E'
  },
  {
    id: 'eral',
    name: 'Eral',
    tamilName: 'ஏரல்',
    primaryResources: ['Brassware Crafts', 'Thamirabarani Bananas', 'Rural Trade Yards', 'Fish Hatcheries'],
    category: 'River Basin / Agri',
    description: 'A bustling market town running along the Thamirabarani delta. Renowned for custom handcrafted brassware, wet-rice fields, thriving fish breeding hatcheries, and banana wholesale yards.',
    heritage: 'Famous for the riverside Eral Chairman Temple and traditional metal-smithing craftsmen.',
    stats: 'Primary shipping market for regional agribusiness fruits.',
    gps: '8.6256° N, 78.0204° E'
  },
  {
    id: 'kayathar',
    name: 'Kayathar',
    tamilName: 'கயத்தாறு',
    primaryResources: ['Wind Turbines', 'Solar Power Parks', 'Dry Grains', 'Spices Grid'],
    category: 'Dryland / Wind',
    description: 'One of southern India\'s highest-velocity wind corridors, filled with windmills and expansive solar panel fields. Converts high dry winds into sustainable power for the state grid.',
    heritage: 'Memorial site commemorating the bravery of historic chieftain Veerapandiya Kattabomman.',
    stats: 'Generates 350+ Megawatts of renewable green energy.',
    gps: '8.9567° N, 77.7944° E'
  }
];

const RESOURCE_Sectors: ResourceCategory[] = [
  {
    title: "Sea Salt Extraction & Refinery",
    category: "The Pearl Coast Salt Industry",
    statLabel: "National Standing",
    statValue: "2nd in India",
    description: "Thoothukudi is the unchallenged salt capital of South India. Armed with dry, sunny weather conditions, minimal rain cycles, and a highly saline ocean coastline, over 25,000 acres are dedicated to crystal salt panning.",
    image: saltIndustryImage,
    keyDrivers: ["Tuticorin Salt Pans", "Industrial Salt Refineries", "Marine Chemical Processing", "Iodized Food Salt Export"],
    icon: Sun,
    color: "amber"
  },
  {
    title: "Maritime, Shipping & Port Logistics",
    category: "V.O. Chidambaranar Deepwater Port",
    statLabel: "Cargo Traffic",
    statValue: "38+ Million Tonnes",
    description: "Centering the strategic maritime shipping lanes of the Gulf of Mannar, the deep-water port of Tuticorin serves as the primary cargo lifeline for Southern India, handling bulk timber, copper, coal, and consumer container lines.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    keyDrivers: ["Container Terminal Gateways", "International Trade Logistics", "Ship Repair & Drydocks", "Deep Sea Cargo Hubs"],
    icon: Anchor,
    color: "sky"
  },
  {
    title: "Renewable Wind & Solar Corridors",
    category: "State Power Grid Core",
    statLabel: "Wind Capacity",
    statValue: "750+ Megawatts",
    description: "Characterized by sweeping dry plains and mountain pass gaps, the district holds premium wind velocity slots in Kayathar and Ottapidaram. Hundreds of windmills and immense solar farms feed the state with clean, zero-carbon electricity.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    keyDrivers: ["Kayathar Wind Farms", "Central Solar Grid Hubs", "Thermal Plant Power Reserves", "Private Energy Investments"],
    icon: Wind,
    color: "teal"
  },
  {
    title: "River Basin Bananas & Smart Agriculture",
    category: "Thamirabarani Perennial Irrigation",
    statLabel: "Agri Yield",
    statValue: "Top Banana Exporter",
    description: "In contrast to the dry plains, the historic Thamirabarani River winds through Srivaikuntam and Eral, leaving a lush ribbon of soil that nourishes premium sweet bananas, export-quality betel leaves, and robust wetland paddy.",
    image: "https://images.unsplash.com/photo-1566393028639-d108a42c46a7?auto=format&fit=crop&q=80&w=800",
    keyDrivers: ["Srivaikuntam Banana Canals", "Organic Rice Cultivation", "Tamil Nadu Agriculture Research", "Drip-irrigation Crop Networks"],
    icon: Sprout,
    color: "emerald"
  },
  {
    title: "Traditional Handlooms & Palm Leaf Crafts",
    category: "Geographical Indications & Rural Arts",
    statLabel: "Traditional Crafts",
    statValue: "Ettayapuram Handlooms & Palm Leaf Crafts",
    description: "Thoothukudi protects centuries of heritage, from the fine cotton Ettayapuram handwoven sarees and exquisite hand-crafted palm leaf baskets and ornaments to traditional clay pottery and Sathankulam organic palm jaggery.",
    image: giCraftsImage,
    keyDrivers: ["Ettayapuram Handloom Cluster", "Sathankulam Palm-Leaf Crafts", "Sathankulam Palm Jaggery", "Kovilpatti Kadalai Mittai GI"],
    icon: Palette,
    color: "purple"
  }
];



interface AboutPageProps {
  onExploreClick: () => void;
}

export default function AboutPage({ onExploreClick }: AboutPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Map of which taluk IDs are expanded. Open 'thoothukudi' by default to demonstrate expandability.
  const [expandedTaluks, setExpandedTaluks] = useState<Record<string, boolean>>({
    thoothukudi: true,
  });

  // Filter Taluks based on tab categories and search
  const filteredTaluks = TALUKS_DATA.filter(t => {
    const matchesTab = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.tamilName.includes(searchTerm) ||
                          t.primaryResources.some(r => r.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleTaluk = (id: string) => {
    setExpandedTaluks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = (filteredList: Taluk[]) => {
    const nextState: Record<string, boolean> = {};
    filteredList.forEach(t => {
      nextState[t.id] = true;
    });
    setExpandedTaluks(nextState);
  };

  const collapseAll = () => {
    setExpandedTaluks({});
  };

  return (
    <div id="about-us-page-wrapper" className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Hero Spotlight */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-slate-50 to-slate-50/20 text-slate-800 py-20 px-4 border-b border-slate-200">
        {/* Soft geometric particles */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <ThreeDBackground />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold tracking-widest uppercase mb-5 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
            <span>District Explorer &amp; Resource Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-950 max-w-4xl mx-auto leading-none">
            Exploring Thoothukudi
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-semibold tracking-[0.25em] text-emerald-800 uppercase font-mono">
            "The Pearl City" — தூத்துக்குடி மாண்பு
          </p>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From ancient maritime ports mentioned in early Sangam literature to today's premier hub of salt processing, heavy chemicals, and high-tech wind turbine arrays. Discover a district built on ecological pride, traditional crafts, and robust industrial potential.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12 pt-8 border-t border-slate-200">
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/10 transition-all duration-300 text-left relative overflow-hidden group shadow-sm shadow-slate-100/50">
              <Map className="h-10 w-10 text-amber-500 absolute -top-1 -right-1 opacity-10 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 block font-sans tracking-tight">10</span>
                <span className="text-slate-800 text-[11px] sm:text-xs font-black block mt-1 tracking-wide uppercase leading-tight">Administrative Taluks</span>
                <span className="text-[10px] text-amber-600 font-mono font-medium block mt-0.5 opacity-90">Subdivisions</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/10 transition-all duration-300 text-left relative overflow-hidden group shadow-sm shadow-slate-100/50">
              <Waves className="h-10 w-10 text-emerald-500 absolute -top-1 -right-1 opacity-10 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 block font-sans tracking-tight">163.5 KM</span>
                <span className="text-slate-800 text-[11px] sm:text-xs font-black block mt-1 tracking-wide uppercase leading-tight">Gulf of Mannar Coast</span>
                <span className="text-[10px] text-emerald-600 font-mono font-medium block mt-0.5 opacity-90">Maritime Line</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/10 transition-all duration-300 text-left relative overflow-hidden group shadow-sm shadow-slate-100/50">
              <Sun className="h-10 w-10 text-sky-500 absolute -top-1 -right-1 opacity-10 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl font-black text-sky-600 block font-sans tracking-tight">70%</span>
                <span className="text-slate-800 text-[11px] sm:text-xs font-black block mt-1 tracking-wide uppercase leading-tight">Tamil Nadu Salt Share</span>
                <span className="text-[10px] text-sky-600 font-mono font-medium block mt-0.5 opacity-90">Salt Harvest</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-teal-300 hover:bg-teal-50/10 transition-all duration-300 text-left relative overflow-hidden group shadow-sm shadow-slate-100/50">
              <Wind className="h-10 w-10 text-teal-500 absolute -top-1 -right-1 opacity-10 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl font-black text-teal-600 block font-sans tracking-tight">750+ MW</span>
                <span className="text-slate-800 text-[11px] sm:text-xs font-black block mt-1 tracking-wide uppercase leading-tight">Wind Corridor Capacity</span>
                <span className="text-[10px] text-teal-600 font-mono font-medium block mt-0.5 opacity-90">Power Grid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Primary Layout Shell: Collapsible Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Administrative Subdivisions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-2.5">
            The Ten Taluks of Thoothukudi
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
            Each region offers unique cultural landmarks, soil specialties, industrial clusters, and distinct socio-economic challenges. Click any card to expand its detailed assets in-place.
          </p>
        </div>

        {/* Search, Category Filter & Bulk actions */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-md p-4 sm:p-6 mb-8 max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 sm:gap-5">
            
            {/* Top row: Search input & Actions */}
            <div className="flex flex-col md:flex-row gap-3.5 md:items-center md:justify-between">
              {/* Search input with search icon */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald-600/70" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search administrative Taluk, crops, resources..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Status & Quick bulk controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 bg-slate-50 p-3 sm:px-4 sm:py-2 rounded-xl border border-slate-150 w-full md:w-auto">
                <span className="text-xs font-mono text-slate-600 font-bold flex items-center justify-center sm:justify-start gap-1.5 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span>{filteredTaluks.length} of {TALUKS_DATA.length} Regions</span>
                </span>
                <div className="hidden sm:block h-4 w-[1px] bg-slate-200 shrink-0"></div>
                <div className="flex justify-center gap-3 whitespace-nowrap text-xs">
                  <button
                    onClick={() => expandAll(filteredTaluks)}
                    className="font-bold text-emerald-700 hover:text-emerald-950 cursor-pointer transition-colors"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={collapseAll}
                    className="font-bold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* Separator - Hidden on smallest screens to optimize vertical spaces */}
            <div className="h-[1px] bg-slate-100 w-full hidden sm:block"></div>

            {/* Bottom Row: Elegant Filter Category Carousel/Flex container */}
            <div className="flex flex-col gap-1.5 sm:gap-2 text-left">
              <span className="text-[10px] font-mono tracking-widest font-black text-slate-400 uppercase">
                Filter by Administrative Classification
              </span>
              {/* Category tabs: wrapped cleanly on all screens (phone, tablet, laptop) inside the container */}
              <div id="division-filter-buttons-wrapper" className="flex flex-wrap gap-2 pt-1 w-full">
                {[
                  { name: 'All', label: 'All Divisions', icon: Layers, activeClass: 'bg-slate-900 text-white border-slate-950 shadow-md shadow-slate-900/10' },
                  { name: 'Coastal', label: 'Coastal Corridor', icon: Waves, activeClass: 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-500/10' },
                  { name: 'Industrial', label: 'Industrial Corridor', icon: Building2, activeClass: 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/10' },
                  { name: 'River Basin / Agri', label: 'River Basin / Agri', icon: Sprout, activeClass: 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/10' },
                  { name: 'Dryland / Wind', label: 'Dryland / Windways', icon: Wind, activeClass: 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/10' },
                ].map((catItem) => {
                  const CatIconComponent = catItem.icon;
                  const isSelected = selectedCategory === catItem.name;
                  return (
                    <button
                      key={catItem.name}
                      onClick={() => setSelectedCategory(catItem.name)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all duration-300 border ${
                        isSelected
                           ? catItem.activeClass
                           : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <CatIconComponent className={`h-4 w-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{catItem.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Real-time Expandable Cards Grid */}
        <div className="max-w-5xl mx-auto border-t border-slate-100/50 pt-6">
          {filteredTaluks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTaluks.map((t) => {
                const isExpanded = !!expandedTaluks[t.id];
                
                // Set Up styling and icons based on Category
                let catColorClass = "bg-sky-50 text-sky-800 border-sky-200 animate-fade";
                let iconBgClass = "bg-sky-100 text-sky-700";
                let cardAccentBorder = "border-slate-200 hover:border-sky-350 hover:shadow-md hover:shadow-sky-500/5";
                let cardAccentHeader = "from-sky-50/45 via-white to-white";
                let CatIcon = Anchor;
                let categoryLabel = "Coastal";
                let cardBorderLeft = "border-l-4 border-l-sky-500";
                let resourceBadgeClass = "bg-sky-50/70 hover:bg-sky-100/90 text-sky-800 border-sky-100/80 shadow-2xs";
                let expandedBg = "bg-gradient-to-br from-white to-sky-50/15";
                let themeText = "text-sky-850";

                if (t.category === 'Industrial') {
                  catColorClass = "bg-amber-50 text-amber-800 border-amber-200";
                  iconBgClass = "bg-amber-100 text-amber-700";
                  cardAccentBorder = "border-slate-200 hover:border-amber-350 hover:shadow-md hover:shadow-amber-500/5";
                  cardAccentHeader = "from-amber-50/45 via-white to-white";
                  CatIcon = Building2;
                  categoryLabel = "Industrial Corridor";
                  cardBorderLeft = "border-l-4 border-l-amber-500";
                  resourceBadgeClass = "bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 border-amber-100/80 shadow-2xs";
                  expandedBg = "bg-gradient-to-br from-white to-amber-50/15";
                  themeText = "text-amber-900";
                } else if (t.category === 'River Basin / Agri') {
                  catColorClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
                  iconBgClass = "bg-emerald-100 text-emerald-700";
                  cardAccentBorder = "border-slate-200 hover:border-emerald-350 hover:shadow-md hover:shadow-emerald-500/5";
                  cardAccentHeader = "from-emerald-50/45 via-white to-white";
                  CatIcon = Sprout;
                  categoryLabel = "River Basin Irrigation";
                  cardBorderLeft = "border-l-4 border-l-emerald-500";
                  resourceBadgeClass = "bg-emerald-50/70 hover:bg-emerald-100/90 text-emerald-950 border-emerald-100/80 shadow-2xs";
                  expandedBg = "bg-gradient-to-br from-white to-emerald-50/15";
                  themeText = "text-emerald-850";
                } else if (t.category === 'Dryland / Wind') {
                  catColorClass = "bg-purple-50 text-purple-800 border-purple-200";
                  iconBgClass = "bg-purple-100 text-purple-700";
                  cardAccentBorder = "border-slate-200 hover:border-purple-350 hover:shadow-md hover:shadow-purple-500/5";
                  cardAccentHeader = "from-purple-50/45 via-white to-white";
                  CatIcon = Wind;
                  categoryLabel = "Dryland Windways";
                  cardBorderLeft = "border-l-4 border-l-purple-500";
                  resourceBadgeClass = "bg-purple-50/70 hover:bg-purple-100/90 text-purple-900 border-purple-100/80 shadow-2xs";
                  expandedBg = "bg-gradient-to-br from-white to-purple-50/15";
                  themeText = "text-purple-850";
                }

                return (
                  <motion.div
                    key={t.id}
                    layout="position"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white rounded-2xl border ${cardBorderLeft} transition-all duration-300 overflow-hidden shadow-xs flex flex-col ${
                      isExpanded 
                        ? 'border-slate-350 ring-2 ring-slate-500/10 shadow-lg md:col-span-2 shadow-slate-500/5' 
                        : cardAccentBorder
                    }`}
                  >
                    {/* Header trigger block */}
                    <div 
                      onClick={() => toggleTaluk(t.id)}
                      className={`p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-gradient-to-b ${cardAccentHeader} hover:bg-slate-50/50 transition-colors`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${iconBgClass}`}>
                          <CatIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-display font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                              {t.name}
                            </h3>
                            <span className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md font-sans">
                              {t.tamilName}
                            </span>
                          </div>
                          
                          {/* Brief Category Badge under it */}
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className={`text-[10px] sm:text-[11px] font-mono tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${catColorClass}`}>
                              {categoryLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono font-bold whitespace-nowrap">• {t.gps.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expand Chevron helper */}
                      <button 
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-450 transition-colors shrink-0 max-h-8 align-middle self-center font-bold"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                    </div>

                    {/* ALWAYS VISIBLE DETAILED RESOURCE CLUSTER: Resources list (no truncation!) */}
                    <div className="px-5 pb-4 border-b border-slate-105 bg-linear-to-b from-white to-slate-50/20">
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {t.primaryResources.map((res, i) => (
                          <span 
                            key={i} 
                            className={`text-[11px] font-sans font-semibold border px-2.5 py-1 rounded-lg transition-colors cursor-default ${resourceBadgeClass}`}
                          >
                            ✦ {res}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* EXPANDABLE INLINE SEGMENT */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={`overflow-hidden ${expandedBg}`}
                        >
                          <div className="p-5 sm:p-6 border-t border-slate-100 text-left space-y-5">
                            
                            {/* Grid inside expanded card: two columns for richer details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
                              {/* Left Column: Economy & resources */}
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-[10px] font-mono uppercase tracking-widest font-black text-slate-400 block">
                                    Economic Potential &amp; Resources
                                  </h4>
                                  <p className="text-sm text-slate-700 leading-relaxed font-sans mt-1.5 select-text font-medium">
                                    {t.description}
                                  </p>
                                </div>
                                
                                <div className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-sm">
                                  <div className="flex items-center gap-2.5 bg-transparent">
                                    <Award className="h-5.5 w-5.5 text-amber-400 shrink-0" />
                                    <div>
                                      <span className="text-[9px] uppercase font-mono tracking-widest font-bold text-slate-400 block">Regional Stat Baseline</span>
                                      <span className="text-xs sm:text-sm font-sans font-black text-white">{t.stats}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column: Heritage & GPS info */}
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs">
                                  <h4 className={`text-[10px] font-mono uppercase tracking-widest font-black ${themeText} flex items-center gap-1`}>
                                    <BookOpen className="h-3.5 w-3.5 animate-pulse" />
                                    <span>Heritage &amp; Culture</span>
                                  </h4>
                                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-1.5 font-medium">
                                    {t.heritage}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
                                  <div className="flex items-center gap-2">
                                    <Compass className="h-4.5 w-4.5 text-indigo-500 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                                    <div>
                                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Localization GPS</span>
                                      <span className="text-xs font-mono font-bold text-slate-700">{t.gps}</span>
                                    </div>
                                  </div>

                                  <button
                                    onClick={onExploreClick}
                                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 shadow-2xs cursor-pointer select-none"
                                  >
                                    <span>Welfare Needs</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 font-sans max-w-xl mx-auto shadow-xs">
              <Compass className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-extrabold text-slate-800">No Taluks Match Filters</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-medium">
                No administrative subdivisions match "{searchTerm}". Try checking your spelling or clear categories to view all.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-xs shadow-2xs rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Restore Directory Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Deep Resource Profile Sections (Attractive Bento Grid with Images) */}
      <section className="bg-gradient-to-b from-stone-50 to-slate-100 py-20 mt-20 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              ECOLOGICAL &amp; INDUSTRIAL POTENTIAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-2.5">
              Comprehensive Resource Inventory
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
              Detailed review of the district's natural riches, export systems, and specialized industrial sectors that form the foundation of our local economy.
            </p>
          </div>

          {/* Bento-style grid to showcase each major resource sectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESOURCE_Sectors.map((sector, index) => {
              const IconComp = sector.icon;

              // Define dynamic color tokens based on sector.color
              let badgeColor = "text-amber-400";
              let metricBg = "bg-amber-800/95 border-amber-600/30";
              let checkIconColor = "text-amber-200";
              let titleHoverColor = "group-hover:text-amber-800";
              let borderHoverColor = "hover:border-amber-500/35 hover:shadow-lg hover:shadow-amber-500/5";
              let keyDriverBg = "bg-amber-50/70 text-amber-900 border-amber-100/80";
              let indicatorDotColor = "bg-amber-500";
              let textHighlightColor = "text-amber-800 font-bold";

              if (sector.color === 'sky') {
                badgeColor = "text-sky-400";
                metricBg = "bg-sky-800/95 border-sky-600/30";
                checkIconColor = "text-sky-200";
                titleHoverColor = "group-hover:text-sky-800";
                borderHoverColor = "hover:border-sky-500/35 hover:shadow-lg hover:shadow-sky-500/5";
                keyDriverBg = "bg-sky-50/70 text-sky-900 border-sky-100/80";
                indicatorDotColor = "bg-sky-500";
                textHighlightColor = "text-sky-850 font-bold";
              } else if (sector.color === 'teal') {
                badgeColor = "text-teal-400";
                metricBg = "bg-teal-800/95 border-teal-600/30";
                checkIconColor = "text-teal-200";
                titleHoverColor = "group-hover:text-teal-800";
                borderHoverColor = "hover:border-teal-500/35 hover:shadow-lg hover:shadow-teal-500/5";
                keyDriverBg = "bg-teal-50/70 text-teal-900 border-teal-100/80";
                indicatorDotColor = "bg-teal-500";
                textHighlightColor = "text-teal-850 font-bold";
              } else if (sector.color === 'emerald') {
                badgeColor = "text-emerald-400";
                metricBg = "bg-emerald-800/95 border-emerald-600/30";
                checkIconColor = "text-emerald-200";
                titleHoverColor = "group-hover:text-emerald-800";
                borderHoverColor = "hover:border-emerald-500/35 hover:shadow-lg hover:shadow-emerald-500/5";
                keyDriverBg = "bg-emerald-50/70 text-emerald-900 border-emerald-100/80";
                indicatorDotColor = "bg-emerald-500";
                textHighlightColor = "text-emerald-850 font-bold";
              } else if (sector.color === 'purple') {
                badgeColor = "text-purple-400";
                metricBg = "bg-purple-800/95 border-purple-600/30";
                checkIconColor = "text-purple-200";
                titleHoverColor = "group-hover:text-purple-800";
                borderHoverColor = "hover:border-purple-500/35 hover:shadow-lg hover:shadow-purple-500/5";
                keyDriverBg = "bg-purple-50/70 text-purple-950 border-purple-100/85";
                indicatorDotColor = "bg-purple-500";
                textHighlightColor = "text-purple-850 font-bold";
              }

              return (
                <div 
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs transition-all duration-300 flex flex-col group ${borderHoverColor}`}
                >
                  <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
                    <img 
                      src={sector.image} 
                      alt={sector.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Floating Color Badge */}
                    <div className="absolute top-2.5 left-2.5 max-w-[calc(100%-20px)] bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white flex items-center gap-1.5 shadow-md">
                      <IconComp className={`h-3.5 w-3.5 ${badgeColor} shrink-0`} />
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-wider font-extrabold uppercase truncate">
                        {sector.category}
                      </span>
                    </div>

                    {/* Quick Metric overlay */}
                    <div className={`absolute bottom-3 right-3 ${metricBg} border backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-mono font-extrabold flex items-center gap-1 shadow-md`}>
                      {sector.category !== "Geographical Indications & Rural Arts" && (
                        <CheckCircle2 className={`h-3 w-3 ${checkIconColor} shrink-0`} />
                      )}
                      <span>{sector.statValue}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-sans font-bold text-slate-400 tracking-widest uppercase">
                        {sector.statLabel}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${indicatorDotColor}`}></span>
                      <span className={`text-xs font-mono ${textHighlightColor}`}>
                        {sector.statValue}
                      </span>
                    </div>

                    <h3 className={`text-lg font-display font-extrabold text-slate-900 leading-snug transition-colors ${titleHoverColor}`}>
                      {sector.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mt-2 flex-grow">
                      {sector.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Prime Sectors</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {sector.keyDrivers.map((driver, idx) => (
                          <span 
                            key={idx} 
                            className={`${keyDriverBg} border text-[10px] font-medium px-2.5 py-1 rounded-md font-sans transition-colors cursor-default`}
                          >
                            {driver}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* 5. Back to Projects Callout */}
      <section className="bg-slate-50 py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
            Ready to review specific projects in these Taluks?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Click into our Development Blueprints repository to filter and choose state-vetted projects that match your target location.
          </p>
          <div className="mt-5">
            <button 
              onClick={onExploreClick}
              id="about-us-explore-blueprints-cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-sans font-bold shadow-xs hover:shadow-md transition-all cursor-pointer select-none"
            >
              <span>Explore Blueprints Database &amp; Select Needs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
