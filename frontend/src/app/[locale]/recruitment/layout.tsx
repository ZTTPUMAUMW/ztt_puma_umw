import { getMarketingPage } from "@/lib/cms-marketing-loader";
import { buildPageMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getMarketingPage("recruitment", locale);
  return buildPageMetadata({
    locale,
    route: "/recruitment",
    title: page.seoTitle,
    description: page.seoDescription,
  });
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
