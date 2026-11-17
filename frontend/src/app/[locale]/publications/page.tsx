import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import PublicationsContent from "@/components/PublicationsContent";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getCollectionPage("publications", locale);
  return (
    <NextIntlClientProvider messages={{ ...(await getMessages()), publications: content.copy }}>
      <PublicationsContent publicationsData={content.publications} />
    </NextIntlClientProvider>
  );
}
