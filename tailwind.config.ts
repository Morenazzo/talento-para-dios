import type { Config } from "tailwindcss";

/**
 * Manual de marca — Talento para Dios
 * Regla visual 70/20/10: 70 % negro y espacio negativo, 20 % fotografía real,
 * 10 % dorado y luz como acento. Sin azules: la paleta es negro + dorado.
 *
 *   #050505 negro profundo (fondo principal)   #D9A520 dorado principal
 *   #191919 gris carbón (fondo secundario)     #FFC83D dorado brillante (acentos)
 *   #FFF9EC blanco cálido (textos)             #FFE29A dorado claro (reflejos)
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        noche: {
          DEFAULT: "#050505", // negro profundo — fondo principal
          carbon: "#191919", // gris carbón — fondo secundario
          panel: "#121212",
          borde: "#2A2A2A",
          medianoche: "#0E0C07", // negro cálido, para variar fondos sin salir de la paleta
        },
        dorado: {
          DEFAULT: "#D9A520", // dorado principal
          brillante: "#FFC83D", // acentos
          claro: "#FFE29A", // reflejos
          profundo: "#A87F14",
        },
        marfil: {
          DEFAULT: "#FFF9EC", // blanco cálido — textos
          suave: "#D6CFC0",
        },
      },
      fontFamily: {
        // Manual de marca: Montserrat (títulos Bold, subtítulos SemiBold, texto Regular).
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "destello-dorado":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(217,165,32,0.16), transparent)",
        "destello-hero":
          "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(255,226,154,0.18), transparent 70%)",
        "destello-lateral":
          "radial-gradient(ellipse 65% 50% at 15% 15%, rgba(255,200,61,0.10), transparent 70%)",
        "destello-lateral-inv":
          "radial-gradient(ellipse 65% 50% at 85% 85%, rgba(255,200,61,0.09), transparent 70%)",
      },
      keyframes: {
        "pulso-suave": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulso-suave": "pulso-suave 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
