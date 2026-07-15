"use client";

import { useEffect, useState } from "react";
import { evento } from "@/config/evento";

interface Restante {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcularRestante(): Restante | null {
  const diferencia = new Date(evento.fecha).getTime() - Date.now();
  if (diferencia <= 0) return null;

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

const unidades: { clave: keyof Restante; etiqueta: string }[] = [
  { clave: "dias", etiqueta: "Días" },
  { clave: "horas", etiqueta: "Horas" },
  { clave: "minutos", etiqueta: "Min" },
  { clave: "segundos", etiqueta: "Seg" },
];

/**
 * Cuenta regresiva al Concierto de Adoración. Se calcula en el cliente para
 * evitar desajustes de hora entre servidor y navegador; el primer render
 * (SSR) queda vacío y se llena tras montar, sin bloquear el resto del Hero.
 */
export function Countdown() {
  const [restante, setRestante] = useState<Restante | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setRestante(calcularRestante());
    setListo(true);
    const id = setInterval(() => setRestante(calcularRestante()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!listo) return null;

  if (!restante) {
    return (
      <p className="text-sm font-medium uppercase tracking-widest text-dorado-claro">
        ¡Es esta noche!
      </p>
    );
  }

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`Faltan ${restante.dias} días, ${restante.horas} horas, ${restante.minutos} minutos y ${restante.segundos} segundos para el concierto`}
      className="flex items-start gap-3 sm:gap-5"
    >
      {unidades.map(({ clave, etiqueta }) => (
        <div key={clave} className="flex flex-col items-center">
          <span className="font-display text-3xl font-bold tabular-nums text-marfil sm:text-4xl">
            {String(restante[clave]).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-marfil-suave/80 sm:text-xs">
            {etiqueta}
          </span>
        </div>
      ))}
    </div>
  );
}
