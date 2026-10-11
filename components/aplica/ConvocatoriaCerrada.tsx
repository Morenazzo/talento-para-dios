import { Mic2, HeartHandshake, Users, Mail } from "lucide-react";
import { SiteNavbar } from "@/components/sections/SiteNavbar";
import { Footer } from "@/components/sections/Footer";
import { Logo } from "@/components/Logo";
import { getDiccionario, type Locale } from "@/lib/i18n";
import { evento } from "@/config/evento";


const iconos = [Mic2, HeartHandshake, Users];

/** Un correo con asunto y plantilla ya escritos: quien escribe solo completa. */
function mailto(asunto: string, cuerpo: string) {
  return `mailto:${evento.contacto.correo}?subject=${encodeURIComponent(
    asunto
  )}&body=${encodeURIComponent(cuerpo)}`;
}

/**
 * /aplica con la convocatoria cerrada: no hay formulario, pero quien llegue
 * (por un enlace viejo, por Google o por el menú) tiene tres formas claras
 * de conectar.
 */
export function ConvocatoriaCerrada({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);

  return (
    <>
      <SiteNavbar lang={lang} camino="/aplica" />
      <main>
        <section
          aria-labelledby="conecta-titulo"
          className="relative overflow-hidden bg-noche pb-12 pt-32 sm:pt-40"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-hero" />
          <div className="container relative z-10 flex max-w-3xl flex-col items-center text-center">
            <Logo className="h-20 w-20" />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-dorado">
              {t.conecta.kicker}
            </p>
            <h1
              id="conecta-titulo"
              className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-5xl"
            >
              {t.conecta.titulo}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
              {t.conecta.intro}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="conecta-opciones"
          className="relative overflow-hidden bg-noche-medianoche/30 pb-24 pt-12 sm:pb-28"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
          <div className="container relative z-10 max-w-5xl">
            <h2
              id="conecta-opciones"
              className="text-center font-display text-2xl font-bold text-marfil sm:text-3xl"
            >
              {t.conecta.opcionesTitulo}
            </h2>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {t.conecta.opciones.map((op, i) => {
                const Icono = iconos[i % iconos.length];
                return (
                  <li
                    key={op.titulo}
                    className="flex flex-col rounded-2xl border border-noche-borde bg-noche-panel p-6"
                  >
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-dorado/30 bg-dorado/10"
                    >
                      <Icono className="h-5 w-5 text-dorado" />
                    </span>
                    <h3 className="mt-4 font-semibold text-marfil">{op.titulo}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-marfil-suave">
                      {op.texto}
                    </p>
                    <a
                      href={mailto(op.asunto, op.cuerpo)}
                      className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-dorado px-6 py-2.5 text-center text-sm font-semibold text-noche shadow-[0_0_24px_rgba(212,175,55,0.25)] transition-all hover:bg-dorado-claro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
                    >
                      {op.cta}
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-marfil-suave">
              <Mail aria-hidden className="h-4 w-4 text-dorado" />
              <span>{t.conecta.correoNota}</span>
              <a
                href={`mailto:${evento.contacto.correo}`}
                className="font-medium text-dorado-claro underline-offset-4 hover:underline"
              >
                {evento.contacto.correo}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
