import { VideoRecap } from "@/components/VideoRecap";
import { VideoPresentacion } from "@/components/VideoPresentacion";
import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";

const t = getDiccionario();

const SITIO = "https://talentoparadios.com";

/** Datos estructurados para que Google pueda mostrar el video en sus resultados. */
const datosVideo = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: evento.videoRecap.titulo,
  description: t.video.texto,
  thumbnailUrl: `${SITIO}${evento.videoRecap.poster}`,
  contentUrl: `${SITIO}${evento.videoRecap.src}`,
  uploadDate: evento.videoRecap.subidoEl,
  duration: evento.videoRecap.duracionISO,
  inLanguage: "es",
};

export function VideoSection() {
  return (
    <section
      id="video"
      aria-labelledby="video-titulo"
      className="relative overflow-hidden bg-noche py-20 sm:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosVideo) }}
      />
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
            {t.video.kicker}
          </p>
          <h2
            id="video-titulo"
            className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl"
          >
            {t.video.titulo}
          </h2>
          <p className="mx-auto mt-5 text-base leading-relaxed text-marfil-suave sm:text-lg">
            {t.video.texto}
          </p>
        </div>

        {/* Pieza principal: el recap, a todo el ancho del contenedor. */}
        <div className="mx-auto mt-10 max-w-5xl">
          <VideoRecap etiqueta={t.video.reproducir} />
        </div>

        {/* Secundario: el video con el que se presentó el festival (YouTube). */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h3 className="font-display text-2xl font-bold text-marfil sm:text-3xl">
            {t.video.presentacion.titulo}
          </h3>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-marfil-suave sm:text-base">
            {t.video.presentacion.texto}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <VideoPresentacion etiquetaReproducir={t.video.presentacion.reproducir} />
        </div>
      </div>
    </section>
  );
}
