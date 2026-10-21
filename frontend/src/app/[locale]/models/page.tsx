import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getMarketingPage } from "@/lib/cms-marketing-loader";
import ModelsContent from "@/components/ModelsContent";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export default async function ModelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getCollectionPage("models", locale);
  const home = await getMarketingPage("home", locale);
  return (
    <NextIntlClientProvider
      messages={{ ...(await getMessages()), models: content.copy, home: home.copy.home }}
    >
      <ModelsContent modelsToRender={content.models} ctaButtons={home.ctaButtons} />
    </NextIntlClientProvider>
  );
}
