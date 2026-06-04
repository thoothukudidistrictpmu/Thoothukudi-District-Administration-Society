import React from 'react';
import { JOURNEY_STATS } from '../data';
import { FolderHeart, TrendingUp, CheckCircle2, Coins } from 'lucide-react';

export default function Journey() {
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

  return (
    <section id="journey" className="py-20 bg-gradient-to-br from-slate-950 via-emerald-950/90 to-slate-900 border-t border-b border-slate-950 text-white scroll-mt-14 sm:scroll-mt-16 relative overflow-hidden shadow-inner">
      {/* Decorative matrix dots layout on background */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-400 font-mono">
            HISTORIC METRICS
          </h3>
          <h2 className="mt-2 text-3xl font-sans font-extrabold text-white tracking-tight sm:text-4xl">
            Our Journey So Far
          </h2>
          <div className="h-1 w-14 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full mx-auto mt-3"></div>
        </div>

        {/* 4 statistics cards */}
        <div id="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {JOURNEY_STATS.map((stat, index) => {
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
              <div
                key={index}
                id={`journey-box-${index}`}
                className={`group relative bg-gradient-to-br ${getCardColor(stat.label)} rounded-2xl p-6 sm:p-8 shadow-lg border border-white/10 hover:shadow-2xl ${shadowColor} flex flex-col justify-between transition-all duration-350 hover:-translate-y-1.5`}
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
                      stat.value.length > 8
                        ? 'text-2xl sm:text-2.5xl md:text-3xl lg:text-2xl xl:text-3.5xl'
                        : stat.value.length > 5
                        ? 'text-3xl sm:text-4xl lg:text-4xl xl:text-5xl'
                        : 'text-4xl sm:text-5xl lg:text-5.5xl xl:text-6xl'
                    }`}
                  >
                    {stat.value}
                  </h4>
                  <div className="mt-3 h-1 w-8 bg-white/25 rounded-full group-hover:w-20 transition-all duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
