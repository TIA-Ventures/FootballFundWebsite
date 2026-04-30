import type { Metadata } from "next";
import { SiteCursor } from "@/components/SiteCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clara Vista Investment Partners",
  description: "A football & technology investment fund.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400;1,6..72,500&family=Onest:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap"
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
