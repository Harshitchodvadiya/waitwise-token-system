
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Timer, CheckCircle, RefreshCw, BarChart3, Bell, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedCard from '@/components/ui-custom/AnimatedCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
                Modernizing Wait Times
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                Elegant Token System for <span className="text-primary whitespace-nowrap">Modern Queues</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                WaitWise transforms the waiting experience with our minimalist digital token system. No more physical lines, just simplified, transparent queue management.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/customer">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link to="/staff">Staff Portal</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Floating token cards */}
                  <div className="relative w-full h-full">
                    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-float" style={{animationDelay: '0ms'}}>
                      <div className="glass-card p-6 w-64 h-36 flex flex-col justify-between shadow-xl">
                        <div>
                          <p className="text-xs text-muted-foreground">Banking Services</p>
                          <h3 className="text-2xl font-bold">A-103</h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Position: 2</span>
                          <span className="text-sm font-medium text-primary">~5 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-3/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 animate-float" style={{animationDelay: '300ms'}}>
                      <div className="glass-card p-6 w-64 h-36 flex flex-col justify-between shadow-xl">
                        <div>
                          <p className="text-xs text-muted-foreground">Healthcare</p>
                          <h3 className="text-2xl font-bold">B-047</h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Position: 1</span>
                          <span className="text-sm font-medium text-green-500">Next</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-1/2 right-1/4 transform translate-x-1/4 -translate-y-1/2 animate-float" style={{animationDelay: '600ms'}}>
                      <div className="glass-card p-6 w-64 h-36 flex flex-col justify-between shadow-xl">
                        <div>
                          <p className="text-xs text-muted-foreground">Customer Service</p>
                          <h3 className="text-2xl font-bold">C-215</h3>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Position: 4</span>
                          <span className="text-sm font-medium text-muted-foreground">~15 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              A Better Way to Wait
            </h2>
            <p className="text-lg text-muted-foreground">
              WaitWise combines simplicity with power to transform how organizations manage queues and how customers experience waiting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedCard delay={0}>
              <Timer className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Track your position and estimated wait time with up-to-the-minute accuracy.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delay={150}>
              <Bell className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
              <p className="text-muted-foreground">
                Receive timely alerts as you approach the front of the queue, so you never miss your turn.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delay={300}>
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Tokens</h3>
              <p className="text-muted-foreground">
                Request and manage your place in line with elegant digital tokens that replace physical tickets.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delay={450}>
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Staff Management</h3>
              <p className="text-muted-foreground">
                Optimize service efficiency with tools designed for staff to manage customer flow.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delay={600}>
              <RefreshCw className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Rescheduling</h3>
              <p className="text-muted-foreground">
                Need more time? Easily reschedule your token without losing your place in line.
              </p>
            </AnimatedCard>
            
            <AnimatedCard delay={750}>
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Gain valuable data on queue patterns and service performance to continuously improve.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Ready to transform your waiting experience?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join organizations that have reduced wait times by 40% and improved customer satisfaction using WaitWise.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link to="/customer">
                    <User className="mr-2 h-4 w-4" />
                    Customer Portal
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link to="/staff">
                    <Users className="mr-2 h-4 w-4" />
                    Staff Portal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
