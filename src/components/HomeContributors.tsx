import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DETAILED_CONTRIBUTORS } from '../data/contributors_data';
import { Building2, ArrowRight } from 'lucide-react';
import { IMAGES } from '../images';

const SPREADSHEET_ID = '1itNBrzhwMNoBA_54VfAwk4kfZF6uxmRKzeYY48T_sow';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=CSR%20Contributors`;

function parseCSV(csvText: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [''];
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      result.push(row);
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    result.push(row);
  }
  return result;
}

interface HomeContributorsProps {
  onCompanyClick: (companyName: string) => void;
}

const getCompanyLogo = (name: string) => {
  const clean = name.toLowerCase().trim();
  if (clean.includes('voc port') || clean.includes('chidambaranar')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.vocPortLogo} 
          alt="VOC Port Trust Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="voc-port-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('nlc') || clean.includes('ntpl') || clean.includes('power')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.ntplLogo} 
          alt="NLC Tamilnadu Power Limited Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="ntpl-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('state bank') || clean.includes('sbi')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.sbiLogo} 
          alt="State Bank of India Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="sbi-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('tmb') || clean.includes('mercantile')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.tmbBankLogo} 
          alt="Tamilnad Mercantile Bank (TMB Bank) Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="tmb-bank-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('jsw')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.jswFoundationLogo} 
          alt="JSW Foundation Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="jsw-foundation-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('ntpc')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.ntpcGreenLogo} 
          alt="NTPC Green Energy Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="ntpc-green-logo-img"
        />
      </div>
    );
  }
  if (clean.includes('sanitation')) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-2xl overflow-hidden p-0.5">
        <img 
          src={IMAGES.sanitationFirstLogo} 
          alt="Sanitation First Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          id="sanitation-first-logo-img"
        />
      </div>
    );
  }
  
  // Default fallback logo for general corporate entities
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Partner Corporate Logo">
      <rect width="100" height="100" rx="20" fill="#fafaf9" className="fill-stone-50" stroke="#e7e5e4" strokeWidth="1" />
      <circle cx="50" cy="45" r="18" fill="none" stroke="#a8a29e" strokeWidth="2.5" />
      <path d="M35 70 L65 70 L50 48 Z" fill="#a8a29e" />
      <text x="50" y="85" fill="#78716c" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fontFamily="system-ui, sans-serif">CORPORATE</text>
    </svg>
  );
};

const getCompanyDescription = (name: string) => {
  const clean = name.toLowerCase().trim();
  if (clean.includes('voc port') || clean.includes('chidambaranar')) {
    return 'Supporting Thoothukudi regional progress and welfare through community healthcare, de-addiction programs, newborn screening initiatives, and modern school infrastructure development.';
  }
  if (clean.includes('nlc') || clean.includes('ntpl') || clean.includes('power')) {
    return 'Strengthening rural infrastructure with innovative Anganwadi updates, public bus shelters, community dialysis equipment, sustainable farm ponds, and educational support resources.';
  }
  if (clean.includes('state bank') || clean.includes('sbi')) {
    return 'Empowering local community development by financing the comprehensive modernization of rural primary schools, specialized Anganwadi facilities, and senior care homes.';
  }
  if (clean.includes('tmb') || clean.includes('mercantile')) {
    return 'Enhancing educational access and classroom safety standards by funding essential structural renovations and improvements in government primary school premises.';
  }
  if (clean.includes('jsw')) {
    return 'Promoting agricultural sustainability and livelihood security through dedicated funding for construction and conservation of vital rural farm ponds.';
  }
  if (clean.includes('ntpc')) {
    return 'Upgrading community healthcare resources by supplying highly specialized medical and clinical diagnostic equipment to government hospitals in regional areas.';
  }
  if (clean.includes('sanitation')) {
    return 'Uplifting vulnerable migrant and refugee groups by sponsoring livelihood enablement programs and critical hygiene/sanitation systems inside regional camps.';
  }
  return 'Dedicated corporate partner committed to driving community enhancement, public welfare programs, and sustainable socio-economic development across the region.';
};

export default function HomeContributors({ onCompanyClick }: HomeContributorsProps) {
  const [companies, setCompanies] = useState<string[]>(() => {
    // Unique list of companies from preloaded data
    return Array.from(new Set(DETAILED_CONTRIBUTORS.map(c => c.companyName)));
  });

  useEffect(() => {
    const fetchLiveCompanies = async () => {
      try {
        const response = await fetch(CSV_URL);
        if (!response.ok) return;
        const csvText = await response.text();
        const parsedRows = parseCSV(csvText);
        if (parsedRows.length <= 1) return;

        const uniqueCompanies = new Set<string>();
        let currentCompany = '';

        for (let i = 1; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          if (row.length < 2) continue;
          let company = row[1] ? row[1].trim() : '';

          if (!company && currentCompany) {
            company = currentCompany;
          } else if (company) {
            currentCompany = company;
          }

          if (company && !company.toLowerCase().includes('company') && !company.toLowerCase().includes('contributor')) {
            uniqueCompanies.add(company);
          }
        }

        if (uniqueCompanies.size > 0) {
          setCompanies(Array.from(uniqueCompanies));
        }
      } catch (err) {
        console.warn('Silent live fetch in HomeContributors failed, using static list instead', err);
      }
    };

    fetchLiveCompanies();
  }, []);

  return (
    <section id="home-contributors" className="py-20 bg-stone-50 border-t border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-[0.25em] font-mono font-black text-emerald-800 mb-3">
            CSR Corporate Partnerships
          </h2>
          <h3 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-stone-900">
            Our Contributors
          </h3>
          <p className="mt-4 text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
            Click on any corporate partner listed below to view their detailed CSR profile, total sanctioned works, and complete list of public welfare schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {companies.map((company) => (
            <motion.button
              key={company}
              onClick={() => onCompanyClick(company)}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-between p-6 bg-white border border-stone-200 hover:border-emerald-600 hover:shadow-lg rounded-2xl transition-all duration-300 cursor-pointer text-center group w-full min-h-[340px] relative overflow-hidden"
            >
              <div className="flex flex-col items-center flex-1 w-full">
                {/* Logo Section */}
                <div className="h-16 w-16 mb-5 shrink-0 shadow-sm border border-stone-100 rounded-xl overflow-hidden p-1 bg-white group-hover:scale-105 transition-transform duration-300">
                  {getCompanyLogo(company)}
                </div>
                
                {/* Text Content */}
                <div className="w-full">
                  <span className="block font-sans font-black text-stone-900 group-hover:text-emerald-800 text-sm md:text-base mb-3 leading-snug px-1 text-center font-bold">
                    {company}
                  </span>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed group-hover:text-stone-600 transition-colors text-center line-clamp-5 px-1">
                    {getCompanyDescription(company)}
                  </p>
                </div>
              </div>

              {/* Action Link at Bottom */}
              <div className="flex items-center gap-1 text-[11px] font-mono font-black text-emerald-800 uppercase tracking-widest mt-6 pt-4 border-t border-stone-100 w-full justify-center group-hover:text-emerald-700 transition-colors">
                <span>View Profile</span>
                <ArrowRight className="h-3 w-3 text-emerald-650 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
