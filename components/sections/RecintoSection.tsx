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

        <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_48px_rgba(212,175,55,0.12)]">
          <Image
            src="/img/concierto-adoracion.jpg"
            alt={t.recinto.altImagen}
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
