import React from 'react';
import { IMAGES, BOARD_MEMBERS, COL_PRESIDENT_MESSAGE } from '../data';
import { Quote, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function PresidentMessage() {
  const president = BOARD_MEMBERS[0];

  return (
    <section id="president-message" className="py-20 bg-gradient-to-b from-stone-50 via-white to-emerald-50/15 scroll-mt-14 sm:scroll-mt-16 border-b border-slate-150 relative overflow-hidden bg-grid-glow">
      {/* Decorative colored glow nodes */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Primary Row: Message text on left, President photo on right */}
        <div id="message-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Messages from President */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-md text-xs font-semibold self-start tracking-wider uppercase font-mono border border-emerald-100">
              <ShieldCheck className="h-4 w-4 text-emerald-700 font-bold" />
              President Message
            </div>
            
            <h2 className="text-3.5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              A Message from our President
            </h2>
            
            <div className="relative bg-gradient-to-br from-stone-50 to-emerald-50/30 rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              {/* Giant elegant decorative quote mark */}
              <Quote className="absolute -top-6 -left-3 h-12 w-12 text-emerald-600/10 shrink-0 select-none z-0" />
              
              <div className="relative z-10 space-y-4">
                {COL_PRESIDENT_MESSAGE.map((msg, index) => (
                  <p key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans italic leading-relaxed">
                    "{msg}"
                  </p>
                ))}
              </div>
            </div>

            {/* Signature/Affiliation closing block */}
            <div className="pt-4 flex items-center gap-3.5">
              <div className="h-10 w-1 bg-emerald-700 rounded-full shadow-xs"></div>
              <div>
                <p className="font-sans font-extrabold text-slate-900 text-sm sm:text-base">{president.name}</p>
                <p className="text-xs text-slate-500 font-sans tracking-wide">
                  {president.title} &amp; President, TDAS
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-quality generated President Image with dynamic framing */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden shadow-xl bg-white border-8 border-slate-50 relative group hover:shadow-2xl hover:border-emerald-50 transition-all duration-300">
              <div className="aspect-3/4 overflow-hidden">
                <img
                  id="president-photo-image"
                  src={IMAGES.vishuMahajan}
                  alt="Vishu Mahajan IAS, District Collector of Thoothukudi & President of Thoothukudi District Administration Society"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title label overlaid right at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md p-5 border-t border-white/10 text-center">
                <p className="text-white text-sm sm:text-base font-extrabold font-sans tracking-wide">
                  {president.name}
                </p>
                <p className="text-amber-400 text-xs font-semibold font-sans mt-0.5">
                  District Collector of Thoothukudi
                </p>
                <p className="text-emerald-350 text-[10px] font-bold tracking-widest uppercase font-mono mt-2 bg-emerald-900/50 inline-block px-2.5 py-0.5 rounded-md border border-emerald-500/10">
                  President, TDAS
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Board Office Bearers Section (4 boxes directly requested below president message) */}
        <div id="governing-body" className="mt-16 pt-12 border-t border-gray-150">
          <div className="text-center mb-10">
            <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-800 font-mono">
              SOCIETY OFFICIALS
            </h3>
            <h2 className="mt-1 text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 tracking-tight">
              Governing Board Members
            </h2>
            <div className="mt-1 text-xs text-gray-500 font-sans">
              Primary office-bearers of the Thoothukudi District Administration Society
            </div>
          </div>

          {/* List Grid of 4 Boxes */}
          <div id="board-members-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {BOARD_MEMBERS.map((member, index) => (
              <div
                key={index}
                id={`member-box-${index}`}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-lg hover:border-emerald-600/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Visual side accent on card hover */}
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-emerald-600 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div>
                  {/* Small clean role tag */}
                  <span className="inline-block text-[10px] bg-emerald-50 text-emerald-805 font-extrabold uppercase tracking-widest font-sans px-2.5 py-1 rounded-md mb-4 border border-emerald-100">
                    {member.role}
                  </span>
                  
                  {/* Name */}
                  <h4 className="text-base font-sans font-extrabold text-slate-900 tracking-tight mb-1.5 group-hover:text-emerald-850 transition-colors">
                    {member.name}
                  </h4>
                  
                  {/* Professional title */}
                  <p className="text-xs sm:text-sm text-slate-550 font-sans leading-relaxed">
                    {member.title}
                  </p>
                </div>

                {/* Seal background logo accent */}
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-gray-400 font-mono tracking-wider uppercase font-semibold">
                  <span>TDAS Board</span>
                  <HeartHandshake className="h-4 w-4 text-emerald-600/40 group-hover:text-emerald-650/85 group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
