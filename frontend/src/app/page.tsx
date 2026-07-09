import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Location } from '@/components/sections/Location';
import { Gallery } from '@/components/sections/Gallery';
import { Apartments } from '@/components/sections/Apartments';
import { Construction } from '@/components/sections/Construction';
import { VideoOverview } from '@/components/sections/VideoOverview';
import { Financing } from '@/components/sections/Financing';
import { Contact } from '@/components/sections/Contact';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { StickyCTA } from '@/components/ui/StickyCTA';
import { AIConsultant } from '@/components/ui/AIConsultant';
import { MobileActionBar } from '@/components/ui/MobileActionBar';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="pb-20 md:pb-0">
        <Hero />
        <Benefits />
        <Location />
        <Gallery />
        <Apartments />
        <Construction />
        <VideoOverview />
        <Financing />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
      <StickyCTA />
      <AIConsultant />
      <MobileActionBar />
    </>
  );
}
