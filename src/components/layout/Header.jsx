
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Users, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Customer', path: '/customer', icon: User },
    { name: 'Staff', path: '/staff', icon: Users },
    { name: 'Admin', path: '/admin', icon: BarChart },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-6 md:px-8 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border/40 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
        >
          <span className="inline-block w-3 h-3 rounded-full bg-primary animate-pulse-subtle"></span>
          WaitWise
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center gap-1.5 font-medium transition-all duration-200 relative py-1.5 px-1.5',
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation Trigger */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileMenu}
          className="md:hidden"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Navigation Menu */}
        <div 
          className={cn(
            'fixed inset-0 bg-background/95 backdrop-blur-sm z-50 transition-transform md:hidden',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          style={{ top: '64px' }}
        >
          <nav className="flex flex-col items-center justify-center p-8 h-full gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center gap-3 text-xl font-medium transition-all duration-200 p-3',
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
