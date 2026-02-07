import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustStrip from '@/components/TrustStrip';
import DealsSection from '@/components/DealsSection';
import CarsSection from '@/components/CarsSection';
import FAQSection from '@/components/FAQSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BookingModal, { BookingData } from '@/components/BookingModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import Chatbot from '@/components/Chatbot';
import { Car } from '@/data/cars';

const Index = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);
  const [searchDates, setSearchDates] = useState({ pickup: '', dropoff: '' });

  const handleSearch = (pickupDate: string, dropoffDate: string) => {
    setSearchDates({ pickup: pickupDate, dropoff: dropoffDate });
    const carsSection = document.getElementById('cars');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookCar = (car: Car) => {
    setSelectedCar(car);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (booking: BookingData) => {
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('driveease_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('driveease_bookings', JSON.stringify(bookings));

    setConfirmedBooking(booking);
    setIsBookingModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
    setConfirmedBooking(null);
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      <TrustStrip />
      <DealsSection />
      <CarsSection onBookCar={handleBookCar} />
      <FAQSection />
      <AboutSection />
      <ContactSection />
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        car={selectedCar}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleConfirmBooking}
        initialPickupDate={searchDates.pickup}
        initialDropoffDate={searchDates.dropoff}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        booking={confirmedBooking}
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmation}
      />

      {/* AI Chatbot - Available on all pages */}
      <Chatbot />
    </div>
  );
};

export default Index;
