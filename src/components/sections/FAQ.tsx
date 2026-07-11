'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BlurReveal } from '@/components/ui/BlurReveal';

const faqs = [
  {
    q: 'Где расположен ЖК Арти Парк?',
    a: 'Комплекс находится в Адлерском районе Сочи, на ул. Лазурная Долина, р-н Чайсовхоз. На границе национального парка, в 4 км от моря.',
  },
  {
    q: 'Какие площади апартаментов?',
    a: 'От компактных студий 13 м² до просторных 2-комнатных резиденций 44 м². Всего 50 эксклюзивные квартиры в 3 корпусах.',
  },
  {
    q: 'Есть ли бассейн и инфраструктура?',
    a: 'Да — общий бассейн, закрытая охраняемая территория, Wi-Fi, детская площадка, парковка. Корпус 1 уже сдан и заселён.',
  },
  {
    q: 'Какие виды из окон?',
    a: 'Панорамные виды на горы, субтропический лес, реку и море. Верхние этажи — с видом на море.',
  },
  {
    q: 'Какие условия оплаты?',
    a: 'Рассрочка 0% до 24 месяцев, ипотека от 6%, скидка при полном расчёте. Первый взнос от 30%.',
  },
  {
    q: 'Можно ли посмотреть квартиру?',
    a: 'Да, организуем индивидуальный просмотр готовых апартаментов в корпусе 1 и экскурсию по стройплощадке.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-ocean-deep/20">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <BlurReveal className="text-center mb-16">
          <p className="section-subtitle mb-4">FAQ</p>
          <h2 className="section-title">
            Частые <span className="text-gradient-gold">вопросы</span>
          </h2>
        </BlurReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors group"
              >
                <span className="font-display text-lg text-milk group-hover:text-gold transition-colors pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gold shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-milk/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
