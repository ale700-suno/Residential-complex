'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { BlurReveal } from '@/components/ui/BlurReveal';
import { ComplexShowcase } from '@/components/ui/ComplexShowcase';

export function VideoOverview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="video" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <BlurReveal className="text-center mb-16">
          <p className="section-subtitle mb-4">Видеообзор</p>
          <h2 className="section-title">
            Погрузитесь в <span className="text-gradient-gold">атмосферу</span>
          </h2>
        </BlurReveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden group max-w-5xl mx-auto aspect-video"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/textures/complex.png"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/80 via-graphite-dark/20 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full glass flex items-center justify-center cursor-pointer group/play"
              onClick={() => {
                const v = videoRef.current;
                if (v) {
                  v.muted = false;
                  v.paused ? v.play() : v.pause();
                }
              }}
            >
              <Play
                size={32}
                className="text-gold ml-1 group-hover/play:text-gold-light transition-colors"
              />
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <p className="section-subtitle mb-2">ARTI PARK</p>
            <h3 className="font-display text-2xl md:text-3xl text-milk">
              Жизнь у моря нового уровня
            </h3>
          </div>
        </motion.div>

        <BlurReveal delay={0.2} className="mt-16">
          <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto h-[300px] md:h-[450px]">
            <ComplexShowcase
              showToggle
              imageClassName="h-[300px] md:h-[450px]"
              overlay={
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark via-transparent to-transparent z-10 pointer-events-none" />
              }
            />
            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
              <p className="section-subtitle mb-2">День и ночь</p>
              <h3 className="font-display text-2xl text-milk">
                Комплекс в любое время суток
              </h3>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
