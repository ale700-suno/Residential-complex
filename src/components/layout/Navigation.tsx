'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#benefits', label: 'Преимущества' },
  { href: '#location', label: 'Расположение' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#apartments', label: 'Резиденции' },
  { href: '#construction', label: 'Строительство' },
  { href: '#video', label: 'Видео' },
  { href: '#financing', label: 'Оплата' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientY - touchStart;
    if (diff > 80) setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-dark py-3 shadow-lg' : 'py-6 bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="group">
            <motion.span
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-accent text-xl md:text-2xl tracking-[0.25em] text-milk group-hover:text-gold transition-colors"
            >
              ARTI PARK
            </motion.span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-milk/70 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#apartments" className="btn-luxury-outline text-xs px-6 py-3 min-h-[44px]">
              Выбрать квартиру
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-milk"
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative h-full flex flex-col items-center justify-center gap-6 p-8"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-milk"
                aria-label="Закрыть меню"
              >
                <X size={28} />
              </button>

              <div className="w-12 h-1 bg-gold/40 rounded-full mb-4" aria-hidden="true" />

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-2xl text-milk hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3 mt-8 w-full max-w-xs"
              >
                <a href="#apartments" onClick={() => setMenuOpen(false)} className="btn-luxury-primary text-center">
                  Выбрать квартиру
                </a>
                <a href="tel:+79824880283" className="btn-luxury-outline text-center">
                  Позвонить
                </a>
              </motion.div>

              <p className="absolute bottom-8 text-xs text-milk/40 tracking-wider">
                Свайп вниз для закрытия
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
