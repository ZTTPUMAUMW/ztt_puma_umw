import type { Metadata } from "next";
import { websiteMetadata } from "@/lib/page-metadata";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCollectionPage("publications", locale);
  return websiteMetadata({
    locale,
    route: "/publications",
    title: content.seoTitle,
    description: content.seoDescription,
    ogType: "article",
  });
}
export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
