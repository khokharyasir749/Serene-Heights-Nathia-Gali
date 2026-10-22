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
  title: "Serene Heights Nathia Gali | 5-Star Hotel Suites & Luxury Residences · By DM Consortium",
  description:
    "Pakistan's premier 5-star mountain resort & luxury hotel apartments at 7,906 ft in Nathia Gali, by DM Consortium. 150+ suites across 30+ Kanals on Kala Bagh Air Base Road, offering 36-month flexible payment plans and high rental yield.",
  keywords: [
    "Serene Heights Nathia Gali",
    "Serene Heights",
    "Nathia Gali Hotel Apartments",
    "DM Consortium",
    "Fahad Masud Lone",
    "Kala Bagh Air Base Road",
    "Luxury Apartments Nathia Gali",
    "Real Estate Investment Pakistan",
  ],
  openGraph: {
    title: "Serene Heights Nathia Gali | 5-Star Resort Residences at 7,906 FT",
    description: "The Exceptional, Reserved For You. Pakistan's largest 5-star mountain resort by DM Consortium.",
    url: "https://www.sereneheightsnathiagali.com/nathiagali",
    siteName: "Serene Heights Nathia Gali",
    images: [
      {
        url: "/pictures/home/largestResort.png",
        width: 1200,
        height: 630,
        alt: "Serene Heights Nathia Gali Resort Render",
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
