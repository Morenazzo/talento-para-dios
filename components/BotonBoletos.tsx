import type { AnchorHTMLAttributes } from "react";
import { evento } from "@/config/evento";

interface BotonBoletosProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

/**
 * Único punto de compra del sitio: enlace directo a la página de Eventbrite
 * del evento (`evento.urlBoletos`). Se abre en una pestaña nueva para no
 * perder la landing.
 *
 * Todos los CTA de compra (Hero, Navbar, sección de boletos, CTA final)
 * usan este componente — así el enlace vive en un solo lugar.
 */
export function BotonBoletos({
  className,
  children,
  ...props
}: BotonBoletosProps) {
  return (
    <a
      href={evento.urlBoletos}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
