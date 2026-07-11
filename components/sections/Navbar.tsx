"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";

const t = getDiccionario();

const enlaces = [
  { href: "/#por-que", label: t.nav.porQue },
  { href: "/#evento", label: t.nav.evento },
  { href: "/#adopcion", label: t.nav.adopcion },
  { href: "/#boletos", label: t.nav.boletos },
  { href: "/#transparencia", label: t.nav.transparencia },
  { href: "/aplica", label: t.nav.artistas },
];

export function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noche/80 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="container flex h-16 items-center justify-between"
      >
        <Link
          href="/#inicio"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-wide text-dorado-claro"
        >
          <Logo className="h-9 w-9" title="" />
          {evento.nombre}
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
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
            <a
              href="/#boletos"
              className={buttonVariants({ size: "sm" })}
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
          className="rounded-md p-2 text-marfil md:hidden"
        >
          {abierto ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>

      {abierto && (
        <ul
          id="menu-movil"
          className="container flex flex-col gap-1 border-t border-white/5 pb-4 pt-2 md:hidden"
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
            <a
              href="/#boletos"
              onClick={() => setAbierto(false)}
              className="block rounded-full bg-dorado px-6 py-2.5 text-center text-sm font-semibold text-noche"
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
