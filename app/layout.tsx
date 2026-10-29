import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iccbalayan.edu.ph"),
  title: {
    default: "Immaculate Conception College of Balayan, Inc.",
    template: "%s · ICC Balayan",
  },
  description:
    "A life-giving and innovating school community committed to transforming ICCnians into Christ-centered members of society. Elementary, junior high, senior high and college in Balayan, Batangas since 1935.",
  icons: {
    icon: [{ url: "/icc-logo.png", type: "image/png" }],
    apple: [{ url: "/icc-logo.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Immaculate Conception College of Balayan, Inc.",
    title: "Immaculate Conception College of Balayan, Inc.",
    description:
      "Catholic education in Balayan, Batangas since 1935 — elementary, junior high, senior high and college.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PH"
      className={`${cormorant.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-blue focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
