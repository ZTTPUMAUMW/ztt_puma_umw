import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Współpraca z P.U.M.A. – ZTT UMW",
    description:
      "Nawiąż współpracę naukową i badawczą z Pracownią Unikalnych Modeli Aplikacyjnych P.U.M.A. Uniwersytetu Medycznego we Wrocławiu.",
  };
  const en = {
    title: "Collaborate with P.U.M.A. – MUW",
    description:
      "Establish scientific and research cooperation with the P.U.M.A. Laboratory at the Medical University of Wrocław.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/cooperation", title, description });
}

export default function CooperationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
