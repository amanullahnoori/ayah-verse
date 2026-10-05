import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AyahVerse — Read, Listen & Bookmark the Holy Quran";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative geometric pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          opacity: 0.08,
        }}
      >
        {/* Top-left star pattern */}
        <svg
          viewBox="0 0 200 200"
          width="300"
          height="300"
          style={{ position: "absolute", top: -50, left: -50 }}
        >
          <polygon
            points="100,10 120,80 190,80 130,120 150,190 100,145 50,190 70,120 10,80 80,80"
            fill="white"
          />
        </svg>
        {/* Bottom-right star pattern */}
        <svg
          viewBox="0 0 200 200"
          width="250"
          height="250"
          style={{ position: "absolute", bottom: -40, right: -40 }}
        >
          <polygon
            points="100,10 120,80 190,80 130,120 150,190 100,145 50,190 70,120 10,80 80,80"
            fill="white"
          />
        </svg>
      </div>

      {/* Book icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: 24,
          background: "rgba(255,255,255,0.15)",
          marginBottom: 24,
          border: "2px solid rgba(255,255,255,0.25)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="56"
          height="56"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>

      {/* App Name */}
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 800,
          color: "white",
          letterSpacing: "-2px",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        AyahVerse
      </div>

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "rgba(255,255,255,0.85)",
          fontWeight: 400,
          letterSpacing: "0.5px",
        }}
      >
        Read, Listen & Bookmark the Holy Quran
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 40,
        }}
      >
        {["Arabic Text", "Translations", "Audio Recitation", "Offline"].map(
          (label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.9)",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ),
        )}
      </div>

      {/* Bottom branding bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background:
            "linear-gradient(90deg, #34d399 0%, #10b981 50%, #059669 100%)",
          display: "flex",
        }}
      />
    </div>,
    { ...size },
  );
}
