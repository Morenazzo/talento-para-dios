import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { evento } from "@/config/evento";

export const runtime = "nodejs";
export const alt = `${evento.nombre} — ${evento.tituloHero}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const imagen = readFileSync(
    join(process.cwd(), "public/img/convocatoria-escenario.jpg")
  );
  const src = `data:image/jpeg;base64,${imagen.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0A0A0A",
        }}
      >
        <img
          src={src}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            objectPosition: "top",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #0A0A0A 18%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.25) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: "60px 70px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#D4AF37",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#D4AF37",
              }}
            >
              Festival de Música Cristiana
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              color: "#F5F0E8",
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {evento.tituloHero}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: "#CFC9BD",
              gap: 16,
            }}
          >
            <div style={{ display: "flex" }}>{evento.fechaTexto}</div>
            <div style={{ display: "flex" }}>·</div>
            <div style={{ display: "flex" }}>{evento.ciudad}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
