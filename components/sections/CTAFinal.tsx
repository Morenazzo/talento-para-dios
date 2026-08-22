import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";
import { BotonBoletos } from "@/components/BotonBoletos";

const t = getDiccionario();

export function CTAFinal() {
  return (
    <section
      aria-labelledby="cta-final-titulo"
      className="relative overflow-hidden bg-noche-medianoche/50 py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-hero" />
      <div aria-hidden className="onda-sonido absolute inset-x-0 top-10 h-8 opacity-30" />

      <div className="container relative z-10 flex max-w-3xl flex-col items-center text-center">
        <h2
          id="cta-final-titulo"
          className="font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
        >
          {t.ctaFinal.titulo}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.ctaFinal.texto}
        </p>

        <BotonBoletos
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-dorado px-8 py-3.5 text-base font-semibold text-noche shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all hover:bg-dorado-claro hover:shadow-[0_0_36px_rgba(245,216,122,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
        >
          {t.ctaFinal.cta}
        </BotonBoletos>

        <blockquote className="mt-16 max-w-2xl">
          <p className="font-display text-lg italic leading-relaxed text-dorado-claro/90 sm:text-xl">
            «{evento.versiculo.cita}»
          </p>
          <cite className="mt-3 block text-sm not-italic tracking-widest text-marfil-suave">
            — {evento.versiculo.referencia}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
