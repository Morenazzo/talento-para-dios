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
import { BotonAbrirBoletos } from "@/components/BotonAbrirBoletos";
import { boletos, notaLegal, type Boleto } from "@/config/evento";
import { getDiccionario } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const t = getDiccionario();

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
        <BotonAbrirBoletos
          tierId={boleto.id}
          className={cn(
            "w-full",
            buttonVariants({ variant: boleto.destacado ? "dorado" : "contorno" })
          )}
        >
          {t.boletos.verOpciones}
        </BotonAbrirBoletos>
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

        <div className="mt-14 grid gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
