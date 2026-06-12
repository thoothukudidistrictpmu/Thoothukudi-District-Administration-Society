import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_SOCIETY_PARAGRAPHS } from '../data';
import { Target, Award, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="about-us" className="py-20 bg-mesh-premium border-t border-b border-slate-150 scroll-mt-14 sm:scroll-mt-16 relative overflow-hidden bg-grid-glow">
      {/* Decorative colored glow nodes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none select-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold tracking-widest uppercase font-sans mb-3 border border-emerald-100/50">
            <Sparkles className="h-3 w-3 text-emerald-600 animate-pulse" />
            <span>TDAS Foundation</span>
          </div>
          <h2 className="mt-1 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight text-balance">
            About Our Society
          </h2>
          <div className="mt-3 text-sm sm:text-base text-slate-500 font-sans italic max-w-xl mx-auto border-l-2 border-emerald-500/30 pl-4 py-1">
            "Serving as the catalyst for localized, public-private development partnerships."
          </div>
        </motion.div>

        {/* Content Layout: Centered modern text blocks */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto flex flex-col space-y-8"
        >
          {ABOUT_SOCIETY_PARAGRAPHS.map((paragraph, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-150/80 shadow-xs hover:shadow-lg hover:border-emerald-500/10 transition-all duration-350 before:absolute before:left-0 before:top-6 before:bottom-6 before:w-1.5 before:bg-gradient-to-b before:from-emerald-600 before:to-amber-500 before:rounded-r-md group"
            >
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans first-letter:text-3.5xl first-letter:font-extrabold first-letter:text-emerald-800 first-letter:mr-2 select-text">
                {paragraph}
              </p>
            </motion.div>
          ))}

          {/* Minor decorative features list for balance */}
          <motion.div 
            variants={itemVariants}
            className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-150 mt-8"
          >
            <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-700/20 hover:shadow-md transition-all duration-350 flex items-start gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 shadow-sm border border-emerald-100/30">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans uppercase tracking-wider group-hover:text-emerald-800 transition-colors">Mission Oriented</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1.5 leading-relaxed">Delivering high-value, direct solutions to community infrastructure gaps.</p>
              </div>
            </div>
            
            <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-amber-700/20 hover:shadow-md transition-all duration-350 flex items-start gap-4">
              <div className="p-3 bg-amber-50 text-amber-800 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300 shadow-sm border border-amber-100/30">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans uppercase tracking-wider group-hover:text-amber-800 transition-colors font-sans font-sans">State Audited</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-sans mt-1.5 leading-relaxed">Strict compliance under the direct administrative audit of the District Collector.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
