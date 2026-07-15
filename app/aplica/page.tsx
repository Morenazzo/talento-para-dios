import type { Metadata } from "next";
import { Check, Youtube, Video } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Logo } from "@/components/Logo";
import { FormularioAplicacion } from "@/components/aplica/FormularioAplicacion";
import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";

const t = getDiccionario();

export const metadata: Metadata = {
  title: `Aplica con tu proyecto — ${evento.nombre}`,
  description:
    "Convocatoria para solistas, bandas y ministerios musicales cristianos con música 100% original. Pasarela de adoración y adopción — no es un concurso.",
};

export default function AplicaPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Encabezado */}
        <section
          aria-labelledby="aplica-titulo"
          className="relative overflow-hidden bg-noche pb-16 pt-32 sm:pt-40"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-hero" />
          <div className="container relative z-10 flex max-w-3xl flex-col items-center text-center">
            <Logo className="h-20 w-20" />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-dorado">
              {t.aplica.kicker}
            </p>
            <h1
              id="aplica-titulo"
              className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-5xl"
            >
              {t.aplica.titulo}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
              {t.aplica.intro}
            </p>
          </div>
        </section>

        {/* Vías de ingreso */}
        <section
          aria-labelledby="vias-titulo"
          className="relative overflow-hidden bg-noche-medianoche/30 py-16 sm:py-20"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
          <div className="container relative z-10 max-w-4xl">
            <h2
              id="vias-titulo"
              className="font-display text-2xl font-bold text-marfil sm:text-3xl"
            >
              {t.aplica.vias.titulo}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-noche-borde bg-noche-panel p-6">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dorado/30 bg-dorado/10"
                >
                  <Youtube className="h-5 w-5 text-dorado" />
                </span>
                <h3 className="mt-4 font-semibold text-marfil">
                  {t.aplica.vias.invitacion.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-marfil-suave">
                  {t.aplica.vias.invitacion.texto}
                </p>
              </div>
              <div className="rounded-2xl border border-noche-borde bg-noche-panel p-6">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-dorado/30 bg-dorado/10"
                >
                  <Video className="h-5 w-5 text-dorado" />
                </span>
                <h3 className="mt-4 font-semibold text-marfil">
                  {t.aplica.vias.abierta.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-marfil-suave">
                  {t.aplica.vias.abierta.texto}
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm italic text-marfil-suave">
              {t.aplica.vias.nota}
            </p>

            {/* Requisitos */}
            <div className="mt-12 rounded-2xl border border-dorado/20 bg-noche p-8">
              <h2 className="font-display text-xl font-bold text-marfil sm:text-2xl">
                {t.aplica.requisitos.titulo}
              </h2>
              <ul className="mt-5 space-y-3">
                {t.aplica.requisitos.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-dorado" />
                    <span className="text-marfil-suave">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-marfil-suave/80">
                {t.aplica.requisitos.notaIA}
              </p>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section
          aria-labelledby="formulario-titulo"
          className="relative overflow-hidden bg-noche py-16 sm:py-20"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-hero opacity-60" />
          <div className="container relative z-10 max-w-3xl">
            <h2
              id="formulario-titulo"
              className="font-display text-2xl font-bold text-marfil sm:text-3xl"
            >
              {t.aplica.formulario.titulo}
            </h2>
            <div className="mt-8">
              <FormularioAplicacion />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-titulo"
          className="relative overflow-hidden bg-noche-medianoche/20 py-16 sm:py-20"
        >
          <div aria-hidden className="absolute inset-0 bg-destello-dorado" />
          <div className="container relative z-10 max-w-3xl">
            <h2
              id="faq-titulo"
              className="font-display text-2xl font-bold text-marfil sm:text-3xl"
            >
              {t.aplica.faq.titulo}
            </h2>
            <div className="mt-8 space-y-3">
              {t.aplica.faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-noche-borde bg-noche-panel"
                >
                  <summary className="cursor-pointer list-none rounded-xl p-5 text-sm font-semibold text-marfil transition-colors hover:text-dorado-claro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span
                        aria-hidden
                        className="text-dorado transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-marfil-suave">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
