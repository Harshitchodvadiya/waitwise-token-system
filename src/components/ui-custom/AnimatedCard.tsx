
import React, { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'right' | 'left';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'border-glow' | 'spotlight' | 'none';
  interactive?: boolean;
  variant?: 'default' | 'glass' | 'frosted' | 'gradient' | 'outlined';
  special?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up',
  hoverEffect = 'lift',
  interactive = true,
  variant = 'default',
  special = false
}: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect === 'spotlight') {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

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
      case 'border-glow':
        return { boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.5)" };
      case 'spotlight':
        return {}; // Handled in CSS
      case 'none':
        return {};
      default:
        return { y: -5 };
    }
  };

  // Get card variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass-card bg-white/80 backdrop-blur-md border border-white/20';
      case 'frosted':
        return 'glass-card-dark bg-white/10 backdrop-blur-lg border border-white/10';
      case 'gradient':
        return 'bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10';
      case 'outlined':
        return 'bg-transparent border-2 border-primary/20 hover:border-primary/40';
      default:
        return 'glass-card';
    }
  };

  return (
    <motion.div 
      className={cn(
        'p-6 relative overflow-hidden rounded-2xl transition-all duration-300',
        getVariantClasses(),
        interactive && 'cursor-pointer',
        hoverEffect === 'spotlight' && 'before:absolute before:inset-0 before:rounded-2xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:z-10 before:pointer-events-none',
        special && 'special-card',
        className
      )}
      initial={getInitialAnimation()}
      animate={getVisibleAnimation()}
      whileHover={getHoverEffect()}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        originX: 0.5, 
        originY: 0.5,
        '--x': `${mousePosition.x}px`,
        '--y': `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      {special && (
        <div className="absolute -top-1 -right-1 p-1 bg-gradient-to-br from-primary to-accent rounded-full z-10">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      )}
      {children}
      
      {hoverEffect === 'spotlight' && isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-70"
          style={{
            background: 'radial-gradient(circle 100px at var(--x) var(--y), rgba(255,255,255,0.15), transparent)',
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
