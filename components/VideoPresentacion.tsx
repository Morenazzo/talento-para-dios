"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { evento } from "@/config/evento";

/**
 * Reproductor con carátula: hasta que alguien pulsa Reproducir solo se carga
 * una imagen local. El iframe de YouTube —que arrastra cientos de KB de
 * scripts y cookies— se monta apenas al primer clic.
 */
export function VideoPresentacion({ etiquetaReproducir }: { etiquetaReproducir: string }) {
  const [reproduciendo, setReproduciendo] = useState(false);

  if (reproduciendo) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-dorado/30 bg-noche">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${evento.video.id}?autoplay=1&rel=0`}
          title={evento.video.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setReproduciendo(true)}
      aria-label={etiquetaReproducir}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-dorado/30 shadow-[0_0_64px_rgba(212,175,55,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dorado"
    >
      <Image
        src="/img/video-presentacion.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 1100px, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-noche/40 transition-colors group-hover:bg-noche/25"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-dorado shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110 sm:h-20 sm:w-20"
      >
        <Play className="ml-1 h-7 w-7 fill-noche text-noche sm:h-9 sm:w-9" />
      </span>
    </button>
  );
}
