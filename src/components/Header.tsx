import React, { useState } from 'react';
import { IMAGES } from '../images';

export default function Header() {
  const [logoSrc, setLogoSrc] = useState(IMAGES.tnLogo);

  return (
    <header id="app-header" className="relative bg-gradient-to-b from-stone-100/90 via-white to-emerald-50/20 border-b border-slate-100 py-8 sm:py-10 shadow-sm overflow-hidden bg-grid-glow">
      {/* Dynamic Background accents for an innovative creative look */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none translate-y-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Tamil Nadu Government Logo on top */}
        <div className="mb-4 flex justify-center">
          <img
            src={logoSrc}
            alt="Government of Tamil Nadu Emblem"
            className="h-28 w-28 object-contain drop-shadow-md select-none pointer-events-none transition-transform duration-300 hover:scale-105"
            onError={() => {
              // Graceful fallback to Wikipedia link if local file hasn't been uploaded yet
              setLogoSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/TamilNadu_Logo.svg/1024px-TamilNadu_Logo.svg.png");
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* State/Welfare Embellishment/Crest Icon */}
        <div className="mb-4 text-emerald-700 flex items-center justify-center gap-3">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-amber-500 rounded-full"></div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-slate-550 font-sans">
            Government of Tamil Nadu
          </span>
          <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-amber-500 rounded-full"></div>
        </div>

        {/* Bilingual Title Block */}
        <h1 className="text-3.5xl sm:text-4.5xl md:text-5.5xl font-display font-extrabold tracking-tight text-slate-900 leading-tight">
          Thoothukudi District Administration Society
        </h1>
        <h2 className="mt-3 text-lg sm:text-xl md:text-2xl font-sans font-semibold text-emerald-800 tracking-wide bg-emerald-50/50 px-4 py-1.5 rounded-full border border-emerald-100/50 inline-block">
          தூத்துக்குடி மாவட்ட நலச் சங்கம்
        </h2>

        {/* Subtle decorative innovative line */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-1 w-12 bg-linear-to-r from-emerald-700 to-emerald-500 rounded-full"></span>
          <span className="h-1.5 w-1.5 bg-amber-500 rounded-full ring-4 ring-amber-100 animate-pulse"></span>
          <span className="h-1 w-12 bg-linear-to-l from-emerald-700 to-emerald-500 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}
