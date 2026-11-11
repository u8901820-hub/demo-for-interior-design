/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCatalog } from './components/MenuCatalog';
import { CostCalculator } from './components/CostCalculator';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { StudioLocation } from './components/StudioLocation';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { Appointment } from './types';

const STORAGE_KEY = 'corners_joint_appointments_v1';
const THEME_KEY = 'corners_joint_theme_v1';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch (e) {
      // ignore
    }
    return 'light'; // Default to the new warm ivory & bronze architectural theme
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-stone-950 text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950 transition-colors duration-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#FAF8F5] text-stone-900 antialiased selection:bg-[#966D38] selection:text-white transition-colors duration-200';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading appointments from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments to localStorage', e);
    }
  }, [appointments]);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingOpen(true);
  };

  const handleAppointmentBooked = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAppointments={() => setIsAppointmentsOpen(true)}
        appointmentCount={appointments.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <MenuCatalog onOpenBooking={handleOpenBooking} />
        <CostCalculator onOpenBooking={handleOpenBooking} />
        <PortfolioShowcase onOpenBooking={handleOpenBooking} />
        <StudioLocation />
        <ReviewsSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceForBooking}
        onAppointmentBooked={handleAppointmentBooked}
      />

      <MyAppointmentsModal
        isOpen={isAppointmentsOpen}
        onClose={() => setIsAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={() => handleOpenBooking()}
      />
    </div>
  );
}
