import React from 'react';
import { CSR_BOXES, CSR_INTRO } from '../data';
import { Landmark, PiggyBank, Globe, CheckCircle2, Award } from 'lucide-react';

export default function CSRInfo() {
  // Map icons dynamically to avoid template string interpolation errors
  const getIcon = (title: string) => {
    switch (title) {
      case 'Legal Framework':
        return <Landmark className="h-6 w-6 text-emerald-800" />;
      case 'CSR Spending Requirement':
        return <PiggyBank className="h-6 w-6 text-emerald-800" />;
      default:
        return <Globe className="h-6 w-6 text-emerald-800" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-tr from-slate-50 via-emerald-50/20 to-teal-100/10 relative overflow-hidden bg-dot-matrix border-b border-slate-150 scroll-mt-14 sm:scroll-mt-16">
      {/* Dynamic background lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-150 text-emerald-850 rounded-full text-xs font-extrabold tracking-widest uppercase font-sans mb-3 shadow-2xs">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>CSR MANDATE IN INDIA</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
            What is CSR?
          </h2>
          <div className="mt-6 p-6 sm:p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-150 shadow-xs relative">
            <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed text-center font-normal">
              {CSR_INTRO}
            </p>
          </div>
          <div className="mt-4 text-xs font-bold text-emerald-800 uppercase tracking-widest font-sans">
            Empowering Corporates &bull; Changing Lives
          </div>
        </div>

        {/* 3 Balanced Responsive Boxes Grid */}
        <div id="csr-boxes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-2">
          {CSR_BOXES.map((box, index) => (
            <div
              key={index}
              id={`csr-box-${index}`}
              className="group flex flex-col h-full bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] border border-slate-100/90 hover:border-emerald-600/20 hover:shadow-xl transition-all duration-350 p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Box Colored Header Bar Accent with high-quality gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 through-teal-500 to-amber-400 group-hover:h-2 transition-all duration-300"></div>
              
              {/* Box soft corner light highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Dynamic Header & Icon block */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl group-hover:scale-110 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300 shrink-0 shadow-2xs">
                  {getIcon(box.title)}
                </div>
                <h4 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-850 transition-colors">
                  {box.title}
                </h4>
              </div>

              {/* Core Content Body with improved spacing and line leading */}
              <p className="text-slate-600 text-sm leading-relaxed font-sans flex-grow relative z-10 selection:bg-emerald-100">
                {box.content}
              </p>

              {/* Box specific optional lists items */}
              {box.list && (
                <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 relative z-10">
                  {box.list.map((item, keyIndex) => (
                    <li key={keyIndex} className="flex items-start gap-2.5 text-xs text-slate-500 font-sans group-hover:text-slate-700 transition-colors">
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-650 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
