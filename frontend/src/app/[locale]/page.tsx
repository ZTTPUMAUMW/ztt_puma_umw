import Container from "@/components/Container";
import Section from "@/components/Section";
import HomeHero from "@/components/HomeHero";
import BannerSlider from "@/components/BannerSlider";
import InfoCards from "@/components/InfoCards";
import ResearchAreas from "@/components/ResearchAreas";
import FeatureBoxes from "@/components/FeatureBoxes";
import QuickLinks from "@/components/QuickLinks";
import GrantLogos from "@/components/GrantLogos";
import CTASection from "@/components/CTASection";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getMarketingPage } from "@/lib/cms-marketing-loader";
import { buildPageMetadata } from "@/lib/seo";
import ScientificText from "@/components/ScientificText";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getMarketingPage("home", locale);
  return buildPageMetadata({
    locale,
    route: "/",
    title: page.seoTitle,
    description: page.seoDescription,
  });
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getMarketingPage("home", locale);
  return (
    <NextIntlClientProvider messages={{ ...(await getMessages()), ...page.copy }}>
      <HomeHero buttons={page.heroButtons} />
      <BannerSlider
        slides={page.banners.map((b) => ({
          ...b,
          description: <ScientificText text={b.description} />,
        }))}
      />
      <InfoCards items={page.infoCards} />
      <Section>
        <Container width="content">
          <div className="wrapper">
            <ResearchAreas items={page.researchAreas} />
          </div>
        </Container>
      </Section>
      <FeatureBoxes items={page.features} />
      <QuickLinks items={page.quickLinks} />
      <GrantLogos items={page.grantLogos} />
      <CTASection buttons={page.ctaButtons} />
    </NextIntlClientProvider>
  );
}
