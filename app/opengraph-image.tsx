import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mintah De Condenser — Free Browser Video Compressor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 24,
            display: "flex",
          }}
        >
          🎬
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-2px",
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Mintah De Condenser
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: 40,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Compress videos up to 90% smaller — free, private, browser-based
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          {["No Upload", "Works Offline", "MP4 · MOV · MKV · WebM", "Free"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "8px 20px",
                  color: "#e2e8f0",
                  fontSize: 18,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 22,
            color: "#64748b",
            letterSpacing: "0.05em",
          }}
        >
          condenser.codemintah.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
