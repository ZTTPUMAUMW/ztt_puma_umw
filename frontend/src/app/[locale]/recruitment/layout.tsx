import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const pl = {
    title: "Rekrutacja do zespołu P.U.M.A.",
    description:
      "Dołącz do zespołu P.U.M.A.! Sprawdź aktualne oferty pracy, staży i doktoratów w Zakładzie Technologii Translacyjnych UMW.",
  };
  const en = {
    title: "Join the P.U.M.A. Team – Recruitment",
    description:
      "Join P.U.M.A.! Check current job offers, internships and PhD positions at the Department of Translational Technologies, MUW.",
  };

  const { title, description } = locale === "en" ? en : pl;

  return buildPageMetadata({ locale, route: "/recruitment", title, description });
}

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
