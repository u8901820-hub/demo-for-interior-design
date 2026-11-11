import React from 'react';
import { X, Calendar, Clock, MapPin, Trash2, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { Appointment } from '../types';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  const getWhatsAppUrl = (appt: Appointment) => {
    const text = `Hi Corners Joint Team, following up on my booking ref: ${appt.id} (${appt.date} at ${appt.timeSlot}) for ${appt.propertyType}.`;
    return `https://wa.me/919591449469?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 dark:bg-stone-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl p-5 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white rounded-lg bg-stone-100 dark:bg-stone-800/60 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs uppercase tracking-wider text-[#966D38] dark:text-amber-500 font-semibold mb-1">
          Your Scheduled Sessions
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
          My Appointments ({appointments.length})
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
          Review, message via WhatsApp or cancel your scheduled consultations with Corners Joint.
        </p>

        {appointments.length === 0 ? (
          <div className="text-center py-10 bg-[#FAF8F5] dark:bg-stone-950/40 rounded-xl border border-stone-200 dark:border-stone-800/80">
            <p className="text-stone-600 dark:text-stone-400 text-sm">No scheduled appointments found.</p>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white dark:text-stone-950 bg-[#966D38] hover:bg-[#805B2D] dark:bg-amber-500 dark:hover:bg-amber-400 rounded-md transition-colors cursor-pointer"
            >
              Book a New Consultation
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800/90 text-xs sm:text-sm space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[#966D38] dark:text-amber-400 font-bold">{appt.id}</span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 font-medium">
                    Confirmed
                  </span>
                </div>

                <div className="text-stone-900 dark:text-stone-200 font-semibold">
                  {appt.formatLabel}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 dark:text-stone-400 font-mono">
                  <span className="flex items-center gap-1.5 text-stone-900 dark:text-white font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500" />
                    {appt.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-900 dark:text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#966D38] dark:text-amber-500" />
                    {appt.timeSlot}
                  </span>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between">
                  <span>
                    {appt.propertyType} · {appt.locationArea}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200 dark:border-stone-800/80">
                  <a
                    href={getWhatsAppUrl(appt)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:opacity-80 flex items-center gap-1 transition-opacity"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onCancelAppointment(appt.id)}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Slot</span>
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="text-xs font-semibold text-[#966D38] dark:text-amber-400 hover:opacity-80 cursor-pointer"
              >
                + Book Another Consultation
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
