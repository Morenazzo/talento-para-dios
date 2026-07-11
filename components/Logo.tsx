import { cn } from "@/lib/utils";

/**
 * Isotipo oficial de Talento para Dios: micrófono vintage dorado de
 * tablillas con una cruz en el cuerpo, horquilla en U, pie y base.
 * Vectorial para nitidez en cualquier tamaño.
 */
export function Logo({
  className,
  title = "Talento para Dios",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("h-10 w-10", className)}
    >
      <defs>
        {/* userSpaceOnUse: los gradientes objectBoundingBox no pintan en
            líneas (bounding box de ancho cero). */}
        <linearGradient
          id="oro"
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="6"
          x2="60"
          y2="112"
        >
          <stop offset="0%" stopColor="#F5D87A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8952E" />
        </linearGradient>
      </defs>

      {/* Cápsula: domo superior */}
      <path d="M43 22 a17 17 0 0 1 34 0 v3 h-34 z" fill="url(#oro)" />
      {/* Tablillas horizontales */}
      <rect x="43" y="28" width="34" height="5" rx="2.5" fill="url(#oro)" />
      <rect x="43" y="36" width="34" height="5" rx="2.5" fill="url(#oro)" />
      <rect x="43" y="44" width="34" height="5" rx="2.5" fill="url(#oro)" />
      {/* Cuerpo inferior con cruz en negativo */}
      <path
        d="M43 52 h34 v10 a17 17 0 0 1 -34 0 z"
        fill="url(#oro)"
      />
      <g fill="#0A0A0A">
        <rect x="57.5" y="53.5" width="5" height="21" rx="2" />
        <rect x="50" y="58.5" width="20" height="5" rx="2" />
      </g>

      {/* Horquilla en U */}
      <path
        d="M34 38 v22 a26 26 0 0 0 52 0 v-22"
        fill="none"
        stroke="url(#oro)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Pie y base */}
      <line
        x1="60"
        y1="86"
        x2="60"
        y2="102"
        stroke="url(#oro)"
        strokeWidth="5.5"
      />
      <rect x="38" y="102" width="44" height="6.5" rx="3" fill="url(#oro)" />
    </svg>
  );
}
