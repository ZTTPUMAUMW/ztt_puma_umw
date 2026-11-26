import type { Metadata } from "next";
import { websiteMetadata } from "@/lib/page-metadata";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCollectionPage("models", locale);
  return websiteMetadata({
    locale,
    route: "/models",
    title: content.seoTitle,
    description: content.seoDescription,
    ogType: "website",
  });
}
export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
