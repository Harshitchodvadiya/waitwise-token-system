
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'right' | 'left';
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up'
}: AnimatedCardProps) => {
  const getAnimationClass = () => {
    switch (direction) {
      case 'up':
        return 'animate-slide-up';
      case 'down':
        return 'animate-slide-down';
      case 'right':
        return 'animate-slide-in-right';
      case 'left':
        return 'animate-slide-in-right'; // Using the same but could create a slide-in-left
      default:
        return 'animate-slide-up';
    }
  };

  return (
    <div 
      className={cn(
        'glass-card p-6 hover-lift',
        getAnimationClass(),
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
