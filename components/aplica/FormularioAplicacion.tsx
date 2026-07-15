"use client";

import { useRef, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDiccionario } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = getDiccionario();
const f = t.aplica.formulario;

const inputCls =
  "w-full rounded-xl border border-noche-borde bg-noche px-4 py-3 text-sm text-marfil placeholder:text-marfil-suave/50 focus:border-dorado/60 focus:outline-none focus:ring-1 focus:ring-dorado/40 aria-[invalid=true]:border-red-400/70";

function Campo({
  id,
  label,
  requerido = true,
  ayuda,
  error,
  children,
}: {
  id: string;
  label: string;
  requerido?: boolean;
  ayuda?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-marfil">
        {label}
        {requerido && (
          <span aria-hidden className="text-dorado">
            {" "}
            *
          </span>
        )}
      </label>
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-1 text-xs leading-relaxed text-marfil-suave">
          {ayuda}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function GrupoSiNo({
  name,
  label,
  error,
}: {
  name: string;
  label: string;
  error?: string;
}) {
  return (
    <fieldset aria-invalid={!!error}>
      <legend className="text-sm font-medium text-marfil">
        {label}
        <span aria-hidden className="text-dorado">
          {" "}
          *
        </span>
      </legend>
      <div className="mt-2 flex gap-6">
        {[
          { valor: "si", etiqueta: f.campos.si },
          { valor: "no", etiqueta: f.campos.no },
        ].map((op) => (
          <label
            key={op.valor}
            className="flex cursor-pointer items-center gap-2 text-sm text-marfil-suave"
          >
            <input
              type="radio"
              name={name}
              value={op.valor}
              className="h-4 w-4 accent-[#D4AF37]"
            />
            {op.etiqueta}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function TituloSeccion({ children }: { children: ReactNode }) {
  return (
    <h3 className="border-b border-noche-borde pb-3 font-display text-lg font-semibold text-dorado-claro">
      {children}
    </h3>
  );
}

/** Un paso por sección del formulario oficial — se navega de una en una. */
const PASOS = [
  { titulo: f.secciones.proyecto, campos: ["nombreProyecto", "tipoParticipacion", "ciudadPais", "nombreLider", "telefono", "correo"] },
  { titulo: f.secciones.integrantes, campos: ["numIntegrantes", "integrantes"] },
  { titulo: f.secciones.referencia, campos: ["iglesia", "pastorNombre", "pastorContacto"] },
  { titulo: f.secciones.perfil, campos: ["historia", "generos", "vision"] },
  { titulo: f.secciones.material, campos: ["enlaceMaterial", "confirmoOriginal", "confirmoSinIA", "letra"] },
  { titulo: f.secciones.disponibilidad, campos: ["dispPresentarse", "dispMentoria", "abiertoAdopcion"] },
  { titulo: f.secciones.confirmacion, campos: ["aceptoBases", "infoVeridica"] },
] as const;

const TOTAL_PASOS = PASOS.length;

function ProgresoPasos({ paso }: { paso: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-marfil-suave">
        <span>
          {f.progresoPaso} {paso + 1} {f.progresoDe} {TOTAL_PASOS}
        </span>
        <span className="text-dorado-claro">{PASOS[paso].titulo}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-noche-borde">
        <div
          className="h-full rounded-full bg-dorado transition-all duration-300"
          style={{ width: `${((paso + 1) / TOTAL_PASOS) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function FormularioAplicacion() {
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "exito" | "error">(
    "idle"
  );
  const [via, setVia] = useState<"invitacion" | "abierta" | "">("");
  const [paso, setPaso] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const esUltimoPaso = paso === TOTAL_PASOS - 1;

  function leerDatos() {
    if (!formRef.current) return {} as Record<string, FormDataEntryValue>;
    return Object.fromEntries(new FormData(formRef.current).entries());
  }

  function validarCampos(campos: readonly string[]) {
    const datos = leerDatos();
    const nuevos: Record<string, string> = {};
    for (const campo of campos) {
      if (!datos[campo] || String(datos[campo]).trim() === "") {
        nuevos[campo] = f.errorCampo;
      }
    }
    return nuevos;
  }

  function enfocarPrimerError() {
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]')
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  function irAPaso(destino: number) {
    setPaso(destino);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  function alSiguiente() {
    const nuevosErrores = validarCampos(PASOS[paso].campos);
    setErrores((prev) => {
      const limpio = { ...prev };
      PASOS[paso].campos.forEach((c) => delete limpio[c]);
      return { ...limpio, ...nuevosErrores };
    });
    if (Object.keys(nuevosErrores).length > 0) {
      enfocarPrimerError();
      return;
    }
    irAPaso(Math.min(paso + 1, TOTAL_PASOS - 1));
  }

  function alAtras() {
    irAPaso(Math.max(paso - 1, 0));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const todosLosCampos = PASOS.flatMap((p) => p.campos);
    const nuevosErrores = validarCampos(todosLosCampos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      // Si el campo con error no está en el paso actual, ve a ese paso primero.
      const primerPasoConError = PASOS.findIndex((p) =>
        p.campos.some((c) => nuevosErrores[c])
      );
      if (primerPasoConError !== -1 && primerPasoConError !== paso) {
        irAPaso(primerPasoConError);
      } else {
        enfocarPrimerError();
      }
      setEstado("error");
      return;
    }

    setEstado("enviando");
    try {
      const datos = leerDatos();
      const res = await fetch("/api/aplicaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error();
      setEstado("exito");
      formRef.current?.reset();
      setVia("");
    } catch {
      setEstado("error");
    }
  }

  function alTeclaEnter(e: React.KeyboardEvent<HTMLFormElement>) {
    const objetivo = e.target as HTMLElement;
    if (e.key === "Enter" && objetivo.tagName !== "TEXTAREA" && !esUltimoPaso) {
      e.preventDefault();
      alSiguiente();
    }
  }

  if (estado === "exito") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-dorado/30 bg-noche-panel p-10 text-center"
      >
        <CheckCircle2 aria-hidden className="h-12 w-12 text-dorado" />
        <p className="max-w-md text-marfil">{f.exito}</p>
        <Button
          variant="contorno"
          onClick={() => {
            setEstado("idle");
            setPaso(0);
          }}
        >
          Enviar otra aplicación
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onKeyDown={alTeclaEnter}
      className="space-y-8"
    >
      <ProgresoPasos paso={paso} />
      <p className="text-sm text-marfil-suave">{f.obligatorio}</p>

      {/* Sección 1 — Datos del proyecto */}
      <section
        aria-label={f.secciones.proyecto}
        className={cn("space-y-6", paso !== 0 && "hidden")}
      >
        <TituloSeccion>{f.secciones.proyecto}</TituloSeccion>

        <Campo id="nombreProyecto" label={f.campos.nombreProyecto} error={errores.nombreProyecto}>
          <input id="nombreProyecto" name="nombreProyecto" type="text" className={inputCls} aria-invalid={!!errores.nombreProyecto} />
        </Campo>

        <fieldset aria-invalid={!!errores.tipoParticipacion}>
          <legend className="text-sm font-medium text-marfil">
            {f.campos.tipoParticipacion}
            <span aria-hidden className="text-dorado"> *</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(
              [
                { valor: "invitacion", titulo: f.campos.porInvitacion, ayuda: f.campos.ayudaMaterialInvitacion },
                { valor: "abierta", titulo: f.campos.aplicacionAbierta, ayuda: f.campos.ayudaMaterialAbierta },
              ] as const
            ).map((op) => (
              <label
                key={op.valor}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                  via === op.valor
                    ? "border-dorado/60 bg-dorado/5"
                    : "border-noche-borde bg-noche hover:border-dorado/30"
                )}
              >
                <input
                  type="radio"
                  name="tipoParticipacion"
                  value={op.valor}
                  checked={via === op.valor}
                  onChange={() => setVia(op.valor)}
                  className="mt-1 h-4 w-4 accent-[#D4AF37]"
                />
                <span>
                  <span className="block text-sm font-semibold text-marfil">{op.titulo}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-marfil-suave">{op.ayuda}</span>
                </span>
              </label>
            ))}
          </div>
          {errores.tipoParticipacion && (
            <p role="alert" className="mt-1.5 text-xs text-red-300">{errores.tipoParticipacion}</p>
          )}
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <Campo id="ciudadPais" label={f.campos.ciudadPais} error={errores.ciudadPais}>
            <input id="ciudadPais" name="ciudadPais" type="text" placeholder="Puebla, México" className={inputCls} aria-invalid={!!errores.ciudadPais} />
          </Campo>
          <Campo id="nombreLider" label={f.campos.nombreLider} error={errores.nombreLider}>
            <input id="nombreLider" name="nombreLider" type="text" className={inputCls} aria-invalid={!!errores.nombreLider} />
          </Campo>
          <Campo id="telefono" label={f.campos.telefono} error={errores.telefono}>
            <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errores.telefono} />
          </Campo>
          <Campo id="correo" label={f.campos.correo} error={errores.correo}>
            <input id="correo" name="correo" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errores.correo} />
          </Campo>
        </div>

        <Campo id="redes" label={f.campos.redes} requerido={false}>
          <input id="redes" name="redes" type="text" placeholder="https://instagram.com/…" className={inputCls} />
        </Campo>
      </section>

      {/* Sección 2 — Integrantes */}
      <section
        aria-label={f.secciones.integrantes}
        className={cn("space-y-6", paso !== 1 && "hidden")}
      >
        <TituloSeccion>{f.secciones.integrantes}</TituloSeccion>
        <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
          <Campo id="numIntegrantes" label={f.campos.numIntegrantes} error={errores.numIntegrantes}>
            <input id="numIntegrantes" name="numIntegrantes" type="number" min={1} className={inputCls} aria-invalid={!!errores.numIntegrantes} />
          </Campo>
          <Campo id="integrantes" label={f.campos.integrantes} error={errores.integrantes}>
            <textarea id="integrantes" name="integrantes" rows={3} placeholder={"María — voz\nJuan — guitarra"} className={inputCls} aria-invalid={!!errores.integrantes} />
          </Campo>
        </div>
      </section>

      {/* Sección 3 — Referencia ministerial */}
      <section
        aria-label={f.secciones.referencia}
        className={cn("space-y-6", paso !== 2 && "hidden")}
      >
        <TituloSeccion>{f.secciones.referencia}</TituloSeccion>
        <Campo id="iglesia" label={f.campos.iglesia} error={errores.iglesia}>
          <input id="iglesia" name="iglesia" type="text" className={inputCls} aria-invalid={!!errores.iglesia} />
        </Campo>
        <div className="grid gap-6 sm:grid-cols-2">
          <Campo id="pastorNombre" label={f.campos.pastorNombre} error={errores.pastorNombre}>
            <input id="pastorNombre" name="pastorNombre" type="text" className={inputCls} aria-invalid={!!errores.pastorNombre} />
          </Campo>
          <Campo id="pastorContacto" label={f.campos.pastorContacto} error={errores.pastorContacto}>
            <input id="pastorContacto" name="pastorContacto" type="text" className={inputCls} aria-invalid={!!errores.pastorContacto} />
          </Campo>
        </div>
      </section>

      {/* Sección 4 — Perfil ministerial y musical */}
      <section
        aria-label={f.secciones.perfil}
        className={cn("space-y-6", paso !== 3 && "hidden")}
      >
        <TituloSeccion>{f.secciones.perfil}</TituloSeccion>
        <Campo id="historia" label={f.campos.historia} error={errores.historia}>
          <textarea id="historia" name="historia" rows={4} className={inputCls} aria-invalid={!!errores.historia} />
        </Campo>
        <Campo id="generos" label={f.campos.generos} error={errores.generos}>
          <input id="generos" name="generos" type="text" placeholder="Pop, acústico, urbano…" className={inputCls} aria-invalid={!!errores.generos} />
        </Campo>
        <Campo id="vision" label={f.campos.vision} error={errores.vision}>
          <textarea id="vision" name="vision" rows={4} className={inputCls} aria-invalid={!!errores.vision} />
        </Campo>
      </section>

      {/* Sección 5 — Material */}
      <section
        aria-label={f.secciones.material}
        className={cn("space-y-6", paso !== 4 && "hidden")}
      >
        <TituloSeccion>{f.secciones.material}</TituloSeccion>
        <Campo
          id="enlaceMaterial"
          label={f.campos.enlaceMaterial}
          error={errores.enlaceMaterial}
          ayuda={
            via === "abierta"
              ? f.campos.ayudaMaterialAbierta
              : via === "invitacion"
                ? f.campos.ayudaMaterialInvitacion
                : `${f.campos.ayudaMaterialAbierta} ${f.campos.ayudaMaterialInvitacion}`
          }
        >
          <input id="enlaceMaterial" name="enlaceMaterial" type="url" placeholder="https://…" className={inputCls} aria-invalid={!!errores.enlaceMaterial} aria-describedby="enlaceMaterial-ayuda" />
        </Campo>

        {(
          [
            { name: "confirmoOriginal", label: f.campos.confirmoOriginal },
            { name: "confirmoSinIA", label: f.campos.confirmoSinIA },
          ] as const
        ).map((c) => (
          <div key={c.name}>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-marfil">
              <input type="checkbox" name={c.name} value="si" className="mt-0.5 h-4 w-4 accent-[#D4AF37]" aria-invalid={!!errores[c.name]} />
              <span>
                {c.label}
                <span aria-hidden className="text-dorado"> *</span>
              </span>
            </label>
            {errores[c.name] && (
              <p role="alert" className="mt-1.5 pl-7 text-xs text-red-300">{errores[c.name]}</p>
            )}
          </div>
        ))}

        <Campo id="letra" label={f.campos.letra} error={errores.letra}>
          <textarea id="letra" name="letra" rows={8} className={inputCls} aria-invalid={!!errores.letra} />
        </Campo>
        <Campo id="cifrado" label={f.campos.cifrado} requerido={false}>
          <textarea id="cifrado" name="cifrado" rows={3} className={inputCls} />
        </Campo>
      </section>

      {/* Sección 6 — Disponibilidad y compromiso */}
      <section
        aria-label={f.secciones.disponibilidad}
        className={cn("space-y-6", paso !== 5 && "hidden")}
      >
        <TituloSeccion>{f.secciones.disponibilidad}</TituloSeccion>
        <GrupoSiNo name="dispPresentarse" label={f.campos.dispPresentarse} error={errores.dispPresentarse} />
        <GrupoSiNo name="dispMentoria" label={f.campos.dispMentoria} error={errores.dispMentoria} />
        <GrupoSiNo name="abiertoAdopcion" label={f.campos.abiertoAdopcion} error={errores.abiertoAdopcion} />
      </section>

      {/* Sección 7 — Confirmación */}
      <section
        aria-label={f.secciones.confirmacion}
        className={cn("space-y-6", paso !== 6 && "hidden")}
      >
        <TituloSeccion>{f.secciones.confirmacion}</TituloSeccion>
        {(
          [
            { name: "aceptoBases", label: f.campos.aceptoBases },
            { name: "infoVeridica", label: f.campos.infoVeridica },
          ] as const
        ).map((c) => (
          <div key={c.name}>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-marfil">
              <input type="checkbox" name={c.name} value="si" className="mt-0.5 h-4 w-4 accent-[#D4AF37]" aria-invalid={!!errores[c.name]} />
              <span>
                {c.label}
                <span aria-hidden className="text-dorado"> *</span>
              </span>
            </label>
            {errores[c.name] && (
              <p role="alert" className="mt-1.5 pl-7 text-xs text-red-300">{errores[c.name]}</p>
            )}
          </div>
        ))}
      </section>

      {estado === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-950/30 p-4 text-sm text-red-200">
          <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
          {Object.keys(errores).length > 0 ? f.error : f.errorEnvio}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-noche-borde pt-6">
        {paso > 0 ? (
          <Button type="button" variant="contorno" onClick={alAtras}>
            <ChevronLeft aria-hidden className="h-4 w-4" />
            {f.atras}
          </Button>
        ) : (
          <span />
        )}

        {esUltimoPaso ? (
          <Button type="submit" disabled={estado === "enviando"}>
            {estado === "enviando" ? f.enviando : f.enviar}
          </Button>
        ) : (
          <Button type="button" onClick={alSiguiente}>
            {f.siguiente}
            <ChevronRight aria-hidden className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
