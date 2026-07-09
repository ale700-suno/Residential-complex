import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Cinzel } from 'next/font/google';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARTI PARK — Жизнь у моря нового уровня | Адлер, Сочи',
  description:
    '32 эксклюзивные резиденции в клубном жилом комплексе у национального парка. 5 минут до моря. Панорамные виды, бассейн, закрытая территория.',
  openGraph: {
    title: 'ARTI PARK — Премиальная недвижимость в Сочи',
    description: 'Жизнь у моря нового уровня. 32 эксклюзивные резиденции.',
    images: ['/textures/complex.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable} ${cinzel.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
