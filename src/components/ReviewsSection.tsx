import React from 'react';
import { Star, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/cornersData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 scroll-mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Rating Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#966D38] dark:fill-amber-500" />
              <span>Verified Homeowner Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
              Trusted Across Hubballi-Dharwad
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2">
              Over 280+ residential turnkey homes and luxury modular kitchens completed with exceptional satisfaction.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800/90 shadow-sm flex items-center gap-4 shrink-0">
            <div>
              <div className="text-3xl font-bold text-stone-900 dark:text-white font-mono tabular-nums leading-none">
                4.9
              </div>
              <div className="flex items-center gap-1 text-[#966D38] dark:text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#966D38] dark:fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400 pl-4 border-l border-stone-200 dark:border-stone-800">
              <span className="font-semibold text-stone-900 dark:text-white block">Google Maps & Justdial</span>
              <span>280+ Verified Reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 flex flex-col justify-between hover:border-[#966D38]/40 dark:hover:border-stone-700/80 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#966D38] dark:text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#966D38] dark:fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">{rev.date}</span>
                </div>

                <div className="text-xs font-semibold text-[#966D38] dark:text-amber-400 mb-2">
                  "{rev.highlight}"
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-900 dark:text-white">{rev.author}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">{rev.location}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 px-2.5 py-1 rounded">
                    {rev.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link */}
        <div className="mt-8 text-center">
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 hover:text-[#966D38] dark:hover:text-amber-400 transition-colors font-medium"
          >
            <span>Read all reviews directly on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
