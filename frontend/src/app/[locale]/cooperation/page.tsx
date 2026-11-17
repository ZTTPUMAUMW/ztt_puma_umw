import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getMarketingPage } from "@/lib/cms-marketing-loader";
import { record } from "@/lib/cms-collections";
import CooperationContent from "@/components/CooperationContent";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getMarketingPage("cooperation", locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider
      messages={{
        ...messages,
        cooperation: page.copy.cooperation,
        contact: { ...record(messages.contact), form: page.copy.formLabels },
      }}
    >
      <CooperationContent page={page} />
    </NextIntlClientProvider>
  );
}
