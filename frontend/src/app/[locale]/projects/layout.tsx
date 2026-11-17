import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = await getCollectionPage("projects", locale);
  return buildPageMetadata({
    locale,
    route: "/projects",
    title: content.seoTitle,
    description: content.seoDescription,
    ogType: "article",
  });
}
export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
