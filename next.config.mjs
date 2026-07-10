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
};

export default nextConfig;
