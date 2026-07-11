'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';

const suggestions = [
  'Квартира с видом на море',
  'Студия до 2 млн ₽',
  'С террасой на 1 этаже',
  '2-комнатная пентхаус',
];

export function AIConsultant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-36 md:bottom-24 left-4 md:left-6 z-50 flex items-center gap-2 glass rounded-full pl-4 pr-5 py-3 text-sm text-milk hover:border-gold/30 transition-all group max-w-[calc(100vw-2rem)]"
        aria-label="AI-консультант"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-gold" />
        </div>
        <span className="text-xs md:text-sm tracking-wide truncate">
          Помочь подобрать квартиру?
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-graphite-dark/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md glass rounded-2xl p-6 md:p-8"
              data-lenis-prevent
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-milk/50 hover:text-milk transition-colors"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                  <MessageCircle size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-milk">AI-консультант</h3>
                  <p className="text-xs text-milk/50">Подберём идеальную резиденцию</p>
                </div>
              </div>

              <p className="text-milk/70 text-sm mb-4 leading-relaxed">
                Расскажите, что для вас важно — вид, площадь, бюджет — и мы подберём
                лучшие варианты из 50 резиденций.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map((s) => (
                  <a
                    key={s}
                    href="#apartments"
                    onClick={() => setOpen(false)}
                    className="text-xs px-3 py-2 rounded-full border border-gold/20 text-gold/80 hover:bg-gold/10 hover:border-gold/40 transition-all"
                  >
                    {s}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-luxury-primary w-full text-center text-sm"
              >
                Получить персональную подборку
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
