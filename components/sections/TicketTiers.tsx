import { Check, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BotonBoletos } from "@/components/BotonBoletos";
import { boletos, notaLegal, evento, type Boleto } from "@/config/evento";
import { getDiccionario } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = getDiccionario();

/** MXN sin decimales cuando el precio es cerrado ($450) y con ellos cuando no ($324.33). */
const formatoMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function TarjetaBoleto({ boleto }: { boleto: Boleto }) {
  return (
    <Card
      className={cn(
        "relative flex h-full flex-col",
        boleto.destacado &&
          "border-dorado/60 shadow-[0_0_48px_rgba(212,175,55,0.15)]"
      )}
    >
      {boleto.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant={boleto.destacado ? "dorado" : "contorno"}>
            {boleto.badge}
          </Badge>
        </div>
      )}

      <CardHeader className={cn(boleto.badge && "pt-8")}>
        <CardTitle className="font-display">{boleto.nombre}</CardTitle>
        <CardDescription>{boleto.descripcion}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
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
                  <span className="text-marfil">
                    {formatoMXN.format(boleto.precioNormal)}
                  </span>
                </p>
              )}
            </>
          )}
        </div>

        <ul className="space-y-2.5">
          {boleto.beneficios.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm">
              <Check
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0 text-dorado"
              />
              <span className="text-marfil-suave">{b}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        {/* Los paquetes de patrocinio se cotizan: van a contacto, no a Eventbrite. */}
        {boleto.esPatrocinio ? (
          <a
            href={`mailto:${evento.contacto.correo}?subject=Quiero ser patrocinador — ${evento.nombre}`}
            className={cn("w-full", buttonVariants({ variant: "contorno" }))}
          >
            {t.boletos.contactar}
          </a>
        ) : (
          <BotonBoletos
            className={cn(
              "w-full",
              buttonVariants({
                variant: boleto.destacado ? "dorado" : "contorno",
              })
            )}
          >
            {t.boletos.comprar}
          </BotonBoletos>
        )}
      </CardFooter>
    </Card>
  );
}

export function TicketTiers() {
  return (
    <section
      id="boletos"
      aria-labelledby="boletos-titulo"
      className="relative overflow-hidden bg-noche-carbon py-24 sm:py-32"
    >
      <div aria-hidden className="absolute inset-0 bg-destello-electrico-inv" />
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-dorado">
            {t.boletos.kicker}
          </p>
          <h2
            id="boletos-titulo"
            className="mt-4 font-display text-3xl font-bold leading-tight text-marfil sm:text-4xl lg:text-5xl"
          >
            {t.boletos.titulo}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-marfil-suave sm:text-lg">
            {t.boletos.intro}
          </p>
        </div>

        <div
          className={cn(
            "mt-14 grid gap-6 gap-y-10",
            boletos.length === 1
              ? "mx-auto max-w-md"
              : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {boletos.map((b) => (
            <TarjetaBoleto key={b.id} boleto={b} />
          ))}
        </div>

        {/* Nota legal — redacción precisa: preventa, no donativo */}
        <div className="mx-auto mt-14 flex max-w-3xl items-start gap-3 rounded-2xl border border-noche-borde bg-noche p-6">
          <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-electrico" />
          <div>
            <h3 className="text-sm font-semibold text-marfil">
              {t.boletos.notaLegalTitulo}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-marfil-suave">
              {notaLegal}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
