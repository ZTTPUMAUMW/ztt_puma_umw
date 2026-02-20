import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  const baseUrl = "https://next-puma-website.vercel.app";
  const title =
    locale === "en"
      ? "DOTT P.U.M.A. - Medical University of Wrocław"
      : "ZTT P.U.M.A. - Uniwersytet Medyczny we Wrocławiu";
  const description =
    locale === "en"
      ? "Department of Translational Technologies. Laboratory of Unique Application Models"
      : "Zakład Technologii Translacyjnych. Pracownia Unikalnych Modeli Aplikacyjnych";

  return {
    metadataBase: new URL(baseUrl),
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
      url: locale === "en" ? `${baseUrl}/en` : baseUrl,
      siteName: "ZTT P.U.M.A.",
      images: [
        {
          url: "/images/meta/og_image.png",
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
      images: ["/images/meta/og_image.png"],
    },
    alternates: {
      canonical: locale === "pl" ? baseUrl : undefined,
      languages: {
        pl: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={roboto.variable}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-main">
            {locale === "en" ? "Skip to main content" : "Przejdź do treści głównej"}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
