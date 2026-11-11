import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Phone, Mail, Building, User, MessageSquare, ExternalLink, Share2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cornersData';
import { Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  onAppointmentBooked: (newAppt: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  onAppointmentBooked,
}) => {
  const [format, setFormat] = useState<'studio' | 'onsite' | 'virtual'>('studio');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('3 BHK Flat / Apartment');
  const [locality, setLocality] = useState('Vidyanagar, Hubballi');
  const [budgetRange, setBudgetRange] = useState('₹5L - ₹10L');
  const [interestedService, setInterestedService] = useState(initialService || '');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  useEffect(() => {
    if (initialService) {
      setInterestedService(initialService);
    }
  }, [initialService]);

  // Generate upcoming 12 business days
  const upcomingDates = React.useMemo(() => {
    const list: { fullDate: string; dayName: string; dateNum: string; month: string }[] = [];
    const base = new Date();
    for (let i = 1; i <= 12; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      const dateNum = d.getDate().toString();
      const fullDate = d.toISOString().split('T')[0];
      list.push({ fullDate, dayName, dateNum, month });
    }
    return list;
  }, []);

  useEffect(() => {
    if (upcomingDates.length > 0 && !selectedDate) {
      setSelectedDate(upcomingDates[0].fullDate);
    }
  }, [upcomingDates, selectedDate]);

  if (!isOpen) return null;

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '06:45 PM',
  ];

  const handleValidate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Please enter your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    const formatLabels = {
      studio: 'In-Studio Material Lounge (Marvel Artiza, Hubballi)',
      onsite: 'Free On-Site Home Measurement (Hubballi-Dharwad)',
      virtual: 'Virtual 3D Video Consultation (Google Meet)',
    };

    const newAppointment: Appointment = {
      id: `CJ-HB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      format,
      formatLabel: formatLabels[format],
      date: selectedDate,
      timeSlot: selectedSlot,
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'Not specified',
      propertyType,
      locationArea: locality,
      budgetRange,
      interestedService: interestedService || 'Complete Interior Consultation',
      specialNotes: specialNotes.trim() || 'None',
      status: 'confirmed',
    };

    onAppointmentBooked(newAppointment);
    setConfirmedBooking(newAppointment);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  const getWhatsAppUrl = (appt: Appointment) => {
    const text = `Hi Corners Joint Team, I just scheduled an appointment on your website.\n\n*Reference:* ${appt.id}\n*Name:* ${appt.clientName}\n*Format:* ${appt.formatLabel}\n*Date & Time:* ${appt.date} at ${appt.timeSlot}\n*Property:* ${appt.propertyType} in ${appt.locationArea}\n*Package/Service:* ${appt.interestedService}\n\nPlease confirm our slot. Thank you!`;
    return `https://wa.me/919591449469?text=${encodeURIComponent(text)}`;
  };

  const getGoogleCalendarUrl = (appt: Appointment) => {
    const startIso = `${appt.date.replace(/-/g, '')}T100000Z`;
    const endIso = `${appt.date.replace(/-/g, '')}T110000Z`;
    const title = encodeURIComponent(`Corners Joint Design Consultation (${appt.id})`);
    const details = encodeURIComponent(
      `Appointment with Corners Joint Interior Architecture Studio.\nFormat: ${appt.formatLabel}\nClient: ${appt.clientName}\nPhone: ${appt.phone}\nStudio: Marvel Artiza UG-28, Opposite KIMS, Vidyanagar, Hubballi (+91 95914 49469)`
    );
    const location = encodeURIComponent(
      appt.format === 'studio'
        ? 'Marvel Artiza, UG-28, Vidyanagar, Hubballi, Karnataka 580021'
        : appt.locationArea + ', Hubballi'
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 dark:bg-stone-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-5 sm:p-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-1">
              Appointment Scheduled
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
              We Look Forward to Meeting You!
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mb-6">
              Your consultation reference is <strong className="text-stone-900 dark:text-white font-mono">{confirmedBooking.id}</strong>. Our senior designer will meet you as scheduled.
            </p>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-left text-xs sm:text-sm space-y-2 mb-6">
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                <span>Consultation Mode</span>
                <span className="font-semibold text-stone-900 dark:text-white">{confirmedBooking.formatLabel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                <span>Date & Time Slot</span>
                <span className="font-semibold text-[#966D38] dark:text-amber-400 font-mono">
                  {confirmedBooking.date} · {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                <span>Client Name & Phone</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  {confirmedBooking.clientName} ({confirmedBooking.phone})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                <span>Property / Locality</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  {confirmedBooking.propertyType} · {confirmedBooking.locationArea}
                </span>
              </div>
              <div className="flex justify-between py-1 text-stone-600 dark:text-stone-400">
                <span>Selected Service</span>
                <span className="font-semibold text-stone-900 dark:text-white">{confirmedBooking.interestedService}</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a
                href={getWhatsAppUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={getGoogleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#966D38] dark:text-amber-400" />
                <span>Add to Google Calendar</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-1">
              Easy Online Booking
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
              Book Your Design Consultation
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6">
              Explore 300+ material finishes at our Hubballi studio or schedule a free on-site measurement with an architect.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Format Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-2.5">
                  1. Choose Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'studio',
                      title: 'Studio Experience',
                      sub: 'Marvel Artiza, Hubballi',
                      desc: 'Touch physical materials & hardware',
                    },
                    {
                      id: 'onsite',
                      title: 'Site Measurement',
                      sub: 'Hubballi / Dharwad',
                      desc: 'Free laser measurement at your home',
                    },
                    {
                      id: 'virtual',
                      title: 'Virtual 3D Call',
                      sub: 'Google Meet',
                      desc: 'Online screen-share & layout discussion',
                    },
                  ].map((fmt) => (
                    <button
                      type="button"
                      key={fmt.id}
                      onClick={() => setFormat(fmt.id as any)}
                      className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                        format === fmt.id
                          ? 'bg-[#966D38]/10 border-[#966D38] text-stone-900 dark:text-white'
                          : 'bg-[#FAF8F5] dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white">{fmt.title}</div>
                      <div className="text-[11px] text-[#966D38] dark:text-amber-400 font-medium mt-0.5">{fmt.sub}</div>
                      <div className="text-[10px] text-stone-500 mt-1">{fmt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-7">
                  <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-2">
                    2. Select Date
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                    {upcomingDates.map((item) => (
                      <button
                        type="button"
                        key={item.fullDate}
                        onClick={() => setSelectedDate(item.fullDate)}
                        className={`flex flex-col items-center justify-center min-w-[54px] py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                          selectedDate === item.fullDate
                            ? 'bg-[#966D38] text-white dark:bg-amber-500 dark:text-stone-950 font-bold border-[#966D38] dark:border-amber-500 shadow-sm'
                            : 'bg-[#FAF8F5] dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono">{item.dayName}</span>
                        <span className="text-sm font-mono">{item.dateNum}</span>
                        <span className="text-[9px]">{item.month}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-semibold block mb-2">
                    Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Anand Kulkarni"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                    />
                  </div>
                  {errors.clientName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">
                    Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500 font-mono"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Step 4: Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                  >
                    <option value="1 BHK Apartment">1 BHK Apartment</option>
                    <option value="2 BHK Apartment">2 BHK Apartment</option>
                    <option value="3 BHK Apartment">3 BHK Apartment</option>
                    <option value="Independent Villa / Duplex">Independent Villa / Duplex</option>
                    <option value="Kitchen Renovation Only">Kitchen Renovation Only</option>
                    <option value="Commercial / Office Space">Commercial / Office Space</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">Hubballi Locality</label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                  >
                    {BUSINESS_INFO.serviceAreas.map((area) => (
                      <option key={area} value={`${area}, Hubballi`}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">Expected Budget</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                  >
                    <option value="₹2.5L - ₹5L">₹2.5L - ₹5L</option>
                    <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                    <option value="₹10L - ₹18L">₹10L - ₹18L</option>
                    <option value="₹18L+ (Luxury Villa)">₹18L+ (Luxury Villa)</option>
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-xs text-stone-600 dark:text-stone-400 block mb-1">
                  Specific Menu Service / Focus (Optional)
                </label>
                <input
                  type="text"
                  value={interestedService}
                  onChange={(e) => setInterestedService(e.target.value)}
                  placeholder="e.g. Modular Kitchen & Tinted Glass Wardrobe"
                  className="w-full px-3 py-2 bg-[#FAF8F5] dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-lg text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-[#966D38] dark:focus:border-amber-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 text-sm font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 active:scale-[0.98] rounded-md transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Free Appointment</span>
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-2.5">
                  No payment required · Free consultation & material sample viewing
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
