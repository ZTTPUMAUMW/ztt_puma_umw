import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekty badawcze P.U.M.A.",
  description:
    "Sprawdź nasze najważniejsze projekty naukowe, granty i innowacyjne badania realizowane przez zespół P.U.M.A.",
  openGraph: {
    title: "Projekty badawcze P.U.M.A.",
    description:
      "Sprawdź nasze najważniejsze projekty naukowe, granty i innowacyjne badania realizowane przez zespół P.U.M.A.",
    url: "https://next-puma-website.vercel.app/projects",
    images: [
      {
        url: "/images/meta/og_image.png",
        width: 1200,
        height: 630,
        alt: "Projekty P.U.M.A.",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projekty badawcze P.U.M.A.",
    description:
      "Sprawdź nasze najważniejsze projekty naukowe, granty i innowacyjne badania realizowane przez zespół P.U.M.A.",
    images: ["/images/meta/og_image.png"],
  },
};
