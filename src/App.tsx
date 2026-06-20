import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import DistrictProfile from './components/DistrictProfile';
import PresidentMessage from './components/PresidentMessage';
import Journey from './components/Journey';
import Contributors from './components/Contributors';
import HomeContributors from './components/HomeContributors';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';
import SponsorshipPage from './components/SponsorshipPage';
import Chatbot from './components/Chatbot';
import Gallery from './components/Gallery';
import AboutPage from './components/AboutPage';
import { Project } from './types';
import { Info, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [contributorSearchQuery, setContributorSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('project_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: ''
  });

  const handleToggleCart = (project: Project) => {
    const exists = cart.some(p => p.title === project.title);
    let updated;
    if (exists) {
      updated = cart.filter(p => p.title !== project.title);
    } else {
      updated = [...cart, project];
    }
    setCart(updated);
    try {
      localStorage.setItem('project_cart', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCartChange = (newCart: Project[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('project_cart', JSON.stringify(newCart));
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'projects') {
      setActiveTab('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'sponsorship') {
      setActiveTab('sponsorship');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'contributors') {
      setContributorSearchQuery('');
      setActiveTab('contributors');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'about-us') {
      setActiveTab('about-us');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'gallery') {
      setActiveTab('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'home') {
      setActiveTab('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Modal placeholders for under construction tabs
    const names: Record<string, string> = {
      'join-us': 'Join Us Memberships',
      'contact-us': 'Contact Desk'
    };
    setNotifyModal({
      isOpen: true,
      title: names[id] || id
    });
  };

  const handleCloseModal = () => {
    setNotifyModal({ isOpen: false, title: '' });
  };

  const exploreCSR = () => {
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewContributor = (companyName: string) => {
    setContributorSearchQuery(companyName);
    setActiveTab('contributors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-mesh-gradient flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* 1. Header Emblem Banner */}
      <Header />

      {/* 2. Primary Navigation Bar */}
      <Navigation onNavClick={handleNavClick} activeTab={activeTab} />

      {/* 3. Main Landing Contents (The Home Page Flow or Projects Page) */}
      <main id="main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectsPage 
                cart={cart}
                onToggleCart={handleToggleCart}
                onCartChange={handleCartChange}
                onNavClick={handleNavClick}
              />
            </motion.div>
          ) : activeTab === 'sponsorship' ? (
            <motion.div
              key="sponsorship"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SponsorshipPage 
                cart={cart}
                onToggleCart={handleToggleCart}
                onCartChange={handleCartChange}
                onNavClick={handleNavClick}
              />
            </motion.div>
          ) : activeTab === 'contributors' ? (
            <motion.div
              key="contributors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Contributors initialSearchQuery={contributorSearchQuery} />
            </motion.div>
          ) : activeTab === 'about-us' ? (
            <motion.div
              key="about-us"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutPage onExploreClick={() => handleNavClick('projects')} />
            </motion.div>
          ) : activeTab === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Gallery />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Landing Hero Image & Description */}
              <Hero onExploreClick={exploreCSR} />

              {/* District Profile (Left map, Right 2 paragraphs description) */}
              <DistrictProfile />

              {/* About the Society Section (3 paragraphs, Left Text, Right Image) */}
              <AboutUs />

              {/* President Message (Collector Portrait right, Message left) & 4 Leadership boxes below */}
              <PresidentMessage />

              {/* Metrics Timeline - Journey So Far (4 statistics boxes) */}
              <Journey onProjectsClick={exploreCSR} />

              {/* Compact Contributors List */}
              <HomeContributors onCompanyClick={handleViewContributor} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Contact & Social Links Footer */}
      <Footer />

      {/* Modern Floating AI Chatbot Widget */}
      <Chatbot />

      {/* Elegant Modal Box Overlay for sections designated for future deployment */}
      <AnimatePresence>
        {notifyModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            id="future-tab-modal"
            onClick={handleCloseModal}
          >
            {/* Prevent clicks inside from triggering container close */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Exit Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors pointer-cursor"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Shield Indicator Accent */}
              <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-705 mb-5 border border-emerald-100">
                <ShieldAlert className="h-6 w-6 text-emerald-700" />
              </div>

              {/* Modal Core Title */}
              <h3 className="text-xl font-sans font-extrabold text-slate-900 tracking-tight">
                {notifyModal.title} - Page Under Construction
              </h3>

              {/* Modal Explanatory Message */}
              <p className="mt-3 text-sm text-gray-500 font-sans leading-relaxed">
                The <strong className="text-slate-800">{notifyModal.title}</strong> standalone section is currently under active construction and will be launched officially in the next phase of this portal.
              </p>
              <p className="mt-2.5 text-sm text-gray-500 font-sans leading-relaxed">
                All official district welfare details, guidelines, statistics, and contributors lists remain accessible on the main live Home dashboard screen below.
              </p>

              {/* CTA Close Button */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors font-sans cursor-pointer shadow-xs"
                >
                  Return to Live Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
