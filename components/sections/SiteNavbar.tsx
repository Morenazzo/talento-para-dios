import { Navbar } from "@/components/sections/Navbar";
import { getDiccionario, type Locale } from "@/lib/i18n";

/**
 * Prepara lo que la barra necesita para un idioma y una página.
 * `camino` es la página actual sin idioma ("" = inicio, "/aplica"): sirve para
 * que el selector lleve a la misma página en el otro idioma.
 */
export function SiteNavbar({
  lang,
  camino = "",
}: {
  lang: Locale;
  camino?: string;
}) {
  const t = getDiccionario(lang);

  return (
    <Navbar
      lang={lang}
      t={t.nav}
      a11y={t.a11y}
      asuntoContacto={t.correo.asuntoApoyo}
      cambioIdioma={{ es: `/es${camino}`, en: `/en${camino}` }}
    />
  );
}
