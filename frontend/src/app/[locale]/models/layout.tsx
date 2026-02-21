import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Modele Badawcze – P.U.M.A.",
    description:
      "Innowacyjne systemy i organizmy modelowe stosowane w badaniach P.U.M.A. w Zakładzie Technologii Translacyjnych UMW.",
  };
  const en = {
    title: "Research Models – P.U.M.A.",
    description:
      "Innovative systems and model organisms used in P.U.M.A. research at the Department of Translational Technologies, MUW.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/models", title, description });
}

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
