import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { providers, formatINR } from '@/data/cars';

const DealMetric = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}%</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const DealsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProviders = showAll ? providers : providers.slice(0, 3);

  return (
    <section id="deals" className="py-16 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            The best car rental deals in India right now
          </h2>
          <p className="text-lg text-muted-foreground">
            Compare offers from trusted providers in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {displayedProviders.map((provider, index) => (
            <div 
              key={provider.id}
              className="bg-card rounded-2xl p-7 shadow-card border border-border hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {provider.name}
                </h3>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">
                    {provider.rating.toFixed(1)}
                  </span>
                  <p className="text-xs text-muted-foreground capitalize">
                    {provider.ratingText}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-4 mb-6">
                <DealMetric label="Car condition" value={provider.metrics.condition} />
                <DealMetric label="Cleanliness" value={provider.metrics.cleanliness} />
                <DealMetric label="Customer service" value={provider.metrics.service} />
                <DealMetric label="Easy pickup" value={provider.metrics.pickup} />
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-border gap-4">
                <div className="text-sm text-muted-foreground flex-1">
                  From <strong className="text-xl font-bold text-primary-dark tracking-tight">
                    {formatINR(provider.fromPricePerDay)}
                  </strong> <span className="text-muted-foreground">per day</span>
                </div>
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-5 py-2 text-sm font-semibold whitespace-nowrap">
                  View Deals
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setShowAll(!showAll)}
            className="bg-primary hover:bg-primary-dark text-primary-foreground px-10 py-3 font-semibold"
          >
            {showAll ? 'Show Less' : 'View All Deals'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
