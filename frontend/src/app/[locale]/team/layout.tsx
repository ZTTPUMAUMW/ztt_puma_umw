import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Zespół P.U.M.A. – Uniwersytet Medyczny we Wrocławiu",
    description:
      "Poznaj interdyscyplinarny zespół naukowców, doktorantów i studentów tworzących P.U.M.A. w Zakładzie Technologii Translacyjnych UMW.",
  };
  const en = {
    title: "P.U.M.A. Team – Medical University of Wrocław",
    description:
      "Meet the interdisciplinary team of researchers, doctoral students and undergraduates forming P.U.M.A. at the Department of Translational Technologies, MUW.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/team", title, description, ogType: "profile" });
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
