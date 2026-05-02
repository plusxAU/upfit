import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
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
  title: "UpFit — Apple CarPlay & Dashcam Installation Australia",
  description:
    "Mobile Apple CarPlay, Android Auto, dashcam, reverse camera and parking sensor installation across Australia. Fixed pricing on supported vehicles. We come to you.",
  keywords:
    "Apple CarPlay installation Sydney, dashcam installation Australia, reverse camera installation, CarPlay retrofit, Android Auto installation",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "UpFit — Your car, upgraded.",
    description:
      "Mobile auto electrical upgrades across Australia. Fixed pricing, same-week availability.",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-99GYV07S96"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-99GYV07S96');
          `}
        </Script>
        <Script id="hubspot-tracking" strategy="afterInteractive">
          {`
            var _hsq = window._hsq = window._hsq || [];
            _hsq.push(['setPath', window.location.pathname]);
            (function(d,s,id){
              var js,fjs=d.getElementsByTagName(s)[0];
              if(d.getElementById(id))return;
              js=d.createElement(s);js.id=id;
              js.src="//js.hs-scripts.com/443132944.js";
              fjs.parentNode.insertBefore(js,fjs);
            }(document,'script','hs-script-loader'));
          `}
        </Script>
      </head>
      <body className="bg-bg text-upfit-text font-sans antialiased overflow-x-hidden">
        <div className="w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
