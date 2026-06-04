import React from 'react';
import { SERVICES_BOXES, SERVICES_QUOTE } from '../data';
import { BookOpen, Hospital, Wheat, Sparkles } from 'lucide-react';

export default function Services() {
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('education')) {
      return <BookOpen className="h-6 w-6 text-white" />;
    } else if (title.toLowerCase().includes('health')) {
      return <Hospital className="h-6 w-6 text-white text-rose-100" />;
    } else {
      return <Wheat className="h-6 w-6 text-white text-green-100" />;
    }
  };

  const getGradient = (title: string) => {
    if (title.toLowerCase().includes('education')) {
      return 'bg-linear-to-br from-emerald-600 to-emerald-800';
    } else if (title.toLowerCase().includes('health')) {
      return 'bg-linear-to-br from-sky-600 to-indigo-800';
    } else {
      return 'bg-linear-to-br from-teal-600 to-emerald-900';
    }
  };

  return (
    <section id="services" className="py-20 bg-mesh-gradient relative overflow-hidden bg-grid-glow scroll-mt-14 sm:scroll-mt-16 border-b border-slate-150">
      {/* Decorative accent colors */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-800 font-mono">
            WHAT WE DO
          </h3>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Services
          </h2>
          
          {/* Exact Quote Block */}
          <div className="mt-5 inline-flex items-center justify-center p-0.5 bg-linear-to-r from-amber-500 to-emerald-600 rounded-full shadow-md">
            <div className="px-6 py-3 bg-stone-50 rounded-full shadow-inner flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 animate-ping-once" />
              <q className="text-sm sm:text-base font-sans font-semibold text-slate-800 italic tracking-wide">
                {SERVICES_QUOTE}
              </q>
            </div>
          </div>
        </div>

        {/* 3 service description boxes */}
        <div id="services-boxes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {SERVICES_BOXES.map((box, index) => {
            const isEducation = box.title.toLowerCase().includes('education');
            const isHealth = box.title.toLowerCase().includes('health');
            const shadowHover = isEducation 
              ? 'hover:shadow-emerald-500/12 hover:border-emerald-550/20' 
              : isHealth 
              ? 'hover:shadow-indigo-500/12 hover:border-indigo-550/20' 
              : 'hover:shadow-teal-500/12 hover:border-teal-550/20';

            return (
              <div
                key={index}
                id={`service-box-${index}`}
                className={`group relative flex flex-col justify-between h-full rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 hover:shadow-xl ${shadowHover} transition-all duration-350 p-6 sm:p-8 text-left`}
              >
                {/* Floating graphic effect on card body */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-slate-50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div>
                  {/* Floating Rounded Icon with Custom Theme Gradients */}
                  <div className={`p-3.5 rounded-2xl ${getGradient(box.title)} w-14 h-14 flex items-center justify-center shadow-lg -mt-12 sm:-mt-14 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {getIcon(box.title)}
                  </div>

                  {/* Box Title */}
                  <h4 className="text-lg sm:text-xl font-sans font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-850 transition-colors">
                    {box.title}
                  </h4>

                  {/* Word description, structured to be exactly as original */}
                  <p className="text-slate-500 text-sm leading-relaxed font-sans font-normal mb-6">
                    {box.description}
                  </p>
                </div>

                {/* Footer block inside card */}
                <div className="border-t border-slate-50 pt-4 mt-2 flex items-center justify-between text-xs text-slate-400 font-semibold font-sans uppercase tracking-wider">
                  <span className="group-hover:text-slate-650 transition-colors">Awareness &amp; Welfare</span>
                  <span className="text-[10px] bg-emerald-50/70 border border-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">Initiated</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
