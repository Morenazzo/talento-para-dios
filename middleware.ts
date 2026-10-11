import { NextResponse, type NextRequest } from "next/server";

/**
 * Idioma del sitio: español en `/` (se sirve internamente desde `/es`) e
 * inglés en `/en`.
 *
 * Quién ve qué, en orden de prioridad:
 *  1. Si el visitante ya eligió idioma (cookie), se respeta — siempre.
 *  2. Robots y vistas previas de enlaces (Google, WhatsApp, Facebook…): español,
 *     para que indexen y muestren una sola versión estable de `/`.
 *  3. País (cabecera de Vercel): países hispanohablantes → español.
 *  4. País no hispanohablante → inglés, salvo que su navegador esté en español
 *     (un mexicano de viaje no debería ver el sitio en inglés).
 *  5. Sin dato de país (desarrollo local): idioma del navegador.
 */

const COOKIE = "NEXT_LOCALE";
const UN_ANIO = 60 * 60 * 24 * 365;

/** Países donde el español es idioma oficial o mayoritario. */
const PAISES_HISPANOS = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);

const ROBOTS =
  /bot|crawl|spider|slurp|facebookexternalhit|facebot|whatsapp|telegram|linkedin|embedly|pinterest|discord|slack|preview|lighthouse/i;

function navegadorEnEspanol(acceptLanguage: string | null) {
  const primero = (acceptLanguage ?? "").split(",")[0]?.trim().toLowerCase();
  return Boolean(primero?.startsWith("es"));
}

function idiomaAutomatico(req: NextRequest): "es" | "en" {
  const pais = req.headers.get("x-vercel-ip-country")?.toUpperCase();
  const acceptLanguage = req.headers.get("accept-language");

  if (pais) {
    if (PAISES_HISPANOS.has(pais)) return "es";
    return navegadorEnEspanol(acceptLanguage) ? "es" : "en";
  }
  return acceptLanguage && !navegadorEnEspanol(acceptLanguage) ? "en" : "es";
}

function guardarIdioma(res: NextResponse, idioma: "es" | "en") {
  res.cookies.set(COOKIE, idioma, {
    path: "/",
    maxAge: UN_ANIO,
    sameSite: "lax",
  });
  return res;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const primero = pathname.split("/")[1];

  // Idioma elegido a propósito en la URL (selector ES | EN o enlace directo).
  if (primero === "en") {
    return guardarIdioma(NextResponse.next(), "en");
  }
  if (primero === "es") {
    // El español vive sin prefijo: /es/x → /x. 307 (temporal) y no 308, para
    // que el navegador no se salte el middleware la próxima vez y pierda la cookie.
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, "") || "/";
    return guardarIdioma(NextResponse.redirect(url, 307), "es");
  }

  // Sin idioma en la URL: se decide aquí.
  const guardado = req.cookies.get(COOKIE)?.value;
  const esRobot = ROBOTS.test(req.headers.get("user-agent") ?? "");
  const idioma: "es" | "en" =
    guardado === "es" || guardado === "en"
      ? guardado
      : esRobot
        ? "es"
        : idiomaAutomatico(req);

  if (idioma === "en") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Fuera: API y archivos estáticos (cualquier ruta con punto: imágenes, video,
  // iconos, sitemap, imagen para compartir).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
