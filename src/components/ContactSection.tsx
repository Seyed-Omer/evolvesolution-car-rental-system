import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message! We will get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', value: '123 Main Street, Downtown, City 12345' },
    { icon: '📞', title: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '✉️', title: 'Email', value: 'info@driveease.com' },
    { icon: '🕐', title: 'Working Hours', value: 'Mon - Sun: 8:00 AM - 10:00 PM' }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 animate-fade-in">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-2xl min-w-[40px] h-10 flex items-center justify-center bg-muted/80 rounded-lg">
                  {item.icon}
                </span>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form 
            onSubmit={handleSubmit} 
            className="bg-card p-8 rounded-xl shadow-card animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background"
              />
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="bg-background"
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                required
                className="bg-background resize-none"
              />
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 font-semibold"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
