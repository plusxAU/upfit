import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "UpFit — Apple CarPlay & Dashcam Installation Sydney",
  description:
    "Mobile Apple CarPlay, Android Auto, dashcam and reverse camera installation across Sydney. Fixed pricing on supported vehicles. We come to you.",
  keywords:
    "Apple CarPlay installation Sydney, dashcam installation Sydney, reverse camera Sydney, CarPlay retrofit Sydney",
  openGraph: {
    title: "UpFit — Your car, upgraded.",
    description:
      "Mobile auto electrical upgrades across Sydney. Fixed pricing, same-week availability.",
    url: "https://upfit.au",
    siteName: "UpFit",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="bg-bg text-upfit-text font-sans antialiased overflow-x-hidden">
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
