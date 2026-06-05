import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import CSRInfo from './components/CSRInfo';
import Services from './components/Services';
import DistrictProfile from './components/DistrictProfile';
import PresidentMessage from './components/PresidentMessage';
import Journey from './components/Journey';
import Contributors from './components/Contributors';
import Footer from './components/Footer';
import ProjectsPage from './components/ProjectsPage';
import { Info, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [notifyModal, setNotifyModal] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: ''
  });

  const handleNavClick = (id: string) => {
    if (id === 'projects') {
      setActiveTab('projects');
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
      'about-us': 'About Us',
      'contributors': 'Our Contributors',
      'join-us': 'Join Us Memberships',
      'gallery': 'District Welfare Gallery',
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

  return (
    <div className="min-h-screen bg-mesh-gradient flex flex-col selection:bg-emerald-700 selection:text-white">
      {/* 1. Header Emblem Banner */}
      <Header />

      {/* 2. Primary Navigation Bar */}
      <Navigation onNavClick={handleNavClick} activeTab={activeTab} />

      {/* 3. Main Landing Contents (The Home Page Flow or Projects Page) */}
      <main id="main-content" className="flex-grow">
        {activeTab === 'projects' ? (
          <ProjectsPage />
        ) : (
          <>
            {/* Landing Hero Image & Description */}
            <Hero onExploreClick={exploreCSR} />

            {/* About the Society Section (3 paragraphs, Left Text, Right Image) */}
            <AboutUs />

            {/* Corporate Social Responsibility (CSR) India Regulations Overview & 3 boxes */}
            <CSRInfo />

            {/* Humanist Services & 3 boxes (Education, Public Health, Agriculture) */}
            <Services />

            {/* District Profile (Left map, Right 2 paragraphs description) */}
            <DistrictProfile />

            {/* President Message (Collector Portrait right, Message left) & 4 Leadership boxes below */}
            <PresidentMessage />

            {/* Metrics Timeline - Journey So Far (4 statistics boxes) */}
            <Journey onProjectsClick={exploreCSR} />

            {/* Authorized Contributors (SPIC, VOC Port, TCS, HCL, Wipro, TTPS) */}
            <Contributors />
          </>
        )}
      </main>

      {/* 4. Contact & Social Links Footer */}
      <Footer />

      {/* Elegant Modal Box Overlay for sections designated for future deployment */}
      {notifyModal.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
          id="future-tab-modal"
          onClick={handleCloseModal}
        >
          {/* Prevent clicks inside from triggering container close */}
          <div 
            className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
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
          </div>
        </div>
      )}
    </div>
  );
}
