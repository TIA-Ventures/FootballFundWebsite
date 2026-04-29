import { ClaraVistaMap } from "@/components/ClaraVistaMap";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <Topbar activeNav="home" showTagline />
      <ClaraVistaMap />
      <Footer />
    </>
  );
}
