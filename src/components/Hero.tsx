import React from 'react';
import { IMAGES } from '../data';

interface HeroProps {
  onExploreClick?: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div id="home" className="relative bg-slate-950 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          id="hero-background-image"
          src={IMAGES.hero}
          alt="Thoothukudi District Administration Society community banner background"
          className="w-full h-full object-cover object-center filter brightness-35 contrast-105 transition-transform duration-1000 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* High visual quality dark gradients for text eligibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/40 to-slate-950/85"></div>
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(2, 6, 23, 0.95))"></div>
      </div>

      {/* Centered Typography layout */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-10">
        
        <div className="space-y-4 max-w-4xl">
          {/* English Title Block */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-tight drop-shadow-lg text-balance">
            Thoothukudi District <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Administration Society</span>
          </h2>

          {/* Tamil Title Block */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-emerald-350 tracking-wide drop-shadow-md">
            தூத்துக்குடி மாவட்ட நலச் சங்கம்
          </h3>
        </div>

        {/* Administrative Subtitle */}
        <div className="max-w-2xl bg-slate-950/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-inner">
          <p className="text-xs sm:text-sm text-gray-250 font-sans tracking-wide leading-relaxed font-light">
            Government of Tamil Nadu &bull; Transparent CSR Management For Ground Welfare Operations &bull; Serving Local Demographics
          </p>
        </div>

        {/* Aesthetic separation stamp */}
        <div className="pt-2 flex items-center justify-center gap-3 select-none text-[10px] font-mono tracking-[0.2em] text-emerald-450/90">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-500/50"></span>
          <span>ESTD 2024</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-500/50"></span>
        </div>
      </div>
    </div>
  );
}

