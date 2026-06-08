import { redirect } from "next/navigation";

/** Legacy route — Italy diligence target is Frosinone Calcio. */
export default function ItalyPage() {
  redirect("/portfolio/frosinone");
}
