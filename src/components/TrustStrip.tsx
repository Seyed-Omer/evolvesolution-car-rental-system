const trustItems = [
  {
    icon: '✓',
    title: 'Free Cancellation',
    description: 'Cancel up to 48 hours before pickup'
  },
  {
    icon: '🛡️',
    title: '24/7 Customer Support',
    description: 'Round-the-clock assistance'
  },
  {
    icon: '✅',
    title: 'Verified Vehicles',
    description: 'All cars inspected and certified'
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'No hidden fees or charges'
  }
];

const TrustStrip = () => {
  return (
    <section className="bg-card py-8 border-b border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xl flex-shrink-0 text-success font-bold">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
