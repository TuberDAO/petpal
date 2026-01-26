import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import TrustStrip from '@/components/TrustStrip';
import FAQ from '@/components/FAQ';
import MidPageCTA from '@/components/MidPageCTA';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MobileCTABar from '@/components/MobileCTABar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <MidPageCTA />
      <Pricing />
      <TrustStrip />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTABar />
    </main>
  );
}
