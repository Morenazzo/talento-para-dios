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
  title: `${evento.nombre} — ${evento.tituloHero}`,
  description: `Concierto de Adoración · ${evento.fechaTexto}, ${evento.horaTexto} · ${evento.ciudad}. Pasarela de talento + adopción de ministerios musicales. Compra tu boleto en preventa.`,
  openGraph: {
    title: `${evento.nombre} — ${evento.tituloHero}`,
    description: `Concierto de Adoración · ${evento.fechaTexto} · ${evento.ciudad}. Compra tu boleto en preventa.`,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
