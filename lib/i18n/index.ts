import { es, type Diccionario } from "./es";
import { en } from "./en";

export type Locale = "es" | "en";

const diccionarios: Record<Locale, Diccionario> = { es, en };

/** Idioma visible de la landing. Cambiar a "en" cuando la traducción esté revisada. */
export const localeActual: Locale = "es";

export function getDiccionario(locale: Locale = localeActual): Diccionario {
  return diccionarios[locale];
}

export type { Diccionario };
