import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PortfolioShowcaseProps {
  onOpenBooking: (service?: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'kitchens' | 'wardrobes' | 'turnkey'>('all');

  const projects = [
    {
      id: 'proj-1',
      title: 'Marvel Artiza Signature Living',
      location: 'Vidyanagar, Hubballi',
      type: 'turnkey',
      category: '3BHK Turnkey Interior',
      image: '/src/assets/images/corners_hero_living_1794387695689.jpg',
      features: ['Fluted Oak Acoustic Paneling', 'Quartz Waterfall Island', 'Architectural Track Lighting'],
      specs: 'Completed in 42 Days · 1,750 sq.ft',
    },
    {
      id: 'proj-2',
      title: 'Monolithic Graphite & Walnut Kitchen',
      location: 'Shirur Park, Hubballi',
      type: 'kitchens',
      category: 'Modular Kitchen',
      image: '/src/assets/images/corners_modular_kitchen_1794387695824.jpg',
      features: ['Matte Anti-Fingerprint PU', 'Hafele Soft-Close Tandems', 'Boiling Water Resistant Core'],
      specs: 'Completed in 32 Days · 10ft × 12ft L-Layout',
    },
    {
      id: 'proj-3',
      title: 'Bronze Tinted Glass Walk-In Sanctuary',
      location: 'Deshpande Nagar, Hubballi',
      type: 'wardrobes',
      category: 'Walk-In Wardrobe',
      image: '/src/assets/images/corners_luxury_wardrobe_1794387697169.jpg',
      features: ['Floor-to-Ceiling Anodized Bronze Profile', 'Warm Vertical LED 3000K', 'Velvet Watch Drawers'],
      specs: 'Completed in 26 Days · Master Dressing Suite',
    },
  ];

  const filteredProjects = activeTab === 'all' ? projects : projects.filter((p) => p.type === activeTab);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 scroll-mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Realized Spaces</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
              Craftsmanship Across Hubballi Homes
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Every joint, veneer grain, and edge-band aligns to millimeter perfection. Built in our factory and assembled cleanly on-site.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'kitchens', label: 'Kitchens' },
              { id: 'wardrobes', label: 'Wardrobes' },
              { id: 'turnkey', label: 'Turnkey Flats' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#966D38] text-white dark:bg-amber-500 dark:text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex flex-col hover:border-[#966D38]/50 dark:hover:border-stone-700 transition-all shadow-sm hover:shadow-xl"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100 dark:bg-stone-900">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 text-xs font-semibold text-white bg-stone-900/85 backdrop-blur-sm px-2.5 py-1 rounded">
                  {proj.category}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs text-stone-200 font-mono">
                  {proj.specs}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#966D38] dark:group-hover:text-amber-400 transition-colors mb-1">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-[#966D38] dark:text-amber-500 font-medium mb-3">
                    {proj.location}
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 mb-6">
                    {proj.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(`Similar to ${proj.title}`)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800/80 hover:bg-[#966D38] hover:text-white dark:hover:bg-amber-500 dark:hover:text-stone-950 rounded-lg border border-stone-300 dark:border-stone-700/60 hover:border-[#966D38] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Request Similar Custom Design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
