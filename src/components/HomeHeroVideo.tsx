"use client";

import dynamic from "next/dynamic";

export const HomeHeroVideo = dynamic(
  () => import("@/components/HeroVideoBackdrop").then((m) => ({ default: m.HeroVideoBackdrop })),
  { ssr: false },
);
