import type { MetadataRoute } from "next";
import { evento } from "@/config/evento";

const SITIO = evento.sitio;

/** Cada página en sus dos idiomas, declarándose como equivalentes entre sí. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/aplica"];

  return paginas.flatMap((pagina) => {
    const es = `${SITIO}${pagina || "/"}`;
    const en = `${SITIO}/en${pagina}`;
    const alternates = { languages: { es, en } };
    return [
      { url: es, alternates },
      { url: en, alternates },
    ];
  });
}
