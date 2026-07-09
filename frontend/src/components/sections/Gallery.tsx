'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const galleryItems = [
  {
    src: '/textures/complex.png',
    nightSrc: '/textures/comlexnight.png',
    title: 'Главный вид комплекса',
    category: 'Архитектура',
  },
  {
    src: '/textures/comlexnight.png',
    title: 'Ночная подсветка',
    category: 'Атмосфера',
  },
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    title: 'Бассейн и терраса',
    category: 'Инфраструктура',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    title: 'Интерьер резиденции',
    category: 'Интерьеры',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8ab6b4c8b5?w=1200&q=80',
    title: 'Панорамный вид',
    category: 'Виды',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa5a6c3?w=1200&q=80',
    title: 'Зона отдыха',
    category: 'Территория',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509809-ba874a0a0a0a?w=1200&q=80',
    title: 'Закат над горами',
    category: 'Атмосфера',
  },
];

function GalleryCard({ item }: { item: typeof galleryItems[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full"
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden preserve-3d group cursor-pointer"
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/90 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-xs text-gold tracking-wider uppercase">{item.category}</span>
          <h3 className="font-display text-xl text-milk mt-1">{item.title}</h3>
        </div>
      </motion.div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Галерея</p>
          <h2 className="section-title">
            Мир <span className="text-gradient-gold">Арти Парк</span>
          </h2>
        </motion.div>

        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="gallery-swiper !pb-16"
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 16 },
            768: { slidesPerView: 1.5, spaceBetween: 24 },
            1024: { slidesPerView: 2.2, spaceBetween: 32 },
          }}
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.title} className="!w-[85vw] md:!w-[500px]">
              <GalleryCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
