# Talento para Dios — Landing de Preventa

Landing de preventa y crowdfunding del **Concierto de Adoración** — _El Sonido de una Nueva Generación_ · Domingo 27 de septiembre de 2026 · Puebla, México.

> No es un concurso. Es una **pasarela de talento + adopción**: los proyectos seleccionados se presentan en vivo y los asistentes pueden adoptar a una banda emergente por un año.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS + componentes estilo shadcn/ui (`components/ui/`)
- Textos preparados para i18n es/en (`lib/i18n/`)

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # build de producción
npm start          # servir el build
```

## Editar precios, fecha y textos

**Todo el contenido editable vive en dos lugares — no hay que tocar componentes:**

| Qué | Archivo |
| --- | --- |
| Precios de boletos, beneficios, boleto destacado | [`config/evento.ts`](config/evento.ts) |
| Fecha, lugar, versículo, contacto y redes | [`config/evento.ts`](config/evento.ts) |
| Cifras de la sección "Por qué" (⚠️ pendientes de verificar fuente) | [`config/evento.ts`](config/evento.ts) |
| Copys de todas las secciones (es/en) | [`lib/i18n/es.ts`](lib/i18n/es.ts) / [`lib/i18n/en.ts`](lib/i18n/en.ts) |

⚠️ **Placeholders pendientes antes de publicar:**

- Precios finales de todos los boletos (los actuales son precios ancla).
- Nombre del recinto (`[CONFIRMAR NOMBRE]`).
- Cifras de misión (`[VERIFICAR FUENTE]`) — no publicar sin cita verificada.
- Correo, teléfono y redes sociales en `evento.contacto`.
- Imágenes reales (hoy hay componentes `ImagePlaceholder` con dimensiones y alt text listos).

## Desplegar en Vercel (recomendado)

1. Entra a [vercel.com/new](https://vercel.com/new) e importa el repo `morenazzo/talento-para-dios`.
2. Framework preset: **Next.js** (detectado automáticamente). Sin configuración extra.
3. Cada push a `main` despliega producción; cada PR genera un preview.

Vercel es el destino por defecto porque las **API routes** (`app/api/checkout` y los futuros webhooks de pago) necesitan servidor.

### Alternativa: GitHub Pages (solo estático)

GitHub Pages solo sirve archivos estáticos. Si quieres publicar ahí:

1. Descomenta `output: 'export'` en [`next.config.mjs`](next.config.mjs).
2. `npm run build` genera el sitio en `/out`.
3. Publica `/out` en Pages.

**Pierdes las API routes**: el botón de compra tendría que apuntar a un link de pago externo (Stripe Payment Link / Conekta Link) en vez de `/api/checkout`.

## Conectar la pasarela de pago (Conekta / Stripe)

El checkout actual es un **stub** — no procesa cobros. Los puntos de conexión:

1. **[`app/api/checkout/route.ts`](app/api/checkout/route.ts)** — crear aquí la sesión de pago (server-side) y devolver `{ url }`:
   - Stripe: `stripe.checkout.sessions.create(...)` con `STRIPE_SECRET_KEY`.
   - Conekta: crear orden/checkout con `CONEKTA_PRIVATE_KEY`.
2. **[`lib/checkout.ts`](lib/checkout.ts)** — `iniciarCheckout(tipoBoleto)` ya llama a la API; al recibir la URL real, redirigir con `window.location.assign(data.url)`.
3. **Webhooks** — añadir `app/api/webhooks/` para confirmar pagos y crear la página `/gracias`.

🔑 Las claves van **solo** en variables de entorno de Vercel (Settings → Environment Variables). Nunca en el repositorio — `.gitignore` ya excluye `.env*`.

## Estructura

```
app/
  layout.tsx                 # Fuentes (Outfit + Playfair Display), metadata, lang=es
  page.tsx                   # Composición de secciones de la landing
  icon.svg                   # Favicon (isotipo dorado)
  aplica/page.tsx            # Convocatoria + formulario de inscripción de artistas
  api/checkout/route.ts      # Stub de checkout (TODO: Conekta/Stripe)
  api/aplicaciones/route.ts  # Stub de aplicaciones (TODO: Sheets/correo/DB)
components/
  Logo.tsx                   # Isotipo SVG (micrófono dorado + halo + cruz)
  sections/                  # Hero, PorQue, QueViviras, Adopcion, TicketTiers, Convocatoria, Etica, CTAFinal, Footer, Navbar
  aplica/                    # FormularioAplicacion (7 secciones del formulario oficial)
  ui/                        # Button, Card, Badge (estilo shadcn/ui)
  ImagePlaceholder.tsx       # Placeholder accesible para assets pendientes
config/evento.ts             # ÚNICA fuente de precios, fecha, lugar y cifras
lib/
  i18n/                      # es.ts (visible) + en.ts (preparado)
  checkout.ts                # iniciarCheckout(tipoBoleto) — stub
public/
  registro-pastores.html     # Página previa preservada (/registro-pastores.html)
```

## Aplicaciones de artistas (`/aplica`)

La página reproduce el formulario oficial de inscripción (7 secciones, dos vías de ingreso: invitación / aplicación abierta) con validación de los campos obligatorios. El envío llega a `app/api/aplicaciones/route.ts`, que hoy es un **stub sin persistencia**: conectar ahí Google Sheets, correo (Resend/SendGrid) o base de datos para que el equipo del filtro primario reciba las aplicaciones. Al conectar la persistencia, publicar el aviso de privacidad (datos personales y referencia pastoral — LFPDPPP).

## Nota legal del copy

Los boletos son **preventa de entrada a un evento, no donativos**. La preventa financia la producción del concierto; el excedente sobre la meta se destina al Fondo de Impulso al Talento. Mantener esta redacción en cualquier texto nuevo.
