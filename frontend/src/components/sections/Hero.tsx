'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Calendar, ChevronDown } from 'lucide-react';
import { HeroParticles } from '@/components/three/HeroParticles';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 5, suffix: ' мин', label: 'до моря' },
  { value: 32, suffix: '', label: 'эксклюзивных резиденций' },
  { value: 360, suffix: '°', label: 'панорамные виды' },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/textures/complex.png"
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-[heroZoom_25s_ease-in-out_infinite_alternate]"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean/50 to-graphite-dark/90" />
        <HeroParticles />
      </motion.div>

      {/* Parallax layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: 0 }}
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 container mx-auto px-4 md:px-8 pb-24 md:pb-32 pt-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-4xl">
          {/* Logo blur reveal */}
          <motion.p
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="section-subtitle mb-6"
          >
            Адлер · Сочи · Национальный парк
          </motion.p>

          {/* Title line by line */}
          <motion.h1
            className="font-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.08em] text-milk leading-[1.05] mb-4"
          >
            {['ARTI', 'PARK'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ filter: 'blur(12px)', opacity: 0, y: 30 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-milk/90 mb-10"
          >
            Жизнь у моря <span className="text-gradient-gold">нового уровня</span>
          </motion.p>

          {/* Buttons cascade */}
          <div className="flex flex-wrap gap-4 mb-16">
            {[
              { href: '#apartments', label: 'Выбрать квартиру', primary: true },
              { href: '#contact', label: 'Скачать презентацию', icon: Download },
              { href: '#contact', label: 'Записаться на просмотр', icon: Calendar },
            ].map((btn, i) => (
              <motion.a
                key={btn.label}
                href={btn.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                className={btn.primary ? 'btn-luxury-primary' : 'btn-luxury-outline'}
              >
                {btn.icon && <btn.icon size={16} />}
                {btn.label}
              </motion.a>
            ))}
          </div>

          {/* Stats with count up */}
          <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} delay={1.5 + i * 0.1} />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#benefits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-milk/40 hover:text-gold transition-colors"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </motion.a>

      <style jsx global>{`
        @keyframes heroZoom {
          from { transform: scale(1.1); }
          to { transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}

function StatCounter({
  stat,
  delay,
}: {
  stat: { value: number; suffix: string; label: string };
  delay: number;
}) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center md:text-left"
    >
      <span className="font-accent text-3xl md:text-4xl text-gold tabular-nums">
        {count}{stat.suffix}
      </span>
      <p className="text-xs md:text-sm text-milk/50 mt-1 tracking-wide uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}
