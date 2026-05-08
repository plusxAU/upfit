import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Reverse Camera Installation Australia — UpFit",
  description:
    "Professional reverse camera installation across Sydney, Melbourne, Brisbane, Perth and Adelaide. Wired to your existing or new display. Mobile service from $220.",
  alternates: {
    canonical: "https://upfit.au/services/reverse-camera-installation",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Reverse Camera Installation",
  "provider": { "@type": "LocalBusiness", "name": "UpFit", "url": "https://upfit.au", "telephone": "+61435508050" },
  "areaServed": "Australia",
  "description": "Professional reverse camera installation. Wired to existing display or new head unit. Activates automatically in reverse. Mobile service across Australia.",
  "offers": { "@type": "Offer", "price": "220", "priceCurrency": "AUD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "My car doesn't have a screen — can you still install a reverse camera?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can install a new display as part of a reverse camera package, or bundle it with a CarPlay retrofit so you get both at once." } },
    { "@type": "Question", "name": "How long does reverse camera installation take?", "acceptedAnswer": { "@type": "Answer", "text": "A standalone reverse camera install typically takes around 45 minutes. We come to you — home, office, or wherever the car is parked." } },
    { "@type": "Question", "name": "Will there be visible wiring?", "acceptedAnswer": { "@type": "Answer", "text": "No. All wiring is routed through the vehicle body. The finished result is clean and looks factory-fitted." } },
    { "@type": "Question", "name": "Do you offer a reverse camera + CarPlay bundle?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — booking CarPlay and a reverse camera together is the most popular combination and saves time. The reverse camera input is included with all our CarPlay head units." } },
  ],
};

export default function RevcamPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · Australia-wide
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Reverse camera
          <br />
          <em className="text-accent not-italic">installed at your door.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
          Wired reverse camera integrated with your existing display or a new screen — across
          Sydney, Melbourne, Brisbane, Perth and Adelaide.
          Crystal clear image, professional install. From $220.
        </p>
        <Link href="/book?service=revcam" className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
          Check your vehicle →
        </Link>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s included</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Camera supplied + fitted", body: "High-resolution reverse camera supplied and professionally mounted at the rear of your vehicle. Wired through the body panels — no exposed cables." },
            { title: "Integrated with your display", body: "Wired to your existing head unit if it has a reverse camera input. If not, we can install a new display as part of a CarPlay + reverse camera bundle." },
            { title: "Triggers on reverse", body: "Camera automatically activates when you select reverse gear. No buttons to press, no app to open." },
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {vehicles.map((brand) => (
            <div key={brand.slug} className="bg-bg-2 border border-white/[0.08] rounded-lg p-4">
              <p className="text-sm font-medium text-upfit-text mb-1">{brand.name}</p>
              <p className="text-xs text-upfit-muted leading-relaxed">{brand.models.map((m) => m.name).join(" · ")}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-upfit-muted mt-4">
          Reverse camera installation is available on virtually all vehicles.{" "}
          <Link href="/quote" className="text-accent">Request a quote</Link> for unlisted models.
        </p>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Frequently asked questions</p>
        <div className="space-y-5 max-w-2xl">
          {[
            { q: "My car doesn't have a screen — can you still install a reverse camera?", a: "Yes. We can install a new display as part of a reverse camera package, or bundle it with a CarPlay retrofit so you get both at once." },
            { q: "How long does installation take?", a: "A standalone reverse camera install typically takes around 45 minutes. We come to you — home, office, or wherever the car is parked." },
            { q: "Will there be visible wiring?", a: "No. All wiring is routed through the vehicle body. The finished result is clean and looks factory-fitted." },
            { q: "Do you offer a reverse camera + CarPlay bundle?", a: "Yes — booking CarPlay and a reverse camera together is the most popular combination and saves time. The reverse camera input is included with all our CarPlay head units." },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">Ready to add a reverse camera?</h2>
        <p className="text-upfit-muted mb-8">Book online in 2 minutes. We come to you.</p>
        <Link href="/book?service=revcam" className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
          Book reverse camera install →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
