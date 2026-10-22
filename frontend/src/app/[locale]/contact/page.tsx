import ContactContent from "@/components/ContactContent";
import { getWebsiteContent } from "@/lib/cms";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ContactContent content={await getWebsiteContent(locale)} />;
}
