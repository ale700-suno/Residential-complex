'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComplexShowcaseProps {
  className?: string;
  imageClassName?: string;
  showToggle?: boolean;
  overlay?: React.ReactNode;
}

export function ComplexShowcase({
  className,
  imageClassName,
  showToggle = true,
  overlay,
}: ComplexShowcaseProps) {
  const [isNight, setIsNight] = useState(false);

  return (
    <div className={cn('relative group', className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={isNight ? 'night' : 'day'}
          src={isNight ? '/textures/comlexnight.png' : '/textures/complex.png'}
          alt={
            isNight
              ? 'ЖК Арти Парк — ночной вид комплекса с подсветкой'
              : 'ЖК Арти Парк — вид на комплекс с бассейном и горами'
          }
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]',
            imageClassName
          )}
        />
      </AnimatePresence>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-ocean/20" />
      </div>

      {overlay}

      {showToggle && (
        <div className="absolute top-4 right-4 z-20 flex glass rounded-full p-1">
          <button
            onClick={() => setIsNight(false)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300',
              !isNight ? 'bg-gold/20 text-gold' : 'text-milk/50 hover:text-milk/80'
            )}
            aria-pressed={!isNight}
          >
            <Sun size={14} />
            День
          </button>
          <button
            onClick={() => setIsNight(true)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300',
              isNight ? 'bg-gold/20 text-gold' : 'text-milk/50 hover:text-milk/80'
            )}
            aria-pressed={isNight}
          >
            <Moon size={14} />
            Ночь
          </button>
        </div>
      )}
    </div>
  );
}
