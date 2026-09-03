import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { PorQueSection } from "@/components/sections/PorQueSection";
import { QueVivirasSection } from "@/components/sections/QueVivirasSection";
import { ArtistasSection } from "@/components/sections/ArtistasSection";
import { RecintoSection } from "@/components/sections/RecintoSection";
import { AdopcionSection } from "@/components/sections/AdopcionSection";
import { TicketTiers } from "@/components/sections/TicketTiers";
import { ConvocatoriaBanner } from "@/components/sections/ConvocatoriaBanner";
import { EticaSection } from "@/components/sections/EticaSection";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <PorQueSection />
        <QueVivirasSection />
        <ArtistasSection />
        <RecintoSection />
        <AdopcionSection />
        <TicketTiers />
        <EticaSection />
        <ConvocatoriaBanner />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
