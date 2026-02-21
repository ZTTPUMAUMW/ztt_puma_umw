import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Wybrane Publikacje Naukowe – P.U.M.A.",
    description:
      "Dorobek naukowy zespołu P.U.M.A. w Zakładzie Technologii Translacyjnych Uniwersytetu Medycznego we Wrocławiu.",
  };
  const en = {
    title: "Selected Scientific Publications – P.U.M.A.",
    description:
      "Scientific achievements of the P.U.M.A. team at the Department of Translational Technologies, Medical University of Wrocław.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({
    locale,
    route: "/publications",
    title,
    description,
    ogType: "article",
  });
}

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
