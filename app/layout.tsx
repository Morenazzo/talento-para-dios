import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { evento } from "@/config/evento";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://talentoparadios.com"),
  title: `${evento.nombre} — ${evento.tituloHero}`,
  description: `Festival de Música Cristiana · ${evento.fechaRealizado} · ${evento.ciudad}. Recap del festival: diez proyectos musicales cristianos, un solo escenario.`,
  openGraph: {
    title: `${evento.nombre} — ${evento.tituloHero}`,
    description: `Festival de Música Cristiana · ${evento.fechaRealizado} · ${evento.ciudad}. Recap del festival.`,
    url: "/",
    siteName: evento.nombre,
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
