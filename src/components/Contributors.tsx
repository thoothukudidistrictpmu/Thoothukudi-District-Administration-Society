import React from 'react';
import { CONTRIBUTORS } from '../data';

export default function Contributors() {
  const getLogo = (name: string) => {
    switch (name) {
      case 'SPIC':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="SPIC Corporate Logo">
            <circle cx="50" cy="50" r="45" fill="#f0vdf4" className="fill-emerald-50" stroke="#15803d" strokeWidth="2.5" />
            <path d="M50 22 C66 32, 66 65, 50 80 C34 65, 34 32, 50 22 Z" x-id="leaf" className="fill-emerald-800" />
            <path d="M50 30 C58 38, 58 62, 50 72 Z" className="fill-amber-500" opacity="0.9" />
            <text x="50" y="55" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.5">SPIC</text>
          </svg>
        );
      case 'VOC Chidambaranar Port Trust':
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
      case 'TCS':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="TCS Logo">
            <rect width="100" height="100" rx="20" fill="#eff6ff" className="fill-blue-50" />
            <path d="M25 65 C40 65 60 55 60 38 C60 25 45 25 35 40 C28 50 35 60 52 58 C66 56 72 35 72 35" fill="none" stroke="#1d4ed8" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="60" cy="38" r="5" fill="#1e40af" />
            <text x="50" y="84" fill="#111827" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1" fontFamily="system-ui, sans-serif">TCS</text>
          </svg>
        );
      case 'HCL':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="HCL Logo">
            <rect width="100" height="100" rx="20" fill="#eef2ff" className="fill-indigo-50" />
            <g transform="skewX(-10) translate(11, 4)">
              <text x="35" y="55" fill="#312e81" fontSize="26" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="-1">HCL</text>
              <rect x="12" y="60" width="56" height="5" rx="1.5" fill="#4f46e5" />
            </g>
            <text x="50" y="83" fill="#4f46e5" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="0.8" fontFamily="system-ui, sans-serif">FOUNDATION</text>
          </svg>
        );
      case 'Wipro':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Wipro Logo">
            <rect width="100" height="100" rx="20" fill="#faf5ff" className="fill-purple-50" />
            <circle cx="50" cy="40" r="7" fill="#4f46e5" />
            <circle cx="50" cy="20" r="5" fill="#06b6d4" />
            <circle cx="50" cy="60" r="5" fill="#10b981" />
            <circle cx="30" cy="40" r="5" fill="#f59e0b" />
            <circle cx="70" cy="40" r="5" fill="#ec4899" />
            <circle cx="36" cy="26" r="4.5" fill="#a855f7" />
            <circle cx="64" cy="26" r="4.5" fill="#ef4444" />
            <circle cx="36" cy="54" r="4.5" fill="#14b8a6" />
            <circle cx="64" cy="54" r="4.5" fill="#3b82f6" />
            <text x="50" y="81" fill="#1e1b4b" fontSize="13" fontWeight="950" textAnchor="middle" letterSpacing="0.3" fontFamily="system-ui, sans-serif">wipro</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Thoothukudi Thermal Power Station Logo">
            <rect width="100" height="100" rx="20" fill="#fffbeb" className="fill-amber-50" />
            <path d="M26 65 L34 32 L46 32 L43 65" className="fill-amber-950" opacity="0.85" />
            <path d="M43 65 L48 35 L58 35 L54 65" className="fill-amber-950" opacity="0.7" />
            <path d="M51 18 L38 41 L50 41 L42 66 L66 34 L52 34 Z" className="fill-amber-500" />
            <text x="50" y="84" fill="#78350f" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.8" fontFamily="system-ui, sans-serif">TTPS</text>
          </svg>
        );
    }
  };

  const getStyleClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          border: 'hover:border-emerald-500/30 hover:shadow-emerald-500/8',
          text: 'text-emerald-850'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50',
          border: 'hover:border-sky-500/30 hover:shadow-sky-500/8',
          text: 'text-sky-850'
        };
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'hover:border-blue-500/30 hover:shadow-blue-500/8',
          text: 'text-blue-850'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50',
          border: 'hover:border-indigo-500/30 hover:shadow-indigo-500/8',
          text: 'text-indigo-850'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'hover:border-purple-500/30 hover:shadow-purple-500/8',
          text: 'text-purple-855'
        };
      default:
        return {
          bg: 'bg-amber-50',
          border: 'hover:border-amber-500/30 hover:shadow-amber-500/8',
          text: 'text-amber-850'
        };
    }
  };

  return (
    <section id="contributors" className="py-20 bg-gradient-to-b from-white via-stone-50 to-emerald-50/10 relative overflow-hidden bg-grid-glow scroll-mt-14 sm:scroll-mt-16 border-b border-slate-150">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-11/12 bg-linear-to-b from-stone-50/20 to-transparent blur-3xl pointer-events-none -z-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-800 font-mono">
            PARTNERS IN DEVELOPMENT
          </h3>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
            Our Contributors
          </h2>
          <div className="mt-3 text-sm text-slate-500 font-sans italic">
            "Sustained by leading public enterprises and private corporate contributors."
          </div>
        </div>

        {/* Logo Cards Grid */}
        <div id="contributors-logos-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-stretch">
          {CONTRIBUTORS.map((contributor, index) => {
            const styles = getStyleClasses(contributor.color);
            return (
              <div
                key={index}
                id={`contributor-box-${index}`}
                className={`glow-shimmer group bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.015)] p-6 sm:p-7 flex flex-col items-center text-center justify-between transition-all duration-350 transform hover:-translate-y-1.5 ${styles.border} hover:shadow-xl`}
              >
                {/* Brand custom vector logo */}
                <div className="h-20 w-20 mb-5 shrink-0 transition-transform duration-300 hover:scale-110 drop-shadow-sm">
                  {getLogo(contributor.name)}
                </div>

                {/* Brand typography name block */}
                <div className="flex-grow flex flex-col justify-center">
                  <h4 className={`text-base font-sans font-extrabold tracking-tight ${styles.text} group-hover:text-amber-600 transition-colors`}>
                    {contributor.name}
                  </h4>
                  <p className="mt-3 text-xs text-slate-500 font-sans tracking-normal leading-relaxed line-clamp-4">
                    {contributor.description}
                  </p>
                </div>

                {/* Footer brand stamp */}
                <div className="mt-5 pt-3.5 border-t border-slate-50 w-full text-[9px] font-mono font-bold text-emerald-800/60 uppercase tracking-widest group-hover:text-emerald-800 transition-colors">
                  Verified Partner
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
