import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PorQueSection } from "@/components/sections/PorQueSection";
import { QueVivirasSection } from "@/components/sections/QueVivirasSection";
import { AdopcionSection } from "@/components/sections/AdopcionSection";
import { TicketTiers } from "@/components/sections/TicketTiers";
import { EticaSection } from "@/components/sections/EticaSection";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PorQueSection />
        <QueVivirasSection />
        <AdopcionSection />
        <TicketTiers />
        <EticaSection />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
