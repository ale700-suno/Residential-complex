'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FileText, Calendar } from 'lucide-react';

const actions = [
  { href: '#apartments', label: 'Подобрать квартиру', icon: Home, primary: true },
  { href: '#contact', label: 'Получить прайс', icon: FileText },
  { href: '#contact', label: 'Записаться', icon: Calendar, short: 'На просмотр' },
];

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 hidden md:block"
        >
          <div className="glass-dark border-t border-white/10 backdrop-blur-2xl">
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
              <p className="text-sm text-milk/60 tracking-wide">
                <span className="text-gold font-medium">ARTI PARK</span>
                <span className="hidden lg:inline"> — 32 эксклюзивные резиденции у моря</span>
              </p>
              <div className="flex items-center gap-3">
                {actions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className={
                      action.primary
                        ? 'btn-luxury-primary text-xs px-5 py-2.5 min-h-[40px]'
                        : 'btn-luxury-outline text-xs px-5 py-2.5 min-h-[40px]'
                    }
                  >
                    <action.icon size={14} />
                    <span className="hidden sm:inline">{action.label}</span>
                    {action.short && <span className="sm:hidden">{action.short}</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
