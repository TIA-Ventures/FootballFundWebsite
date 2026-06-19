import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Clara Vista Investment Partners",
  description:
    "We own exceptional football teams across the world in the most valuable leagues.",
};

export default function Home() {
  return (
    <>
      <Topbar activeNav="home" />
      <main id="main">
        <HomeHero />
      </main>
      <Footer />
    </>
  );
}
