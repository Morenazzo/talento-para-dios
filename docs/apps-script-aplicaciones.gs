/**
 * Talento para Dios — Receptor de aplicaciones de artistas.
 *
 * CÓMO INSTALARLO (una sola vez, ~5 minutos):
 * 1. Crea una hoja de cálculo en Google Sheets (ej. "Aplicaciones Talento para Dios").
 * 2. En la hoja: Extensiones → Apps Script.
 * 3. Borra el contenido del editor y pega este archivo completo. Guarda.
 * 4. Botón "Implementar" → "Nueva implementación" → tipo "Aplicación web":
 *      - Ejecutar como: Tú (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 *    → Implementar → autoriza los permisos → copia la "URL de la aplicación web"
 *      (termina en /exec).
 * 5. En Vercel → tu proyecto → Settings → Environment Variables agrega:
 *      Nombre:  APLICACIONES_WEBHOOK_URL
 *      Valor:   (la URL /exec que copiaste)
 *      Entorno: Production (y Preview si quieres probar)
 *    Guarda y haz "Redeploy" del último deployment.
 *
 * ⚠️ La URL /exec funciona como contraseña: no la publiques ni la subas al repo.
 */

var NOMBRE_HOJA = "Aplicaciones";

var COLUMNAS = [
  "fecha",
  "nombreProyecto",
  "tipoParticipacion",
  "ciudadPais",
  "nombreLider",
  "telefono",
  "correo",
  "redes",
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
  "cifrado",
  "dispPresentarse",
  "dispMentoria",
  "abiertoAdopcion",
  "aceptoBases",
  "infoVeridica",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var datos = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName(NOMBRE_HOJA) || ss.insertSheet(NOMBRE_HOJA);

    if (hoja.getLastRow() === 0) {
      hoja.appendRow(COLUMNAS);
      hoja.setFrozenRows(1);
    }

    hoja.appendRow(
      COLUMNAS.map(function (col) {
        if (col === "fecha") return new Date();
        var valor = datos[col];
        return valor === undefined || valor === null ? "" : String(valor);
      })
    );

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
