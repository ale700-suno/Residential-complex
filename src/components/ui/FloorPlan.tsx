'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloorPlanProps {
  area: number;
  rooms: 'studio' | '1.5' | '2';
  className?: string;
}

export function FloorPlan({ area, rooms, className }: FloorPlanProps) {
  const isStudio = rooms === 'studio';
  const is15 = rooms === '1.5';
  const is2 = rooms === '2';

  return (
    <svg
      viewBox="0 0 200 160"
      className={cn('w-full h-full', className)}
      aria-label={`Планировка ${area} м²`}
    >
      <defs>
        <linearGradient id="planGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A962" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C4A882" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="180" height="140" fill="url(#planGrad)" stroke="#C9A962" strokeWidth="1" rx="2" />

      {isStudio && (
        <>
          <rect x="20" y="20" width="70" height="50" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="55" y="50" fill="#C9A962" fontSize="8" textAnchor="middle" opacity="0.8">Жилая</text>
          <rect x="100" y="20" width="80" height="40" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="140" y="45" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">Кухня</text>
          <rect x="20" y="80" width="50" height="60" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="45" y="115" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">С/у</text>
          <rect x="80" y="70" width="100" height="70" fill="none" stroke="#C9A962" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
          <text x="130" y="110" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.7">Терраса</text>
        </>
      )}

      {is15 && (
        <>
          <rect x="20" y="20" width="80" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="60" y="52" fill="#C9A962" fontSize="8" textAnchor="middle" opacity="0.8">Спальня</text>
          <rect x="110" y="20" width="70" height="40" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="145" y="45" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">Кухня-гост.</text>
          <rect x="20" y="85" width="45" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="42" y="118" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">С/у</text>
          <rect x="75" y="70" width="105" height="70" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="127" y="110" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">Гостиная</text>
        </>
      )}

      {is2 && (
        <>
          <rect x="20" y="20" width="75" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="57" y="52" fill="#C9A962" fontSize="8" textAnchor="middle" opacity="0.8">Спальня 1</text>
          <rect x="105" y="20" width="75" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="142" y="52" fill="#C9A962" fontSize="8" textAnchor="middle" opacity="0.8">Спальня 2</text>
          <rect x="20" y="85" width="55" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="47" y="118" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">С/у</text>
          <rect x="85" y="85" width="95" height="55" fill="none" stroke="#F5F0E8" strokeWidth="0.8" opacity="0.6" />
          <text x="132" y="118" fill="#C9A962" fontSize="7" textAnchor="middle" opacity="0.8">Кухня-гост.</text>
        </>
      )}

      <text x="100" y="155" fill="#C9A962" fontSize="10" textAnchor="middle" fontWeight="600">
        {area} м²
      </text>

      <motion.rect
        x="10" y="10" width="180" height="140"
        fill="none" stroke="#C9A962" strokeWidth="1.5" rx="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}
