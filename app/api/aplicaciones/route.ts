import { NextResponse } from "next/server";

/**
 * STUB del endpoint de aplicaciones de artistas — NO persiste datos todavía.
 *
 * TODO(aplicaciones): conectar el destino real de las aplicaciones. Opciones:
 *  - Google Sheets (Apps Script / API) para que el equipo del filtro primario
 *    (Aldo, Edwin, Abel) las revise.
 *  - Notificación por correo (Resend/SendGrid) al equipo.
 *  - Base de datos (Vercel Postgres / Supabase) si crece el volumen.
 *
 * ⚠️ Datos personales (teléfonos, correos, referencia pastoral): al conectar
 * la persistencia, tratar conforme a la LFPDPPP (aviso de privacidad).
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

  // TODO(aplicaciones): aquí se enviará/persistirá la aplicación.
  // Por ahora solo se confirma la recepción sin guardar nada.
  return NextResponse.json({ ok: true });
}
