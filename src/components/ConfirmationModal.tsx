import { Button } from '@/components/ui/button';
import { BookingData } from './BookingModal';
import { formatINR } from '@/data/cars';

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
      className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-3xl w-full max-w-md p-8 text-center shadow-xl animate-slide-up">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-success text-success-foreground text-4xl rounded-full flex items-center justify-center mx-auto mb-6">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-success mb-6">Booking Confirmed!</h2>

        {/* Confirmation Details */}
        <div className="bg-muted p-6 rounded-xl border border-border mb-6 text-left">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Booking ID:</span>
            <strong className="text-foreground">{booking.id}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Car:</span>
            <strong className="text-foreground">{booking.car.name}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Customer:</span>
            <strong className="text-foreground">{booking.customer.name}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Pickup Date:</span>
            <strong className="text-foreground">{formatDate(booking.rental.pickupDate)}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Drop-off Date:</span>
            <strong className="text-foreground">{formatDate(booking.rental.dropoffDate)}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Location:</span>
            <strong className="text-foreground">{locationNames[booking.rental.pickupLocation]}</strong>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Duration:</span>
            <strong className="text-foreground">{booking.rental.days} day(s)</strong>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Total Price:</span>
            <strong className="text-primary">{formatINR(booking.rental.totalPrice)}</strong>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 font-semibold"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
