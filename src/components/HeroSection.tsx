import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroSectionProps {
  onSearch: (pickupDate: string, dropoffDate: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupDate && dropoffDate) {
      onSearch(pickupDate, dropoffDate);
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center pt-28 pb-16 px-6"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80')"
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white drop-shadow-2xl tracking-tight">
          EVOLVE CARS
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-white/90 font-light tracking-wide">
          Premium Car Rentals Across India
        </p>

        {/* Glassmorphism Search Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-3 md:p-4 shadow-2xl max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
              <Label htmlFor="searchPickup" className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Pickup Date
              </Label>
              <Input
                id="searchPickup"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={today}
                className="border-0 bg-transparent text-white font-medium p-0 h-auto focus-visible:ring-0 placeholder:text-white/50 [color-scheme:dark]"
                required
              />
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
              <Label htmlFor="searchDropoff" className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Drop-off Date
              </Label>
              <Input
                id="searchDropoff"
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                min={pickupDate || today}
                className="border-0 bg-transparent text-white font-medium p-0 h-auto focus-visible:ring-0 [color-scheme:dark]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="md:self-center bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-10 py-6 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-xl text-base"
            >
              Search Cars
            </Button>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Free Cancellation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
