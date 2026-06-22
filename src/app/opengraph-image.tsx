import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card, generated at build time. Uses system fonts so it
// has no external font dependency.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FCFBF9",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#7f6335",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              background: "#957841",
              transform: "rotate(45deg)",
            }}
          />
          Clara Vista
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              color: "#111111",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            We own exceptional football teams in the most valuable leagues.
          </div>
          <div style={{ fontSize: 30, color: "rgba(17,17,17,0.6)" }}>
            A football &amp; technology investment fund
          </div>
        </div>
      </div>
    ),
    size,
  );
}
