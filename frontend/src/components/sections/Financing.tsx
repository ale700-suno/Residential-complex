'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Percent, Building2, ChevronDown } from 'lucide-react';
import { BlurReveal } from '@/components/ui/BlurReveal';

const options = [
  {
    icon: Percent,
    title: 'Рассрочка 0%',
    desc: 'Беспроцентная рассрочка от застройщика до 24 месяцев. Первый взнос от 30%.',
    highlight: '0%',
  },
  {
    icon: Building2,
    title: 'Ипотека от 6%',
    desc: 'Партнёрские программы ведущих банков. Одобрение за 1 день. Субсидированная ставка.',
    highlight: '6%',
  },
  {
    icon: CreditCard,
    title: 'Полный расчёт',
    desc: 'Скидка до 5% при 100% оплате. Акция ограничена — уточняйте актуальные условия.',
    highlight: '-5%',
  },
];

export function Financing() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="financing" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-luxury opacity-30" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <BlurReveal className="text-center mb-16">
          <p className="section-subtitle mb-4">Оплата</p>
          <h2 className="section-title">
            Рассрочка и <span className="text-gradient-gold">ипотека</span>
          </h2>
          <p className="text-milk/60 max-w-xl mx-auto mt-4">
            Гибкие условия покупки — выберите удобный способ оплаты
          </p>
        </BlurReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card p-6 md:p-8 text-center group hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-5 border border-gold/20 group-hover:border-gold/40 transition-colors">
                <opt.icon size={28} className="text-gold" />
              </div>
              <span className="font-accent text-4xl text-gradient-gold block mb-3">
                {opt.highlight}
              </span>
              <h3 className="font-display text-xl text-milk mb-3">{opt.title}</h3>
              <p className="text-milk/60 text-sm leading-relaxed">{opt.desc}</p>
            </motion.div>
          ))}
        </div>

        <BlurReveal delay={0.2} className="mt-12 max-w-2xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            {[
              {
                q: 'Какой минимальный первый взнос?',
                a: 'При рассрочке — от 30% стоимости. При ипотеке — от 15% в зависимости от банка.',
              },
              {
                q: 'Можно ли использовать материнский капитал?',
                a: 'Да, материнский капитал можно использовать как первоначальный взнос или часть оплаты.',
              },
            ].map((item, i) => (
              <div key={item.q} className="border-b border-white/5 last:border-0">
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-milk text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gold shrink-0 transition-transform ${
                      expanded === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-milk/60 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
