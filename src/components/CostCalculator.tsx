import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';

interface CostCalculatorProps {
  onOpenBooking: (serviceName?: string) => void;
}

type PropertyType = '1bhk' | '2bhk' | '3bhk' | 'villa' | 'commercial';
type FinishTier = 'essential' | 'premium' | 'bespoke';

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onOpenBooking }) => {
  const [propertyType, setPropertyType] = useState<PropertyType>('3bhk');
  const [finishTier, setFinishTier] = useState<FinishTier>('premium');
  
  const [spaces, setSpaces] = useState({
    kitchen: true,
    masterWardrobe: true,
    secondWardrobe: true,
    livingTv: true,
    falseCeiling: true,
    foyerDining: true,
    bathroomVanities: false,
  });

  const propertyOptions: { id: PropertyType; label: string; area: string }[] = [
    { id: '1bhk', label: '1 BHK Apartment', area: '650 sq.ft' },
    { id: '2bhk', label: '2 BHK Apartment', area: '1,150 sq.ft' },
    { id: '3bhk', label: '3 BHK Apartment', area: '1,650 sq.ft' },
    { id: 'villa', label: 'Independent Villa / Duplex', area: '2,600+ sq.ft' },
    { id: 'commercial', label: 'Commercial / Office Studio', area: '1,200 sq.ft' },
  ];

  const finishTiers: {
    id: FinishTier;
    title: string;
    description: string;
    multiplier: number;
    materials: string;
  }[] = [
    {
      id: 'essential',
      title: 'Essential Quality',
      description: 'Action TESA BWR HDHMR + 1mm Anti-Scratch Laminate + Hettich Hardware',
      multiplier: 1.0,
      materials: 'Action TESA HDHMR, 1mm Merino Laminate, Hettich 100k-cycle hinges',
    },
    {
      id: 'premium',
      title: 'Premium Luxury (Most Popular)',
      description: 'High-Gloss Acrylic / Soft Matte PU + Hafele German Tandem Soft-Close + Quartz',
      multiplier: 1.45,
      materials: '2mm Anti-Scratch Acrylic, Hafele Tandem Box, Saint-Gobain Ceilings',
    },
    {
      id: 'bespoke',
      title: 'Royal Architectural',
      description: 'Italian PU Lacquer + Smoked Veneers + Tinted Glass + Blum Servo-Drive',
      multiplier: 2.1,
      materials: 'Natural Smoked Oak Veneer, Blum Aventos, Fluted Acoustic Panels',
    },
  ];

  const toggleSpace = (key: keyof typeof spaces) => {
    setSpaces((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Base pricing logic (Indian Rupees)
  const calculation = useMemo(() => {
    const basePrices: Record<keyof typeof spaces, Record<PropertyType, number>> = {
      kitchen: { '1bhk': 140000, '2bhk': 185000, '3bhk': 240000, 'villa': 360000, 'commercial': 90000 },
      masterWardrobe: { '1bhk': 85000, '2bhk': 120000, '3bhk': 165000, 'villa': 240000, 'commercial': 60000 },
      secondWardrobe: { '1bhk': 0, '2bhk': 95000, '3bhk': 135000, 'villa': 210000, 'commercial': 0 },
      livingTv: { '1bhk': 45000, '2bhk': 65000, '3bhk': 85000, 'villa': 140000, 'commercial': 95000 },
      falseCeiling: { '1bhk': 35000, '2bhk': 65000, '3bhk': 95000, 'villa': 175000, 'commercial': 80000 },
      foyerDining: { '1bhk': 25000, '2bhk': 45000, '3bhk': 65000, 'villa': 110000, 'commercial': 55000 },
      bathroomVanities: { '1bhk': 20000, '2bhk': 35000, '3bhk': 50000, 'villa': 90000, 'commercial': 35000 },
    };

    const tier = finishTiers.find((t) => t.id === finishTier) || finishTiers[1];

    let totalBase = 0;
    (Object.keys(spaces) as (keyof typeof spaces)[]).forEach((key) => {
      if (spaces[key]) {
        totalBase += basePrices[key][propertyType];
      }
    });

    const calculatedMid = Math.round(totalBase * tier.multiplier);
    const lowEstimate = Math.round(calculatedMid * 0.95);
    const highEstimate = Math.round(calculatedMid * 1.08);

    let days = 30;
    if (propertyType === '2bhk') days = 38;
    if (propertyType === '3bhk') days = 45;
    if (propertyType === 'villa') days = 55;

    return {
      low: lowEstimate,
      high: highEstimate,
      timelineDays: days,
      tierTitle: tier.title,
    };
  }, [propertyType, finishTier, spaces]);

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const handleBookWithCalculation = () => {
    const propName = propertyOptions.find((p) => p.id === propertyType)?.label || 'Residential';
    const planName = `${propName} (${calculation.tierTitle}) - Est: ${formatINR(calculation.low)} - ${formatINR(calculation.high)}`;
    onOpenBooking(planName);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#F5F2EC] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 scroll-mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-2">
            <Calculator className="w-4 h-4" />
            <span>Interactive Cost Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
            Calculate Your Interior Budget Online
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2">
            Get instant, honest estimates for your property in Hubballi-Dharwad. No hidden fees or surprise billings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/90 rounded-xl p-6 sm:p-8 shadow-sm">
            {/* Step 1: Property Type */}
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-3">
                1. Select Floor Plan / Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {propertyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setPropertyType(opt.id)}
                    className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                      propertyType === opt.id
                        ? 'bg-[#966D38]/10 border-[#966D38] text-stone-900 dark:text-white'
                        : 'bg-[#FAF8F5] dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-semibold truncate">{opt.label}</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">{opt.area}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quality Tier */}
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-3">
                2. Select Material & Finish Grade
              </label>
              <div className="space-y-2.5">
                {finishTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setFinishTier(tier.id)}
                    className={`w-full p-3.5 text-left rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      finishTier === tier.id
                        ? 'bg-[#966D38]/10 border-[#966D38] text-stone-900 dark:text-white shadow-sm'
                        : 'bg-[#FAF8F5] dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-stone-900 dark:text-white flex items-center gap-2">
                        <span>{tier.title}</span>
                        {finishTier === tier.id && (
                          <span className="text-[10px] text-[#966D38] dark:text-amber-400 uppercase font-mono">Active</span>
                        )}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                        {tier.description}
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                      {finishTier === tier.id && <div className="w-2.5 h-2.5 rounded-full bg-[#966D38] dark:bg-amber-500" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Specific Rooms / Modules */}
            <div>
              <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-3">
                3. Choose Spaces to Include
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                {[
                  { key: 'kitchen', label: 'Modular Kitchen (BWR Core + Soft-Close)' },
                  { key: 'masterWardrobe', label: 'Master Bedroom Wardrobe + Lofts' },
                  { key: 'secondWardrobe', label: 'Guest / Kids Bedroom Wardrobe' },
                  { key: 'livingTv', label: 'Living Room Fluted TV & Console' },
                  { key: 'falseCeiling', label: 'Gypsum False Ceiling & Cove Lights' },
                  { key: 'foyerDining', label: 'Foyer Shoe Bench & Dining Unit' },
                  { key: 'bathroomVanities', label: 'Moisture-Proof Bathroom Vanities' },
                ].map((item) => {
                  const k = item.key as keyof typeof spaces;
                  const isChecked = spaces[k];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleSpace(k)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-3 transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#FAF8F5] dark:bg-stone-800/80 border-[#966D38]/60 dark:border-stone-700 text-stone-900 dark:text-white'
                          : 'bg-[#FAF8F5]/50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800/60 text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-[#966D38] dark:bg-amber-500 border-[#966D38] dark:border-amber-500 text-white dark:text-stone-950'
                            : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div className="lg:col-span-5 sticky top-24 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-1">
              Estimated Investment
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white font-mono tabular-nums tracking-tight mt-1 mb-2">
              {formatINR(calculation.low)} - {formatINR(calculation.high)}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Includes 3D architectural plan, factory precision cutting, German hardware, delivery, and complete on-site installation in Hubballi.
            </p>

            {/* Metrics Breakdown */}
            <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs mb-6">
              <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <Clock className="w-4 h-4 text-[#966D38] dark:text-amber-400" />
                  <span>Turnkey Execution Time</span>
                </span>
                <span className="font-semibold text-stone-900 dark:text-white font-mono tabular-nums">
                  ~{calculation.timelineDays} Days Guaranteed
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Hardware & Core Warranty</span>
                </span>
                <span className="font-semibold text-stone-900 dark:text-white">10 Years Direct</span>
              </div>

              <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
                  <Layers className="w-4 h-4 text-[#966D38] dark:text-amber-400" />
                  <span>Factory Edge-Banding</span>
                </span>
                <span className="font-semibold text-stone-900 dark:text-white">PUR 100% Waterproof</span>
              </div>
            </div>

            {/* Call to Action */}
            <button
              onClick={handleBookWithCalculation}
              className="w-full py-3.5 px-4 text-sm font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 active:scale-[0.98] rounded-md transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Consultation for this Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center">
              <span className="text-[11px] text-stone-500">
                Free site measurement in Hubballi-Dharwad · No obligation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
