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
  /** Nombre con el que se presentó el artista. */
  nombre: string;
  /** Proyecto o agrupación a la que pertenece. Vacío si es solista. */
  proyecto?: string;
  /** Foto del propio evento, en `public/img/recap/artistas/`. */
  imagen: string;
  /** Texto alternativo de la foto (accesibilidad + SEO). */
  alt: string;
  /** Dato de respaldo que se muestra como sello en la tarjeta. */
  dato?: string;
}

/**
 * Los diez proyectos que se presentaron, en orden de aparición.
 * Las fotos son del propio festival (Hacienda Paz, 27 sep 2026).
 */
export const artistas: Artista[] = [
  {
    nombre: "Manzo",
    imagen: "/img/recap/artistas/manzo.jpg",
    alt: "Manzo en el escenario: una vocalista y un guitarrista frente a la pantalla con el nombre de la banda",
  },
  {
    nombre: "Cheo Bustamante",
    imagen: "/img/recap/artistas/cheo-bustamante.jpg",
    alt: "Cheo Bustamante con su sección de metales, trombón y saxofones, durante su presentación",
  },
  {
    nombre: "Omar Vigil",
    imagen: "/img/recap/artistas/omar-vigil.jpg",
    alt: "Omar Vigil al teclado frente a la pantalla con la letra «Te adoro, gran Señor»",
  },
  {
    nombre: "Shejiná",
    imagen: "/img/recap/artistas/shejina.jpg",
    alt: "Un integrante de Shejiná cantando con los ojos cerrados bajo luces rojas",
  },
  {
    nombre: "Juan Poumian",
    imagen: "/img/recap/artistas/juan-poumian.jpg",
    alt: "Juan Poumian cantando con su guitarra acústica sobre el escenario",
  },
  {
    nombre: "Dfive",
    imagen: "/img/recap/artistas/dfive.jpg",
    alt: "Dos vocalistas de Dfive cantando frente a una pantalla de luces",
  },
  {
    nombre: "TWOG",
    imagen: "/img/recap/artistas/twog.jpg",
    alt: "Un guitarrista de TWOG con las manos al cielo junto a su vocalista",
  },
  {
    nombre: "Jesús Espinoza",
    imagen: "/img/recap/artistas/jesus-espinoza.jpg",
    alt: "Jesús Espinoza cantando con guitarra junto a un saxofonista, bajo el logotipo JE",
  },
  {
    nombre: "Tony Rosher y Dos de Fe",
    dato: "2 veces participante de La Voz México",
    imagen: "/img/recap/artistas/tony-rosher.jpg",
    alt: "Tony Rosher cantando con el brazo levantado bajo luces moradas",
  },
  {
    nombre: "Aldo y María Teomitzi",
    proyecto: "Songfield",
    imagen: "/img/recap/artistas/songfield.jpg",
    alt: "María Teomitzi cantando junto a Aldo, de Songfield, con su bajo en el escenario",
  },
];

export interface FotoGaleria {
  src: string;
  /** Dimensiones reales: permiten que la cuadrícula reserve el espacio sin saltos. */
  ancho: number;
  alto: number;
  alt: string;
  /** Pie de foto visible. */
  pie: string;
}

/** Momentos de la noche, en orden de lectura. */
export const galeria: FotoGaleria[] = [
  {
    src: "/img/recap/galeria/cierre-escenario.jpg",
    ancho: 1800,
    alto: 1012,
    alt: "Todos los artistas y participantes reunidos en el escenario, frente al logotipo de Talento para Dios",
    pie: "El cierre: todos juntos en el escenario",
  },
  {
    src: "/img/recap/galeria/songfield-duo.jpg",
    ancho: 1400,
    alto: 2100,
    alt: "Aldo y María Teomitzi, de Songfield, sonriendo juntos en el escenario con un bajo",
    pie: "Aldo y María Teomitzi, de Songfield",
  },
  {
    src: "/img/recap/galeria/manos-al-cielo.jpg",
    ancho: 1800,
    alto: 1200,
    alt: "Público con las manos levantadas frente al escenario durante la presentación de Dfive",
    pie: "Manos al cielo",
  },
  {
    src: "/img/recap/galeria/conductores.jpg",
    ancho: 1600,
    alto: 900,
    alt: "Los dos conductores del festival mirando hacia arriba con alegría",
    pie: "Los conductores de la noche",
  },
  {
    src: "/img/recap/galeria/adoracion.jpg",
    ancho: 1400,
    alto: 2100,
    alt: "Juan Poumian cantando con los brazos abiertos y su guitarra acústica",
    pie: "Juan Poumian, con los brazos abiertos",
  },
  {
    src: "/img/recap/galeria/cantando-juntos.jpg",
    ancho: 1600,
    alto: 1067,
    alt: "Artistas cantando juntos frente a una pantalla luminosa con la letra «Exaltado Dios, Santo, Santo por siempre»",
    pie: "Voces unidas",
  },
  {
    src: "/img/recap/galeria/dfive-voz.jpg",
    ancho: 1400,
    alto: 788,
    alt: "Una vocalista de Dfive cantando con el brazo en alto",
    pie: "Dfive, en vivo",
  },
  {
    src: "/img/recap/galeria/brazo-con-brazo.jpg",
    ancho: 1600,
    alto: 1067,
    alt: "Músicos de distintas bandas abrazados por los hombros, cantando juntos",
    pie: "Brazo con brazo, un solo canto",
  },
  {
    src: "/img/recap/galeria/anfitriona.jpg",
    ancho: 1800,
    alto: 1200,
    alt: "El escenario lleno al cierre de la noche, con la conductora hablando al micrófono",
    pie: "El escenario lleno al cierre de la noche",
  },
];

export const evento = {
  nombre: "Talento para Dios",
  tituloHero: "El Sonido de una Nueva Generación",
  /** Fecha del Festival de Música Cristiana (ya realizado). */
  fecha: "2026-09-27T18:30:00-06:00",
  fechaTexto: "Domingo 27 de septiembre de 2026",
  /** Para mostrarla en el sitio: el evento ya pasó, no debe leerse como futuro. */
  fechaRealizado: "Realizado el domingo 27 de septiembre de 2026",
  horaTexto: "6:30 PM",
  lugar: "Hacienda Paz",
  /** Video de presentación del evento (YouTube). */
  video: {
    id: "OVgEkmA2_Sk",
    titulo: "Presentación Concierto Talento Para Dios Puebla",
  },
  /** Video recap del festival (archivo propio en `public/video/`, 77 s, 1024x576). */
  videoRecap: {
    src: "/video/recap-festival.mp4",
    poster: "/img/recap/video-recap-poster.jpg",
    titulo: "Recap del Festival de Música Cristiana — Talento para Dios, Hacienda Paz",
    subidoEl: "2026-10-07",
    duracionISO: "PT1M17S",
  },
  ciudad: "Puebla, México",
  /** Salmo 96:1-3 — base del texto del sitio. */
  versiculo: {
    versos: [
      "Cantad a Jehová cántico nuevo; cantad a Jehová, toda la tierra.",
      "Cantad a Jehová, bendecid su nombre; anunciad de día en día su salvación.",
      "Proclamad entre las naciones su gloria, en todos los pueblos sus maravillas.",
    ],
    cita: "Cantad a Jehová cántico nuevo; cantad a Jehová, toda la tierra. Cantad a Jehová, bendecid su nombre; anunciad de día en día su salvación. Proclamad entre las naciones su gloria, en todos los pueblos sus maravillas.",
    referencia: "Salmo 96:1-3",
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
