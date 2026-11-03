import Image from "next/image";
import { getDiccionario, type Locale } from "@/lib/i18n";

/**
 * Agradecimiento al patrocinador (Haggai International).
 *
 * Guía de marca de Haggai: sobre fondo blanco va el logo a todo color, sin
 * recolorear, deformar ni redibujar, y con espacio libre alrededor (la altura
 * de la «H»). Por eso el logo vive en una tarjeta blanca y el archivo ya trae
 * ese margen incluido. No añadir filtros, sombras ni bordes pegados al logo.
 */
export function PatrocinadorSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  const a = t.agradecimiento;

  return (
    <section
      id="patrocinadores"
      aria-labelledby="patrocinadores-titulo"
      className="relative overflow-hidden bg-noche-carbon py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />

      <div className="container relative z-10 max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
              {a.kicker}
            </p>
            <h2
              id="patrocinadores-titulo"
              className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
            >
              {a.titulo}
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-marfil-suave sm:text-lg">
              <p>{a.parrafo1}</p>
              <p>{a.parrafo2}</p>
              <p className="text-marfil">{a.gracias}</p>
            </div>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-dorado/20 bg-dorado/20 sm:grid-cols-3">
              {a.datos.map((d) => (
                <div key={d.etiqueta} className="bg-noche px-5 py-4">
                  <dt className="text-xs uppercase tracking-[0.2em] text-dorado">
                    {d.etiqueta}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold leading-snug text-marfil">
                    {d.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.3em] text-marfil-suave/80">
              {a.patrocinador}
            </p>
            <div className="overflow-hidden rounded-3xl border border-dorado/40 bg-white p-4 shadow-[0_0_64px_rgba(217,165,32,0.18)] sm:p-6">
              <Image
                src="/brand/haggai/haggai-international-vertical.webp"
                alt={a.logoAlt}
                width={900}
                height={721}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 448px, 90vw"
                className="mx-auto h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
