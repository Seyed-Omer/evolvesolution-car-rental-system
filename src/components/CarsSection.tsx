import { useState, useMemo } from 'react';
import { cars, formatINR, Car } from '@/data/cars';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface CarsSectionProps {
  onBookCar: (car: Car) => void;
}

const CarsSection = ({ onBookCar }: CarsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(cars.map(c => c.category)));
    return ['All', ...cats];
  }, []);

  const filteredCars = useMemo(() => {
    let result = activeCategory === 'All' ? cars : cars.filter(c => c.category === activeCategory);
    if (sortOrder === 'asc') result = [...result].sort((a, b) => a.offerPricePerDay - b.offerPricePerDay);
    if (sortOrder === 'desc') result = [...result].sort((a, b) => b.offerPricePerDay - a.offerPricePerDay);
    return result;
  }, [activeCategory, sortOrder]);

  return (
    <section id="cars" className="py-16 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Our Premium Fleet
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our wide range of vehicles to suit your needs
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ArrowUpDown size={16} />
            {sortOrder === 'asc' ? 'Price: Low → High' : sortOrder === 'desc' ? 'Price: High → Low' : 'Sort by Price'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {filteredCars.map((car, index) => {
            const discountPercent = Math.round((1 - car.offerPricePerDay / car.originalPricePerDay) * 100);
            
            return (
              <div 
                key={car.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-accent to-amber-600 text-foreground px-3 py-1 rounded-md text-sm font-semibold shadow-md">
                    {car.category}
                  </span>
                  {discountPercent > 0 && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-success to-emerald-700 text-success-foreground px-3 py-1 rounded-md text-sm font-bold shadow-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                    {car.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="text-sm text-muted-foreground">👥 {car.seats} Seats</span>
                    <span className="text-sm text-muted-foreground">⛽ {car.fuel}</span>
                    <span className="text-sm text-muted-foreground">⚙️ {car.transmission}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                    <div className="flex flex-col gap-0.5">
                      {discountPercent > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatINR(car.originalPricePerDay)}
                        </span>
                      )}
                      <div className="text-xl font-bold text-primary-dark tracking-tight">
                        {formatINR(car.offerPricePerDay)}
                        <span className="text-sm font-medium text-muted-foreground">/day</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => onBookCar(car)}
                      className="bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-2 text-sm font-semibold"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCars.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No cars found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default CarsSection;