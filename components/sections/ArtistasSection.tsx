import Image from "next/image";
import { artistas, type Artista } from "@/config/evento";
import { getDiccionario, type Locale } from "@/lib/i18n";


function TarjetaArtista({
  artista,
  nombre,
  alt,
  dato,
}: {
  artista: Artista;
  nombre: string;
  alt: string;
  dato?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dorado/20 bg-noche transition-shadow hover:shadow-[0_0_48px_rgba(217,165,32,0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-noche-carbon">
        <Image
          src={artista.imagen}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {dato && (
          <p className="mb-3 inline-flex items-center self-start rounded-full border border-dorado/40 bg-dorado/10 px-3 py-1 text-xs font-medium text-dorado-claro">
            {dato}
          </p>
        )}
        <h3 className="font-display text-xl font-bold leading-snug text-marfil">
          {nombre}
        </h3>
        {artista.proyecto && (
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-dorado-claro">
            {artista.proyecto}
          </p>
        )}
      </div>
    </article>
  );
}

export function ArtistasSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  return (
    <section
      id="artistas"
      aria-labelledby="artistas-titulo"
      className="relative overflow-hidden bg-noche-carbon py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
            {t.artistas.kicker}
          </p>
          <h2
            id="artistas-titulo"
            className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
          >
            {t.artistas.titulo}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
            {t.artistas.intro}
          </p>
        </div>

        {/* Los diez proyectos, en orden de aparición */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {artistas.map((a) => (
            <TarjetaArtista
              key={a.id}
              artista={a}
              nombre={t.artistas.detalle[a.id].nombre ?? a.nombre}
              alt={t.artistas.detalle[a.id].alt}
              dato={t.artistas.detalle[a.id].dato}
            />
          ))}
        </div>

        {/* María y el dato de «Santo por Siempre»: la foto del video, no del evento */}
        <div className="mt-16 grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_64px_rgba(217,165,32,0.14)]">
            <Image
              src="/img/concierto-santo-por-siempre.jpg"
              alt={t.artistas.altBanner}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="inline-flex items-center rounded-full border border-dorado/50 bg-dorado/10 px-4 py-1.5 text-xs font-medium text-dorado-claro sm:text-sm">
              {t.artistas.banner.dato}
            </p>
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-marfil sm:text-3xl">
              {t.artistas.banner.titulo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
