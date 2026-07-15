"use client";

import type { ButtonHTMLAttributes } from "react";
import type { TipoBoleto } from "@/config/evento";

export const EVENTO_ABRIR_BOLETOS = "abrir-boletos-modal";

export interface DetalleAbrirBoletos {
  tierId?: TipoBoleto;
}

/** Dispara el evento global que abre el BoletosModal (montado en el layout raíz). */
export function abrirBoletos(tierId?: TipoBoleto) {
  window.dispatchEvent(
    new CustomEvent<DetalleAbrirBoletos>(EVENTO_ABRIR_BOLETOS, {
      detail: { tierId },
    })
  );
}

interface BotonAbrirBoletosProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  /** Si se indica, el modal resalta/desplaza a ese boleto en específico. */
  tierId?: TipoBoleto;
}

/**
 * Botón client-side reutilizable dentro de componentes de servidor (Hero,
 * CTAFinal, AdopcionSection, etc.) para abrir el modal de boletos sin
 * convertir esos componentes en "use client".
 */
export function BotonAbrirBoletos({
  tierId,
  className,
  children,
  ...props
}: BotonAbrirBoletosProps) {
  return (
    <button
      type="button"
      onClick={() => abrirBoletos(tierId)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
