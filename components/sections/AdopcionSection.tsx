import { getDiccionario } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = getDiccionario();

export function AdopcionSection() {
  return (
    <section
      id="adopcion"
      aria-labelledby="adopcion-titulo"
      className="relative overflow-hidden bg-noche-medianoche/40 py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
      <div aria-hidden className="absolute inset-0 bg-destello-electrico-inv" />

      <div className="container relative z-10 max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
          {t.adopcion.kicker}
        </p>
        <h2
          id="adopcion-titulo"
          className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
        >
          {t.adopcion.titulo}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.adopcion.intro}
        </p>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.adopcion.pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative">
              <span
                aria-hidden
                className={cn(
                  "font-display text-5xl font-bold",
                  i % 2 === 1 ? "text-electrico/30" : "text-dorado/25"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold text-marfil">{paso.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-marfil-suave">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid items-center gap-8 rounded-2xl border border-dorado/20 bg-noche/60 p-8 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-xl text-marfil sm:text-2xl">
              ¿Dios puso un ministerio en tu corazón?
            </p>
            <p className="mt-2 text-sm text-marfil-suave">
              Los niveles de Productor Asociado incluyen participación en las
              dinámicas de adopción durante el evento.
            </p>
          </div>
          <a
            href="#nivel-productor"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-dorado/50 px-6 py-2 text-center text-sm font-medium text-dorado-claro transition-colors hover:border-dorado hover:bg-dorado/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
          >
            {t.adopcion.cta}
          </a>
        </div>

      </div>
    </section>
  );
}
