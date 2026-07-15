import type { Config } from "tailwindcss";

/**
 * Paleta de marca — Talento para Dios
 * Atmósfera cinematográfica: fondo oscuro profundo, acentos dorados
 * (marquesina / destellos divinos) y toques sutiles de azul eléctrico
 * (ondas de sonido).
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
          DEFAULT: "#0A0A0A", // negro profundo
          carbon: "#111111", // gris carbón
          panel: "#161616",
          borde: "#2A2A2A",
          medianoche: "#0B1120", // azul medianoche
        },
        dorado: {
          DEFAULT: "#D4AF37", // dorado brillante
          claro: "#F5D87A", // amarillo cálido
          profundo: "#A88A2A",
        },
        marfil: {
          DEFAULT: "#F5F0E8", // blanco iluminado
          suave: "#CFC9BD",
        },
        electrico: {
          DEFAULT: "#38BDF8", // azul neón / ondas de sonido
          profundo: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "destello-dorado":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,175,55,0.15), transparent)",
        "destello-hero":
          "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(245,216,122,0.18), transparent 70%)",
        "destello-electrico":
          "radial-gradient(ellipse 65% 50% at 15% 15%, rgba(56,189,248,0.14), transparent 70%)",
        "destello-electrico-inv":
          "radial-gradient(ellipse 65% 50% at 85% 85%, rgba(56,189,248,0.12), transparent 70%)",
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
