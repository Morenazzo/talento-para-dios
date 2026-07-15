import { NextResponse } from "next/server";

/**
 * Endpoint de aplicaciones de artistas.
 *
 * Cada aplicación se reenvía a Google Sheets vía un webhook de Apps Script
 * (ver docs/apps-script-aplicaciones.gs para instalarlo). La URL del webhook
 * vive en la variable de entorno APLICACIONES_WEBHOOK_URL (Vercel → Settings
 * → Environment Variables) — funciona como contraseña, nunca en el repo.
 *
 * ⚠️ Datos personales (teléfonos, correos, referencia pastoral): tratar
 * conforme a la LFPDPPP (publicar aviso de privacidad).
 */

/** Campos obligatorios del formulario oficial (documento de bases). */
const OBLIGATORIOS = [
  "nombreProyecto",
  "tipoParticipacion",
  "ciudadPais",
  "nombreLider",
  "telefono",
  "correo",
  "numIntegrantes",
  "integrantes",
  "iglesia",
  "pastorNombre",
  "pastorContacto",
  "historia",
  "generos",
  "vision",
  "enlaceMaterial",
  "confirmoOriginal",
  "confirmoSinIA",
  "letra",
  "dispPresentarse",
  "dispMentoria",
  "abiertoAdopcion",
  "aceptoBases",
  "infoVeridica",
] as const;

export async function POST(request: Request) {
  const datos = await request.json().catch(() => null);
  if (!datos || typeof datos !== "object") {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const faltantes = OBLIGATORIOS.filter(
    (c) => !datos[c] || String(datos[c]).trim() === ""
  );
  if (faltantes.length > 0) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios.", faltantes },
      { status: 400 }
    );
  }

  const webhook = process.env.APLICACIONES_WEBHOOK_URL;
  if (!webhook) {
    // Sin destino configurado: fallar visiblemente en vez de perder datos.
    console.error(
      "APLICACIONES_WEBHOOK_URL no está configurada — aplicación rechazada."
    );
    return NextResponse.json(
      { error: "El registro no está disponible temporalmente. Intenta más tarde." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
      // Apps Script responde con una redirección a googleusercontent.
      redirect: "follow",
    });
    const cuerpo = await res.json().catch(() => null);
    if (!res.ok || !cuerpo?.ok) {
      throw new Error(`Webhook respondió ${res.status}: ${JSON.stringify(cuerpo)}`);
    }
  } catch (err) {
    console.error("Error reenviando aplicación a Google Sheets:", err);
    return NextResponse.json(
      { error: "No pudimos registrar tu aplicación. Intenta de nuevo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
