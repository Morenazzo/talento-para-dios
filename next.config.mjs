import { existsSync } from "node:fs";

/**
 * En el Mac de desarrollo, node_modules es un enlace a `node_modules.nosync`
 * (así iCloud no lo saca del disco). Webpack no reconoce ese nombre como
 * "node_modules" y llena la consola de avisos inofensivos de caché. Se
 * silencian solo si la carpeta existe: en Vercel no existe y no cambia nada.
 */
const conNosync = existsSync(new URL("./node_modules.nosync", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Despliegue por defecto: Vercel (soporta API routes para el checkout y
  // futuros webhooks de Conekta/Stripe).
  //
  // Modo alternativo — GitHub Pages (solo archivos estáticos):
  // descomenta la línea siguiente y ejecuta `npm run build`. El sitio se
  // genera en /out, PERO las API routes (app/api/*) dejan de funcionar:
  // el checkout tendría que ir por un link de pago externo.
  // output: 'export',
  reactStrictMode: true,
  webpack: (config) => {
    if (conNosync) {
      config.infrastructureLogging = {
        ...config.infrastructureLogging,
        level: "error",
      };
    }
    return config;
  },
};

export default nextConfig;
