
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'right' | 'left';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
  interactive?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up',
  hoverEffect = 'lift',
  interactive = true
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Initial animation based on direction
  const getInitialAnimation = () => {
    switch (direction) {
      case 'up':
        return { y: 20, opacity: 0 };
      case 'down':
        return { y: -20, opacity: 0 };
      case 'right':
        return { x: -20, opacity: 0 };
      case 'left':
        return { x: 20, opacity: 0 };
      default:
        return { y: 20, opacity: 0 };
    }
  };

  // Animation for when the component is in view
  const getVisibleAnimation = () => {
    return { 
      y: 0, 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        delay: delay / 1000,
        ease: "easeOut" 
      } 
    };
  };

  // Hover effects
  const getHoverEffect = () => {
    if (!interactive) return {};
    
    switch (hoverEffect) {
      case 'lift':
        return { y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" };
      case 'scale':
        return { scale: 1.02 };
      case 'glow':
        return { boxShadow: "0 0 20px 2px rgba(66, 153, 225, 0.3)" };
      case 'none':
        return {};
      default:
        return { y: -5 };
    }
  };

  return (
    <motion.div 
      className={cn(
        'glass-card p-6',
        interactive && 'cursor-pointer transition-all duration-300',
        className
      )}
      initial={getInitialAnimation()}
      animate={getVisibleAnimation()}
      whileHover={getHoverEffect()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ 
        originX: 0.5, 
        originY: 0.5 
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
