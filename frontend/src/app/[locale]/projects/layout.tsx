import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Aktualne projekty badawcze P.U.M.A.",
    description:
      "Granty i współprace realizowane przez zespół P.U.M.A. w Zakładzie Technologii Translacyjnych UMW.",
  };
  const en = {
    title: "Current Research Projects – P.U.M.A.",
    description:
      "Grants and collaborations implemented by the P.U.M.A. team at the Department of Translational Technologies, MUW.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/projects", title, description, ogType: "article" });
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
