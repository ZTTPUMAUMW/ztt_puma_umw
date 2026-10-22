import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ProjectsContent from "@/components/ProjectsContent";
import { getCollectionPage } from "@/lib/cms-collection-loader";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = await getCollectionPage("projects", locale);
  return (
    <NextIntlClientProvider messages={{ ...(await getMessages()), projects: content.copy }}>
      <ProjectsContent projects={content.projects} />
    </NextIntlClientProvider>
  );
}
