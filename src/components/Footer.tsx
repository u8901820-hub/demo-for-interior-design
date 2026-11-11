import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cornersData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand & Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="text-xl font-bold tracking-tight text-white block">
              CORNERS JOINT
            </a>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Interior architecture & turnkey execution studio based in Hubballi, Karnataka. Dedicated to precision German modular engineering, bespoke woodcraft, and transparent delivery.
            </p>
            <div className="text-stone-500 font-mono text-[11px]">
              Coordinates: {BUSINESS_INFO.coordinates.lat}° N, {BUSINESS_INFO.coordinates.lng}° E
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </div>
            <ul className="space-y-2 text-stone-400">
              <li>
                <a href="#menu" className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors">
                  Design Menu & Packages
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors">
                  Cost & Budget Calculator
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors">
                  Craftsmanship & Projects
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors">
                  Studio Location & Map
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors">
                  Homeowner Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Hubballi Studio Address */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Hubballi Studio
            </div>
            <p className="text-stone-300 leading-relaxed font-mono text-[11px]">
              {BUSINESS_INFO.address}
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-stone-300">
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="hover:text-[#C59B5F] dark:hover:text-amber-400 transition-colors font-mono"
              >
                Call: {BUSINESS_INFO.phonePrimary} / {BUSINESS_INFO.phoneSecondary}
              </a>
              <span className="text-stone-500 text-[11px]">
                Mon – Sat: 9:30 AM – 8:00 PM | Sun: By Appointment
              </span>
            </div>
            <div>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C59B5F] hover:text-[#d7af73] dark:text-amber-400 dark:hover:text-amber-300 font-medium"
              >
                <span>Google Maps Business Listing</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} CORNERS JOINT. All rights reserved. Hubballi, Karnataka.
          </div>
          <div className="flex items-center gap-4">
            <span>Action TESA BWR</span>
            <span>·</span>
            <span>Hafele German Fittings</span>
            <span>·</span>
            <span>45-Day Handover</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
