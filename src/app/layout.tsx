import type { Metadata } from "next";
import { SiteCursor } from "@/components/SiteCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clara Vista Investment Partners",
  description: "A football & technology investment fund.",
};

const FONT_PRESET_BOOT = `
try {
  var bundleKey = 'cv-font-bundle';
  var bundleAllow = { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1, d1: 1, d2: 1, d3: 1, d4: 1, d5: 1, d6: 1 };
  var fb = localStorage.getItem(bundleKey);
  if (fb && bundleAllow[fb]) {
    document.documentElement.setAttribute('data-fonts', fb);
  } else {
    var k = 'cv-font-preset';
    var allow = { signal: 1, meridian: 1, pulse: 1, apex: 1, vertex: 1, ion: 1, axis: 1 };
    var v = localStorage.getItem(k);
    if (!v) {
      var o = localStorage.getItem('cv-font-sans');
      if (o === 'space-grotesk') v = 'signal';
      else if (o === 'plus-jakarta') v = 'meridian';
      else if (o === 'manrope') v = 'pulse';
      if (v) {
        localStorage.setItem(k, v);
        localStorage.removeItem('cv-font-sans');
      }
    }
    if (v && allow[v]) document.documentElement.setAttribute('data-font-preset', v);
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_PRESET_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link rel="preconnect" href="https://unpkg.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fraunces:ital,opsz,wght@0,72,300;0,72,400;0,72,500;0,72,600;1,72,300;1,72,400;1,72,500;1,72,600&family=IBM+Plex+Mono:wght@300;400&family=JetBrains+Mono:wght@300;400&family=Manrope:wght@300;400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400;1,6..72,500&family=Onest:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Source+Serif+4:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Space+Grotesk:wght@300;400;500;600&family=Space+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Fira+Mono:wght@400;500&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Literata:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&family=Red+Hat+Mono:wght@300;400&family=Roboto+Mono:wght@300;400&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Sora:wght@300;400;500;600&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Onest:wght@300;400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@300;400&family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=switzer@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/@fontsource-variable/mona-sans@5.2.8/index.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/@fontsource-variable/hubot-sans@5.2.8/index.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
        <SiteCursor />
      </body>
    </html>
  );
}
