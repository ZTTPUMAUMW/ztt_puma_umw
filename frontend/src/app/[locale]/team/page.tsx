import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import TeamContent from "@/components/TeamContent";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getCollectionPage("team", locale);
  return (
    <NextIntlClientProvider messages={{ ...(await getMessages()), team: content.copy }}>
      <TeamContent teamMembers={content.team} />
    </NextIntlClientProvider>
  );
}
