import { getDiccionario, type Locale } from "@/lib/i18n";


/**
 * Declaración de propósito: lo primero que se lee después de la portada.
 * Una sola idea, en letra grande, con las palabras clave en dorado.
 */
export function PropositoSection({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  return (
    <section
      id="proposito"
      aria-labelledby="proposito-titulo"
      className="relative overflow-hidden bg-noche-carbon py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
      <div aria-hidden className="textura-destellos absolute inset-0 opacity-70" />
      <div aria-hidden className="onda-sonido absolute inset-x-0 top-10 h-8 opacity-25" />

      <div className="container relative z-10 flex max-w-5xl flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado sm:text-sm">
          {t.proposito.kicker}
        </p>

        <h2
          id="proposito-titulo"
          className="mt-8 font-display text-4xl font-bold leading-[1.15] text-marfil sm:text-5xl lg:text-6xl"
        >
          {t.proposito.inicio}
          <span className="text-dorado-claro">{t.proposito.destacado}</span>
          {t.proposito.final}
        </h2>

        <div aria-hidden className="linea-dorada mt-10 w-24" />

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-marfil-suave sm:text-lg">
          {t.proposito.apoyo}
        </p>

        {/* Los tres pilares de marca */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.3em] text-dorado sm:text-sm">
          {t.proposito.valores.map((valor, i) => (
            <li key={valor} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-dorado" />}
              {valor}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
