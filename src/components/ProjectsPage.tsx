import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_STATIC } from '../data';
import { Project } from '../types';
import { DETAILED_CONTRIBUTORS } from '../data/contributors_data';

function getDepartmentForWork(heading: string, workName: string): string {
  const h = (heading || '').toLowerCase();
  const w = (workName || '').toLowerCase();

  if (
    h.includes('school') || h.includes('stem') || h.includes('science') || h.includes('education') || h.includes('learning') || h.includes('classroom') || h.includes('anganwadi') || h.includes('kindergarten') ||
    w.includes('school') || w.includes('stem') || w.includes('science') || w.includes('education') || w.includes('learning') || w.includes('classroom') || w.includes('anganwadi') || w.includes('kindergarten')
  ) {
    return 'Education';
  }
  if (
    h.includes('health') || h.includes('hearing') || h.includes('medical') || h.includes('hospital') || h.includes('addiction') || h.includes('newborn') || h.includes('phc') || h.includes('doctor') || h.includes('patient') ||
    w.includes('health') || w.includes('hearing') || w.includes('medical') || w.includes('hospital') || w.includes('addiction') || w.includes('newborn') || w.includes('phc') || w.includes('doctor') || w.includes('patient')
  ) {
    return 'Health and Family Welfare';
  }
  if (
    h.includes('disabled') || h.includes('differently abled') || h.includes('scooter') || h.includes('wheelchair') || h.includes('pwd') ||
    w.includes('disabled') || w.includes('differently abled') || w.includes('scooter') || w.includes('wheelchair') || w.includes('pwd')
  ) {
    return 'Welfare of differently abled Person';
  }
  if (
    h.includes('farm') || h.includes('pond') || h.includes('agriculture') || h.includes('irrigation') || h.includes('borewell') || h.includes('water harvesting') ||
    w.includes('farm') || w.includes('pond') || w.includes('agriculture') || w.includes('irrigation') || w.includes('borewell') || w.includes('water harvesting')
  ) {
    return 'Agriculture and Family Welfare';
  }
  if (
    h.includes('veterinary') || h.includes('livestock') || h.includes('animal') || h.includes('cow') || h.includes('cattle') ||
    w.includes('veterinary') || w.includes('livestock') || w.includes('animal') || w.includes('cow') || w.includes('cattle')
  ) {
    return 'Animal Husbandry';
  }
  return 'Municipal Administration and water Supply';
}

function getStaticMergedProjects(): Project[] {
  const list = [...PROJECTS_STATIC];
  DETAILED_CONTRIBUTORS.forEach(c => {
    c.works.forEach(w => {
      const alreadyExists = list.some(p => 
        p.title.toLowerCase().trim() === w.heading.toLowerCase().trim() ||
        p.description.toLowerCase().trim() === w.workName.toLowerCase().trim()
      );
      if (!alreadyExists) {
        list.push({
          department: getDepartmentForWork(w.heading, w.workName),
          title: w.heading || 'CSR Welfare Work',
          description: w.workName || 'Detailed corporate social responsibility initiative.',
          financialOutlay: w.sanctionedAmountStr || 'N/A',
          status: 'Completed',
          contributor: c.companyName || 'General Administration',
          imageUrl: ''
        });
      }
    });
  });
  return list;
}
import { 
  GraduationCap, 
  HeartPulse, 
  Accessibility, 
  Leaf, 
  Sparkles, 
  ShieldAlert,
  FolderDot,
  Coins, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  Maximize2,
  X,
  TrendingUp,
  LayoutGrid,
  Briefcase,
  CheckSquare,
  Check,
  ShoppingCart,
  Trash2
} from 'lucide-react';

// Department color theme map for interactive visual borders and badges
const getDepartmentTheme = (dept: string) => {
  const d = dept.toLowerCase();
  if (d.includes('education')) {
    return {
      accent: 'emerald',
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      indicator: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'hover:shadow-emerald-100',
      iconColor: 'text-emerald-600'
    };
  }
  if (d.includes('health')) {
    return {
      accent: 'rose',
      bg: 'bg-rose-50/80',
      border: 'border-rose-200',
      text: 'text-rose-800',
      indicator: 'bg-rose-500',
      gradient: 'from-rose-500 to-pink-600',
      shadow: 'hover:shadow-rose-100',
      iconColor: 'text-rose-600'
    };
  }
  if (d.includes('abled') || d.includes('disable') || d.includes('person')) {
    return {
      accent: 'indigo',
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-200',
      text: 'text-indigo-805',
      indicator: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-purple-600',
      shadow: 'hover:shadow-indigo-100',
      iconColor: 'text-indigo-600'
    };
  }
  if (d.includes('agricultur') || d.includes('farm') || d.includes('pond')) {
    return {
      accent: 'teal',
      bg: 'bg-teal-50/80',
      border: 'border-teal-200',
      text: 'text-teal-800',
      indicator: 'bg-teal-500',
      gradient: 'from-teal-500 to-emerald-600',
      shadow: 'hover:shadow-teal-100',
      iconColor: 'text-teal-600'
    };
  }
  if (d.includes('husbandry') || d.includes('veterinary') || d.includes('animal')) {
    return {
      accent: 'amber',
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      text: 'text-amber-800',
      indicator: 'bg-amber-500',
      gradient: 'from-amber-400 to-orange-500',
      shadow: 'hover:shadow-amber-100',
      iconColor: 'text-amber-600'
    };
  }
  return {
    accent: 'sky',
    bg: 'bg-sky-50/80',
    border: 'border-sky-200',
    text: 'text-sky-800',
    indicator: 'bg-sky-500',
    gradient: 'from-sky-500 to-blue-600',
    shadow: 'hover:shadow-sky-100',
    iconColor: 'text-sky-650'
  };
};

const getDepartmentIcon = (dept: string) => {
  const d = dept.toLowerCase();
  if (d.includes('education')) {
    return <GraduationCap className="h-5 w-5" />;
  }
  if (d.includes('health')) {
    return <HeartPulse className="h-5 w-5" />;
  }
  if (d.includes('abled') || d.includes('disable') || d.includes('person')) {
    return <Accessibility className="h-5 w-5" />;
  }
  if (d.includes('agricultur') || d.includes('farm') || d.includes('pond')) {
    return <Leaf className="h-5 w-5" />;
  }
  if (d.includes('husbandry') || d.includes('veterinary') || d.includes('animal')) {
    return <Sparkles className="h-5 w-5" />;
  }
  return <FolderDot className="h-5 w-5" />;
};

const getProjectFallbackImage = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('classroom')) {
    return "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('lab') || t.includes('science') || t.includes('stem')) {
    return "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('health') || t.includes('op block') || t.includes('maternity')) {
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('assistive') || t.includes('scooter') || t.includes('push cart')) {
    return "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('pond') || t.includes('borewell')) {
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('veterinary') || t.includes('animal')) {
    return "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1200&q=80";
  }
  if (t.includes('waste') || t.includes('vehicle')) {
    return "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1200&q=80";
  }
  return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
};

// Simple standalone CSV parser
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

// Convert dynamic outlays to numeric value for sum computation
const parseCostToNumeric = (outlay: string | undefined): number => {
  if (!outlay) return 0;
  const cleaned = outlay.replace(/Rs\./i, '').replace(/,/g, '').trim().toLowerCase();
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  
  if (cleaned.includes('lakh')) {
    return num * 100000;
  }
  if (cleaned.includes('cr') || cleaned.includes('crore')) {
    return num * 10000000;
  }
  return num;
};

const formatCostNumeric = (value: number): string => {
  if (value >= 10000000) {
    return `Rs. ${(value / 10000000).toFixed(2)} Crore`;
  }
  if (value >= 100000) {
    return `Rs. ${(value / 100000).toFixed(2)} Lakhs`;
  }
  if (value === 0) return 'Custom / TBD';
  return `Rs. ${value.toLocaleString()}`;
};

interface ProjectsPageProps {
  cart?: Project[];
  onToggleCart?: (project: Project) => void;
  onCartChange?: (newCart: Project[]) => void;
  onNavClick?: (tabId: string) => void;
}

export default function ProjectsPage({
  cart = [],
  onToggleCart = () => {},
  onCartChange = () => {},
  onNavClick = () => {}
}: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>(getStaticMergedProjects());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);


  // Load live data silently in the background
  const loadLiveDataSilently = async () => {
    try {
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow/export?format=csv'
      );
      if (!response.ok) return;
      const csvText = await response.text();
      const parsedRows = parseCSV(csvText);

      if (parsedRows.length <= 1) return;

      const parsedProjects: Project[] = [];
      let currentDept = '';

      for (let i = 1; i < parsedRows.length; i++) {
        const row = parsedRows[i];
        if (row.length < 5) continue;
        
        let dept = row[0]?.trim() || '';
        const title = row[1]?.trim() || '';
        const description = row[2]?.trim() || '';
        const outlay = row[3]?.trim() || '';
        const status = row[4]?.trim() || '';
        const contributor = row[5]?.trim() || '';

        if (!title && !description) continue;
        if (dept.toLowerCase().includes('name of the department')) continue;

        if (dept !== '') {
          currentDept = dept;
        } else {
          dept = currentDept;
        }

        let normalizedStatus = status;
        if (status.toLowerCase().includes('complete')) {
          normalizedStatus = 'Completed';
        } else {
          normalizedStatus = 'Not taken up';
        }

        parsedProjects.push({
          department: dept || 'Other General Initiatives',
          title: title || 'Untitled Project',
          description: description || 'No detailed description specified.',
          financialOutlay: outlay || 'N/A',
          status: normalizedStatus || 'Not taken up',
          contributor: contributor || 'General Administration',
          imageUrl: getProjectFallbackImage(title)
        });
      }

      // Fetch dynamic completed partner works from CSR Contributors sheet
      try {
        const CONTRIBUTORS_CSV_URL = `https://docs.google.com/spreadsheets/d/1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow/gviz/tq?tqx=out:csv&sheet=CSR%20Contributors`;
        const contribResponse = await fetch(CONTRIBUTORS_CSV_URL);
        if (contribResponse.ok) {
          const contribCsvText = await contribResponse.text();
          const contribRows = parseCSV(contribCsvText);
          let currentCompany = '';
          
          for (let j = 1; j < contribRows.length; j++) {
            const row = contribRows[j];
            if (row.length < 4) continue;
            let company = row[1] ? row[1].trim() : '';
            const workName = row[2] ? row[2].trim() : '';
            const amountStr = row[3] ? row[3].trim() : '';
            const heading = row[4] ? row[4].trim() : '';

            if (!company && currentCompany) {
              company = currentCompany;
            } else if (company) {
              currentCompany = company;
            }
            if (!company) continue;
            if (!workName && !amountStr && !heading) continue;

            const finalHeading = heading || 'CSR Welfare Initiative';
            const finalWorkName = workName || 'CSR welfare development work';

            const alreadyExists = parsedProjects.some(p => 
              p.title.toLowerCase().trim() === finalHeading.toLowerCase().trim() ||
              p.description.toLowerCase().trim() === finalWorkName.toLowerCase().trim()
            );

            if (!alreadyExists) {
              parsedProjects.push({
                department: getDepartmentForWork(finalHeading, finalWorkName),
                title: finalHeading,
                description: finalWorkName,
                financialOutlay: amountStr || 'Rs. 0',
                status: 'Completed',
                contributor: company,
                imageUrl: getProjectFallbackImage(finalHeading)
              });
            }
          }
        }
      } catch (errContrib) {
        console.warn('Silent live contributors load failed for Projects page: ', errContrib);
      }

      if (parsedProjects.length > 0) {
        setProjects(parsedProjects);
      }
    } catch (err) {
      console.log('Background update skipped, serving secure local database: ', err);
    }
  };

  useEffect(() => {
    loadLiveDataSilently();
  }, []);

  // Filter out completed projects for display purposes
  const activeNotTakenUpProjects = projects.filter(p => !p.status.toLowerCase().includes('complete'));

  // Compute stats on the current parsed set for the creative summary block
  const totalProjectsCount = activeNotTakenUpProjects.length;
  const completedProjectsCount = projects.filter(p => p.status.toLowerCase().includes('complete')).length;
  const notStartedCount = activeNotTakenUpProjects.length;

  // Unique categories helper
  const departments: string[] = Array.from(new Set(activeNotTakenUpProjects.map(p => p.department)));
  const categories: string[] = ['All Categories', ...departments];

  // Helper helper to count total items in a department
  const getCategoryCount = (catName: string) => {
    if (catName === 'All Categories') return activeNotTakenUpProjects.length;
    return activeNotTakenUpProjects.filter(p => p.department === catName).length;
  };

  const isAllDepartmentSelected = (deptName: string, deptProjects: Project[]) => {
    return deptProjects.length > 0 && deptProjects.every(p => cart.some(c => c.title === p.title));
  };

  const handleToggleDepartmentSelect = (deptName: string, deptProjects: Project[]) => {
    const isAll = isAllDepartmentSelected(deptName, deptProjects);
    if (isAll) {
      const updated = cart.filter(c => !deptProjects.some(p => p.title === c.title));
      onCartChange(updated);
    } else {
      const toAdd = deptProjects.filter(p => !cart.some(c => c.title === p.title));
      const updated = [...cart, ...toAdd];
      onCartChange(updated);
    }
  };

  // Grouped search and filter mapping helper
  const filteredProjects = activeNotTakenUpProjects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contributor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All Categories') {
      return matchesSearch;
    }
    return p.department === selectedCategory && matchesSearch;
  });

  // Group matched results by department
  const groupedProjects: Record<string, Project[]> = {};
  filteredProjects.forEach(p => {
    if (!groupedProjects[p.department]) {
      groupedProjects[p.department] = [];
    }
    groupedProjects[p.department].push(p);
  });

  // Dynamic aesthetic badges for status tracker
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('completed')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-lg backdrop-blur-3xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
          Completed
        </span>
      );
    }
    return null;
  };

  return (
    <section className="py-14 bg-mesh-gradient animate-in fade-in duration-500 relative min-h-screen overflow-hidden">
      
      {/* Dynamic ambient graphic backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-96 -mt-40"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-96"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Creative Artistic Page Intro Header */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 text-center sm:text-left bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden bg-grid-glow"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-amber-50 rounded-bl-full pointer-events-none -z-10"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-3.5 rounded-full shadow-inner">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Development Blueprints</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-none mt-1">
                District Administrative Projects
              </h1>
              <p className="text-slate-550 text-sm sm:text-base leading-relaxed">
                Explore local CSR allocations and infrastructure welfare campaigns across departments, structured cleanly for full citizen transparency.
              </p>
            </div>

            {/* Total count creative bubble */}
            <div className="bg-gradient-to-tr from-stone-900 to-slate-850 text-white rounded-2xl p-4 sm:p-5 text-center shadow-xl border border-stone-800 shrink-0 min-w-[160px] transform hover:scale-102 transition-transform duration-300">
              <span className="text-sm font-sans font-semibold tracking-wider text-stone-350 block">Total Initiatives</span>
              <span className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-emerald-400 block mt-1">
                {totalProjectsCount}
              </span>
              <div className="h-1 bg-stone-800 rounded-full mt-2 overflow-hidden mx-auto max-w-[80px]">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Creative Mini Dashboard Indicators Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-dashed border-stone-200 text-stone-650">
            <div className="bg-slate-50/50 px-4 py-3 rounded-xl border border-stone-150">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Departments</span>
              <span className="text-lg font-extrabold text-slate-800 block mt-0.5">{departments.length} Sectors</span>
            </div>
            <div className="bg-emerald-50/40 px-4 py-3 rounded-xl border border-emerald-150/40">
              <span className="text-[11px] font-bold text-emerald-700/60 uppercase tracking-widest block">Completed</span>
              <span className="text-lg font-extrabold text-emerald-800 block mt-0.5">{completedProjectsCount} Projects</span>
            </div>
            <div className="bg-stone-100/50 px-4 py-3 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-450 uppercase tracking-widest block">In Queue</span>
              <span className="text-lg font-extrabold text-stone-700 block mt-0.5">{notStartedCount} Upcoming</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Tactile Slicers Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 bg-white border border-stone-150 rounded-2xl p-5 shadow-3xs"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <LayoutGrid className="h-4.5 w-4.5 text-emerald-700 shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-sans">
              Filter by Category
            </span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-x-visible no-scrollbar flex-nowrap sm:flex-wrap w-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = getCategoryCount(cat);
              const isAll = cat === 'All Categories';
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 border shadow-3xs shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-900 border-emerald-950 text-white shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 hover:border-stone-300 text-slate-650 hover:text-slate-900'
                  }`}
                >
                  <span>{isAll ? '★ All Channels' : cat}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-md shrink-0 ${
                    isActive
                      ? 'bg-white/15 text-emerald-100'
                      : 'bg-stone-200/80 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cart Mode / Add to Cart Action Bar */}
          <div className="mt-6 pt-5 border-t border-stone-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                onClick={() => setSelectionMode(!selectionMode)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 border ${
                  selectionMode
                    ? 'bg-rose-50 border-rose-250 text-rose-800 border-rose-200 shadow-inner'
                    : 'bg-emerald-50 border-emerald-250 text-emerald-800 border-emerald-200 shadow-sm hover:bg-emerald-100 hover:shadow-md'
                }`}
              >
                {selectionMode ? (
                  <>
                    <X className="h-4.5 w-4.5" />
                    <span>Exit Selection Mode</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-4.5 w-4.5" />
                    <span>Submit Interest</span>
                  </>
                )}
              </button>
              {selectionMode ? (
                <span className="text-xs font-sans text-stone-500 animate-pulse bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg font-bold">
                  ✓ Selection Mode Active: Click checkboxes to add/remove, or check category headings to select all.
                </span>
              ) : (
                <span className="text-xs font-sans text-stone-550 bg-stone-50 border border-stone-200/60 px-3 py-1.5 rounded-lg font-medium">
                  💡 <strong>Information Note</strong>: Click on the <strong>"Submit Interest"</strong> button to toggle selection mode and choose the welfare projects you wish to sponsor.
                </span>
              )}
            </div>

            {cart.length > 0 && (
              <button
                onClick={() => onNavClick('sponsorship')}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 hover:from-amber-600 hover:to-teal-800 text-white rounded-xl text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Selected Support Cart ({cart.length})</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Dynamic Smart Search Engine block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-w-xl"
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by keywords, contributors (NTPL etc.) or specific services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-250 rounded-2xl text-slate-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-700 transition-all font-sans shadow-3xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
                title="Clear Search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Dynamic Clustered Projects Grid System */}
        {Object.keys(groupedProjects).length > 0 ? (
          <div className="space-y-14">
            {Object.keys(groupedProjects).map((departmentName) => {
              const departmentProjects = groupedProjects[departmentName];
              const theme = getDepartmentTheme(departmentName);

              return (
                <div key={departmentName} className="space-y-6">
                  
                  {/* Department stylized header block */}
                  <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-3">
                      {selectionMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleDepartmentSelect(departmentName, departmentProjects);
                          }}
                          className={`p-1.5 rounded-lg border transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            isAllDepartmentSelected(departmentName, departmentProjects)
                              ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                              : 'bg-white border-stone-300 text-transparent hover:border-emerald-650'
                          }`}
                          title={isAllDepartmentSelected(departmentName, departmentProjects) ? "Unselect All in Sector" : "Select All in Sector"}
                        >
                          <Check className="h-4 w-4 stroke-[3]" />
                        </button>
                      )}
                      
                      <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${theme.gradient} text-white shadow-sm shrink-0`}>
                        {getDepartmentIcon(departmentName)}
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 tracking-tight leading-none">
                          {departmentName}
                        </h2>
                        <span className="text-[11px] font-bold text-slate-400 font-sans uppercase tracking-widest mt-0.5 block">
                          Governance Sector Division
                        </span>
                      </div>
                    </div>

                    <div className={`px-3 py-1 bg-white border ${theme.border} text-xs font-sans font-bold rounded-xl shadow-4xs shrink-0 text-slate-650 flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${theme.indicator}`}></span>
                      <span>{departmentProjects.length} {departmentProjects.length === 1 ? 'initiative' : 'initiatives'}</span>
                    </div>
                  </div>

                  {/* Creative Grid Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentProjects.map((project, idx) => {
                      const projTheme = getDepartmentTheme(project.department);

                      return (
                        <motion.div
                          key={idx}
                          layout
                          initial={{ opacity: 0, scale: 0.94 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.4 }}
                          onClick={() => setActiveProject(project)}
                          className="group bg-white rounded-2xl border border-stone-150 hover:border-slate-300 p-6 shadow-4xs hover:shadow-lg transition-all duration-305 relative flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5 overflow-hidden select-none"
                        >
                          {/* Colored offset side highlight indicator bar */}
                          <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${projTheme.gradient}`}></div>
                          
                          {/* Corner ambient graphic drop glow on hover */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                          <div className="pl-2">
                            {/* Card Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                {selectionMode && (
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleCart(project);
                                    }}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                                      cart.some(c => c.title === project.title)
                                        ? 'bg-emerald-605 bg-emerald-650 bg-emerald-600 border-emerald-700 text-white shadow-sm'
                                        : 'bg-white border-stone-300 text-transparent hover:border-emerald-650'
                                    }`}
                                  >
                                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                                  </div>
                                )}
                                {getStatusBadge(project.status)}
                              </div>

                              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-800 tracking-tight bg-slate-50/85 py-0.5 px-2 rounded-lg border border-stone-200">
                                <Coins className="h-3 w-3 text-emerald-750" />
                                {project.financialOutlay}
                              </span>
                            </div>

                            {/* Project Title with graceful display limits */}
                            <h3 className="text-base sm:text-[17px] font-sans font-black text-slate-900 tracking-tight leading-snug group-hover:text-emerald-850 transition-colors line-clamp-2">
                              {project.title}
                            </h3>

                            {/* Contributor details removed per user requirements */}

                            {/* Interactive Description Snippet */}
                            <p className="mt-3.5 text-xs leading-relaxed text-stone-500 line-clamp-3 font-sans">
                              {project.description}
                            </p>
                          </div>

                          {/* Detail Activator Bar */}
                          <div className="mt-6 pt-4 border-t border-stretch border-stone-100/80 flex items-center justify-between text-xs text-emerald-800 font-extrabold font-sans pl-2">
                            <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                              Explore Description Profile
                            </span>
                            <Maximize2 className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all text-emerald-700" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-8 max-w-xl mx-auto">
            <ShieldAlert className="h-12 w-12 text-stone-400 mx-auto mb-4" />
            <h3 className="text-lg font-sans font-black text-slate-905">No Search Matches</h3>
            <p className="text-sm text-stone-500 mt-2 leading-relaxed">
              We couldn't locate any projects matching your current query under "{selectedCategory}". Clear constraints to reload full listings.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
              }}
              className="mt-5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

        {/* Buy Now Basket Box */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="mt-16 bg-white border border-stone-200 shadow-xl rounded-3xl overflow-hidden"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 sm:px-8 py-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-xl">
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-black tracking-tight leading-none">
                    Support Selection Commitment Box
                  </h3>
                  <p className="text-emerald-100 text-[11px] sm:text-xs font-sans mt-1">
                    You have selected {cart.length} {cart.length === 1 ? 'project' : 'projects'} to support.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
                <div className="text-right sm:mr-4">
                  <span className="text-[10px] text-emerald-100/75 uppercase tracking-widest font-bold block">
                    Total Commit Cost
                  </span>
                  <span className="text-lg sm:text-xl font-mono font-black text-amber-300">
                    {formatCostNumeric(cart.reduce((total, p) => total + parseCostToNumeric(p.financialOutlay), 0))}
                  </span>
                </div>
                <button
                  onClick={() => onNavClick('sponsorship')}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-650 text-stone-900 font-extrabold text-xs sm:text-sm rounded-xl tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Commit</span>
                </button>
              </div>
            </div>

            {/* List of projects inside the box */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[350px] overflow-y-auto divide-y divide-stone-150">
              {cart.map((proj, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    idx > 0 ? 'pt-4' : ''
                  }`}
                >
                  <div 
                    onClick={() => setActiveProject(proj)}
                    className="space-y-1 cursor-pointer group/item flex-1"
                    title="Click to view detailed blueprint description"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-sans font-extrabold uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-100/50 group-hover/item:bg-emerald-100 transition-colors">
                        {proj.department}
                      </span>
                      <span className="text-stone-400 text-xs font-semibold">• Estimated Outlay: {proj.financialOutlay}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 group-hover/item:text-emerald-800 transition-colors flex items-center gap-1.5 leading-tight">
                      <span>{proj.title}</span>
                      <Maximize2 className="h-3 w-3 opacity-0 group-hover/item:opacity-75 text-emerald-700 transition" />
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <span 
                      onClick={() => setActiveProject(proj)}
                      className="text-xs sm:text-sm font-mono font-black text-emerald-800 bg-stone-50 px-3 py-1 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-100 transition"
                      title="Click to view detailed blueprint description"
                    >
                      {formatCostNumeric(parseCostToNumeric(proj.financialOutlay))}
                    </span>
                    <button
                      onClick={() => onToggleCart(proj)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove from Basket"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions footer inside the box */}
            <div className="bg-stone-50 px-6 sm:px-8 py-4 border-t border-stone-150 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-stone-500 font-sans italic">
                * Commitments will be routed as official CSR / NGO fund allocations to Thoothukudi District Administration Society under Collector audit.
              </span>
              <button
                onClick={() => onCartChange([])}
                className="text-xs font-bold text-stone-500 hover:text-rose-600 transition-colors uppercase tracking-widest cursor-pointer"
              >
                Clear Selection Basket
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* Intricately Styled Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full my-4 sm:my-8 md:my-10 shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimal Exit button */}
              <button 
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full border border-stone-200 text-stone-700 shadow-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Picture block */}
              <div className="relative h-44 sm:h-60 md:h-64 bg-stone-900 overflow-hidden">
                <img
                  src={activeProject.imageUrl || getProjectFallbackImage(activeProject.title)}
                  alt={activeProject.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Overlay badges */}
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-800 text-white rounded-lg text-[10px] font-black uppercase tracking-widest leading-none mb-2">
                    {activeProject.department}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white leading-tight drop-shadow-md select-text">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Profile specifications */}
              <div className="p-6 sm:p-8 space-y-6">
                           {/* Financial block */}
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Financial Budget allocation
                    </span>
                    <span className="text-base font-extrabold text-emerald-900 font-sans block mt-0.5">
                      {activeProject.financialOutlay}
                    </span>
                  </div>
                </div>

              {/* Description body */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 block font-sans">
                  Detailed Scope & Public Impact Goals
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify select-text font-sans bg-stone-50/50 p-4 rounded-xl border border-stone-150">
                  {activeProject.description}
                </p>
              </div>

              {/* Status indicator tracker */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black uppercase tracking-widest text-slate-400 font-sans">Initiative Timeline Status</span>
                  <div className="scale-90">{getStatusBadge(activeProject.status)}</div>
                </div>

                {/* Progress Visual Timeline line bar strictly based on status */}
                <div className="relative w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/45">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeProject.status.toLowerCase().includes('complete') 
                        ? 'bg-emerald-500' 
                        : 'bg-stone-300'
                    }`}
                    style={{ 
                      width: activeProject.status.toLowerCase().includes('complete') 
                        ? '100%' 
                        : '15%' 
                    }}
                  ></div>
                </div>
              </div>

              {/* Bottom buttons panel */}
              <div className="flex justify-end pt-5 border-t border-stone-100">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-sm transition-all text-center min-w-[120px]"
                >
                  Close Profile View
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </section>
  );
}

