import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Vehicles from "@/components/Vehicles";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Suburbs from "@/components/Suburbs";
import Footer from "@/components/Footer";
import Link from "next/link";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "UpFit",
  "description": "Mobile Apple CarPlay, Android Auto, dashcam, reverse camera and parking sensor installation across Australia. We come to you.",
  "url": "https://upfit.au",
  "telephone": "+61435508050",
  "email": "team@upfit.au",
  "areaServed": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
  "serviceType": ["Apple CarPlay Installation", "Android Auto Installation", "Dashcam Installation", "Reverse Camera Installation", "Parking Sensor Installation"],
  "priceRange": "$$",
  "sameAs": [],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <Vehicles />
      <HowItWorks />
      <Reviews />
      <Suburbs />

      {/* Final CTA */}
      <section className="px-10 py-24 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-5xl font-normal mb-4 leading-tight">
          Ready to{" "}
          <em className="italic text-accent not-italic font-serif">upgrade</em>
          <br />
          your drive?
        </h2>
        <p className="text-upfit-muted mb-9 text-base">
          Check your vehicle, book online in 2 minutes. We come to you.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium text-base px-7 py-3.5 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Check my vehicle →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
