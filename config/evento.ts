/**
 * ÚNICA FUENTE DE VERDAD del evento.
 * Edita aquí fecha, lugar, artistas, fotos y cifras — sin tocar componentes.
 *
 * El festival se realizó el 27 de septiembre de 2026: el sitio funciona como
 * recap. La venta de boletos (Eventbrite) y la cuenta regresiva se retiraron;
 * el historial de git conserva esas versiones.
 */

/**
 * Convocatoria para artistas (/aplica y /api/aplicaciones).
 * `false` = cerrada: la página muestra cómo conectar por correo y la API
 * rechaza envíos. Para reabrirla en una próxima edición, cámbialo a `true`
 * y actualiza las fechas del formulario en `lib/i18n`.
 */
export const convocatoriaAbierta = false;

export interface Artista {
  /** Clave para buscar sus textos en `lib/i18n` (artistas.detalle). */
  id: string;
  /** Nombre con el que se presentó el artista (no se traduce). */
  nombre: string;
  /** Proyecto o agrupación a la que pertenece. Vacío si es solista. */
  proyecto?: string;
  /** Foto del propio evento, en `public/img/recap/artistas/`. */
  imagen: string;
}

/**
 * Los diez proyectos que se presentaron, en orden de aparición.
 * Las fotos son del propio festival (Hacienda Paz, 27 sep 2026).
 */
export const artistas: Artista[] = [
  {
    id: "manzo",
    nombre: "Manzo",
    imagen: "/img/recap/artistas/manzo.jpg",
  },
  {
    id: "cheo",
    nombre: "Cheo Bustamante",
    imagen: "/img/recap/artistas/cheo-bustamante.jpg",
  },
  {
    id: "omar",
    nombre: "Omar Vigil",
    imagen: "/img/recap/artistas/omar-vigil.jpg",
  },
  {
    id: "shejina",
    nombre: "Shejiná",
    imagen: "/img/recap/artistas/shejina.jpg",
  },
  {
    id: "juan",
    nombre: "Juan Poumian",
    imagen: "/img/recap/artistas/juan-poumian.jpg",
  },
  {
    id: "dfive",
    nombre: "Dfive",
    imagen: "/img/recap/artistas/dfive.jpg",
  },
  {
    id: "twog",
    nombre: "TWOG",
    imagen: "/img/recap/artistas/twog.jpg",
  },
  {
    id: "jesus",
    nombre: "Jesús Espinoza",
    imagen: "/img/recap/artistas/jesus-espinoza.jpg",
  },
  {
    id: "tony",
    nombre: "Tony Rosher y Dos de Fe",
    imagen: "/img/recap/artistas/tony-rosher.jpg",
  },
  {
    id: "songfield",
    nombre: "Aldo y María Teomitzi",
    proyecto: "Songfield",
    imagen: "/img/recap/artistas/songfield.jpg",
  },
];

export interface FotoGaleria {
  src: string;
  /** Dimensiones reales: permiten que la cuadrícula reserve el espacio sin saltos. */
  ancho: number;
  alto: number;
}

/** Los textos de cada foto (alt y pie) están en `lib/i18n`, en el mismo orden. */
export const galeria: FotoGaleria[] = [
  { src: "/img/recap/galeria/cierre-escenario.jpg", ancho: 1800, alto: 1012 },
  { src: "/img/recap/galeria/songfield-duo.jpg", ancho: 1400, alto: 2100 },
  { src: "/img/recap/galeria/manos-al-cielo.jpg", ancho: 1800, alto: 1200 },
  { src: "/img/recap/galeria/conductores.jpg", ancho: 1600, alto: 900 },
  { src: "/img/recap/galeria/adoracion.jpg", ancho: 1400, alto: 2100 },
  { src: "/img/recap/galeria/cantando-juntos.jpg", ancho: 1600, alto: 1067 },
  { src: "/img/recap/galeria/dfive-voz.jpg", ancho: 1400, alto: 788 },
  { src: "/img/recap/galeria/brazo-con-brazo.jpg", ancho: 1600, alto: 1067 },
  { src: "/img/recap/galeria/anfitriona.jpg", ancho: 1800, alto: 1200 },
];

export const evento = {
  nombre: "Talento para Dios",
  /** Dominio principal (el apex talentoparadios.com redirige aquí). */
  sitio: "https://www.talentoparadios.com",
  /** Fecha del Festival de Música Cristiana (ya realizado). */
  fecha: "2026-09-27T18:30:00-06:00",
  fechaTexto: "Domingo 27 de septiembre de 2026",
  horaTexto: "6:30 PM",
  lugar: "Hacienda Paz",
  /** Video de presentación del evento (YouTube). */
  video: { id: "OVgEkmA2_Sk" },
  /** Video recap del festival (archivo propio en `public/video/`, 77 s, 1024x576). */
  videoRecap: {
    src: "/video/recap-festival.mp4",
    poster: "/img/recap/video-recap-poster.jpg",
    subidoEl: "2026-10-07",
    duracionISO: "PT1M17S",
  },
  contacto: {
    /** Correo de contacto del evento. */
    correo: "somostalentoparadios@gmail.com",
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
    verificada: true,
  },
  alcanceMusica: {
    predicaReproducciones: 2_000_000,
    predicaTexto: "~2 millones de reproducciones alcanza una prédica destacada",
    cancionReproducciones: 951_000_000,
    cancionTexto: "+951 millones de reproducciones supera una sola canción cristiana en español",
    verificada: true,
  },
} as const;
