// This is the root layout that redirects to the locale-specific layout
// RootLayout is required to support `notFound` and `metadata` at the app level

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
