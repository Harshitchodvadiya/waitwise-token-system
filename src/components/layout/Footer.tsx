
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-border/30 bg-background/50 backdrop-blur-sm py-6 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-medium">WaitWise</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Simplifying queue management with elegance.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <nav className="flex flex-wrap justify-center gap-6">
              <Link 
                to="/customer" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Customer Portal
              </Link>
              <Link 
                to="/staff" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Staff Portal
              </Link>
              <Link 
                to="/admin" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Dashboard
              </Link>
            </nav>
            
            <div className="h-4 w-px bg-border hidden md:block"></div>
            
            <div className="text-sm text-muted-foreground">
              © {currentYear} WaitWise. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
