import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, Car } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'cars', label: 'Cars' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/98 backdrop-blur-md border-b border-border/80 shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo - No car emoji as requested */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          className="text-2xl font-bold"
        >
          <span className={isScrolled ? 'text-foreground' : 'text-white'}>EVOLVE CARS</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-foreground' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-foreground' : 'text-white'} />
          )}
        </button>

        {/* Desktop Nav Menu */}
        <ul className="hidden md:flex items-center gap-8 flex-1 justify-end">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`relative font-medium text-sm transition-colors py-2 px-1 ${
                  activeSection === link.id 
                    ? 'text-primary' 
                    : isScrolled 
                      ? 'text-muted-foreground hover:text-primary'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center gap-4 ml-6">
          <span className={`text-sm font-medium px-3 py-1.5 rounded-md ${
            isScrolled ? 'text-muted-foreground bg-muted' : 'text-white/80 bg-white/10'
          }`}>
            INR
          </span>
          
          {loading ? (
            <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-2 ${
                    isScrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User size={16} className="text-primary-foreground" />
                  </div>
                  <span className="max-w-[100px] truncate">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/auth')}
                className={isScrolled ? 'text-primary hover:bg-muted' : 'text-white hover:bg-white/10'}
              >
                Sign in
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate('/auth')}
                className="bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden fixed top-[70px] left-0 right-0 bg-card border-t border-border shadow-lg transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left font-medium transition-colors ${
                    activeSection === link.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-4 border-t border-border">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <User size={18} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{profile?.full_name || 'User'}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleSignOut}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}
                  >
                    Sign in
                  </Button>
                  <Button 
                    onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}
                  >
                    Register
                  </Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
