import { getDiccionario } from "@/lib/i18n";
import { cifrasMision } from "@/config/evento";

const t = getDiccionario();

export function PorQueSection() {
  return (
    <section
      id="por-que"
      aria-labelledby="por-que-titulo"
      className="relative bg-noche-carbon py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />

      <div className="container relative z-10 max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
          {t.porQue.kicker}
        </p>
        <h2
          id="por-que-titulo"
          className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
        >
          {t.porQue.titulo}
        </h2>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
          <p>
            <span className="text-marfil">{t.porQue.parrafo1}</span>{" "}
            {!cifrasMision.noAlcanzados.verificada && (
              <sup className="text-xs text-electrico" title="Cifra pendiente de verificación">
                {t.porQue.parrafo1Nota}
              </sup>
            )}
          </p>
          <p>
            {t.porQue.parrafo2}{" "}
            {!cifrasMision.alcanceMusica.verificada && (
              <sup className="text-xs text-electrico" title="Cifra pendiente de verificación">
                {t.porQue.parrafo2Nota}
              </sup>
            )}
          </p>
        </div>

        {/* Contraste visual de cifras — sobrio, sin alarmismo */}
        <div
          role="group"
          aria-label="Comparativa de alcance: prédica vs canción"
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-noche-borde bg-noche p-8">
            <p className="text-sm text-marfil-suave">
              {t.porQue.comparativa.predicaLabel}
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-marfil">
              {t.porQue.comparativa.predicaValor}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-marfil-suave/70">
              {t.porQue.comparativa.predicaUnidad}
            </p>
            <div aria-hidden className="mt-6 h-1.5 w-[12%] min-w-6 rounded-full bg-electrico/50" />
          </div>
          <div className="rounded-2xl border border-dorado/30 bg-noche p-8 shadow-[0_0_40px_rgba(212,175,55,0.08)]">
            <p className="text-sm text-marfil-suave">
              {t.porQue.comparativa.cancionLabel}
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-dorado-claro">
              {t.porQue.comparativa.cancionValor}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-marfil-suave/70">
              {t.porQue.comparativa.cancionUnidad}
            </p>
            <div aria-hidden className="mt-6 h-1.5 w-full rounded-full bg-gradient-to-r from-dorado to-dorado-claro" />
          </div>
        </div>
        <p className="mt-3 text-right text-xs text-marfil-suave/60">
          {cifrasMision.alcanceMusica.fuente}
        </p>

        <div className="mt-12 space-y-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
          <p>{t.porQue.parrafo3}</p>
          <p className="border-l-2 border-dorado pl-5 font-display text-xl italic text-marfil sm:text-2xl">
            {t.porQue.cierre}
          </p>
        </div>
      </div>
    </section>
  );
}
