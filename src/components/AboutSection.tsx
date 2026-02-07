const AboutSection = () => {
  const stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '50+', label: 'Premium Cars' },
    { value: '10+', label: 'Years Experience' }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-muted to-muted/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
              About DriveEase
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              With over 10 years of experience in the car rental industry, DriveEase has been providing exceptional service to thousands of satisfied customers.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our mission is to make car rental simple, affordable, and enjoyable. We maintain a modern fleet of well-maintained vehicles and offer flexible rental options to meet your unique needs.
            </p>
            
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <strong className="block text-3xl font-bold text-primary">
                    {stat.value}
                  </strong>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format&q=80"
              alt="Luxury car fleet"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
