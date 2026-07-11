import Link from "next/link";
import { Mic2 } from "lucide-react";
import { getDiccionario } from "@/lib/i18n";

const t = getDiccionario();

/** Banner de convocatoria para artistas → /aplica */
export function ConvocatoriaBanner() {
  return (
    <section
      id="artistas"
      aria-labelledby="convocatoria-titulo"
      className="bg-noche py-20 sm:py-24"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-dorado/25 bg-noche-medianoche/50 px-8 py-12 sm:px-14 sm:py-16">
          <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
          <div aria-hidden className="onda-sonido absolute inset-x-0 bottom-6 h-8 opacity-30" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-dorado">
                <Mic2 aria-hidden className="h-4 w-4" />
                {t.convocatoria.kicker}
              </p>
              <h2
                id="convocatoria-titulo"
                className="mt-4 font-display text-2xl font-bold leading-tight text-marfil sm:text-4xl"
              >
                {t.convocatoria.titulo}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-marfil-suave">
                {t.convocatoria.texto}
              </p>
              <p className="mt-3 text-xs text-marfil-suave/80">
                {t.convocatoria.nota}
              </p>
            </div>

            <Link
              href="/aplica"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-dorado px-8 py-3 text-center text-base font-semibold text-noche shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all hover:bg-dorado-claro hover:shadow-[0_0_36px_rgba(245,216,122,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
            >
              {t.convocatoria.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
