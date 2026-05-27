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
    document.documentElement.removeAttribute('data-font-preset');
  } else {
    var k = 'cv-font-preset';
    var allow = { signal: 1, meridian: 1, pulse: 1, apex: 1, vertex: 1, ion: 1, axis: 1 };
    var v = localStorage.getItem(k);
    if (!v) {
      var o = localStorage.getItem('cv-font-sans');
      if (o === 'onest') v = 'clara-vista';
      else if (o === 'space-grotesk') v = 'signal';
      else if (o === 'plus-jakarta') v = 'meridian';
      else if (o === 'manrope') v = 'pulse';
      if (v) {
        localStorage.setItem(k, v);
        localStorage.removeItem('cv-font-sans');
      }
    }
    if (v === 'clara-vista') {
      document.documentElement.setAttribute('data-font-preset', 'clara-vista');
      document.documentElement.removeAttribute('data-fonts');
    } else if (v && allow[v]) {
      document.documentElement.setAttribute('data-font-preset', v);
      document.documentElement.removeAttribute('data-fonts');
    } else {
      document.documentElement.setAttribute('data-fonts', 'd6');
      document.documentElement.removeAttribute('data-font-preset');
    }
  }
} catch (e) {}
`;

/** Loads the full font catalog after first paint (font picker / alternate presets). */
const FONT_CATALOG_DEFER = `
(function () {
  var id = 'cv-font-catalog';
  if (document.getElementById(id)) return;
  var link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = '/fonts/catalog.css';
  link.media = 'print';
  link.onload = function () { link.media = 'all'; };
  document.head.appendChild(link);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day" data-fonts="d6" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FONT_PRESET_BOOT }} />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Default bundle (d6): Switzer + JetBrains Mono — only blocking fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: FONT_CATALOG_DEFER }} />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
        <SiteCursor />
      </body>
    </html>
  );
}
