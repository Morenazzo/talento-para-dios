/**
 * Reproductor de video propio (documental y recap): MP4 H.264/AAC con el índice
 * al inicio, así que arranca sin bajarlo completo. `preload="none"` + carátula:
 * nadie descarga el archivo hasta que pulsa Reproducir. Los subtítulos ya
 * vienen integrados en el video.
 */
export function VideoRecap({
  etiqueta,
  src,
  poster,
}: {
  etiqueta: string;
  src: string;
  poster: string;
}) {

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-dorado/30 bg-black shadow-[0_0_64px_rgba(212,175,55,0.14)]">
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={etiqueta}
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src={src} type="video/mp4" />
        <a href={src} className="text-dorado-claro underline">
          {etiqueta}
        </a>
      </video>
    </div>
  );
}
