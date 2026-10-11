"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { BotonContacto } from "@/components/BotonContacto";
import { ruta, type Diccionario, type Locale } from "@/lib/i18n";
import { evento } from "@/config/evento";
import { cn } from "@/lib/utils";

interface NavbarProps {
  lang: Locale;
  /** Solo las etiquetas del menú: no se manda el diccionario entero al navegador. */
  t: Diccionario["nav"];
  a11y: Diccionario["a11y"];
  asuntoContacto: string;
  /** Misma página en el otro idioma. */
  cambioIdioma: Record<Locale, string>;
}

/**
 * Selector ES | EN. Son enlaces normales (no botones con JavaScript): al
 * pulsarlos, el servidor guarda la preferencia en una cookie y la próxima
 * visita ya entra en ese idioma, sin importar el país.
 */
function SelectorIdioma({
  lang,
  hrefs,
  etiqueta,
}: {
  lang: Locale;
  hrefs: Record<Locale, string>;
  etiqueta: string;
}) {
  return (
    <div
      role="group"
      aria-label={etiqueta}
      className="flex items-center rounded-full border border-dorado/30 p-0.5 text-xs font-semibold"
    >
      {(["es", "en"] as const).map((l) => (
        <a
          key={l}
          href={hrefs[l]}
          hrefLang={l}
          lang={l}
          aria-current={lang === l ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            lang === l
              ? "bg-dorado text-noche"
              : "text-marfil-suave hover:text-dorado-claro"
          )}
        >
          {l}
        </a>
      ))}
    </div>
  );
}

export function Navbar({
  lang,
  t,
  a11y,
  asuntoContacto,
  cambioIdioma,
}: NavbarProps) {
  const [abierto, setAbierto] = useState(false);
  const inicio = ruta(lang, "/");

  const enlaces = [
    { href: `${inicio}#por-que`, label: t.porQue },
    { href: `${inicio}#evento`, label: t.evento },
    { href: `${inicio}#galeria`, label: t.galeria },
    { href: `${inicio}#artistas`, label: t.cartelera },
    { href: `${inicio}#adopcion`, label: t.adopcion },
    { href: `${inicio}#transparencia`, label: t.transparencia },
    { href: ruta(lang, "/aplica"), label: t.artistas },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noche/80 backdrop-blur-md">
      <nav
        aria-label={a11y.navPrincipal}
        className="container flex h-16 items-center justify-between"
      >
        <Link
          href={`${inicio}#inicio`}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-sm font-bold uppercase tracking-[0.08em] text-dorado sm:gap-2.5 sm:text-base"
        >
          <Logo className="h-9 w-9 sm:h-11 sm:w-11" title="" sizes="44px" />
          {/* En pantallas muy angostas el emblema ya trae el nombre: el texto queda solo para lectores */}
          <span className="max-[399px]:sr-only">{evento.nombre}</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                className="text-sm text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                {e.label}
              </a>
            </li>
          ))}
          <li>
            <SelectorIdioma
              lang={lang}
              hrefs={cambioIdioma}
              etiqueta={a11y.idioma}
            />
          </li>
          <li>
            <BotonContacto
              asunto={asuntoContacto}
              className={cn(buttonVariants({ size: "sm" }))}
            >
              {t.cta}
            </BotonContacto>
          </li>
        </ul>

        <div className="flex items-center gap-3 lg:hidden">
          <SelectorIdioma
            lang={lang}
            hrefs={cambioIdioma}
            etiqueta={a11y.idioma}
          />
          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? a11y.cerrarMenu : a11y.abrirMenu}
            onClick={() => setAbierto((v) => !v)}
            className="rounded-md p-2 text-marfil"
          >
            {abierto ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </nav>

      {abierto && (
        <ul
          id="menu-movil"
          className="container flex flex-col gap-1 border-t border-white/5 pb-4 pt-2 lg:hidden"
        >
          {enlaces.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                onClick={() => setAbierto(false)}
                className="block rounded-lg px-3 py-2.5 text-marfil-suave hover:bg-white/5 hover:text-dorado-claro"
              >
                {e.label}
              </a>
            </li>
          ))}
          <li className="px-3 pt-2">
            <BotonContacto
              asunto={asuntoContacto}
              onClick={() => setAbierto(false)}
              className="block w-full rounded-full bg-dorado px-6 py-2.5 text-center text-sm font-semibold text-noche"
            >
              {t.cta}
            </BotonContacto>
          </li>
        </ul>
      )}
    </header>
  );
}
