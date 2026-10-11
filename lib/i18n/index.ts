import { es, type Diccionario } from "./es";
import { en } from "./en";

export type Locale = "es" | "en";

export const locales: Locale[] = ["es", "en"];

/** Español es el idioma por defecto: vive en la raíz (`/`); el inglés en `/en`. */
export const localePorDefecto: Locale = "es";

const diccionarios: Record<Locale, Diccionario> = { es, en };

export function esLocale(valor: string): valor is Locale {
  return valor === "es" || valor === "en";
}

export function getDiccionario(locale: Locale = localePorDefecto): Diccionario {
  return diccionarios[locale];
}

/** Ruta pública de una página en un idioma: español sin prefijo, inglés con `/en`. */
export function ruta(locale: Locale, camino = ""): string {
  const base = locale === "en" ? "/en" : "";
  const resto = camino.startsWith("/") || camino === "" ? camino : `/${camino}`;
  return `${base}${resto}` || "/";
}

export type { Diccionario };
