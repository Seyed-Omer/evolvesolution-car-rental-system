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
      className="relative min-h-[500px] flex items-center justify-center pt-28 pb-16 px-6"
      style={{
        background: 'var(--hero-gradient)',
      }}
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920')"
        }}
      />

      <div className="relative z-10 max-w-4xl w-full text-center text-primary-foreground">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg tracking-tight">
          Car hire for every kind of trip
        </h1>
        <p className="text-lg md:text-xl mb-10 opacity-95 font-normal">
          Premium cars at affordable prices across India
        </p>

        {/* Search Form */}
        <div className="bg-card rounded-2xl p-2 shadow-hero max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 p-3 md:border-r border-border">
              <Label htmlFor="searchPickup" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pickup Date
              </Label>
              <Input
                id="searchPickup"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={today}
                className="border-0 bg-transparent text-foreground font-medium p-0 h-auto focus-visible:ring-0"
                required
              />
            </div>
            <div className="flex-1 p-3">
              <Label htmlFor="searchDropoff" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Drop-off Date
              </Label>
              <Input
                id="searchDropoff"
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                min={pickupDate || today}
                className="border-0 bg-transparent text-foreground font-medium p-0 h-auto focus-visible:ring-0"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="md:self-center bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-6 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
