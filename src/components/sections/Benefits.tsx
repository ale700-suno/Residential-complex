'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Waves, Shield, TreePine, Sparkles, Mountain, Wifi } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ComplexShowcase } from '@/components/ui/ComplexShowcase';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Waves,
    title: '5 минут до моря',
    desc: '4 км по отличной дороге до благоустроенных пляжей Адлер-Курорта',
    side: 'left' as const,
  },
  {
    icon: Mountain,
    title: 'Панорамные виды',
    desc: 'Из окон — горы, река и субтропический лес национального парка',
    side: 'right' as const,
  },
  {
    icon: Sparkles,
    title: 'Клубный формат',
    desc: '32 эксклюзивные резиденции с бассейном и закрытой территорией',
    side: 'left' as const,
  },
  {
    icon: Shield,
    title: 'Охрана 24/7',
    desc: 'Закрытая охраняемая территория, доверительное управление',
    side: 'right' as const,
  },
  {
    icon: TreePine,
    title: 'Экологичная локация',
    desc: 'На границе национального парка, в окружении субтропического леса',
    side: 'left' as const,
  },
  {
    icon: Wifi,
    title: 'Готовая инфраструктура',
    desc: 'Центральные коммуникации, УК, Wi-Fi, корпус 1 — сдан',
    side: 'right' as const,
  },
];

function AnimatedIcon({ Icon }: { Icon: typeof Waves }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20"
    >
      <Icon
        ref={ref as React.RefObject<SVGSVGElement>}
        size={28}
        className="text-gold"
        strokeWidth={1.5}
        style={{
          strokeDasharray: isInView ? 'none' : '100',
          strokeDashoffset: isInView ? 0 : 100,
          transition: 'stroke-dashoffset 1.5s ease',
        }}
      />
    </motion.div>
  );
}

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.benefit-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -60 : 60),
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-luxury opacity-50" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-subtitle mb-4">Философия</p>
          <h2 className="section-title">
            Это не просто квартира.<br />
            <span className="text-gradient-gold">Это стиль жизни</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="benefit-item flex gap-6 items-start group"
            >
              <AnimatedIcon Icon={item.icon} />
              <div>
                <h3 className="font-display text-xl md:text-2xl text-milk mb-2 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-milk/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Complex image showcase with day/night */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 relative rounded-3xl overflow-hidden h-[400px] md:h-[600px]"
        >
          <ComplexShowcase
            showToggle
            overlay={
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
                  <p className="section-subtitle mb-2">Архитектура</p>
                  <h3 className="font-display text-2xl md:text-4xl text-milk">
                    Средиземноморская элегантность у подножия гор
                  </h3>
                </div>
              </>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
