import { Button } from '@/components/ui/button';
import { BookingData } from './BookingModal';
import { formatINR } from '@/data/cars';
import { CheckCircle } from 'lucide-react';

interface ConfirmationModalProps {
  booking: BookingData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = ({ booking, isOpen, onClose }: ConfirmationModalProps) => {
  if (!isOpen || !booking) return null;

  const locationNames: Record<string, string> = {
    downtown: 'Downtown Office',
    airport: 'Airport Terminal',
    mall: 'City Mall',
    station: 'Central Station'
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[2000] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl w-full max-w-md p-8 text-center shadow-2xl animate-slide-up">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-success to-success/80 text-success-foreground rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle size={42} />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Your car booking is confirmed. Thank you for choosing EvolveCars.
        </p>

        {/* Confirmation Details */}
        <div className="bg-gradient-to-br from-muted to-muted/50 p-6 rounded-2xl border border-border/50 mb-6 text-left backdrop-blur-sm">
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Booking ID:</span>
            <strong className="text-primary font-mono">{booking.id}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Car:</span>
            <strong className="text-foreground">{booking.car.name}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Customer:</span>
            <strong className="text-foreground">{booking.customer.name}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Pickup Date:</span>
            <strong className="text-foreground">{formatDate(booking.rental.pickupDate)}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Drop-off Date:</span>
            <strong className="text-foreground">{formatDate(booking.rental.dropoffDate)}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Pickup Location:</span>
            <strong className="text-foreground">{locationNames[booking.rental.pickupLocation]}</strong>
          </div>
          <div className="flex justify-between py-2.5 border-b border-border/50">
            <span className="text-muted-foreground">Duration:</span>
            <strong className="text-foreground">{booking.rental.days} day(s)</strong>
          </div>
          <div className="flex justify-between py-3 mt-2 border-t-2 border-primary/20">
            <span className="font-medium text-foreground">Total Price:</span>
            <strong className="text-primary text-lg">{formatINR(booking.rental.totalPrice)}</strong>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-6 font-semibold text-base rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
