import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/sections/SiteNavbar";
import { Hero } from "@/components/sections/Hero";
import { PropositoSection } from "@/components/sections/PropositoSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { PorQueSection } from "@/components/sections/PorQueSection";
import { QueVivirasSection } from "@/components/sections/QueVivirasSection";
import { GaleriaSection } from "@/components/sections/GaleriaSection";
import { ArtistasSection } from "@/components/sections/ArtistasSection";
import { RecintoSection } from "@/components/sections/RecintoSection";
import { AdopcionSection } from "@/components/sections/AdopcionSection";
import { EticaSection } from "@/components/sections/EticaSection";
import { ConvocatoriaBanner } from "@/components/sections/ConvocatoriaBanner";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";
import { esLocale } from "@/lib/i18n";

export default function Home({ params }: { params: { lang: string } }) {
  if (!esLocale(params.lang)) notFound();
  const { lang } = params;

  return (
    <>
      <SiteNavbar lang={lang} />
      <main>
        <Hero lang={lang} />
        <PropositoSection lang={lang} />
        <VideoSection lang={lang} />
        <PorQueSection lang={lang} />
        <QueVivirasSection lang={lang} />
        <GaleriaSection lang={lang} />
        <ArtistasSection lang={lang} />
        <RecintoSection lang={lang} />
        <AdopcionSection lang={lang} />
        <EticaSection lang={lang} />
        <ConvocatoriaBanner lang={lang} />
        <CTAFinal lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
