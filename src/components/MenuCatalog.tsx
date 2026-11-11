import React, { useState, useMemo } from 'react';
import { Search, Calendar, ChevronRight, CheckCircle2, Shield, Clock, Layers, Sparkles, X, Info } from 'lucide-react';
import { MENU_ITEMS } from '../data/cornersData';
import { MenuItem } from '../types';

interface MenuCatalogProps {
  onOpenBooking: (serviceName?: string) => void;
}

type CategoryFilter = 'all' | 'kitchen' | 'wardrobe' | 'living' | 'turnkey' | 'lighting' | 'commercial';

export const MenuCatalog: React.FC<MenuCatalogProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Services & Packages' },
    { key: 'kitchen', label: 'Modular Kitchens' },
    { key: 'wardrobe', label: 'Custom Wardrobes' },
    { key: 'living', label: 'Living & Media Units' },
    { key: 'turnkey', label: 'Turnkey Home Packages' },
    { key: 'lighting', label: 'Ceilings & Lighting' },
    { key: 'commercial', label: 'Commercial Studios' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.materials.some((m) => m.toLowerCase().includes(q)) ||
        item.finishOptions.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 scroll-mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Online Service Menu & Packages</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
              Bespoke Interior & Architectural Menu
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              Transparent pricing, factory-calibrated materials, and guaranteed timelines for homeowners across Hubballi-Dharwad.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kitchen, wardrobe, PU, 3BHK..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] dark:bg-stone-950/70 border border-stone-300 dark:border-stone-800 rounded-lg text-sm text-stone-900 dark:text-white placeholder-stone-500 focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#966D38] text-white dark:bg-amber-500 dark:text-stone-950 font-semibold shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] dark:bg-stone-950/40 rounded-xl border border-stone-200 dark:border-stone-800/80">
            <p className="text-stone-600 dark:text-stone-400 text-sm">No items found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#966D38] dark:text-amber-400 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-[#966D38]/50 dark:hover:border-stone-700 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-56 sm:h-60 overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                  {/* Category text kicker */}
                  <div className="absolute top-3 left-3 text-xs font-semibold text-[#FAF8F5] bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded">
                    {item.categoryLabel}
                  </div>

                  {/* Price Banner */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] text-stone-300 uppercase tracking-wide">Starting from</div>
                      <div className="text-lg font-bold text-white font-mono tabular-nums">
                        {item.startingPrice}
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-200 bg-stone-900/90 border border-stone-700/80 px-2 py-0.5 rounded font-mono tabular-nums">
                      {item.estimatedTimeline}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#966D38] dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                      {item.tagline}
                    </p>

                    {/* Quick Inclusions */}
                    <div className="space-y-1.5 mb-5 text-xs text-stone-700 dark:text-stone-300">
                      {item.inclusions.slice(0, 3).map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedItemForModal(item)}
                      className="text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-400" />
                      <span>View Full Specs</span>
                    </button>

                    <button
                      onClick={() => onOpenBooking(item.title)}
                      className="px-3.5 py-2 text-xs font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 active:scale-[0.98] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Inspection Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 dark:bg-stone-950/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setSelectedItemForModal(null)}
              className="absolute top-4 right-4 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-1">
              {selectedItemForModal.categoryLabel}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
              {selectedItemForModal.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
              {selectedItemForModal.description}
            </p>

            {/* Price & Guarantee Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 mb-6 text-xs">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Investment</span>
                <span className="text-base font-bold text-[#966D38] dark:text-amber-400 font-mono tabular-nums">
                  {selectedItemForModal.startingPrice}
                </span>
                <span className="text-[10px] text-stone-500 block truncate">
                  {selectedItemForModal.priceNote}
                </span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Timeline</span>
                <span className="text-base font-bold text-stone-900 dark:text-white font-mono tabular-nums flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {selectedItemForModal.estimatedTimeline}
                </span>
                <span className="text-[10px] text-stone-500 block">Hubli execution</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">Warranty</span>
                <span className="text-sm font-semibold text-stone-900 dark:text-white flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {selectedItemForModal.warranty}
                </span>
              </div>
            </div>

            {/* Material Specifications */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500" />
                <span>Certified Core Materials</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {selectedItemForModal.materials.map((mat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#966D38] dark:bg-amber-500 mt-1.5 shrink-0" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                Package Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                {selectedItemForModal.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2 bg-[#FAF8F5] dark:bg-stone-950/60 p-2.5 rounded border border-stone-200 dark:border-stone-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Options */}
            <div className="mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                Available Surface Finishes
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-stone-700 dark:text-stone-300">
                {selectedItemForModal.finishOptions.map((fin, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700/60"
                  >
                    {fin}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="px-4 py-2.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const serviceName = selectedItemForModal.title;
                  setSelectedItemForModal(null);
                  onOpenBooking(serviceName);
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 rounded-md transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Consultation for This</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
