'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BlurRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  ...props
}: BlurRevealProps) {
  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ filter: 'blur(12px)', opacity: 0, ...offsets[direction] }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
