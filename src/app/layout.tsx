import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Nathia Reserve | Luxury Apartments in Nathia Gali · By Elevate Holdings",
  description:
    "A hotel-operated rental investment in Nathia Gali, by Elevate Holdings. 133 residences at 7,900 ft on the main Nathia Gali road, all managed inside one full-service hotel, open all four seasons.",
  keywords: [
    "The Nathia Reserve",
    "Nathia Gali",
    "Luxury Apartments Nathia Gali",
    "Elevate Holdings",
    "Ayubia National Park",
    "Hotel Apartments Pakistan",
    "Real Estate Investment Pakistan",
  ],
  openGraph: {
    title: "The Nathia Reserve | Luxury Residences at 7,900 ft",
    description: "The Exceptional, Reserved For You. Pakistan's most premium apartment hotel.",
    url: "https://thenathiareserve.com",
    siteName: "The Nathia Reserve",
    images: [
      {
        url: "/img/day-1830-lg.webp",
        width: 1200,
        height: 630,
        alt: "The Nathia Reserve Sunset View",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${instrument.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-[#0c0f0d] text-[#efe9df] antialiased selection:bg-[#c3a78e] selection:text-[#0c0f0d] relative min-h-screen">
        {/* Subtle noise grain texture overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 grain-overlay opacity-40 mix-blend-overlay" />
        {children}
      </body>
    </html>
  );
}
