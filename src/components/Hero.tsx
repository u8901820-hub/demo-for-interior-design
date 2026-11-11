import React from 'react';
import { ArrowRight, Calendar, Compass, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cornersData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative bg-[#FAF8F5] dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16 relative z-20">
        {/* Editorial Subtitle / Location Kicker */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-5">
          <span className="text-[#966D38] dark:text-amber-400 font-semibold tracking-wider uppercase text-xs">
            Hubballi Design Studio
          </span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
          <span>Marvel Artiza, Vidyanagar (Opposite KIMS Hospital)</span>
        </div>

        {/* 2-Column Split: Headline & Narrative / Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-stone-900 dark:text-white tracking-tight leading-[1.12] mb-6 text-balance">
                Bespoke Interior Architecture & Turnkey Homes in Hubballi.
              </h1>
              
              <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed mb-8 max-w-xl">
                From precision German modular kitchens and walk-in glass wardrobes to complete 45-day turnkey home executions. Designed, manufactured, and finished with zero surprise billing at our Hubballi studio.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 text-sm font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 active:scale-[0.98] rounded-md transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Studio Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#menu"
                  className="px-6 py-3.5 text-sm font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700/80 rounded-md transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Compass className="w-4 h-4 text-[#966D38] dark:text-amber-400" />
                  <span>View Full Design Menu</span>
                </a>
              </div>
            </div>

            {/* Quick Consultation Perks */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400 flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#966D38] dark:text-amber-500" />
                <span>Free On-Site Measurement in Hubballi-Dharwad</span>
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#966D38] dark:text-amber-500" />
                <span>3D Floor Walkthrough Included</span>
              </span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl bg-stone-100 dark:bg-stone-950 min-h-[380px] sm:min-h-[460px] group">
            <img
              src="/src/assets/images/corners_hero_living_1794387695689.jpg"
              alt="Luxury modern living room and kitchen interior designed by Corners Joint Hubballi"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

            {/* Location & Image Caption Badge */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-lg bg-white/95 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/60 shadow-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-400 font-semibold mb-0.5">
                  Corners Joint Signature Residence
                </div>
                <div className="text-sm font-medium text-stone-900 dark:text-white truncate">
                  3BHK Turnkey Interior with Acoustic Louvers & Modular Island
                </div>
              </div>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-stone-700 hover:text-[#966D38] dark:text-stone-300 dark:hover:text-amber-400 font-medium whitespace-nowrap shrink-0 flex items-center gap-1 transition-colors"
              >
                <span>View on Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust & Proof Quantitative Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-lg bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-stone-900 dark:text-white font-mono tabular-nums">
              <span>4.9</span>
              <Star className="w-5 h-5 text-[#966D38] dark:text-amber-400 fill-[#966D38] dark:fill-amber-400" />
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              280+ Verified Client Reviews on Google Maps & Justdial
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-stone-900 dark:text-white font-mono tabular-nums">
              <span>45 Days</span>
              <Clock className="w-5 h-5 text-[#966D38] dark:text-amber-400" />
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Guaranteed Turnkey Move-In Handover Timeline
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-stone-900 dark:text-white font-mono tabular-nums">
              <span>10 Years</span>
              <ShieldCheck className="w-5 h-5 text-[#966D38] dark:text-amber-400" />
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Comprehensive Hardware & HDHMR Core Warranty
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-2xl font-bold text-stone-900 dark:text-white font-mono tabular-nums">
              <span>100%</span>
              <Award className="w-5 h-5 text-[#966D38] dark:text-amber-400" />
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              German Machine Factory Edge-Banding & Zero Flaws
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
