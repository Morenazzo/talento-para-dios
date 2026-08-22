import Image from "next/image";
import { CalendarDays, MapPin, ChevronDown } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { BotonBoletos } from "@/components/BotonBoletos";
import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";

const t = getDiccionario();

export function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Portada del evento"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-noche pt-16"
    >
      {/* Fondo cinematográfico: imagen oficial del escenario.
          TODO(video): sustituir esta imagen por el video oficial del evento
          (usarla como poster del <video>). */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/img/convocatoria-escenario.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noche/50 via-noche/68 to-noche" />
        <div className="absolute inset-0 bg-destello-hero" />
        {/* Destellos tipo marquesina */}
        <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-dorado-claro/80 shadow-[0_0_12px_4px_rgba(245,216,122,0.4)] animate-pulso-suave" />
        <div className="absolute right-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-dorado/70 shadow-[0_0_16px_6px_rgba(212,175,55,0.3)] animate-pulso-suave [animation-delay:1s]" />
        <div className="absolute left-1/3 bottom-1/3 h-1 w-1 rounded-full bg-marfil/60 shadow-[0_0_10px_3px_rgba(245,240,232,0.3)] animate-pulso-suave [animation-delay:2s]" />
        {/* Onda de sonido sutil */}
        <div className="onda-sonido absolute inset-x-0 bottom-24 h-10 opacity-40" />
      </div>

      <div className="container relative z-10 flex flex-col items-center py-24 text-center">
        <p
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-dorado-claro/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] sm:text-sm"
        >
          {t.hero.kicker}
        </p>

        <h1
          className="max-w-4xl font-display text-4xl font-bold leading-tight text-marfil [text-shadow:0_2px_24px_rgba(0,0,0,0.85),0_1px_4px_rgba(0,0,0,0.9)] sm:text-6xl lg:text-7xl"
        >
          {t.hero.titulo}
        </h1>

        <p
          className="mt-6 max-w-2xl text-base leading-relaxed text-marfil-suave [text-shadow:0_2px_12px_rgba(0,0,0,0.85)] sm:text-lg"
        >
          {t.hero.subtitulo}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-marfil [text-shadow:0_2px_10px_rgba(0,0,0,0.85)] sm:flex-row sm:gap-8">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden className="h-4 w-4 text-dorado" />
            <span>
              {evento.fechaTexto} · {evento.horaTexto}
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin aria-hidden className="h-4 w-4 text-dorado" />
            <span>
              {evento.lugar} · {evento.ciudad}
            </span>
          </span>
        </div>

        <div className="mt-10">
          <Countdown />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {/* CTA principal → compra en Eventbrite */}
          <BotonBoletos
            className="inline-flex h-14 items-center justify-center rounded-full bg-dorado px-8 py-3.5 text-base font-semibold text-noche shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all hover:bg-dorado-claro hover:shadow-[0_0_36px_rgba(245,216,122,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
          >
            {t.hero.ctaPrincipal}
          </BotonBoletos>
          {/* CTA secundario, discreto → baja a la sección de adopción */}
          <a
            href="#adopcion"
            className="inline-flex h-11 items-center justify-center rounded-full border border-dorado/40 px-6 text-sm font-medium text-dorado-claro transition-colors hover:border-dorado hover:bg-dorado/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
          >
            {t.hero.ctaSecundario}
          </a>
        </div>

      </div>

      <a
        href="#por-que"
        aria-label={t.hero.scrollHint}
        className="absolute bottom-6 z-10 animate-pulso-suave text-marfil-suave transition-colors hover:text-dorado-claro"
      >
        <ChevronDown aria-hidden className="h-6 w-6" />
      </a>
    </section>
  );
}
