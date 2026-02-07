import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { Car, formatINR } from '@/data/cars';

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: BookingData) => void;
  initialPickupDate?: string;
  initialDropoffDate?: string;
}

export interface BookingData {
  id: string;
  car: Car;
  customer: {
    name: string;
    email: string;
    phone: string;
    license: string;
  };
  rental: {
    pickupDate: string;
    dropoffDate: string;
    pickupLocation: string;
    days: number;
    totalPrice: number;
  };
  bookedAt: string;
}

const BookingModal = ({ car, isOpen, onClose, onConfirm, initialPickupDate, initialDropoffDate }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    pickupDate: '',
    dropoffDate: '',
    pickupLocation: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        pickupDate: initialPickupDate || '',
        dropoffDate: initialDropoffDate || ''
      }));
    }
  }, [isOpen, initialPickupDate, initialDropoffDate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const calculateDays = () => {
    if (formData.pickupDate && formData.dropoffDate) {
      const pickup = new Date(formData.pickupDate);
      const dropoff = new Date(formData.dropoffDate);
      const diffTime = dropoff.getTime() - pickup.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    if (!car) return 0;
    return calculateDays() * car.offerPricePerDay;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (formData.licenseNumber.trim().length < 5) {
      newErrors.licenseNumber = 'Please enter a valid license number';
    }
    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Please select a pickup date';
    }
    if (!formData.dropoffDate) {
      newErrors.dropoffDate = 'Please select a drop-off date';
    }
    if (formData.pickupDate && formData.dropoffDate) {
      const pickup = new Date(formData.pickupDate);
      const dropoff = new Date(formData.dropoffDate);
      if (dropoff <= pickup) {
        newErrors.dropoffDate = 'Drop-off date must be after pickup date';
      }
    }
    if (!formData.pickupLocation) {
      newErrors.pickupLocation = 'Please select a pickup location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !car) return;

    const bookingData: BookingData = {
      id: 'BK' + Date.now().toString(36).toUpperCase(),
      car,
      customer: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        license: formData.licenseNumber
      },
      rental: {
        pickupDate: formData.pickupDate,
        dropoffDate: formData.dropoffDate,
        pickupLocation: formData.pickupLocation,
        days: calculateDays(),
        totalPrice: calculateTotal()
      },
      bookedAt: new Date().toISOString()
    };

    onConfirm(bookingData);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      pickupDate: '',
      dropoffDate: '',
      pickupLocation: ''
    });
  };

  if (!isOpen || !car) return null;

  const locations = [
    { value: 'downtown', label: 'Downtown Office' },
    { value: 'airport', label: 'Airport Terminal' },
    { value: 'mall', label: 'City Mall' },
    { value: 'station', label: 'Central Station' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center z-[2000] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 relative shadow-xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Book Your Car</h2>
          
          {/* Selected Car Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl border border-border">
            <img 
              src={car.image} 
              alt={car.name}
              className="w-24 h-14 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-medium text-foreground">{car.name}</h4>
              <p className="text-primary font-semibold">{formatINR(car.offerPricePerDay)}/day</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && <span className="text-sm text-destructive">{errors.fullName}</span>}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <span className="text-sm text-destructive">{errors.email}</span>}
            </div>
          </div>

          {/* Phone & License Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <span className="text-sm text-destructive">{errors.phone}</span>}
            </div>
            <div>
              <Label htmlFor="licenseNumber">Driver's License *</Label>
              <Input
                id="licenseNumber"
                placeholder="DL123456789"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className={errors.licenseNumber ? 'border-destructive' : ''}
              />
              {errors.licenseNumber && <span className="text-sm text-destructive">{errors.licenseNumber}</span>}
            </div>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pickupDate">Pickup Date *</Label>
              <Input
                id="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                min={today}
                className={errors.pickupDate ? 'border-destructive' : ''}
              />
              {errors.pickupDate && <span className="text-sm text-destructive">{errors.pickupDate}</span>}
            </div>
            <div>
              <Label htmlFor="dropoffDate">Drop-off Date *</Label>
              <Input
                id="dropoffDate"
                type="date"
                value={formData.dropoffDate}
                onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                min={formData.pickupDate || today}
                className={errors.dropoffDate ? 'border-destructive' : ''}
              />
              {errors.dropoffDate && <span className="text-sm text-destructive">{errors.dropoffDate}</span>}
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="pickupLocation">Pickup Location *</Label>
            <Select 
              value={formData.pickupLocation} 
              onValueChange={(value) => setFormData({ ...formData, pickupLocation: value })}
            >
              <SelectTrigger className={errors.pickupLocation ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pickupLocation && <span className="text-sm text-destructive">{errors.pickupLocation}</span>}
          </div>

          {/* Price Summary */}
          <div className="bg-muted p-6 rounded-xl border border-border mt-6">
            <div className="flex justify-between py-2 text-muted-foreground">
              <span>Daily Rate (INR):</span>
              <span>{formatINR(car.offerPricePerDay)}</span>
            </div>
            <div className="flex justify-between py-2 text-muted-foreground">
              <span>Number of Days:</span>
              <span>{calculateDays()}</span>
            </div>
            <div className="flex justify-between pt-4 border-t-2 border-border mt-2 font-bold text-lg text-foreground">
              <span>Total Price (INR):</span>
              <span className="text-primary-dark">{formatINR(calculateTotal())}</span>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 font-semibold"
          >
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
