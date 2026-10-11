import { Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { getDiccionario, type Locale } from "@/lib/i18n";
import { evento } from "@/config/evento";


export function Footer({ lang }: { lang: Locale }) {
  const t = getDiccionario(lang);
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-noche py-12">
      <div className="container flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <Logo className="h-16 w-16" title="" sizes="64px" />
          <p className="font-sans text-base font-bold uppercase tracking-[0.1em] text-dorado">
            {evento.nombre}
          </p>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-dorado-claro/90">
          {t.footer.lema}
        </p>

        <div className="flex flex-col items-center gap-2 text-sm text-marfil-suave">
          <p>
            {t.evento.fechaRealizado}
          </p>
          <p>
            {evento.lugar} · {t.evento.ciudad}
          </p>
        </div>

        <div>
          <h2 className="sr-only">{t.footer.contacto}</h2>
          <ul className="flex items-center gap-5">
            <li>
              <a
                href={`mailto:${evento.contacto.correo}`}
                aria-label={t.a11y.correo}
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Mail aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.instagram}
                aria-label={t.a11y.instagram}
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Instagram aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.youtube}
                aria-label={t.a11y.youtube}
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Youtube aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.facebook}
                aria-label={t.a11y.facebook}
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Facebook aria-hidden className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>

        <p className="max-w-xl text-xs leading-relaxed text-marfil-suave/70">
          {t.footer.legal}
        </p>

        <p className="text-xs text-marfil-suave/70">
          © {anio} {t.footer.derechos}
        </p>
      </div>
    </footer>
  );
}
