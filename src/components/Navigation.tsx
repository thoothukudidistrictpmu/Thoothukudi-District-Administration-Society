import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

interface NavigationProps {
  onNavClick: (link: string) => void;
  activeTab: string;
}

export default function Navigation({ onNavClick, activeTab }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about-us' },
    { name: 'Projects', id: 'projects' },
    { name: 'Sponsorship', id: 'sponsorship' },
    { name: 'Our Contributors', id: 'contributors' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact us', id: 'contact-us' }
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <nav id="navbar" className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-white shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:justify-center h-14 sm:h-16 w-full">
          {/* Mobile Brand and Menu Button (replaces empty left-side) */}
          <div className="flex md:hidden items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm tracking-tight text-white">TDAS Welfare Portal</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-sans font-bold tracking-widest uppercase">CSR</span>
            </div>
            
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800/80 bg-slate-900/40 select-none cursor-pointer transition-all duration-200"
              aria-expanded={isOpen}
            >
              <span className="text-xs font-semibold tracking-wider font-sans uppercase">Menu</span>
              {isOpen ? <X className="block h-5 w-5 text-amber-400" /> : <Menu className="block h-5 w-5 text-emerald-400" />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleItemClick(link.id)}
                className={`relative px-4 py-2 rounded-lg font-sans text-xs lg:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === link.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-650 text-white shadow-lg shadow-emerald-950/80 border border-white/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {/* Active link dynamic decorative dot */}
                {activeTab === link.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 bg-amber-400 rounded-full animate-ping"></span>
                )}
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-white/5 shadow-2xl animate-fade-in" id="mobile-menu">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleItemClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-sans text-sm font-semibold tracking-wide transition-all duration-150 ${
                  activeTab === link.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-650 text-white shadow-md border border-white/10'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
