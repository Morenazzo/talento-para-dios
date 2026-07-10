import type { TipoBoleto } from "@/config/evento";

/**
 * STUB de checkout — NO procesa cobros reales.
 *
 * TODO(pagos): conectar la pasarela (Conekta o Stripe):
 *   1. Crear la sesión de pago desde `app/api/checkout/route.ts`
 *      (server-side, con la clave secreta en variables de entorno de Vercel —
 *      nunca en el repo).
 *   2. Redirigir aquí al checkout hospedado con la URL que devuelva la API.
 *   3. Manejar confirmación vía webhook (app/api/webhooks/...) y página
 *      de gracias (/gracias).
 *
 * Documentación: README.md → "Conectar la pasarela de pago".
 */
export async function iniciarCheckout(tipoBoleto: TipoBoleto): Promise<void> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoBoleto }),
    });
    const data = await res.json();

    // TODO(pagos): cuando la API devuelva una URL real de Conekta/Stripe,
    // redirigir con `window.location.assign(data.url)`.
    if (data?.mensaje) {
      window.alert(data.mensaje);
    }
  } catch {
    window.alert(
      "No pudimos iniciar el proceso de compra. Intenta de nuevo más tarde."
    );
  }
}
