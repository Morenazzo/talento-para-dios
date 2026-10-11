import Image from "next/image";
import { galeria } from "@/config/evento";
import { getDiccionario, type Locale } from "@/lib/i18n";

export function GaleriaSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  // Los textos de cada foto viven en el diccionario, en el mismo orden que `galeria`.
  const fotos = galeria.map((f, i) => ({ ...f, ...t.galeria.fotos[i] }));
  /** La primera foto abre la galería a todo lo ancho; el resto va en mosaico. */
  const [destacada, ...resto] = fotos;

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-titulo"
      className="relative overflow-hidden bg-noche py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-lateral" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
            {t.galeria.kicker}
          </p>
          <h2
            id="galeria-titulo"
            className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
          >
            {t.galeria.titulo}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
            {t.galeria.intro}
          </p>
        </div>

        <figure className="mt-12 overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_64px_rgba(217,165,32,0.14)]">
          <Image
            src={destacada.src}
            alt={destacada.alt}
            width={destacada.ancho}
            height={destacada.alto}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="bg-noche-carbon px-5 py-3 text-sm text-marfil-suave">
            {destacada.pie}
          </figcaption>
        </figure>

        <ul className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {resto.map((foto) => (
            <li key={foto.src} className="mb-6 break-inside-avoid">
              <figure className="group overflow-hidden rounded-2xl border border-dorado/20 bg-noche-carbon">
                <div className="overflow-hidden">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={foto.ancho}
                    height={foto.alto}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-marfil-suave">
                  {foto.pie}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
