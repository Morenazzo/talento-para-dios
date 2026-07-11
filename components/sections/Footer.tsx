import { Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { getDiccionario } from "@/lib/i18n";
import { evento } from "@/config/evento";

const t = getDiccionario();

export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-noche py-12">
      <div className="container flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <Logo className="h-12 w-12" title="" />
          <p className="font-sans text-lg font-bold tracking-tight text-dorado">
            {evento.nombre}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-marfil-suave">
          <p>
            {evento.fechaTexto} · {evento.horaTexto}
          </p>
          <p>
            {evento.lugar} · {evento.ciudad}
          </p>
        </div>

        <div>
          <h2 className="sr-only">{t.footer.contacto}</h2>
          <ul className="flex items-center gap-5">
            <li>
              <a
                href={`mailto:${evento.contacto.correo}`}
                aria-label="Escríbenos por correo"
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Mail aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.instagram}
                aria-label="Instagram de Talento para Dios (enlace por definir)"
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Instagram aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.youtube}
                aria-label="YouTube de Talento para Dios (enlace por definir)"
                className="text-marfil-suave transition-colors hover:text-dorado-claro"
              >
                <Youtube aria-hidden className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={evento.contacto.facebook}
                aria-label="Facebook de Talento para Dios (enlace por definir)"
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
