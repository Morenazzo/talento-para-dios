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

export interface Artista {
  /** Nombre con el que se anuncia al artista en cartelera. */
  nombre: string;
  /** Proyecto o agrupación a la que pertenece. Vacío si es solista. */
  proyecto?: string;
  /** Canción o álbum con el que se le identifica. */
  cancion: string;
  /**
   * Foto en `public/img/artistas/`.
   * Si falta el archivo, la tarjeta muestra un marcador con la inicial
   * en lugar de una imagen rota.
   */
  imagen?: string;
  /** Texto alternativo de la foto (accesibilidad + SEO). */
  alt?: string;
  /** Dato de respaldo que se muestra como sello en la tarjeta. */
  dato?: string;
}

/**
 * Cartelera del festival — orden de aparición en el home.
 * Las fotos se guardan en `public/img/artistas/` con el nombre indicado.
 */
export const artistas: Artista[] = [
  {
    nombre: "Aldo y María Teomitzi",
    proyecto: "Songfield",
    cancion: "Tú me Redimes",
    imagen: "/img/artistas/songfield.jpeg",
    alt: "Portada de «Tú me Redimes»: Aldo y María Teomitzi, del proyecto Songfield, tocando guitarra acústica",
  },
  {
    nombre: "Tony Rosher",
    cancion: "Para dedicarme a ti",
    dato: "2 veces participante de La Voz México",
    imagen: "/img/artistas/tony-rosher.jpg",
    alt: "Portada del álbum «Para dedicarme a ti» de Tony Rosher",
  },
  {
    nombre: "Dfive",
    cancion: "Unidos a ti",
    imagen: "/img/artistas/dfive.jpeg",
    alt: "Portada de «Unidos a ti»: los cinco integrantes de Dfive",
  },
];

export const evento = {
  nombre: "Talento para Dios",
  tituloHero: "El Sonido de una Nueva Generación",
  /**
   * Venta de boletos: TODA la compra ocurre en Eventbrite.
   * Único lugar donde vive el enlace — si cambia el evento, se cambia aquí.
   */
  urlBoletos:
    "https://www.eventbrite.com/e/talento-para-dios-festival-de-musica-cristiana-en-puebla-tickets-1998600284251",
  /** Fecha verificada del Festival de Música Cristiana. */
  fecha: "2026-09-27T18:30:00-06:00",
  fechaTexto: "Domingo 27 de septiembre de 2026",
  horaTexto: "6:30 PM",
  lugar: "Hacienda Paz",
  /** Video de presentación del evento (YouTube). */
  video: {
    id: "OVgEkmA2_Sk",
    titulo: "Presentación Concierto Talento Para Dios Puebla",
  },
  ciudad: "Puebla, México",
  versiculo: {
    cita: "Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios.",
    referencia: "1 Pedro 4:10",
  },
  contacto: {
    /** Correo de contacto del evento. */
    correo: "edwin.seop@gmail.com",
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
  "Tu boleto es una preventa de entrada al evento, no un donativo. La preventa financia la producción del festival; el excedente sobre la meta se destina al Fondo de Impulso al Talento.";

/**
 * Cartelera de boletos = exactamente lo que se vende en Eventbrite.
 * Se dejó un único nivel a propósito: cualquier nivel extra que no exista
 * en Eventbrite manda al comprador a una página donde no puede comprarlo.
 * Para reactivar Fan VIP / Aliado / Iglesias, créalos primero en Eventbrite.
 */
export const boletos: Boleto[] = [
  {
    id: "general",
    nombre: "Boleto General",
    precioPreventa: 324.33, // Precio de preventa en Eventbrite (incluye cargos)
    precioNormal: 450, // Precio en el evento
    descripcion: "Tu entrada al Festival de Música Cristiana.",
    beneficios: [
      "Acceso general al festival",
      "Apertura de puertas 6:00 PM",
      "Estacionamiento sin costo",
    ],
    destacado: true,
    // Sin badge: con un solo nivel no hay nada de qué distinguirlo,
    // y "Preventa" ya aparece sobre el precio.
  },
];
