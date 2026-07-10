import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  /** Descripción accesible de la imagen que ocupará este espacio. */
  alt: string;
  /** Nota interna del asset sugerido (visible en el placeholder). */
  sugerencia: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Placeholder de imagen con dimensiones fijas y alt text.
 * Sustituir por <Image> de next/image cuando existan los assets reales.
 */
export function ImagePlaceholder({
  alt,
  sugerencia,
  width,
  height,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-dorado/30 bg-noche-carbon text-center",
        className
      )}
    >
      <ImageIcon aria-hidden className="h-8 w-8 text-dorado/50" />
      <p className="max-w-xs px-4 text-xs leading-relaxed text-marfil-suave">
        [PLACEHOLDER IMAGEN {width}×{height}] {sugerencia}
      </p>
    </div>
  );
}
