import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getMarketingPage } from "@/lib/cms-marketing-loader";
import { record } from "@/lib/cms-collections";
import RecruitmentContent from "@/components/RecruitmentContent";
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getMarketingPage("recruitment", locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider
      messages={{
        ...messages,
        recruitment: page.copy.recruitment,
        contact: { ...record(messages.contact), form: page.copy.formLabels },
      }}
    >
      <RecruitmentContent page={page} />
    </NextIntlClientProvider>
  );
}
