import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Music2 } from "lucide-react";
import { artistas, type Artista } from "@/config/evento";
import { getDiccionario } from "@/lib/i18n";

const t = getDiccionario();

/**
 * La cartelera se arma en el servidor, así que podemos comprobar si la foto
 * existe en `public/`. Si todavía no se ha subido, la tarjeta muestra el
 * marcador con la inicial en vez de una imagen rota.
 */
function tieneFoto(imagen?: string): imagen is string {
  return Boolean(imagen) && existsSync(join(process.cwd(), "public", imagen!));
}

/** Foto destacada del banner, con respaldo si aún no se ha subido. */
const BANNER = tieneFoto("/img/concierto-santo-por-siempre.jpg")
  ? "/img/concierto-santo-por-siempre.jpg"
  : "/img/convocatoria-escenario.jpg";

function TarjetaArtista({ artista }: { artista: Artista }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dorado/20 bg-noche transition-shadow hover:shadow-[0_0_48px_rgba(212,175,55,0.18)]">
      {/* Cuadrada: las portadas llegan en 1:1 y 4:3, así ninguna pierde su texto. */}
      <div className="relative aspect-square overflow-hidden bg-noche-carbon">
        {tieneFoto(artista.imagen) ? (
          <Image
            src={artista.imagen}
            alt={artista.alt ?? artista.nombre}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Marcador mientras no hay foto: inicial sobre degradado, nunca una imagen rota. */
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-noche-carbon via-noche to-noche-medianoche"
          >
            <span className="font-display text-6xl font-bold text-dorado/30">
              {artista.nombre.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Sello de respaldo (ej. reproducciones) */}
        {artista.dato && (
          <p className="mb-3 inline-flex self-start items-center rounded-full border border-dorado/40 bg-dorado/10 px-3 py-1 text-xs font-medium text-dorado-claro">
            {artista.dato}
          </p>
        )}
        <h3 className="font-display text-2xl font-bold text-marfil">
          {artista.nombre}
        </h3>
        {artista.proyecto && (
          <p className="mt-0.5 text-sm font-medium uppercase tracking-[0.2em] text-dorado-claro">
            {artista.proyecto}
          </p>
        )}
        <p className="mt-3 flex items-center gap-2 text-sm text-marfil-suave">
          <Music2 aria-hidden className="h-4 w-4 shrink-0 text-dorado" />
          <span>
            <span className="sr-only">{t.artistas.etiquetaCancion}: </span>«
            {artista.cancion}»
          </span>
        </p>
      </div>
    </article>
  );
}

export function ArtistasSection() {
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

        {/* Banda cinematográfica de concierto: da escala al evento antes de la cartelera. */}
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-dorado/20 shadow-[0_0_64px_rgba(212,175,55,0.14)]">
          <Image
            src={BANNER}
            alt={t.artistas.altBanner}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="inline-flex items-center rounded-full border border-dorado/50 bg-dorado/10 px-4 py-1.5 text-xs font-medium text-dorado-claro sm:text-sm">
            {t.artistas.banner.dato}
          </p>
          <p className="text-sm text-marfil-suave">
            {t.artistas.banner.titulo}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artistas.map((a) => (
            <TarjetaArtista key={a.nombre} artista={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
