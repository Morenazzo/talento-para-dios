import { cn } from "@/lib/utils";

/**
 * Isotipo de Talento para Dios, alineado a la presentación oficial:
 * micrófono dorado vintage dentro de un halo radiante, con una cruz
 * luminosa en la base. Vectorial para nitidez en cualquier tamaño.
 */
export function Logo({
  className,
  title = "Talento para Dios",
}: {
  className?: string;
  title?: string;
}) {
  const rayos = Array.from({ length: 24 }, (_, i) => i * 15);

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
          y1="0"
          x2="60"
          y2="120"
        >
          <stop offset="0%" stopColor="#F5D87A" />
          <stop offset="55%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C09B30" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#F5D87A" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Resplandor de fondo */}
      <circle cx="60" cy="50" r="46" fill="url(#halo)" />

      {/* Rayos del halo */}
      <g stroke="url(#oro)" strokeWidth="1.6" strokeLinecap="round">
        {rayos.map((a) => (
          <line
            key={a}
            x1="60"
            y1="14"
            x2="60"
            y2={a % 45 === 0 ? "7" : "10"}
            transform={`rotate(${a} 60 50)`}
          />
        ))}
      </g>

      {/* Anillo del halo */}
      <circle
        cx="60"
        cy="50"
        r="30"
        fill="none"
        stroke="url(#oro)"
        strokeWidth="2.4"
      />

      {/* Micrófono vintage */}
      <rect x="51" y="31" width="18" height="26" rx="9" fill="url(#oro)" />
      <g stroke="#0A0A0A" strokeWidth="1.4" opacity="0.5">
        <line x1="53" y1="38" x2="67" y2="38" />
        <line x1="52" y1="43" x2="68" y2="43" />
        <line x1="53" y1="48" x2="67" y2="48" />
      </g>
      {/* Base del micrófono */}
      <path
        d="M48 46 a12 12 0 0 0 24 0"
        fill="none"
        stroke="url(#oro)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="58"
        x2="60"
        y2="65"
        stroke="url(#oro)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Cruz luminosa en la base */}
      <g stroke="url(#oro)" strokeWidth="3.4" strokeLinecap="round">
        <line x1="60" y1="88" x2="60" y2="112" />
        <line x1="51" y1="96" x2="69" y2="96" />
      </g>
      <circle cx="60" cy="96" r="11" fill="url(#halo)" />
    </svg>
  );
}
