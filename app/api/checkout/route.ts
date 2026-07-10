import { NextResponse } from "next/server";
import { boletos } from "@/config/evento";

/**
 * STUB del endpoint de checkout — NO crea cargos reales.
 *
 * TODO(pagos): sustituir este stub por la integración real:
 *  - Conekta: crear una orden/checkout con `CONEKTA_PRIVATE_KEY`
 *    (variable de entorno en Vercel) y devolver `{ url }` del checkout hospedado.
 *  - Stripe: `stripe.checkout.sessions.create(...)` con `STRIPE_SECRET_KEY`
 *    y devolver `{ url: session.url }`.
 *  - Añadir webhook de confirmación en `app/api/webhooks/`.
 *
 * ⚠️ Las claves viven SOLO en variables de entorno — nunca en el repositorio.
 */
export async function POST(request: Request) {
  const { tipoBoleto } = await request.json().catch(() => ({}));

  const boleto = boletos.find((b) => b.id === tipoBoleto);
  if (!boleto) {
    return NextResponse.json(
      { error: "Tipo de boleto no válido." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    boleto: boleto.nombre,
    mensaje:
      "La pasarela de pago estará disponible próximamente. ¡Gracias por tu interés en " +
      boleto.nombre +
      "!",
  });
}
