import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Kontakt – ZTT P.U.M.A. UMW",
    description:
      "Skontaktuj się z zespołem P.U.M.A. w Zakładzie Technologii Translacyjnych Uniwersytetu Medycznego we Wrocławiu.",
  };
  const en = {
    title: "Contact – P.U.M.A. MUW",
    description:
      "Get in touch with the P.U.M.A. team at the Department of Translational Technologies, Medical University of Wrocław.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/contact", title, description });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
