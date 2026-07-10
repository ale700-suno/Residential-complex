'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HardHat, CheckCircle2, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BlurReveal } from '@/components/ui/BlurReveal';
import { useCountUp } from '@/hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    title: 'Корпус 1',
    status: 'done' as const,
    progress: 100,
    desc: 'Сдан и заселён. Готовые апартаменты с отделкой.',
  },
  {
    title: 'Корпус 2',
    status: 'progress' as const,
    progress: 65,
    desc: 'Монолитные работы завершены. Идёт отделка фасада.',
  },
  {
    title: 'Корпус 3',
    status: 'progress' as const,
    progress: 40,
    desc: 'Завершено возведение 3 этажа. Продолжается строительство.',
  },
];

const statusIcons = {
  done: CheckCircle2,
  progress: Clock,
  planned: HardHat,
};

function ProgressCard({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) {
  const Icon = statusIcons[stage.status];
  const { count, ref } = useCountUp(stage.progress, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="luxury-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            stage.status === 'done'
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-gold/20 text-gold'
          }`}
        >
          <Icon size={20} />
        </div>
        <h3 className="font-display text-xl text-milk">{stage.title}</h3>
      </div>

      <div ref={ref} className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-milk/50">Готовность</span>
          <span className="text-gold font-accent text-lg tabular-nums">{count}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            style={{ width: `${stage.progress}%` }}
          />
        </div>
      </div>

      <p className="text-milk/60 text-sm leading-relaxed">{stage.desc}</p>
    </motion.div>
  );
}

export function Construction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.progress-bar-fill', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        width: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="construction" className="section-padding bg-ocean-deep/20">
      <div className="container mx-auto px-4 md:px-8">
        <BlurReveal className="text-center mb-16">
          <p className="section-subtitle mb-4">Строительство</p>
          <h2 className="section-title">
            Ход <span className="text-gradient-gold">строительства</span>
          </h2>
        </BlurReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stages.map((stage, i) => (
            <ProgressCard key={stage.title} stage={stage} index={i} />
          ))}
        </div>

        <BlurReveal delay={0.3} className="mt-16 text-center">
          <a href="#contact" className="btn-luxury-outline">
            Записаться на просмотр стройплощадки
          </a>
        </BlurReveal>
      </div>
    </section>
  );
}
