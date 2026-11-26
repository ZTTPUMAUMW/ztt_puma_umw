import type { Metadata } from "next";
import { websiteMetadata } from "@/lib/page-metadata";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCollectionPage("team", locale);
  return websiteMetadata({
    locale,
    route: "/team",
    title: content.seoTitle,
    description: content.seoDescription,
    ogType: "profile",
  });
}
export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
