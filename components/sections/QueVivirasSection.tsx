import { Music, Sparkles, HeartHandshake, Mic2 } from "lucide-react";
import { getDiccionario, type Locale } from "@/lib/i18n";


const iconos = [Music, Mic2, Sparkles, HeartHandshake];

export function QueVivirasSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  return (
    <section
      id="evento"
      aria-labelledby="evento-titulo"
      className="relative overflow-hidden bg-noche py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-lateral" />
      <div className="container relative z-10 max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
          {t.queViviras.kicker}
        </p>
        <h2
          id="evento-titulo"
          className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
        >
          {t.queViviras.titulo}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.queViviras.intro}
        </p>

        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2">
            {t.queViviras.items.map((item, i) => {
              const Icono = iconos[i % iconos.length];
              return (
                <li key={item.titulo} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dorado/30 bg-dorado/10"
                  >
                    <Icono
                      className="h-5 w-5 text-dorado"
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold text-marfil">{item.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-marfil-suave">
                      {item.texto}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
