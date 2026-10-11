import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { evento } from "@/config/evento";
import { getDiccionario, esLocale, locales } from "@/lib/i18n";
import { imagenOg } from "@/lib/imagen-og";
import "../globals.css";

/** Manual de marca: Montserrat para títulos, subtítulos y texto (fuente variable). */
const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Español en `/` (internamente `/es`) e inglés en `/en`: se generan las dos. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  if (!esLocale(params.lang)) return {};
  const lang = params.lang;
  const t = getDiccionario(lang);
  const titulo = `${evento.nombre} — ${t.evento.tituloHero}`;
  const ruta = lang === "en" ? "/en" : "/";

  return {
    metadataBase: new URL(evento.sitio),
    title: titulo,
    description: t.meta.descripcion,
    // Cada idioma declara a su gemelo: Google muestra la versión que corresponde.
    alternates: {
      canonical: ruta,
      languages: { es: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: titulo,
      description: t.meta.descripcionOg,
      url: ruta,
      siteName: evento.nombre,
      type: "website",
      locale: lang === "en" ? "en_US" : "es_MX",
      alternateLocale: lang === "en" ? "es_MX" : "en_US",
      images: [imagenOg],
    },
    twitter: { card: "summary_large_image", images: [imagenOg.url] },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: string } }>) {
  if (!esLocale(params.lang)) notFound();

  return (
    <html lang={params.lang} className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
