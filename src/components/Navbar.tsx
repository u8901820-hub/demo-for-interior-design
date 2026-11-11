import React from 'react';
import { Calendar, MapPin, Phone, Clock, BookmarkCheck, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cornersData';

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenAppointments: () => void;
  appointmentCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAppointments,
  appointmentCount,
  theme,
  onToggleTheme,
}) => {
  return (
    <>
      {/* Quiet Top Contact Strip */}
      <div className="bg-[#F3EFEA] dark:bg-stone-950 border-b border-stone-200/90 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400 py-2 px-4 sm:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-stone-800 dark:text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500 shrink-0" />
              <span>Marvel Artiza, UG-28, Opposite KIMS, Vidyanagar, Hubballi</span>
            </span>
            <span className="hidden md:inline text-stone-300 dark:text-stone-700">·</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500 shrink-0" />
              <span>Mon – Sat: 9:30 AM – 8:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-stone-800 dark:text-stone-300 hover:text-[#966D38] dark:hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500 shrink-0" />
              <span className="font-mono tabular-nums">{BUSINESS_INFO.phonePrimary}</span>
            </a>
            {appointmentCount > 0 && (
              <button
                onClick={onOpenAppointments}
                className="flex items-center gap-1.5 text-[#966D38] dark:text-amber-400 hover:opacity-80 transition-opacity font-medium cursor-pointer"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>My Appointments ({appointmentCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/90 px-4 sm:px-8 py-3.5 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand title wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white whitespace-nowrap shrink-0 hover:text-[#966D38] dark:hover:text-amber-400 transition-colors"
          >
            CORNERS JOINT
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-300">
            <a
              href="#menu"
              className="hover:text-[#966D38] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Design Menu
            </a>
            <a
              href="#calculator"
              className="hover:text-[#966D38] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Cost Estimator
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#966D38] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Craftsmanship
            </a>
            <a
              href="#location"
              className="hover:text-[#966D38] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Studio & Map
            </a>
            <a
              href="#reviews"
              className="hover:text-[#966D38] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              Client Reviews
            </a>
          </nav>

          {/* Zone 3: Actions + Theme Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'light' ? 'Obsidian Slate' : 'Warm Ivory'} Theme`}
              className="p-2 rounded-md border border-stone-200 dark:border-stone-700 bg-stone-100/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle colour theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-stone-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 active:scale-[0.98] rounded-md transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
