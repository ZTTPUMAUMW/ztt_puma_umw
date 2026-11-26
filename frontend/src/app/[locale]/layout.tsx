import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isEditorialReview } from "@/lib/editorial-session";
import { BASE_URL, buildAlternates } from "@/lib/seo";
import "../globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSharedContent } from "@/lib/cms-shared-loader";
import { getWebsiteContent } from "@/lib/cms";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const { socialImage } = await getSharedContent("shell", locale);
  const title =
    locale === "en"
      ? "DOTT P.U.M.A. - Medical University of Wrocław"
      : "ZTT P.U.M.A. - Uniwersytet Medyczny we Wrocławiu";
  const description =
    locale === "en"
      ? "Department of Translational Technologies. Laboratory of Unique Application Models"
      : "Zakład Technologii Translacyjnych. Pracownia Unikalnych Modeli Aplikacyjnych";

  const url = locale === "pl" ? BASE_URL : `${BASE_URL}/en`;

  return {
    robots: (await isEditorialReview()) ? { index: false, follow: false } : undefined,
    metadataBase: new URL(BASE_URL),
    title,
    description,
    icons: {
      icon: "/images/meta/favicon.ico",
      shortcut: "/images/meta/favicon.ico",
      apple: "/images/meta/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ZTT P.U.M.A.",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "ZTT P.U.M.A. logo",
        },
      ],
      locale: locale === "en" ? "en_US" : "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    alternates: buildAlternates(locale, "/"),
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const [{ settings }, chrome] = await Promise.all([
    getWebsiteContent(locale),
    getSharedContent("shell", locale),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={roboto.variable}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-main">
            {chrome.copy.skip}
          </a>
          {(await draftMode()).isEnabled ? (
            <aside role="status">
              {locale === "en"
                ? "Unpublished draft · Forms disabled"
                : "Wersja robocza · Formularze wyłączone"}{" "}
              <form method="post" action="/api/editorial/exit">
                <button>{locale === "en" ? "Exit preview" : "Zakończ podgląd"}</button>
              </form>
            </aside>
          ) : (
            (await isEditorialReview()) && (
              <aside
                role="note"
                style={{
                  padding: "0.75rem 1rem",
                  background: "#fff3cd",
                  color: "#493b11",
                  textAlign: "center",
                }}
              >
                {locale === "en"
                  ? "Development review — CMS changes affect this preview only. Email delivery is disabled."
                  : "Wersja testowa — zmiany w CMS dotyczą tylko tego podglądu. Wysyłanie wiadomości jest wyłączone."}
              </aside>
            )
          )}
          <Header chrome={chrome} />
          <main id="main-content">{children}</main>
          <Footer settings={settings} chrome={chrome} />
          {!(await isEditorialReview()) && <Analytics />}
          {!(await isEditorialReview()) && <SpeedInsights />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
