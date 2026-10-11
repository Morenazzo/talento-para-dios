import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Emblema oficial de Talento para Dios (micrófono dorado, texto y cruz dentro
 * del aro). El archivo ya viene recortado en círculo y con transparencia, así
 * que se funde con cualquier fondo oscuro.
 *
 * `title=""` lo marca como decorativo (cuando el nombre ya está escrito al lado).
 * `sizes` debe describir el tamaño real en pantalla: sin él, el navegador
 * descargaría la versión de 1000 px para un logo de 40.
 */
export function Logo({
  className,
  title = "Talento para Dios",
  sizes = "64px",
  priority = false,
}: {
  className?: string;
  title?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-talento-para-dios.webp"
      alt={title}
      width={1024}
      height={1024}
      sizes={sizes}
      priority={priority}
      className={cn("h-10 w-10 shrink-0", className)}
    />
  );
}
