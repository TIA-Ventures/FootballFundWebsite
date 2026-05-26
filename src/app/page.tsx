import { HomeHero } from "@/components/HomeHero";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <Topbar activeNav="home" showTagline />
      <HomeHero />
      <Footer />
    </>
  );
}
