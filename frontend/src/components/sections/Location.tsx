'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bus, ShoppingBag, Coffee } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const distances = [
  { value: '4 км', label: 'до моря', icon: MapPin },
  { value: '500 м', label: 'до остановки', icon: Bus },
  { value: '2 км', label: 'до «Пятёрочки»', icon: ShoppingBag },
  { value: '800 м', label: 'до кафе', icon: Coffee },
];

const infrastructure = [
  'Остановка маршрутов №556 и №115',
  'Продуктовые и хозяйственные магазины',
  'Кондитерские и кафе в радиусе 1 км',
  'Оздоровительная инфраструктура Адлер-Курорта',
];

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.location-pin', {
        scrollTrigger: { trigger: mapRef.current, start: 'top 70%' },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });
    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="location" className="section-padding bg-ocean-deep/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, x: -40 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-subtitle mb-4">Расположение</p>
            <h2 className="section-title mb-6">
              Адлер,<br />
              <span className="text-gradient-gold">ул. Лазурная Долина</span>
            </h2>
            <p className="text-milk/60 text-lg mb-8 leading-relaxed">
              Ровное место на границе национального парка. Конечная остановка
              маршрутов в 500 метрах. Отличная дорога до моря и центра Адлера.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {distances.map((d) => (
                <div
                  key={d.label}
                  className="location-pin glass rounded-xl p-5 text-center hover:border-gold/30 transition-colors"
                >
                  <d.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="font-accent text-2xl text-gold block">{d.value}</span>
                  <span className="text-xs text-milk/50 uppercase tracking-wider">{d.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={mapRef}
            initial={{ filter: 'blur(10px)', opacity: 0, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden glass aspect-[4/3] lg:aspect-square"
          >
            <iframe
              title="Карта — ЖК Арти Парк"
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.88%2C43.46%2C39.95%2C43.50&layer=mapnik&marker=43.48%2C39.915"
              className="w-full h-full border-0 grayscale-[30%] contrast-[1.1]"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 glass rounded-lg px-4 py-2">
              <p className="text-xs text-gold tracking-wider uppercase">ЖК Арти Парк</p>
              <p className="text-sm text-milk">р-н Чайсовхоз</p>
            </div>
          </motion.div>
        </div>

        {/* Infrastructure around */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
          id="infrastructure"
        >
          <p className="section-subtitle text-center mb-4">Инфраструктура вокруг</p>
          <h3 className="font-display text-3xl text-center text-milk mb-12">
            Всё необходимое — в шаговой доступности
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infrastructure.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:border-gold/20 transition-all duration-300"
              >
                <p className="text-milk/80 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
