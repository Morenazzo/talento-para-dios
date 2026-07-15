"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { boletos, notaLegal, evento, type Boleto } from "@/config/evento";
import { getDiccionario } from "@/lib/i18n";
import { iniciarCheckout } from "@/lib/checkout";
import { cn } from "@/lib/utils";
import {
  EVENTO_ABRIR_BOLETOS,
  type DetalleAbrirBoletos,
} from "@/components/BotonAbrirBoletos";

const t = getDiccionario();

const formatoMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function TarjetaBoletoModal({
  boleto,
  resaltado,
}: {
  boleto: Boleto;
  resaltado: boolean;
}) {
  return (
    <div
      id={`modal-boleto-${boleto.id}`}
      className={cn(
        "scroll-mt-6 rounded-2xl border p-5 transition-shadow",
        boleto.destacado
          ? "border-dorado/60 bg-dorado/5"
          : "border-noche-borde bg-noche",
        resaltado && "ring-2 ring-dorado-claro"
      )}
    >
      {boleto.badge && (
        <Badge variant={boleto.destacado ? "dorado" : "contorno"}>
          {boleto.badge}
        </Badge>
      )}
      <h3 className="mt-3 font-display text-lg font-semibold text-marfil">
        {boleto.nombre}
      </h3>
      <p className="mt-1 text-sm text-marfil-suave">{boleto.descripcion}</p>

      <div className="mt-4">
        {boleto.rangoPrecio ? (
          <>
            <p className="text-xs uppercase tracking-widest text-marfil-suave">
              {t.boletos.desde}
            </p>
            <p className="font-display text-2xl font-bold text-dorado-claro">
              {boleto.rangoPrecio}
            </p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-marfil-suave">
              {t.boletos.precioPreventaLabel}
            </p>
            <p className="font-display text-3xl font-bold text-dorado-claro">
              {formatoMXN.format(boleto.precioPreventa)}
              <span className="ml-1 text-sm font-normal text-marfil-suave">
                {t.boletos.moneda}
              </span>
            </p>
            {boleto.precioNormal !== null && (
              <p className="mt-1 text-xs text-marfil-suave">
                {t.boletos.precioNormalLabel}{" "}
                <s className="text-marfil-suave/80">
                  {formatoMXN.format(boleto.precioNormal)}
                </s>
              </p>
            )}
          </>
        )}
      </div>

      <ul className="mt-4 space-y-1.5">
        {boleto.beneficios.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dorado" />
            <span className="text-marfil-suave">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {boleto.esPatrocinio ? (
          <a
            href={`mailto:${evento.contacto.correo}?subject=Quiero ser patrocinador — ${evento.nombre}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-dorado/50 px-6 text-sm font-medium text-dorado-claro transition-colors hover:border-dorado hover:bg-dorado/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro focus-visible:ring-offset-2 focus-visible:ring-offset-noche"
          >
            {t.boletos.contactar}
          </a>
        ) : (
          <Button
            className="w-full"
            variant={boleto.destacado ? "dorado" : "contorno"}
            onClick={() => iniciarCheckout(boleto.id)}
          >
            {t.boletos.comprar}
          </Button>
        )}
      </div>
    </div>
  );
}

export function BoletosModal() {
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState<string | undefined>(undefined);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const contenidoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function alAbrir(e: Event) {
      const detalle = (e as CustomEvent<DetalleAbrirBoletos>).detail;
      setAbierto(true);
      setResaltado(detalle?.tierId);
    }
    window.addEventListener(EVENTO_ABRIR_BOLETOS, alAbrir);
    return () => window.removeEventListener(EVENTO_ABRIR_BOLETOS, alAbrir);
  }, []);

  useEffect(() => {
    if (!abierto) return;

    const previoOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    function alTecla(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    window.addEventListener("keydown", alTecla);

    return () => {
      document.body.style.overflow = previoOverflow;
      window.removeEventListener("keydown", alTecla);
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto || !resaltado) return;
    const el = document.getElementById(`modal-boleto-${resaltado}`);
    el?.scrollIntoView({ block: "center" });
  }, [abierto, resaltado]);

  if (!abierto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="boletos-modal-titulo"
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
    >
      <div
        aria-hidden
        onClick={() => setAbierto(false)}
        className="absolute inset-0 bg-noche/85 backdrop-blur-sm"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-dorado/20 bg-noche-panel sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-noche-borde p-5 sm:p-6">
          <h2
            id="boletos-modal-titulo"
            className="font-display text-xl font-bold text-marfil sm:text-2xl"
          >
            {t.boletos.modalTitulo}
          </h2>
          <button
            ref={cerrarRef}
            type="button"
            onClick={() => setAbierto(false)}
            aria-label={t.boletos.modalCerrar}
            className="rounded-full p-2 text-marfil-suave transition-colors hover:bg-white/5 hover:text-marfil focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dorado-claro"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={contenidoRef}
          className="grid gap-4 overflow-y-auto p-5 sm:grid-cols-2 sm:p-6"
        >
          {boletos.map((b) => (
            <TarjetaBoletoModal
              key={b.id}
              boleto={b}
              resaltado={resaltado === b.id}
            />
          ))}
        </div>

        <p className="border-t border-noche-borde p-5 text-xs leading-relaxed text-marfil-suave sm:p-6">
          {notaLegal}
        </p>
      </div>
    </div>
  );
}
