import React from 'react';
import { SOCIAL_LINKS } from '../data';
import { Facebook, Twitter, Instagram, Globe, Phone, Mail, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer() {
  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4.5 w-4.5" />;
      case 'twitter / x':
        return <Twitter className="h-4.5 w-4.5" />;
      case 'instagram':
        return <Instagram className="h-4.5 w-4.5" />;
      default:
        return <Globe className="h-4.5 w-4.5" />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-us" className="bg-slate-950 text-gray-300 py-12 border-t-4 border-emerald-800 scroll-mt-14 sm:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer deck: Brand column + Quick Links Column + Contact Column */}
        <div id="footer-top-deck" className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-gray-800">
          
          {/* Column A: Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                T
              </div>
              <span className="font-sans font-bold text-white tracking-wide text-base">
                Thoothukudi District Administration Society
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 tracking-wide leading-relaxed font-sans">
              Addressing localized community priorities, expanding basic public convenience infrastructure, and building a bridge for transparent corporate contributions under the authority of the District Collector.
            </p>

            {/* Social media links requested by user */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-gray-500 mb-3">
                Social Media Handles
              </h4>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    key={index}
                    id={`social-link-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-900 border border-gray-800 hover:border-emerald-600 hover:text-white hover:bg-emerald-700/20 text-gray-400 transition-all cursor-pointer"
                    title={link.name}
                  >
                    {getSocialIcon(link.name)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Official Links that come under this society / Thoothukudi */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase font-mono tracking-widest text-emerald-400">
              District Portal Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://thoothukudi.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-sans"
                >
                  <span>Thoothukudi Administration</span>
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://thoothukudicorporation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-sans"
                >
                  <span>Thoothukudi City Corporation</span>
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tn.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 font-sans"
                >
                  <span>Government of Tamil Nadu</span>
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column C: Society Contact Desk */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase font-mono tracking-widest text-emerald-400">
              Administrative Desk
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-2.5 font-sans">
                <MapPin className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  District Rural Development Agency,<br />
                  District Collectorate Complex, Korampallam,<br />
                  Thoothukudi - 628101, Tamil Nadu, India.
                </span>
              </li>
              <li className="flex items-center gap-2.5 font-sans">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="tel:04612340600" className="hover:text-emerald-400 hover:underline transition-colors">
                  0461-2340600 (Collectorate Landline)
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-sans">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                <a href="mailto:collrtut@nic.in" className="hover:text-emerald-400 hover:underline transition-colors">
                  collrtut@nic.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright details deck */}
        <div id="footer-bottom-deck" className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-[11px] sm:text-xs font-sans tracking-wide">
              &copy; {new Date().getFullYear()} Thoothukudi District Administration Society (TDAS). All Rights Reserved.
            </p>
            <p className="text-[10px] text-gray-500 font-mono">
              Designed as an official digital welfare landing resource — Thoothukudi PMU.
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-white transition-colors py-2 px-3 bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
