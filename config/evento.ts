/**
 * ÚNICA FUENTE DE VERDAD del evento.
 * Edita aquí precios, fecha, lugar y cifras — sin tocar componentes.
 *
 * ⚠️ Los montos y cifras marcados como PLACEHOLDER son valores ancla:
 * el cliente definirá los finales antes de publicar.
 */

export type TipoBoleto =
  | "general"
  | "fan-vip"
  | "aliado"
  | "productor"
  | "iglesias";

export interface Boleto {
  id: TipoBoleto;
  nombre: string;
  /** Precio de preventa en MXN. PLACEHOLDER — precio ancla, no final. */
  precioPreventa: number;
  /** Precio normal (en puerta) en MXN. PLACEHOLDER — precio ancla, no final.
   *  `null` cuando el paquete se cotiza por rango (ej. patrocinadores). */
  precioNormal: number | null;
  /** Rango de precio para paquetes cotizados (ej. "PLACEHOLDER $15,000–$25,000"). */
  rangoPrecio?: string;
  descripcion: string;
  beneficios: string[];
  /** Marca el boleto normal / "Más popular" — objetivo del CTA principal. */
  destacado: boolean;
  /** Etiqueta del badge cuando destacado o especial. */
  badge?: string;
  /** Los paquetes de patrocinio no se compran en línea: van a contacto. */
  esPatrocinio?: boolean;
}

export const evento = {
  nombre: "Talento para Dios",
  tituloHero: "El Sonido de una Nueva Generación",
  /** Fecha verificada del Concierto de Adoración. */
  fecha: "2026-09-27T18:00:00-06:00",
  fechaTexto: "Domingo 27 de septiembre de 2026",
  horaTexto: "6:00 PM",
  lugar: "Hacienda Paz",
  ciudad: "Puebla, México",
  versiculo: {
    cita: "Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios.",
    referencia: "1 Pedro 4:10",
  },
  contacto: {
    /** PLACEHOLDER — correo de contacto oficial */
    correo: "[PLACEHOLDER: correo@talentoparadios.mx]",
    /** PLACEHOLDER — teléfono/WhatsApp oficial */
    telefono: "[PLACEHOLDER: WhatsApp]",
    /** PLACEHOLDER — redes sociales oficiales */
    instagram: "#",
    youtube: "#",
    facebook: "#",
  },
} as const;

/**
 * Cifras de la sección "Por qué lo hacemos".
 * Fuentes confirmadas por el cliente (jul 2026).
 */
export const cifrasMision = {
  noAlcanzados: {
    texto: "1 de cada 4 personas en el mundo aún no ha conocido las buenas nuevas de Jesucristo",
    fuente: "Fuente: Haggai Internacional",
    verificada: true,
  },
  alcanceMusica: {
    predicaReproducciones: 2_000_000,
    predicaTexto: "~2 millones de reproducciones alcanza una prédica destacada",
    cancionReproducciones: 951_000_000,
    cancionTexto: "+951 millones de reproducciones supera una sola canción cristiana en español",
    fuente: "Fuente: YouTube",
    verificada: true,
  },
} as const;

/**
 * Nota legal (redacción precisa — no modificar sin revisión):
 * los boletos son PREVENTA de entrada a un evento, NO donativos.
 */
export const notaLegal =
  "Tu boleto es una preventa de entrada al evento, no un donativo. La preventa financia la producción del concierto; el excedente sobre la meta se destina al Fondo de Impulso al Talento.";

export const boletos: Boleto[] = [
  {
    id: "general",
    nombre: "Boleto General (Preventa)",
    precioPreventa: 350, // PLACEHOLDER — precio ancla
    precioNormal: 500, // PLACEHOLDER — precio ancla
    descripcion: "El boleto normal para vivir el Concierto de Adoración.",
    beneficios: ["Acceso general al concierto"],
    destacado: true,
    badge: "Más popular · Boleto normal",
  },
  {
    id: "fan-vip",
    nombre: "Fan VIP",
    precioPreventa: 500, // PLACEHOLDER — precio ancla
    precioNormal: 700, // PLACEHOLDER — precio ancla
    descripcion: "Vive el evento más de cerca y llévate un recuerdo digital.",
    beneficios: [
      "Acceso al concierto",
      "Newsletter exclusiva del proceso",
      "Certificado digital de aliado fundador",
      "Contenido detrás de cámaras",
    ],
    destacado: false,
  },
  {
    id: "aliado",
    nombre: "Aliado del Show",
    precioPreventa: 1500, // PLACEHOLDER — precio ancla
    precioNormal: 2000, // PLACEHOLDER — precio ancla
    descripcion: "Para quienes quieren respaldar la noche con lugar preferente.",
    beneficios: [
      "Asiento VIP",
      "Kit de merch oficial (playera + gorra)",
      "Acceso a las grabaciones del evento",
    ],
    destacado: false,
  },
  {
    id: "productor",
    nombre: "Productor Asociado / Patrocinador",
    precioPreventa: 15000, // PLACEHOLDER — inicio del rango
    precioNormal: null,
    rangoPrecio: "$15,000 – $25,000 MXN", // PLACEHOLDER — rango ancla
    descripcion:
      "Para líderes y empresarios que quieren estar dentro de la historia.",
    beneficios: [
      "Acceso backstage",
      "Mención en los créditos del evento",
      "Participación en las dinámicas de adopción",
    ],
    destacado: false,
    badge: "Para aliados",
    esPatrocinio: true,
  },
  {
    id: "iglesias",
    nombre: "Paquete Iglesias",
    precioPreventa: 4900, // PLACEHOLDER — 20 boletos con ~30% desc. sobre preventa general
    precioNormal: 7000, // PLACEHOLDER — 20 × precio preventa general
    descripcion: "20 boletos para tu congregación con ~30% de descuento.",
    beneficios: [
      "20 boletos de acceso general",
      "~30% de descuento sobre preventa",
      "Un solo pago para toda tu congregación",
    ],
    destacado: false,
    badge: "Para congregaciones",
  },
];
