
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            Streamline Your Queue Management with <span className="text-primary">WaitWise</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The intelligent token system to manage wait times, optimize staff efficiency, and enhance customer experience.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/signup">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customers</h3>
              <p className="text-muted-foreground">Get a token, track your wait time, and receive notifications when it's your turn.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Staff</h3>
              <p className="text-muted-foreground">Manage tokens, serve customers efficiently, and maintain a smooth workflow.</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Admins</h3>
              <p className="text-muted-foreground">Monitor performance, analyze wait times, and optimize resource allocation.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
