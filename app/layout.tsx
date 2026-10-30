import type { Metadata, Viewport } from "next";
import { Literata, Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const sofiaXC = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia-xc",
  subsets: ["latin"],
  display: "swap",
});

const sofia = Sofia_Sans({
  variable: "--font-sofia",
  subsets: ["latin"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iccbalayan.edu.ph"),
  title: {
    default: "Immaculate Conception College of Balayan, Inc.",
    template: "%s | ICC Balayan",
  },
  description:
    "A Catholic school of the Augustinian Recollect Sisters on Plaza Mabini, Balayan, Batangas, since 1935. Elementary, junior high, senior high and college.",
  icons: {
    icon: [{ url: "/icc-logo.png", type: "image/png" }],
    apple: [{ url: "/icc-logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Immaculate Conception College of Balayan, Inc.",
    images: [{ url: "/school.jpg", width: 1833, height: 858 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2e2e8c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PH"
      data-scroll-behavior="smooth"
      className={`${sofiaXC.variable} ${sofia.variable} ${literata.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="type-ui sr-only z-50 bg-royal px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
