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
import { getTranslations } from "next-intl/server";

// TODO: Check how SanityCMS will handle translations for content that will being fetched from it. Admins will put data in polish, I need to prepare it to either put translations by hand or by click using some internal functionality of SanityCMS or other API. This is important to ensure that all content on the site is properly localized and provides a seamless experience for users in different languages.
export default async function Home() {
  const t = await getTranslations("featuredBanner");

  const bannerSlides = [
    {
      image: "/images/banner/banner_1.png",
      title: t("banner.title"),
      description: t("banner.description"),
      link: t("banner.link"),
    },
    {
      image: "/images/banner/banner_2.png",
      title: t("banner2.title"),
      description: t("banner2.description"),
      link: t("banner2.link"),
    },
  ];

  return (
    <>
      <HomeHero />

      <BannerSlider slides={bannerSlides} />

      <InfoCards />

      <Section>
        <Container width="content">
          <div className="wrapper">
            <ResearchAreas />
          </div>
        </Container>
      </Section>

      <FeatureBoxes />

      <QuickLinks />

      <GrantLogos />

      <CTASection />
    </>
  );
}
