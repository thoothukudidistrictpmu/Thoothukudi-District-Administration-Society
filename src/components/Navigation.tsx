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
    { name: 'Join Us', id: 'join-us' },
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
        <div className="flex items-center justify-end md:justify-center h-14 sm:h-16 w-full">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleItemClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-md font-sans text-sm font-medium tracking-wide transition-all duration-150 ${
                  activeTab === link.id
                    ? 'bg-emerald-700 text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
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
