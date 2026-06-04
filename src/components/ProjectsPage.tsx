import React, { useState, useEffect } from 'react';
import { PROJECTS_STATIC } from '../data';
import { Project } from '../types';
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
  Briefcase
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_STATIC);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
        if (status.toLowerCase().includes('partial')) {
          normalizedStatus = 'Partially taken up';
        } else if (status.toLowerCase().includes('not')) {
          normalizedStatus = 'Not taken up';
        } else if (status.toLowerCase().includes('complete')) {
          normalizedStatus = 'Completed';
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

  // Compute stats on the current parsed set for the creative summary block
  const totalProjectsCount = projects.length;
  const completedProjectsCount = projects.filter(p => p.status.toLowerCase().includes('complete')).length;
  const partialProjectsCount = projects.filter(p => p.status.toLowerCase().includes('partial')).length;
  const notStartedCount = projects.filter(p => p.status.toLowerCase().includes('not')).length;

  // Unique categories helper
  const departments: string[] = Array.from(new Set(projects.map(p => p.department)));
  const categories: string[] = ['All Categories', ...departments];

  // Helper helper to count total items in a department
  const getCategoryCount = (catName: string) => {
    if (catName === 'All Categories') return projects.length;
    return projects.filter(p => p.department === catName).length;
  };

  // Grouped search and filter mapping helper
  const filteredProjects = projects.filter(p => {
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
    if (s.includes('partial')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 border border-amber-300 text-amber-900 text-xs font-bold rounded-lg backdrop-blur-3xs">
          <Clock className="h-3.5 w-3.5 text-amber-700 shrink-0" />
          Partially taken up
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-250 text-stone-700 text-xs font-bold rounded-lg">
        <AlertCircle className="h-3.5 w-3.5 text-stone-500 shrink-0" />
        Not taken up
      </span>
    );
  };

  return (
    <section className="py-14 bg-mesh-gradient animate-in fade-in duration-500 relative min-h-screen">
      
      {/* Dynamic ambient graphic backdrop */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-96 -mt-40"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-96"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Creative Artistic Page Intro Header */}
        <div className="relative mb-12 text-center sm:text-left bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden bg-grid-glow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-amber-50 rounded-bl-full pointer-events-none -z-10"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-[10px] uppercase font-bold tracking-widest py-1.5 px-3.5 rounded-full shadow-inner">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Development Blueprints</span>
              </div>
              <h1 className="text-3xl sm:text-4.5xl font-display font-black text-slate-900 tracking-tight leading-none mt-1">
                District Welfare Projects
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-dashed border-stone-200 text-stone-650">
            <div className="bg-slate-50/50 px-4 py-3 rounded-xl border border-stone-150">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Departments</span>
              <span className="text-lg font-extrabold text-slate-800 block mt-0.5">{departments.length} Sectors</span>
            </div>
            <div className="bg-emerald-50/40 px-4 py-3 rounded-xl border border-emerald-150/40">
              <span className="text-[11px] font-bold text-emerald-700/60 uppercase tracking-widest block">Completed</span>
              <span className="text-lg font-extrabold text-emerald-800 block mt-0.5">{completedProjectsCount} Projects</span>
            </div>
            <div className="bg-amber-50/40 px-4 py-3 rounded-xl border border-amber-150/40">
              <span className="text-[11px] font-bold text-amber-700/60 uppercase tracking-widest block">Partially Commenced</span>
              <span className="text-lg font-extrabold text-amber-800 block mt-0.5">{partialProjectsCount} Ongoing</span>
            </div>
            <div className="bg-stone-100/50 px-4 py-3 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-450 uppercase tracking-widest block">In Queue</span>
              <span className="text-lg font-extrabold text-stone-700 block mt-0.5">{notStartedCount} Upcoming</span>
            </div>
          </div>
        </div>

        {/* Dynamic Tactile Slicers Block */}
        <div className="mb-10 bg-white border border-stone-150 rounded-2xl p-5 shadow-3xs">
          <div className="flex items-center gap-2.5 mb-4">
            <LayoutGrid className="h-4.5 w-4.5 text-emerald-700 shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-sans">
              Filter by Category / Interactive Slicer
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = getCategoryCount(cat);
              const isAll = cat === 'All Categories';
              
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 cursor-pointer flex items-center gap-2 border shadow-3xs ${
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
        </div>

        {/* Dynamic Smart Search Engine block */}
        <div className="mb-10 max-w-xl">
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
        </div>

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
                        <div
                          key={idx}
                          onClick={() => setActiveProject(project)}
                          className={`group bg-white rounded-2xl border border-stone-150 hover:border-slate-300 p-6 shadow-4xs ${projTheme.shadow} hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5 overflow-hidden`}
                        >
                          {/* Colored offset side highlight indicator bar */}
                          <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${projTheme.gradient}`}></div>
                          
                          {/* Corner ambient graphic drop glow on hover */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                          <div className="pl-2">
                            {/* Card Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                              {getStatusBadge(project.status)}
                              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-800 tracking-tight bg-slate-50/85 py-0.5 px-2 rounded-lg border border-stone-200">
                                <Coins className="h-3 w-3 text-emerald-750" />
                                {project.financialOutlay}
                              </span>
                            </div>

                            {/* Project Title with graceful display limits */}
                            <h3 className="text-base sm:text-[17px] font-sans font-black text-slate-900 tracking-tight leading-snug group-hover:text-emerald-850 transition-colors line-clamp-2">
                              {project.title}
                            </h3>

                            {/* Contributor Details block */}
                            <div className="mt-3 flex items-center gap-2 text-xs text-stone-500 font-sans border-t border-stone-50 pt-3">
                              <User className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                              <span className="font-semibold text-stone-600">Lead Contributor:</span>
                              <span className="text-stone-800 bg-stone-100/70 px-2 py-0.5 rounded font-bold">
                                {(!project.contributor || project.contributor.toLowerCase() === 'none') ? '' : project.contributor}
                              </span>
                            </div>

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
                        </div>
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

      </div>

      {/* Intricately Styled Modal Overlay */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200 flex flex-col"
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
            <div className="relative h-60 sm:h-72 bg-stone-900 overflow-hidden">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-805">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Allocated Lead Donor
                    </span>
                    <span className="text-base font-extrabold text-stone-900 font-sans block mt-0.5">
                      {(!activeProject.contributor || activeProject.contributor.toLowerCase() === 'none') ? '' : activeProject.contributor}
                    </span>
                  </div>
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
                        : activeProject.status.toLowerCase().includes('partial') 
                          ? 'bg-amber-400 animate-pulse' 
                          : 'bg-stone-300'
                    }`}
                    style={{ 
                      width: activeProject.status.toLowerCase().includes('complete') 
                        ? '100%' 
                        : activeProject.status.toLowerCase().includes('partial') 
                          ? '50%' 
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
          </div>
        </div>
      )}

    </section>
  );
}

