import { VideoPresentacion } from "@/components/VideoPresentacion";
import { getDiccionario } from "@/lib/i18n";

const t = getDiccionario();

export function VideoSection() {
  return (
    <section
      id="video"
      aria-labelledby="video-titulo"
      className="relative overflow-hidden bg-noche py-20 sm:py-28"
    >
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
        {/* Sin max-w: el video ocupa todo el ancho del contenedor (hasta
            1200px) para que domine la pantalla al llegar al home. */}
        <div className="mx-auto mt-10 max-w-5xl">
          <VideoPresentacion etiquetaReproducir={t.video.reproducir} />
        </div>
      </div>
    </section>
  );
}
