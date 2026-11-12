import { VideoRecap } from "@/components/VideoRecap";
import { VideoPresentacion } from "@/components/VideoPresentacion";
import { getDiccionario, type Locale } from "@/lib/i18n";
import { evento } from "@/config/evento";


const SITIO = evento.sitio;

export function VideoSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);

  /** Datos estructurados para que Google pueda mostrar los videos en sus resultados. */
  const objetoVideo = (
    v: { src: string; poster: string; subidoEl: string; duracionISO: string },
    name: string,
    description: string,
  ) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `${SITIO}${v.poster}`,
    contentUrl: `${SITIO}${v.src}`,
    uploadDate: v.subidoEl,
    duration: v.duracionISO,
    inLanguage: "es",
  });
  const datosVideo = [
    objetoVideo(evento.videoRecap, t.video.jsonTitulo, t.video.texto),
    objetoVideo(evento.videoDocumental, t.video.documental.jsonTitulo, t.video.documental.texto),
  ];

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

        {/* Pieza principal: el recap de un minuto, el más fácil de ver completo. */}
        <div className="mx-auto mt-10 max-w-5xl">
          <VideoRecap
            etiqueta={t.video.reproducir}
            src={evento.videoRecap.src}
            poster={evento.videoRecap.poster}
          />
        </div>

        {/* El documental completo (5 min). */}
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h3 className="font-display text-2xl font-bold text-marfil sm:text-3xl">
            {t.video.documental.titulo}
          </h3>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-marfil-suave sm:text-base">
            {t.video.documental.texto}
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-4xl">
          <VideoRecap
            etiqueta={t.video.documental.reproducir}
            src={evento.videoDocumental.src}
            poster={evento.videoDocumental.poster}
          />
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-marfil-suave/80">
            {t.video.documental.nota}
          </p>
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
          <VideoPresentacion
            etiquetaReproducir={t.video.presentacion.reproducir}
            tituloIframe={t.video.presentacion.iframeTitulo}
          />
        </div>
      </div>
    </section>
  );
}
