import Image from "next/image";
import { getDiccionario } from "@/lib/i18n";

const t = getDiccionario();

export function RecintoSection() {
  return (
    <section
      aria-labelledby="recinto-titulo"
      className="bg-noche-carbon py-24 sm:py-32"
    >
      <div className="container max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
          {t.recinto.kicker}
        </p>
        <h2
          id="recinto-titulo"
          className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
        >
          {t.recinto.titulo}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.recinto.texto}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_40px_rgba(212,175,55,0.1)] sm:aspect-square">
            <Image
              src="/img/recinto-fachada.jpg"
              alt={t.recinto.altFachada}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_40px_rgba(212,175,55,0.1)] sm:aspect-square">
            <Image
              src="/img/recinto-aereo.jpg"
              alt={t.recinto.altAereo}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
