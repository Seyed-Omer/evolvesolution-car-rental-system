const Footer = () => {
  const footerLinks = [
    {
      title: 'Support',
      links: [
        { label: 'Customer help', href: '#contact' },
        { label: 'Manage bookings', href: '#' },
        { label: 'Safety information', href: '#' },
        { label: 'FAQs', href: '#faq' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Daily rentals', href: '#cars' },
        { label: 'Weekly rentals', href: '#cars' },
        { label: 'Airport pickup', href: '#cars' },
        { label: 'Corporate rentals', href: '#cars' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About DriveEase', href: '#about' },
        { label: 'How it works', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy policy', href: '#' },
        { label: 'Terms & conditions', href: '#' },
        { label: 'Refund policy', href: '#' },
        { label: 'Cookie policy', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-footer text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold uppercase tracking-wider text-sm mb-4 text-primary-foreground">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-primary-foreground/80 font-medium">
            Currency: INR
          </span>
          <p className="text-sm text-primary-foreground/80">
            © 2026 DriveEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
