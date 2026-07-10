'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Download, Loader2 } from 'lucide-react';
import { BlurReveal } from '@/components/ui/BlurReveal';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          comment: formData.comment.trim(),
          source: 'Контактная форма Арти Парк',
        }),
      });

      if (!res.ok) {
        throw new Error('Ошибка сервера');
      }

      setSubmitted(true);
      // Сбрасываем форму
      setFormData({ name: '', phone: '', comment: '' });
    } catch (err) {
      console.error(err);
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-graphite via-ocean-deep/30 to-graphite-dark" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <BlurReveal className="text-center mb-16">
          <p className="section-subtitle mb-4">Контакты</p>
          <h2 className="section-title">
            Запишитесь на <span className="text-gradient-gold">просмотр</span>
          </h2>
        </BlurReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <BlurReveal direction="left">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-milk mb-2">Заявка отправлена</h3>
                  <p className="text-milk/60">Мы свяжемся с вами в ближайшее время</p>
                </motion.div>
              ) : (
                <>
                  <div>
                    <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">
                      Ваше имя
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Иван Иванов"
                      className="w-full bg-ocean-deep/50 border border-white/10 rounded-xl px-4 py-3.5 text-milk placeholder:text-milk/30 focus:border-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">
                      Телефон
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-ocean-deep/50 border border-white/10 rounded-xl px-4 py-3.5 text-milk placeholder:text-milk/30 focus:border-gold/40 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-milk/40 uppercase tracking-wider mb-2 block">
                      Комментарий
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Интересует квартира с видом на море..."
                      className="w-full bg-ocean-deep/50 border border-white/10 rounded-xl px-4 py-3.5 text-milk placeholder:text-milk/30 focus:border-gold/40 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-luxury-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <a
                    href="#"
                    className="btn-luxury-outline w-full text-center flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Скачать презентацию
                  </a>
                </>
              )}
            </form>
          </BlurReveal>

          {/* Правая колонка (контакты + карта) — без изменений */}
          <BlurReveal direction="right" delay={0.15}>
            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: 'Телефон',
                  value: '+7 (982) 488-02-83',
                  href: 'tel:+79824880283',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'info@artipark.ru',
                  href: 'mailto:info@artipark.ru',
                },
                {
                  icon: MapPin,
                  label: 'Адрес',
                  value: 'г. Сочи, Адлер, ул. Лазурная Долина',
                  href: '#location',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 glass rounded-xl p-5 hover:border-gold/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-milk/40 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-milk group-hover:text-gold transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              <div className="glass rounded-xl overflow-hidden aspect-video">
                <iframe
                  title="Карта — ЖК Арти Парк"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=39.88%2C43.46%2C39.95%2C43.50&layer=mapnik&marker=43.48%2C39.915"
                  className="w-full h-full border-0 grayscale-[30%]"
                  loading="lazy"
                />
              </div>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}