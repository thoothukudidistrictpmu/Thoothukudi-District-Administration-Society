import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PROJECTS_STATIC } from '../data';
import { Project } from '../types';
import { FolderHeart, TrendingUp, CheckCircle2, Coins } from 'lucide-react';

// Standalone CSV parser matching ProjectsPage structure
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

// Financial outlay parser
function parseFinancialOutlay(outlay: string): number {
  if (!outlay) return 0;
  const clean = outlay.replace(/Rs\./gi, '').replace(/,/g, '').trim().toLowerCase();
  
  // Try pattern like "6.12 crore" or "72 lakhs"
  const match = clean.match(/([\d.]+)\s*(crore|crores|lakh|lakhs|cr|l)?/i);
  if (!match) {
    const fallbackVal = parseFloat(clean);
    return isNaN(fallbackVal) ? 0 : fallbackVal;
  }
  
  const value = parseFloat(match[1]);
  if (isNaN(value)) return 0;
  
  const unit = match[2] || '';
  if (unit.startsWith('crore') || unit === 'cr') {
    return value * 10000000; // 1 Crore = 10,000,000
  } else if (unit.startsWith('lakh') || unit === 'l') {
    return value * 100000; // 1 Lakh = 100,000
  }
  return value;
}

// Indian currency formatter styled for premium dashboards
function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(2)} Lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

interface JourneyProps {
  onProjectsClick?: () => void;
}

export default function Journey({ onProjectsClick }: JourneyProps) {
  const [projects, setProjects] = useState<Project[]>(PROJECTS_STATIC);

  useEffect(() => {
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
            imageUrl: ''
          });
        }

        if (parsedProjects.length > 0) {
          setProjects(parsedProjects);
        }
      } catch (err) {
        console.log('Background update skipped, serving secure local database: ', err);
      }
    };

    loadLiveDataSilently();
  }, []);

  // Compute stats on the current parsed set
  const totalProjectsCount = projects.length;
  const ongoingCount = projects.filter(p => p.status.toLowerCase().includes('partial')).length;
  const completedCount = projects.filter(p => p.status.toLowerCase().includes('complete')).length;
  
  // Outlays sum
  const totalOutlayVal = projects.reduce((sum, p) => sum + parseFinancialOutlay(p.financialOutlay), 0);

  // Render variables/labels
  const statsList = [
    {
      label: "Total Projects",
      value: totalProjectsCount > 0 ? `${totalProjectsCount}+` : '0',
      iconName: "FolderHeart"
    },
    {
      label: "Ongoing Projects",
      value: ongoingCount > 0 ? `${ongoingCount}+` : '0',
      iconName: "TrendingUp"
    },
    {
      label: "Completed",
      value: completedCount === 1 ? '1 Project' : `${completedCount} Projects`,
      iconName: "CheckCircle2"
    },
    {
      label: "Total Value",
      value: formatIndianCurrency(totalOutlayVal),
      iconName: "Coins"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'FolderHeart':
        return <FolderHeart className="h-6 w-6 text-white" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-white text-indigo-50" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="h-6 w-6 text-white text-emerald-50" />;
      default:
        return <Coins className="h-6 w-6 text-white text-amber-50" />;
    }
  };

  const getCardColor = (label: string) => {
    if (label.toLowerCase().includes('total projects')) {
      return 'from-emerald-700 to-emerald-800 ring-emerald-600/30';
    } else if (label.toLowerCase().includes('ongoing')) {
      return 'from-indigo-700 to-indigo-800 ring-indigo-600/30';
    } else if (label.toLowerCase().includes('completed')) {
      return 'from-teal-700 to-teal-800 ring-teal-600/30';
    } else {
      return 'from-amber-700 to-amber-800 ring-amber-600/30';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14
      }
    }
  };

  return (
    <section id="journey" className="py-20 bg-mesh-dark border-t border-b border-slate-950 text-white scroll-mt-14 sm:scroll-mt-16 relative overflow-hidden shadow-inner">
      {/* Decorative matrix dots layout on background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 font-mono">
            LIVE PORTAL METRICS
          </h3>
          <h2 className="mt-2 text-3xl font-sans font-extrabold text-white tracking-tight sm:text-4xl">
            Our Journey So Far
          </h2>
          <div className="h-1 w-14 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mx-auto mt-3"></div>
        </motion.div>

        {/* 4 statistics cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="stats-grid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {statsList.map((stat, index) => {
            const isTotal = stat.label.toLowerCase().includes('total projects');
            const isOngoing = stat.label.toLowerCase().includes('ongoing');
            const isCompleted = stat.label.toLowerCase().includes('completed');
            
            const shadowColor = isTotal 
              ? 'hover:shadow-emerald-500/20' 
              : isOngoing 
              ? 'hover:shadow-indigo-500/20' 
              : isCompleted 
              ? 'hover:shadow-teal-500/20' 
              : 'hover:shadow-amber-500/20';

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                id={`journey-box-${index}`}
                onClick={onProjectsClick}
                className={`group relative bg-gradient-to-br ${getCardColor(stat.label)} rounded-2xl p-6 sm:p-8 shadow-lg border border-white/10 hover:shadow-2xl ${shadowColor} flex flex-col justify-between transition-all duration-350 transform hover:-translate-y-1.5 cursor-pointer active:scale-[0.98] select-none`}
                title="Click to view district project sheet"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/80 font-sans">
                    {stat.label}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md group-hover:rotate-12 transition-transform duration-300">
                    {getIcon(stat.iconName)}
                  </div>
                </div>

                <div className="mt-8">
                  {/* Numeric/metric Big Display */}
                  <h4 
                    title={stat.value}
                    className={`font-display font-extrabold text-white tracking-tight break-words select-all ${
                      stat.value.length > 14
                        ? 'text-xl sm:text-2xl md:text-2.5xl lg:text-xl xl:text-2.5xl'
                        : stat.value.length > 8
                        ? 'text-2xl sm:text-3.5xl md:text-4xl lg:text-2xl xl:text-3.5xl'
                        : stat.value.length > 5
                        ? 'text-3xl sm:text-4xl lg:text-4xl xl:text-5xl'
                        : 'text-4xl sm:text-5xl lg:text-5.5xl xl:text-6xl'
                    }`}
                  >
                    {stat.value}
                  </h4>
                  <div className="mt-3 h-1 w-8 bg-white/25 rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
