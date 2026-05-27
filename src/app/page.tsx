import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Clara Vista Investment Partners",
  description:
    "Data-driven sports investment — owning exceptional football clubs in the world's most valuable leagues. We invest. We build. We win.",
};

export default function Home() {
  return (
    <>
      <Topbar activeNav="home" showTagline />
      <main id="main">
        <HomeHero />
      </main>
      <Footer />
    </>
  );
}
