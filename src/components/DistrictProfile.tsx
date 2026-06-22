import React from 'react';
import { motion } from 'motion/react';
import { IMAGES } from '../images';
import { DISTRICT_NAME, DISTRICT_PARAGRAPHS } from '../data';
import { Map, MapPin, Compass, Waves } from 'lucide-react';

export default function DistrictProfile() {
  return (
    <section id="district-profile" className="py-20 bg-mesh-premium relative overflow-hidden bg-dot-matrix border-t border-b border-slate-150 scroll-mt-14 sm:scroll-mt-16">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-800 font-mono">
            REGIONAL OVERVIEW
          </h3>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            District Profile
          </h2>
          <div className="text-sm font-semibold tracking-widest text-emerald-850 font-sans uppercase mt-2">
            Thoothukudi — "The Pearl City"
          </div>
        </motion.div>

        {/* Layout: Left map, Right descriptions */}
        <div id="district-profile-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Map image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white p-3.5 w-full max-w-sm sm:max-w-md lg:max-w-full group hover:shadow-2xl hover:border-emerald-600/20 transition-all duration-350">
              <div className="aspect-4/3 overflow-hidden rounded-xl bg-slate-100 relative">
                <img
                  id="thoothukudi-district-map"
                  src={IMAGES.districtMap}
                  alt="Thoothukudi District Map representation under Tamil Nadu state coast"
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-104 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual compass helper */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs p-2 rounded-full shadow-md border border-slate-100 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <Compass className="h-5 w-5 text-emerald-700 animate-spin-slow" />
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-lg text-[10px] font-mono text-gray-100 flex items-center gap-2 border border-white/10 shadow-lg">
                  <span className="h-2 w-2 bg-rose-500 rounded-full animate-pulse"></span>
                  <span>GPS Core: 8.76°N, 78.13°E</span>
                </div>
              </div>
              <p className="text-center text-[11px] text-gray-450 font-sans mt-3.5 italic font-medium">
                Figure: General Map of Thoothukudi District showcasing its prominent coastal positioning.
              </p>
            </div>
          </motion.div>

          {/* Right Side: 2 Paragraphs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-5"
            >
              {DISTRICT_PARAGRAPHS.map((para, index) => (
                <p
                  key={index}
                  className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans first-letter:font-semibold first-letter:text-emerald-800"
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Micro details grid showcasing Thoothukudi stats */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="group bg-white p-4 rounded-xl border border-slate-150/80 flex gap-3 items-center hover:border-sky-500/20 hover:shadow-xs transition-all duration-305">
                <div className="p-2.5 bg-sky-50 text-sky-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Waves className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Gulf of Mannar</h4>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 font-sans">163.5 KM Coast</p>
                </div>
              </div>
              <div className="group bg-white p-4 rounded-xl border border-slate-150/80 flex gap-3 items-center hover:border-emerald-550/20 hover:shadow-xs transition-all duration-305">
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Map className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Taluks &amp; Blocks</h4>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 font-sans">10 Taluks &amp; 12 Blocks</p>
                </div>
              </div>
              <div className="group bg-white p-4 rounded-xl border border-slate-150/80 flex gap-3 items-center hover:border-amber-550/20 hover:shadow-xs transition-all duration-305">
                <div className="p-2.5 bg-amber-50 text-amber-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Industrial Rank</h4>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 font-sans">Southern Hub</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
