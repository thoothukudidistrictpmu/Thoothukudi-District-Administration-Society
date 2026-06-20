import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DETAILED_CONTRIBUTORS, DetailedContributor, ContributorWork } from '../data/contributors_data';
import { PROJECTS_STATIC } from '../data';
import { 
  Trophy, 
  Search, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Coins, 
  Award, 
  Activity, 
  FileText, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

function matchesCompany(contributorName: string, companyName: string): boolean {
  if (!contributorName || !companyName) return false;
  const c = contributorName.toLowerCase().trim();
  const comp = companyName.toLowerCase().trim();
  
  if (c === 'none' || c === 'general administration' || c === '') return false;
  
  // Direct matches
  if (c.includes(comp) || comp.includes(c)) return true;
  
  // Specific aliases
  if (comp.includes('nlc') || comp.includes('ntpl') || comp.includes('power')) {
    if (c.includes('nlc') || c.includes('ntpl')) return true;
  }
  if (comp.includes('state bank') || comp.includes('sbi')) {
    if (c.includes('sbi') || c.includes('state bank')) return true;
  }
  if (comp.includes('tmb') || comp.includes('mercantile')) {
    if (c.includes('tmb') || c.includes('merc')) return true;
  }
  if (comp.includes('voc') || comp.includes('chidambaranar')) {
    if (c.includes('voc') || c.includes('port')) return true;
  }
  if (comp.includes('ntpc')) {
    if (c.includes('ntpc')) return true;
  }
  if (comp.includes('sanitation')) {
    if (c.includes('sanit')) return true;
  }
  if (comp.includes('jsw')) {
    if (c.includes('jsw')) return true;
  }
  if (comp.includes('spic')) {
    if (c.includes('spic')) return true;
  }
  return false;
}

// Live CSV URL for the spreadsheet
const SPREADSHEET_ID = '1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=CSR%20Contributors`;

// Simple but robust quote-aware client-side CSV parser
function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentValue = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentValue.trim());
      currentValue = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentValue.trim());
      result.push(row);
      row = [];
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  if (row.length > 0 || currentValue !== '') {
    row.push(currentValue.trim());
    result.push(row);
  }
  return result;
}

// Parse string from CSV to INR Rupees
function parseAmountToRupees(amountStr: string): number {
  if (!amountStr) return 0;
  const cleanStr = amountStr.replace(/,/g, '').trim();
  const numMatch = cleanStr.match(/(\d+(?:\.\d+)?)/);
  if (!numMatch) return 0;
  const numValue = parseFloat(numMatch[1]);
  const lowerStr = cleanStr.toLowerCase();
  
  if (lowerStr.includes('crore') || lowerStr.includes('crores')) {
    return numValue * 10000000;
  } else if (lowerStr.includes('lakh') || lowerStr.includes('lakhs')) {
    return numValue * 100000;
  } else if (lowerStr.includes('thousand')) {
    return numValue * 1000;
  }
  return numValue;
}

// Standard Indian Currency Formatter (Crores / Lakhs)
function formatINR(rupees: number): string {
  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Crore`;
  }
  if (rupees >= 100000) {
    return `₹${(rupees / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
  }
  return `₹${rupees.toLocaleString('en-IN')}`;
}

interface ContributorsProps {
  initialSearchQuery?: string;
}

export default function Contributors({ initialSearchQuery = '' }: ContributorsProps) {
  const [contributors, setContributors] = useState<DetailedContributor[]>(DETAILED_CONTRIBUTORS);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('Pre-loaded data');

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const hydrateStaticContributors = () => {
    // Clone DETAILED_CONTRIBUTORS to avoid mutating source
    const fallbackContributors = JSON.parse(JSON.stringify(DETAILED_CONTRIBUTORS)) as DetailedContributor[];
    
    // Check PROJECTS_STATIC completed projects
    PROJECTS_STATIC.forEach(proj => {
      const isCompleted = proj.status.toLowerCase().includes('complete');
      if (isCompleted && proj.contributor && proj.contributor.toLowerCase() !== 'none' && proj.contributor.toLowerCase() !== 'general administration') {
        const matchedContrib = fallbackContributors.find(c => matchesCompany(proj.contributor, c.companyName));
        if (matchedContrib) {
          const alreadyExists = matchedContrib.works.some(w => 
            w.workName.toLowerCase().includes(proj.title.toLowerCase()) || 
            proj.title.toLowerCase().includes(w.workName.toLowerCase())
          );
          if (!alreadyExists) {
            const rupees = parseAmountToRupees(proj.financialOutlay);
            matchedContrib.works.push({
              workName: proj.title + (proj.description ? ` - ${proj.description}` : ''),
              sanctionedAmountStr: proj.financialOutlay || 'Rs. 0',
              sanctionedAmountRupees: rupees,
              heading: `Completed Project (${proj.department})`
            });
            matchedContrib.projectCount = matchedContrib.works.length;
            matchedContrib.totalRupees += rupees;
          }
        }
      }
    });

    // Re-rank static list too
    fallbackContributors.sort((a, b) => b.totalRupees - a.totalRupees);
    const remapped = fallbackContributors.map((c, index) => {
      const rank = index + 1;
      let badge = 'CSR Partner';
      let badgeColor = 'stone';
      if (rank === 1) {
        badge = 'Lead Diamond Partner';
        badgeColor = 'emerald';
      } else if (rank === 2) {
        badge = 'Platinum Partner';
        badgeColor = 'sky';
      } else if (rank === 3) {
        badge = 'Gold Partner';
        badgeColor = 'amber';
      }
      return {
        ...c,
        rank,
        badge,
        badgeColor
      };
    });
    setContributors(remapped);
  };

  // Fetch live Google Sheet data at runtime
  const fetchLiveContributors = async () => {
    setIsLoadingLive(true);
    setLoadError(false);
    try {
      // 1. Fetch contributors sheet
      const response = await fetch(CSV_URL);
      if (!response.ok) throw new Error('Network error pulling spreadsheet CSV');
      const csvText = await response.text();
      
      const parsedRows = parseCSV(csvText);
      if (parsedRows.length <= 1) throw new Error('Empty spreadsheet template downloaded');

      const companyGroups: { [companyName: string]: ContributorWork[] } = {};
      let currentCompany = '';
      
      for (let i = 1; i < parsedRows.length; i++) {
        const row = parsedRows[i];
        if (row.length < 4) continue;
        
        let company = row[1] ? row[1].trim() : '';
        const workName = row[2] ? row[2].trim() : '';
        const amountStr = row[3] ? row[3].trim() : '';
        const heading = row[4] ? row[4].trim() : '';
        
        // Handle sheet merged company cells
        if (!company && currentCompany) {
          company = currentCompany;
        } else if (company) {
          currentCompany = company;
        }
        
        if (!company) continue;
        if (!workName && !amountStr && !heading) continue;
        
        const rupees = parseAmountToRupees(amountStr);
        
        if (!companyGroups[company]) {
          companyGroups[company] = [];
        }
        
        companyGroups[company].push({
          workName,
          sanctionedAmountStr: amountStr,
          sanctionedAmountRupees: rupees,
          heading
        });
      }

      // 2. Fetch Projects sheet to read completed projects dynamically
      try {
        const projResponse = await fetch('https://docs.google.com/spreadsheets/d/1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow/export?format=csv');
        if (projResponse.ok) {
          const projCsvText = await projResponse.text();
          const projRows = parseCSV(projCsvText);
          let currentDept = '';
          
          for (let k = 1; k < projRows.length; k++) {
            const pRow = projRows[k];
            if (pRow.length < 5) continue;
            
            let dept = pRow[0]?.trim() || '';
            const title = pRow[1]?.trim() || '';
            const description = pRow[2]?.trim() || '';
            const outlay = pRow[3]?.trim() || '';
            const status = pRow[4]?.trim() || '';
            const contributor = pRow[5]?.trim() || '';

            if (!title && !description) continue;
            if (dept.toLowerCase().includes('name of the department')) continue;

            if (dept !== '') {
              currentDept = dept;
            } else {
              dept = currentDept;
            }

            // Normalizing status
            const isCompleted = status.toLowerCase().includes('complete');
            if (isCompleted && contributor && contributor.toLowerCase() !== 'none' && contributor.toLowerCase() !== 'general administration') {
              // Find matching company in existing groups or DETAILED_CONTRIBUTORS
              let targetCompany = '';
              const groupNames = Object.keys(companyGroups);
              
              for (const name of groupNames) {
                if (matchesCompany(contributor, name)) {
                  targetCompany = name;
                  break;
                }
              }
              
              if (!targetCompany) {
                for (const staticC of DETAILED_CONTRIBUTORS) {
                  if (matchesCompany(contributor, staticC.companyName)) {
                    targetCompany = staticC.companyName;
                    break;
                  }
                }
              }

              // Fallback to the parsed contributor string
              if (!targetCompany) {
                targetCompany = contributor;
              }

              if (!companyGroups[targetCompany]) {
                companyGroups[targetCompany] = [];
              }

              // De-duplicate works to avoid repeating already loaded items
              const alreadyExists = companyGroups[targetCompany].some(w => 
                w.workName.toLowerCase().includes(title.toLowerCase()) || 
                title.toLowerCase().includes(w.workName.toLowerCase())
              );

              if (!alreadyExists) {
                const rupees = parseAmountToRupees(outlay);
                companyGroups[targetCompany].push({
                  workName: title + (description ? ` - ${description}` : ''),
                  sanctionedAmountStr: outlay || 'Rs. 0',
                  sanctionedAmountRupees: rupees,
                  heading: `Completed Project (${dept})`
                });
              }
            }
          }
        }
      } catch (errProjects) {
        console.warn('Silent live projects fetch for contributors mapping failed: ', errProjects);
      }

      const aggregated = Object.keys(companyGroups).map((companyName) => {
        const works = companyGroups[companyName];
        const totalRupees = works.reduce((sum, item) => sum + item.sanctionedAmountRupees, 0);
        return {
          companyName,
          works,
          totalRupees,
          projectCount: works.length
        };
      });
      
      // Rank descending by money
      aggregated.sort((a, b) => b.totalRupees - a.totalRupees);
      
      const mapped = aggregated.map((c, index) => {
        const rank = index + 1;
        let badge = 'CSR Partner';
        let badgeColor = 'stone';
        if (rank === 1) {
          badge = 'Lead Diamond Partner';
          badgeColor = 'emerald';
        } else if (rank === 2) {
          badge = 'Platinum Partner';
          badgeColor = 'sky';
        } else if (rank === 3) {
          badge = 'Gold Partner';
          badgeColor = 'amber';
        }
        
        const themeBg = 'bg-linear-to-br from-stone-50/70 via-stone-25/50 to-white';
        const borderGlow = 'hover:border-stone-400/40 hover:shadow-[0_8px_30px_rgba(40,40,40,0.04)]';
        
        return {
          rank,
          companyName: c.companyName,
          badge,
          badgeColor,
          themeBg,
          borderGlow,
          totalRupees: c.totalRupees,
          projectCount: c.projectCount,
          works: c.works
        };
      });
      
      setContributors(mapped);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.warn('Live spreadsheet sync failed. Using precompiled dataset instead.', err);
      hydrateStaticContributors();
      setLoadError(true);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveContributors();
  }, []);

  // Filter contributors based on search queries
  const filteredContributors = contributors.filter(item => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return true;
    
    const matchesName = item.companyName.toLowerCase().includes(term);
    const matchesBadge = item.badge.toLowerCase().includes(term);
    const matchesWorks = item.works.some(w => 
      w.workName.toLowerCase().includes(term) || 
      w.heading.toLowerCase().includes(term)
    );
    return matchesName || matchesBadge || matchesWorks;
  });

  // Calculate high level metrics
  const totalAllocatedAmount = contributors.reduce((acc, c) => acc + c.totalRupees, 0);
  const totalWorksCount = contributors.reduce((acc, c) => acc + c.projectCount, 0);

  // Custom high precision company SVG vector logos
  const getCompanyLogo = (name: string) => {
    const clean = name.toLowerCase().trim();
    if (clean.includes('voc port') || clean.includes('chidambaranar')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="VOC Port Trust Logo">
          <rect width="100" height="100" rx="20" fill="#f0f9ff" className="fill-sky-50" />
          <circle cx="50" cy="45" r="22" fill="none" stroke="#0369a1" strokeWidth="3" />
          <path d="M50 18 L50 72 M30 50 L70 50 M35 35 L65 65 M35 65 L65 35" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 56 M44 58 L56 58 L50 70 Z" className="fill-sky-700" />
          <circle cx="50" cy="45" r="10" fill="#f0f9ff" stroke="#0369a1" strokeWidth="2" />
          <text x="50" y="86" fill="#0369a1" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="0.4" fontFamily="system-ui, sans-serif">VOC PORT</text>
        </svg>
      );
    }
    if (clean.includes('nlc') || clean.includes('ntpl') || clean.includes('power')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="NTPL Logo">
          <rect width="100" height="100" rx="20" fill="#f0fdf4" className="fill-teal-50" />
          <circle cx="50" cy="42" r="23" fill="none" stroke="#2dd4bf" strokeWidth="3" />
          <path d="M50 17 L50 67 M30 42 L70 42" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M43 32 L57 32 L50 54 Z" className="fill-amber-500" />
          <text x="50" y="85" fill="#0f766e" fontSize="13" fontWeight="950" textAnchor="middle" letterSpacing="0.8" fontFamily="system-ui, sans-serif">NTPL</text>
        </svg>
      );
    }
    if (clean.includes('state bank') || clean.includes('sbi')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="SBI Logo">
          <rect width="100" height="100" rx="20" fill="#f0fdfa" className="fill-blue-50" />
          <circle cx="50" cy="45" r="22" fill="#0284c7" />
          <rect x="46" y="45" width="8" height="24" fill="#0284c7" />
          <circle cx="50" cy="45" r="8" fill="#f0fdfa" />
          <rect x="47" y="43" width="6" height="26" fill="#f0fdfa" />
          <text x="50" y="86" fill="#0284c7" fontSize="11" fontWeight="950" textAnchor="middle" letterSpacing="1" fontFamily="system-ui, sans-serif">SBI</text>
        </svg>
      );
    }
    if (clean.includes('tmb') || clean.includes('mercantile')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="TMB Bank Logo">
          <rect width="100" height="100" rx="20" fill="#fafaf9" className="fill-stone-50" />
          <path d="M25 35 L40 22 L75 22 L75 35 M25 78 L75 78 L75 65 L25 65 L25 78 Z M25 40 L35 40 L35 60 L25 60 L25 40 Z M45 40 L55 40 L55 60 L45 60 L45 40 Z M65 40 L75 40 L75 60 L65 60 L65 40 Z" fill="#15803d" />
          <text x="50" y="91" fill="#15803d" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4" fontFamily="system-ui, sans-serif">TMB BANK</text>
        </svg>
      );
    }
    if (clean.includes('jsw')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="JSW Foundation Logo">
          <rect width="100" height="100" rx="20" fill="#eff6ff" className="fill-blue-50" />
          <g transform="translate(10, 20)">
            <path d="M15 5 L35 5 L28 40 L8 40 Z" fill="#1d4ed8" />
            <path d="M40 5 L60 5 L53 40 L33 40 Z" fill="#ef4444" />
            <path d="M65 5 L85 5 L78 40 L58 40 Z" fill="#1d4ed8" />
          </g>
          <text x="50" y="84" fill="#1e3a8a" fontSize="10.5" fontWeight="950" textAnchor="middle" letterSpacing="0.5" fontFamily="system-ui, sans-serif">JSW</text>
        </svg>
      );
    }
    if (clean.includes('ntpc')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="NTPC Logo">
          <rect width="100" height="100" rx="20" fill="#f0fdf4" className="fill-emerald-50" />
          <circle cx="50" cy="40" r="20" fill="none" stroke="#059669" strokeWidth="3" />
          <path d="M30 40 C30 20, 70 20, 70 40 C70 60, 30 60, 30 40 Z" fill="none" stroke="#10b981" strokeWidth="2.5" />
          <path d="M50 20 L50 60" stroke="#059669" strokeWidth="2" />
          <text x="50" y="85" fill="#047857" fontSize="8" fontWeight="950" textAnchor="middle" letterSpacing="0.5" fontFamily="system-ui, sans-serif">NTPC GREEN</text>
        </svg>
      );
    }
    if (clean.includes('sanitation')) {
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Sanitation First Logo">
          <rect width="100" height="100" rx="20" fill="#f0fafb" className="fill-sky-50" />
          <path d="M50 15 C50 15, 75 38, 75 55 C75 68, 64 78, 50 78 C36 78, 25 68, 25 55 C25 38, 50 15, 50 15 Z" fill="#0ea5e9" opacity="0.85" />
          <path d="M50 25 C50 25, 68 44, 68 55 C68 64, 60 72, 50 72 C40 72, 32 64, 32 55 C32 44, 50 25, 50 25 Z" fill="#e0f2fe" opacity="0.95" />
          <path d="M44 58 C46 54 54 54 56 58 L54 66 C54 66 48 68 44 66 Z" fill="#0284c7" />
          <text x="50" y="90" fill="#0369a1" fontSize="8" fontWeight="950" textAnchor="middle" letterSpacing="0.4" fontFamily="system-ui, sans-serif">SANITATION FIRST</text>
        </svg>
      );
    }
    
    // Default fallback logo for general corporate entities
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Partner Corporate Logo">
        <rect width="100" height="100" rx="20" fill="#fafaf9" className="fill-stone-50" stroke="#e7e5e4" strokeWidth="1" />
        <circle cx="50" cy="45" r="18" fill="none" stroke="#a8a29e" strokeWidth="2.5" />
        <path d="M35 70 L65 70 L50 48 Z" fill="#a8a29e" />
        <text x="50" y="85" fill="#78716c" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="system-ui, sans-serif">CORPORATE</text>
      </svg>
    );
  };

  // Get localized class lists for different ranking badges
  const getBadgeClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50/90 border border-emerald-200/60 text-emerald-800 shadow-[0_2px_8px_rgb(16,185,129,0.05)]';
      case 'sky':
        return 'bg-sky-50/90 border border-sky-200/60 text-sky-800 shadow-[0_2px_8px_rgb(14,165,233,0.05)]';
      case 'amber':
        return 'bg-amber-50/90 border border-amber-200/60 text-amber-800 shadow-[0_2px_8px_rgb(245,158,11,0.05)]';
      case 'purple':
        return 'bg-purple-50/90 border border-purple-200/60 text-purple-800 shadow-[0_2px_8px_rgb(168,85,247,0.05)]';
      default:
        return 'bg-stone-50/90 border border-stone-200/60 text-stone-800';
    }
  };

  // Handle accordion logic toggling
  const toggleAccordion = (rank: number) => {
    setExpandedCard(expandedCard === rank ? null : rank);
  };

  // Safe podium scroll-to trigger
  const handlePodiumClick = (rank: number) => {
    setExpandedCard(rank);
    const element = document.getElementById(`contributor-card-${rank}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="contributors" className="py-20 bg-stone-25 relative overflow-hidden bg-grid-glow scroll-mt-14 sm:scroll-mt-16 border-b border-stone-150">
      
      {/* Dynamic blurred backdrop accent paths */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-[30rem] h-[30rem] bg-amber-100/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Interactive Header Block */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="h-3 w-3 text-amber-600" />
            <span>Official District Honor Board</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-stone-900 tracking-tight text-balance"
          >
            Partners in Development
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed"
          >
            Sustaining state welfare works and district infrastructures through active, high-impact 
            public-private partnerships and CSR investment programs.
          </motion.p>


        </div>

        {/* Global Aggregate Metrics panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-[0_4px_24px_rgba(44,42,40,0.02)]">
          <div className="flex items-center gap-4 py-4 md:py-2 px-1 border-b md:border-b-0 md:border-r border-stone-100 last:border-0 last:border-r-0">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">Total Corporate Outlay</div>
              <div className="text-xl sm:text-2xl font-sans font-black text-stone-900 mt-0.5">{formatINR(totalAllocatedAmount)}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 py-4 md:py-2 px-1 border-b md:border-b-0 md:border-r border-stone-100 last:border-0 last:border-r-0">
            <div className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">Active Corporate Sponsors</div>
              <div className="text-xl sm:text-2xl font-sans font-black text-stone-900 mt-0.5">{contributors.length} Major Entities</div>
            </div>
          </div>
          <div className="flex items-center gap-4 py-4 md:py-2 px-1 last:border-0">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">Total Sanctioned Projects</div>
              <div className="text-xl sm:text-2xl font-sans font-black text-stone-900 mt-0.5">{totalWorksCount} Works Executed</div>
            </div>
          </div>
        </div>

        {/* 3D Innovative Podium Highlight (Top 3 Contributors) */}
        {!searchQuery && contributors.length >= 3 && (
          <div className="mb-20">
            <h3 className="text-center text-xs uppercase tracking-[0.2em] font-mono font-black text-stone-400 mb-10">
              Honorable Top Pillars of Thoothukudi
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-4xl mx-auto">
              
              {/* Rank 2 (Left) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2 md:order-1"
              >
                <div 
                  onClick={() => handlePodiumClick(contributors[1].rank)}
                  className="cursor-pointer group flex flex-col items-center bg-white/70 hover:bg-white rounded-t-3xl rounded-b-2xl border border-stone-200/80 p-6 shadow-md hover:shadow-xl transition-all duration-350 hover:-translate-y-1 relative"
                >
                  <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-stone-600 font-mono font-black text-xs border border-stone-200">
                    2
                  </div>
                  <div className="h-14 w-14 mb-4 mt-3">
                    {getCompanyLogo(contributors[1].companyName)}
                  </div>
                  <h4 className="font-sans font-black text-stone-900 text-center text-sm md:text-base line-clamp-1 px-2 group-hover:text-stone-700 transition-colors">
                    {contributors[1].companyName}
                  </h4>
                  <p className="text-[11px] font-mono text-stone-400 font-bold mt-1 uppercase tracking-wider">
                    {contributors[1].badge}
                  </p>
                  <div className="mt-3 text-base font-sans font-black text-stone-700">
                    {formatINR(contributors[1].totalRupees)}
                  </div>
                  
                  {/* Digital Podium Step */}
                  <div className="w-full mt-6 h-12 bg-linear-to-b from-stone-100 to-stone-50 border-t border-stone-200 rounded-lg flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">{contributors[1].projectCount} Initiatives</span>
                  </div>
                </div>
              </motion.div>

              {/* Rank 1 (Center) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2 z-20"
              >
                <div 
                  onClick={() => handlePodiumClick(contributors[0].rank)}
                  className="cursor-pointer group flex flex-col items-center bg-linear-to-br from-stone-50/20 via-white to-white hover:border-stone-400/30 rounded-3xl border border-stone-250 p-8 shadow-lg hover:shadow-2xl transition-all duration-350 hover:-translate-y-2 relative"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 font-bold shadow-lg border-2 border-stone-200 animate-bounce-subtle">
                    <Trophy className="h-6 w-6 text-stone-750" />
                  </div>
                  <div className="h-20 w-20 mb-5 mt-4">
                    {getCompanyLogo(contributors[0].companyName)}
                  </div>
                  <h4 className="font-sans font-black text-stone-900 text-center text-base md:text-lg line-clamp-1 px-2 group-hover:text-stone-700 transition-colors">
                    {contributors[0].companyName}
                  </h4>
                  <p className="text-xs font-mono text-stone-400 font-extrabold mt-1 uppercase tracking-wider">
                    {contributors[0].badge}
                  </p>
                  <div className="mt-3.5 text-lg sm:text-xl font-sans font-black text-stone-800">
                    {formatINR(contributors[0].totalRupees)}
                  </div>
                  
                  {/* Digital Podium Step */}
                  <div className="w-full mt-6 h-20 bg-linear-to-b from-stone-100 to-stone-50 border-t border-stone-200 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
                    <span className="text-xs font-sans font-black text-stone-800">Top Contributor</span>
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">{contributors[0].projectCount} Major Works</span>
                  </div>
                </div>
              </motion.div>

              {/* Rank 3 (Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-3"
              >
                <div 
                  onClick={() => handlePodiumClick(contributors[2].rank)}
                  className="cursor-pointer group flex flex-col items-center bg-white/70 hover:bg-white rounded-t-3xl rounded-b-2xl border border-stone-200/80 p-6 shadow-md hover:shadow-xl transition-all duration-350 hover:-translate-y-1 relative"
                >
                  <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-stone-600 font-mono font-black text-xs border border-stone-200">
                    3
                  </div>
                  <div className="h-14 w-14 mb-4 mt-3">
                    {getCompanyLogo(contributors[2].companyName)}
                  </div>
                  <h4 className="font-sans font-black text-stone-900 text-center text-sm md:text-base line-clamp-1 px-2 group-hover:text-stone-700 transition-colors">
                    {contributors[2].companyName}
                  </h4>
                  <p className="text-[11px] font-mono text-stone-400 font-bold mt-1 uppercase tracking-wider">
                    {contributors[2].badge}
                  </p>
                  <div className="mt-3 text-base font-sans font-black text-stone-700">
                    {formatINR(contributors[2].totalRupees)}
                  </div>
                  
                  {/* Digital Podium Step */}
                  <div className="w-full mt-6 h-12 bg-linear-to-b from-stone-100 to-stone-50 border-t border-stone-200 rounded-lg flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">{contributors[2].projectCount} Initiative</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        )}

        {/* Directory Search Block */}
        <div className="max-w-xl mx-auto mb-10 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input 
              type="text"
              placeholder="Search Sponsor by name, heading, or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-stone-900 placeholder:text-stone-400 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-emerald-500/50 shadow-sm transition-all"
            />
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-mono font-bold rounded-2xl transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active List Directory of Contributors */}
        <div className="max-w-4xl mx-auto space-y-4 shadow-sm" id="contributors-leaderboard">
          <AnimatePresence mode="popLayout">
            {filteredContributors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-12 border border-stone-150 text-center"
              >
                <div className="text-stone-300 text-4xl mb-4">🔍</div>
                <h4 className="text-base font-sans font-black text-stone-800">No Match Found</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto mt-2.5">
                  We couldn't locate any sponsor or project matches for "{searchQuery}".
                </p>
              </motion.div>
            ) : (
              filteredContributors.map((item) => {
                const isExpanded = expandedCard === item.rank;
                return (
                  <motion.div
                    key={item.companyName}
                    layout="position"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    id={`contributor-card-${item.rank}`}
                    className={`bg-white rounded-3xl border border-stone-200 hover:-translate-y-0.5 shadow-sm transition-all duration-350 overflow-hidden relative ${item.borderGlow}`}
                  >
                    
                    {/* Primary Row Header Card */}
                    <div 
                      onClick={() => toggleAccordion(item.rank)}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        
                        {/* Rank Badge */}
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-stone-50 border border-stone-200/60 font-mono font-black text-sm text-stone-600 flex items-center justify-center shrink-0">
                          #{item.rank}
                        </div>

                        {/* Company Logo and Info */}
                        <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 shadow-xs border border-stone-100 rounded-xl overflow-hidden p-1 bg-white">
                          {getCompanyLogo(item.companyName)}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-base sm:text-lg font-sans font-extrabold text-stone-900 tracking-tight leading-tight">
                              {item.companyName}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider leading-none ${getBadgeClasses(item.badgeColor)}`}>
                              {item.badge}
                            </span>
                          </div>
                          
                          <div className="mt-1 flex items-center gap-3 text-xs text-stone-400 font-mono font-semibold">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {item.projectCount} {item.projectCount === 1 ? 'Initiative' : 'Initiatives'}
                            </span>
                            <span>•</span>
                            <span className="hover:underline text-amber-600 flex items-center gap-0.5">
                              List sanctioned works
                              <ArrowRight className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Display Amount Highlight in proper formats */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-stone-50 pt-3 sm:pt-0">
                        <div className="text-right">
                          <div className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest leading-none">Total Funding</div>
                          <div className="text-base sm:text-lg font-sans font-black text-stone-900 mt-1">
                            {formatINR(item.totalRupees)}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-stone-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-stone-400" />
                        )}
                      </div>

                    </div>

                    {/* Accordion Expansion Block showing exact CSR Works */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="border-t border-stone-100 bg-stone-25 overflow-hidden"
                        >
                          <div className="p-5 sm:p-6 lg:p-8 space-y-4">
                            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 uppercase tracking-wider pb-2 border-b border-stone-100">
                              <span>Detail List of Sanctioned Activities</span>
                              <span>Allocated Sanc. Amount</span>
                            </div>

                            <div className="space-y-3.5 max-h-[20rem] overflow-y-auto pr-1">
                              {item.works.map((work, idx) => {
                                const isCompletedProject = work.heading?.toLowerCase().includes('completed');
                                return (
                                  <div 
                                    key={idx}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4.5 rounded-2xl border shadow-xs transition-colors ${
                                      isCompletedProject 
                                        ? 'bg-emerald-50/20 border-emerald-150 hover:border-emerald-250 hover:bg-emerald-50/40' 
                                        : 'bg-white border-stone-200/60 hover:border-stone-250'
                                    }`}
                                  >
                                    <div className="space-y-1 sm:max-w-[75%]">
                                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold tracking-wide uppercase leading-none ${
                                        isCompletedProject 
                                          ? 'bg-emerald-100 text-emerald-850 border border-emerald-200' 
                                          : 'bg-stone-100 text-stone-500'
                                      }`}>
                                        {isCompletedProject ? (
                                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                                        ) : (
                                          <FileText className="h-2.5 w-2.5 shrink-0" />
                                        )}
                                        {work.heading || 'CSR Welfare Work'}
                                      </div>
                                      <p className="text-xs sm:text-sm text-stone-700 font-sans font-medium leading-relaxed">
                                        {work.workName}
                                      </p>
                                    </div>
                                    <div className={`sm:text-right font-mono font-black text-xs sm:text-sm shrink-0 px-3 py-1.5 border rounded-xl leading-none flex items-center justify-center self-start sm:self-center ${
                                      isCompletedProject 
                                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200/60' 
                                        : 'bg-stone-50 text-stone-900 border-stone-100'
                                    }`}>
                                      {work.sanctionedAmountStr}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Standard Administrative Stamp */}
                            <div className="pt-2 flex items-center justify-between text-[10px] font-mono font-bold text-stone-400">
                              <span>District Collectorate, Thoothukudi</span>
                              <span className="flex items-center gap-1">
                                Verified via DRDA
                                <Award className="h-3.5 w-3.5 text-emerald-600" />
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>



      </div>
    </section>
  );
}
