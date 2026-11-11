import React from 'react';
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, Car, Train, Building2 } from 'lucide-react';
import { BUSINESS_INFO, STUDIO_FEATURES } from '../data/cornersData';

export const StudioLocation: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 scroll-mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Studio Location & Experience Centre</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
            Visit Corners Joint in Hubballi
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2">
            Experience 300+ physical materials, hardware test rigs, and live 3D floor plan sessions at Marvel Artiza, right across from KIMS Hospital.
          </p>
        </div>

        {/* 2-Column Split: Map & Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Map Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-950 h-[380px] sm:h-[440px] shadow-lg group">
              {/* Google Maps Embed */}
              <iframe
                title="Corners Joint Hubballi Google Map Location"
                src="https://maps.google.com/maps?q=15.3617676,75.1259554+(CORNERS+JOINT+Hubballi)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Quick Action Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-white/95 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-400 font-semibold">
                    CORNERS JOINT · Hubballi
                  </div>
                  <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium">
                    {BUSINESS_INFO.shortAddress}
                  </div>
                </div>

                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 rounded-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Landmarks & Transit Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 shadow-sm flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#966D38] dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-white block">Opposite KIMS</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">Directly across KIMS main medical gate</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 shadow-sm flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#966D38] dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-white block">Free Visitor Parking</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">Basement & surface bays at Marvel Artiza</span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 shadow-sm flex items-start gap-2.5">
                <Train className="w-4 h-4 text-[#966D38] dark:text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 dark:text-white block">Central Connectivity</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[11px]">5m to Vidyanagar, 10m to Hubli Junction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Lounge Image & Address Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-xl">
              <div className="relative h-56 sm:h-64">
                <img
                  src="/src/assets/images/corners_studio_consultation_1794387696771.jpg"
                  alt="Corners Joint Studio Consultation Lounge Hubballi"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-semibold text-amber-300 dark:text-amber-400 uppercase tracking-wider block">
                    Inside Our Studio
                  </span>
                  <span className="text-sm font-medium text-white">
                    Marvel Artiza Design Studio & Material Walkthrough
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold block mb-1">
                    Complete Postal Address
                  </span>
                  <p className="text-stone-800 dark:text-stone-200 leading-relaxed font-mono text-xs">
                    {BUSINESS_INFO.address}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80">
                  <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold block mb-1">
                    Operating Hours
                  </span>
                  <div className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                    <div className="flex justify-between">
                      <span>Monday – Saturday:</span>
                      <span className="font-mono text-stone-900 dark:text-white font-medium">9:30 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-mono text-[#966D38] dark:text-amber-400 font-medium">10:30 AM – 5:00 PM (By Appt)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800/80 flex flex-wrap gap-4">
                  <a
                    href={`tel:${BUSINESS_INFO.phonePrimary.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 text-stone-800 dark:text-stone-300 hover:text-[#966D38] dark:hover:text-amber-400 font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#966D38] dark:text-amber-500" />
                    <span className="font-mono tabular-nums">{BUSINESS_INFO.phonePrimary}</span>
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-[#966D38] dark:hover:text-amber-400 font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-stone-400" />
                    <span className="font-mono tabular-nums">{BUSINESS_INFO.phoneSecondary}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-stone-200 dark:border-stone-800">
          {STUDIO_FEATURES.map((feat, idx) => (
            <div key={idx} className="p-5 rounded-lg bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 shadow-sm">
              <h4 className="text-sm font-semibold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#966D38] dark:bg-amber-500" />
                <span>{feat.title}</span>
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
