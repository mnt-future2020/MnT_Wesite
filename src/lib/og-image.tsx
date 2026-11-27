import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * The share picture for a page: the card shown when a link is shared on
 * WhatsApp, LinkedIn, X and so on. 1200 x 630, light like the site: the logo top
 * left, the page's title big, one line under it, "mntfuture.com" at the bottom,
 * and soft blue glows in the corners. Built once when the site is built.
 * Each page's opengraph-image.tsx calls this with its own title.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// The logo never changes, so it is read once.
const logo = `data:image/png;base64,${await readFile(join(process.cwd(), "public/brand/logo.png"), "base64")}`;

export function ogImage({ title, line }: { title: string; line: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#f7f8fc",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(32,149,241,0.35) 0%, rgba(32,149,241,0) 45%), radial-gradient(circle at 100% 0%, rgba(124,192,247,0.45) 0%, rgba(124,192,247,0) 42%)",
          color: "#0c1a2e",
        }}
      >
        {/* The logo is 2828 x 546. Share pictures are drawn by next/og, which needs a plain <img>. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={311} height={60} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.3, color: "#556080", maxWidth: 960 }}>{line}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", width: 120, height: 8, borderRadius: 8, backgroundImage: "linear-gradient(90deg, #2095f1, #0f2d64)" }} />
          <div style={{ fontSize: 26, color: "#556080" }}>mntfuture.com</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
