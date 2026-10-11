import type { AnchorHTMLAttributes } from "react";
import { evento } from "@/config/evento";

interface BotonContactoProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Asunto con el que se abre el correo (ya traducido). */
  asunto: string;
}

/**
 * Único punto de contacto del sitio: abre el correo del proyecto con un
 * asunto ya escrito. Sustituye al antiguo botón de compra de boletos.
 */
export function BotonContacto({
  asunto,
  className,
  children,
  ...props
}: BotonContactoProps) {
  return (
    <a
      href={`mailto:${evento.contacto.correo}?subject=${encodeURIComponent(asunto)}`}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
