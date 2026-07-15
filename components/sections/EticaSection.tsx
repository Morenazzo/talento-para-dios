import { ShieldCheck, Scale, Users, Copyright } from "lucide-react";
import { getDiccionario } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = getDiccionario();

const iconos = [ShieldCheck, Scale, Users, Copyright];

export function EticaSection() {
  return (
    <section
      id="transparencia"
      aria-labelledby="transparencia-titulo"
      className="bg-noche py-24 sm:py-32"
    >
      <div className="container max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
          {t.etica.kicker}
        </p>
        <h2
          id="transparencia-titulo"
          className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl"
        >
          {t.etica.titulo}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.etica.parrafo1}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.etica.puntos.map((punto, i) => {
            const Icono = iconos[i % iconos.length];
            const esAzul = i % 2 === 1;
            return (
              <div
                key={punto.titulo}
                className="rounded-2xl border border-noche-borde bg-noche-panel p-6"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border",
                    esAzul
                      ? "border-electrico/30 bg-electrico/10"
                      : "border-dorado/30 bg-dorado/10"
                  )}
                >
                  <Icono
                    className={cn("h-5 w-5", esAzul ? "text-electrico" : "text-dorado")}
                  />
                </span>
                <h3 className="mt-4 font-semibold text-marfil">
                  {punto.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-marfil-suave">
                  {punto.texto}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
