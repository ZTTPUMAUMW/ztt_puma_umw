import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rekrutacja do zespołuP.U.M.A.",
  description:
    "Dołącz do zespołuP.U.M.A.! Sprawdź aktualne oferty pracy, staży i doktoratów w Zakładzie Technologii Translacyjnych.",
  openGraph: {
    title: "Rekrutacja do zespołuP.U.M.A.",
    description:
      "Dołącz do zespołuP.U.M.A.! Sprawdź aktualne oferty pracy, staży i doktoratów w Zakładzie Technologii Translacyjnych.",
    url: "https://next-puma-website.vercel.app/recruitment",
    images: [
      {
        url: "/images/meta/og_image.png",
        width: 1200,
        height: 630,
        alt: "RekrutacjaP.U.M.A.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekrutacja do zespołuP.U.M.A.",
    description:
      "Dołącz do zespołuP.U.M.A.! Sprawdź aktualne oferty pracy, staży i doktoratów w Zakładzie Technologii Translacyjnych.",
    images: ["/images/meta/og_image.png"],
  },
};
