// app/services/carplay-installation/page.tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Apple CarPlay & Android Auto Installation Australia — UpFit",
  description:
    "Professional Apple CarPlay and Android Auto installation across Sydney, Melbourne, Brisbane, Perth and Adelaide. Activation module from $350 or full head unit from $450. Mobile service — we come to you.",
  alternates: {
    canonical: "https://upfit.au/services/carplay-installation",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Apple CarPlay & Android Auto Installation",
  "provider": { "@type": "LocalBusiness", "name": "UpFit", "url": "https://upfit.au", "telephone": "+61435508050" },
  "areaServed": "Australia",
  "description": "Professional Apple CarPlay and Android Auto installation. Module activation from $350 or full head unit upgrade from $450. Mobile service — we come to you.",
  "offers": [
    { "@type": "Offer", "name": "CarPlay Activation Module", "price": "350", "priceCurrency": "AUD" },
    { "@type": "Offer", "name": "CarPlay Full Head Unit", "price": "450", "priceCurrency": "AUD" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Will CarPlay work with my car?", "acceptedAnswer": { "@type": "Answer", "text": "CarPlay can be added to most vehicles manufactured after 2010 via a module activation or full head unit replacement. Check your vehicle on our website to confirm compatibility." } },
    { "@type": "Question", "name": "Do you supply the head unit?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we supply everything. Choose from standard, premium or premium+ units during booking. Price includes both the unit and installation." } },
    { "@type": "Question", "name": "How long does installation take?", "acceptedAnswer": { "@type": "Answer", "text": "Module activation takes around 1 hour. Full head unit replacement takes 1.5 to 2 hours depending on the vehicle." } },
    { "@type": "Question", "name": "Do I need to take my car to a workshop?", "acceptedAnswer": { "@type": "Answer", "text": "No. We come to your home, office or wherever the car is parked across Sydney, Melbourne, Brisbane, Perth and Adelaide." } },
    { "@type": "Question", "name": "Will the installation void my car's warranty?", "acceptedAnswer": { "@type": "Answer", "text": "No. We use OEM-compatible harness adaptors and don't cut any factory wiring. The installation is completely reversible." } },
  ],
};

export default function CarPlayPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <p className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · Australia-wide
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Apple CarPlay &amp; Android Auto
          <br />
          <em className="text-accent not-italic">installed at your door.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
          We retrofit CarPlay and Android Auto into any supported vehicle across Sydney, Melbourne, Brisbane, Perth and Adelaide.
          Factory-quality result, installed at your home or office.
          Module activation from $350. Full head unit from $450.
        </p>
        <Link
          href="/book?service=carplay"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Check your vehicle →
        </Link>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s included</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Head unit supply", body: "Choose from standard, premium or premium+ units. All include Apple CarPlay and Android Auto." },
            { title: "Professional installation", body: "Installed using OEM wiring harness adaptors. No cutting of factory wiring. Fully reversible." },
            { title: "12-month warranty", body: "All parts and labour covered for 12 months. If anything isn't right, we fix it at no cost." },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Compatible vehicles</p>
        <div className="space-y-6">
          {vehicles.slice(0, 4).map((brand) => (
            <div key={brand.slug}>
              <h3 className="text-sm font-medium text-upfit-text mb-3">{brand.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {brand.models.map((model) => (
                  <Link
                    key={model.slug}
                    href={`/${brand.slug}-${model.slug}/carplay-installation`}
                    className="bg-bg-2 border border-white/[0.08] rounded-lg p-4 hover:border-white/[0.2] transition-colors"
                  >
                    <p className="text-sm font-medium text-upfit-text mb-1">
                      {brand.name} {model.name}
                    </p>
                    <p className="text-xs text-upfit-muted">
                      {model.generations.map((g) => g.years).join(" · ")}
                    </p>
                    <p className="text-xs text-accent mt-1.5">
                      From ${Math.min(...model.generations.map((g) => g.carplayFrom))}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/vehicles" className="inline-block mt-6 text-sm text-upfit-muted hover:text-upfit-text transition-colors">
          View all supported vehicles →
        </Link>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Frequently asked questions</p>
        <div className="space-y-6 max-w-2xl">
          {[
            { q: "Will CarPlay work with my car?", a: "CarPlay can be retrofitted into most vehicles manufactured after 2010 using OEM-compatible wiring harness adaptors. Check your vehicle above to confirm compatibility." },
            { q: "Do you supply the head unit or do I need to buy one?", a: "We supply everything. Choose from three unit tiers during booking — standard, premium or premium+. Price includes both the unit and installation." },
            { q: "How long does installation take?", a: "Most installs take 1.5 to 2 hours. Older or more complex vehicles may take slightly longer. We'll give you an accurate estimate when you book." },
            { q: "Do I need to take my car to a workshop?", a: "No. We come to your home, office or wherever the car is parked across Sydney, Melbourne, Brisbane, Perth and Adelaide." },
            { q: "Will the installation void my car's warranty?", a: "No. We use OEM-compatible harness adaptors and don't cut any factory wiring. The installation is completely reversible." },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-6">
              <h3 className="text-base font-medium text-upfit-text mb-2">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">Ready to add CarPlay to your car?</h2>
        <p className="text-upfit-muted mb-8">Check your vehicle and book in 2 minutes.</p>
        <Link href="/book?service=carplay" className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
          Check my vehicle →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
