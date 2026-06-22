import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Building, 
  Clock, 
  Compass, 
  Grid, 
  List, 
  ExternalLink
} from 'lucide-react';

interface ContactOfficial {
  name: string;
  designation: string;
  fullTitle: string;
  phone: string;
  email: string;
  iconBg: string; // Tailored color styling
  cardGlow: string; // Glow halo colors
  badgeColor: string;
  avatarLetter: string;
  description: string;
}

const OFFICIALS_DATA: ContactOfficial[] = [
  {
    name: 'Mr. Vishu Mahajan, IAS',
    designation: 'District Collector & Magistrate',
    fullTitle: 'District Administration Apex Desk',
    phone: '9444186000',
    email: 'collrtut@nic.in',
    iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
    cardGlow: 'from-amber-50 relative border-l-4 border-l-amber-500 hover:shadow-amber-500/10 hover:border-amber-400',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200/60',
    avatarLetter: 'VM',
    description: 'Directs all administrative operations, legislative coordination, socio-economic welfare distribution, and overall governance in Thoothukudi District.'
  },
  {
    name: 'Mr. M. Guruchandran',
    designation: 'District Revenue Officer',
    fullTitle: 'Revenue & Land Administration Desk',
    phone: '9445000929',
    email: 'dro.tntut@nic.in',
    iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cardGlow: 'from-emerald-50 relative border-l-4 border-l-emerald-500 hover:shadow-emerald-500/10 hover:border-emerald-400',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200/60',
    avatarLetter: 'GC',
    description: 'Commanding authority over land acquisitions, stamp duties, revenue recovery, law and order, and public grievance registers.'
  },
  {
    name: 'Mrs. Ishwarya Ramanathan, IAS',
    designation: 'Project Director, DRDA',
    fullTitle: 'District Rural Development Agency',
    phone: '7373704229',
    email: 'tutdrda@gmail.com',
    iconBg: 'bg-sky-100 text-sky-700 border-sky-200',
    cardGlow: 'from-sky-50 relative border-l-4 border-l-sky-500 hover:shadow-sky-500/10 hover:border-sky-400',
    badgeColor: 'bg-sky-50 text-sky-900 border-sky-200/60',
    avatarLetter: 'IR',
    description: 'Spearheads all rural infrastructure deployments, CSR alignments, drinking water expansion schemes, and self-help group programs.'
  },
  {
    name: 'S. Uma Maheswari',
    designation: 'District Treasury Officer',
    fullTitle: 'Treasury & Accounts Department',
    phone: '8072818108',
    email: 'dtotut.tndta@nic.in',
    iconBg: 'bg-purple-100 text-purple-700 border-purple-200',
    cardGlow: 'from-purple-50 relative border-l-4 border-l-purple-500 hover:shadow-purple-500/10 hover:border-purple-400',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200/60',
    avatarLetter: 'UM',
    description: 'Manages government disbursements, budget allocation audits, public sector payrolls, and official financial transactions validation.'
  },
  {
    name: 'Dinesh & Jeya Nandha Kala S.',
    designation: 'District PMU Officers',
    fullTitle: 'Project Management Unit Coordination',
    phone: '', // Blank as represented in the screenshot
    email: 'thoothukudidistrictpmu@gmail.com',
    iconBg: 'bg-teal-100 text-teal-700 border-teal-200',
    cardGlow: 'from-teal-50 relative border-l-4 border-l-teal-500 hover:shadow-teal-500/10 hover:border-teal-400',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-200/60',
    avatarLetter: 'PM',
    description: 'Liaises with corporate backers for local welfare initiatives, manages dynamic proposals, and coordinates this online support portal.'
  }
];

export default function ContactUs() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2505);
  };

  return (
    <div id="contact-us-page-wrapper" className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* 1. Header Hero Panel with rich background colors */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-850 text-white py-16 px-4 border-b border-white/5">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-5 right-5 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Building className="h-3.5 w-3.5" />
            <span>Thoothukudi Administration Contacts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white max-w-4xl mx-auto">
            Administrative Contact Directory
          </h1>
          <p className="mt-4 text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-emerald-400 uppercase font-mono">
            Direct Public Channels — மக்கள் தொடர்பு மையம்
          </p>
          <p className="mt-5 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect directly with key administrative executives, revenue registers, rural planning officers, and the Project Management Unit coordinates. Feel free to copy phone links or initiate email queries.
          </p>
        </div>
      </section>

      {/* 2. Main content container aligned centrally */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Official Directory Ledger • {OFFICIALS_DATA.length} Key Contacts
            </span>
          </div>

          {/* View Mode Switches */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              id="view-mode-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white text-emerald-800 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Interactive Cards</span>
            </button>
            <button
              id="view-mode-table-btn"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-white text-emerald-800 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Symmetrical Table</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {OFFICIALS_DATA.map((off, idx) => (
                <div
                  key={idx}
                  id={`official-card-${idx}`}
                  className={`bg-gradient-to-br ${off.cardGlow} to-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full`}
                >
                  {/* Header: Avatar, Name, and Badge */}
                  <div className="flex items-start gap-4">
                    {/* Interactive Avatar */}
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-display font-black text-sm tracking-tight border shadow-xs shrink-0 select-none ${off.iconBg}`}>
                      {off.avatarLetter}
                    </div>

                    <div className="space-y-1">
                      <span className={`inline-block text-[10px] font-mono tracking-wider font-extrabold px-2 py-0.5 rounded-md border ${off.badgeColor}`}>
                        {off.designation}
                      </span>
                      <h3 className="text-base sm:text-lg font-sans font-extrabold text-slate-900 tracking-tight leading-snug">
                        {off.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-sans tracking-wide">
                        {off.fullTitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans flex-grow">
                    {off.description}
                  </p>

                  {/* Action Hub */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                    {/* Phone Channel */}
                    {off.phone ? (
                      <div className="flex items-center justify-between text-xs font-sans group">
                        <span className="text-slate-400 inline-flex items-center gap-1.5 font-sans">
                          <Phone className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Phone Line:</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:+91${off.phone}`}
                            className="font-mono font-bold text-slate-700 hover:text-emerald-700 hover:underline transition-all"
                          >
                            +91 {off.phone}
                          </a>
                          <button
                            onClick={() => handleCopy(off.phone, `phone-${idx}`)}
                            className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-all cursor-pointer"
                            title="Copy number"
                          >
                            {copiedText === `phone-${idx}` ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600 animate-scale-up" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-slate-400 inline-flex items-center gap-1.5 font-sans">
                          <Phone className="h-3.5 w-3.5 text-slate-350" />
                          <span>Phone Line:</span>
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                          Email Channels Only
                        </span>
                      </div>
                    )}

                    {/* Email Channel */}
                    <div className="flex items-center justify-between text-xs font-sans group">
                      <span className="text-slate-400 inline-flex items-center gap-1.5 font-sans">
                        <Mail className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Official Mail:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`mailto:${off.email}`}
                          className="font-mono font-bold text-slate-700 hover:text-emerald-700 hover:underline break-all"
                        >
                          {off.email}
                        </a>
                        <button
                          onClick={() => handleCopy(off.email, `mail-${idx}`)}
                          className="p-1 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Copy email ID"
                        >
                          {copiedText === `mail-${idx}` ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 animate-scale-up" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive action buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {off.phone && (
                      <a
                        href={`tel:+91${off.phone}`}
                        className="py-2 inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-2xs hover:shadow-xs transition-colors cursor-pointer"
                      >
                        <Phone className="h-3 w-3 text-emerald-400" />
                        <span>Call Office</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${off.email}`}
                      className={`py-2 inline-flex items-center justify-center gap-1.5 border border-slate-250 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer ${
                        !off.phone ? 'col-span-2 bg-slate-105 hover:bg-slate-150' : ''
                      }`}
                    >
                      <Mail className="h-3 w-3 text-emerald-600" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            // Table ledger layout resembling screenshot but beautiful and adaptive
            <motion.div
              key="table-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto sm:overflow-visible">
                <table className="w-full text-left border-collapse block sm:table">
                  <thead className="bg-slate-900 text-white text-xs font-mono uppercase tracking-widest border-b border-slate-800 font-bold hidden sm:table-header-group">
                    <tr>
                      <th className="py-4.5 px-6 font-semibold">Name</th>
                      <th className="py-4.5 px-6 font-semibold">Designation</th>
                      <th className="py-4.5 px-6 font-semibold">Phone Number</th>
                      <th className="py-4.5 px-6 font-semibold">Official Email ID</th>
                      <th className="py-4.5 px-6 text-center font-semibold">Quick Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 block sm:table-row-group">
                    {OFFICIALS_DATA.map((off, idx) => (
                      <tr 
                        key={idx}
                        id={`table-row-${idx}`}
                        className="hover:bg-slate-50/70 transition-all text-xs sm:text-sm font-sans block sm:table-row p-4 sm:p-0 border-b border-slate-100 last:border-b-0 sm:border-b-0"
                      >
                        <td className="py-2 sm:py-4 px-0 sm:px-6 block sm:table-cell">
                          <div className="flex items-center gap-3">
                            <span className={`h-8 w-8 rounded-lg flex items-center justify-center font-display font-black text-xs shrink-0 ${off.iconBg}`}>
                              {off.avatarLetter}
                            </span>
                            <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">{off.name}</span>
                          </div>
                        </td>
                        <td className="py-1 sm:py-4 px-0 sm:px-6 text-slate-500 font-medium block sm:table-cell">
                          <div className="flex items-center sm:block">
                            <span className="inline-block sm:hidden text-[10px] font-mono text-slate-400 font-bold uppercase w-28 shrink-0">Designation:</span>
                            <span className={`inline-block text-[11px] font-mono tracking-wide font-black px-2 py-0.5 rounded-md border ${off.badgeColor}`}>
                              {off.designation}
                            </span>
                          </div>
                        </td>
                        <td className="py-1 sm:py-4 px-0 sm:px-6 block sm:table-cell">
                          <div className="flex items-center sm:block">
                            <span className="inline-block sm:hidden text-[10px] font-mono text-slate-400 font-bold uppercase w-28 shrink-0">Phone:</span>
                            {off.phone ? (
                              <div className="flex items-center gap-2">
                                <a 
                                  href={`tel:+91${off.phone}`}
                                  className="font-mono font-bold text-slate-700 hover:text-emerald-700 hover:underline text-xs sm:text-sm"
                                >
                                  +91 {off.phone}
                                </a>
                                <button
                                  onClick={() => handleCopy(off.phone, `tbl-ph-${idx}`)}
                                  className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                                >
                                  {copiedText === `tbl-ph-${idx}` ? (
                                    <Check className="h-3 w-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
                                Email Only
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-1 sm:py-4 px-0 sm:px-6 block sm:table-cell">
                          <div className="flex items-center sm:block">
                            <span className="inline-block sm:hidden text-[10px] font-mono text-slate-400 font-bold uppercase w-28 shrink-0">Email ID:</span>
                            <div className="flex items-center gap-2 max-w-full overflow-hidden">
                              <a 
                                href={`mailto:${off.email}`} 
                                className="font-mono text-slate-700 hover:text-emerald-700 hover:underline break-all text-xs sm:text-sm truncate sm:overflow-visible"
                                title={off.email}
                              >
                                {off.email}
                              </a>
                              <button
                                onClick={() => handleCopy(off.email, `tbl-mail-${idx}`)}
                                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                              >
                                {copiedText === `tbl-mail-${idx}` ? (
                                  <Check className="h-3 w-3 text-emerald-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 sm:py-4 px-0 sm:px-6 text-left sm:text-center block sm:table-cell border-t sm:border-t-0 border-slate-100 mt-2 sm:mt-0">
                          <div className="flex items-center sm:justify-center gap-2">
                            <span className="inline-block sm:hidden text-[10px] font-mono text-slate-400 font-bold uppercase w-28 shrink-0 flex-shrink-0">Quick Connections:</span>
                            <div className="inline-flex items-center gap-1.5">
                              {off.phone && (
                                <a
                                  href={`tel:+91${off.phone}`}
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                                  title="Voice Call Office"
                                >
                                  <Phone className="h-3.5 w-3.5" />
                                </a>
                              )}
                              <a
                                href={`mailto:${off.email}`}
                                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-150 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                                title="Compose Email"
                              >
                                <Mail className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Administrative Complex Details: Coordinates and Map placement */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 text-left">
          <h3 className="text-lg font-display font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-4">
            <Compass className="h-5.5 w-5.5 text-emerald-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Collectorate Complex Coordinates &amp; Services</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4.5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black text-slate-400 block">
                Official Registry Timings
              </span>
              <div className="flex items-start gap-2 pt-1 font-sans">
                <Clock className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">10:00 AM — 05:45 PM</span>
                  <span className="text-[11px] text-slate-500 block font-medium">Monday through Friday</span>
                  <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-1 py-0.2 rounded mt-1.5 inline-block">Closed Saturdays, Sundays, &amp; Public Holidays</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4.5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black text-slate-400 block">
                Geographical Coordinates
              </span>
              <div className="flex items-start gap-2 pt-1 font-sans">
                <MapPin className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">Collectorate complex</span>
                  <span className="text-[11px] font-mono text-slate-500 block">8.7610° N, 78.1348° E</span>
                  <span className="text-[11px] text-slate-500 block font-medium mt-1">Korampallam, Thoothukudi - 628101</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 rounded-xl p-4.5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black text-slate-400 block">
                Administrative Helpline
              </span>
              <div className="flex items-start gap-2 pt-1 font-sans">
                <Phone className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">+91 461 234 0600</span>
                  <span className="text-[11px] text-slate-500 block font-medium font-sans">Collectorate Receptionist</span>
                  <a 
                    href="https://thoothukudi.nic.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[11px] text-emerald-700 hover:underline font-extrabold flex items-center gap-1 mt-1 font-sans"
                  >
                    <span>thoothukudi.nic.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
