import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCollectionPage("models", locale);
  return buildPageMetadata({
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
