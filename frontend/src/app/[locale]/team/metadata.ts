import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zespół P.U.M.A. - Uniwersytet Medyczny we Wrocławiu",
  description:
    "Poznaj nasz interdyscyplinarny zespół naukowców i współpracowników w Zakładzie Technologii Translacyjnych P.U.M.A..",
  openGraph: {
    title: "Zespół P.U.M.A. - Uniwersytet Medyczny we Wrocławiu",
    description:
      "Poznaj nasz interdyscyplinarny zespół naukowców i współpracowników w Zakładzie Technologii Translacyjnych P.U.M.A..",
    url: "https://next-puma-website.vercel.app/team",
    images: [
      {
        url: "/images/meta/og_image.png",
        width: 1200,
        height: 630,
        alt: "Zespół P.U.M.A.",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zespół P.U.M.A. - Uniwersytet Medyczny we Wrocławiu",
    description:
      "Poznaj nasz interdyscyplinarny zespół naukowców i współpracowników w Zakładzie Technologii Translacyjnych P.U.M.A..",
    images: ["/images/meta/og_image.png"],
  },
};
