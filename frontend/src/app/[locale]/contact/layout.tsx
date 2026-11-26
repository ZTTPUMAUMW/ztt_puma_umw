import type { Metadata } from "next";
import { websiteMetadata } from "@/lib/page-metadata";
import { getWebsiteContent } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { contact } = await getWebsiteContent(locale);
  return websiteMetadata({
    locale,
    route: "/contact",
    title: contact.seoTitle,
    description: contact.seoDescription,
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
