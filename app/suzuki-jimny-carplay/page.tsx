import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Suzuki Jimny CarPlay Installation (2018–2025) | UpFit",
  description:
    "Apple CarPlay installation for Suzuki Jimny 2018–2025. Plug and play, no cutting wires. Mobile installation across Australia — we come to you. From $450.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Suzuki Jimny Apple CarPlay Installation",
  "provider": { "@type": "LocalBusiness", "name": "UpFit", "url": "https://upfit.au", "telephone": "+61435508050" },
  "areaServed": "Australia",
  "description": "Apple CarPlay and Android Auto installation for Suzuki Jimny 2018–2025. Plug and play harness, steering wheel controls retained. Mobile service — we come to you.",
  "offers": { "@type": "Offer", "price": "450", "priceCurrency": "AUD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you add CarPlay to a Suzuki Jimny?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — plug and play head unit kits are available for Jimny 2018–2025 (JB74 generation). No wire cutting, no dashboard modification. Steering wheel controls are retained. We install at your location." },
    },
    {
      "@type": "Question",
      "name": "What size screen fits in a Jimny?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most Jimny owners choose a 9\" or larger screen. Custom fascia kits are available in sizes from 9\" to 13.3\" specifically for the Jimny dashboard — some filling the full centre console space for a dramatic upgrade." },
    },
    {
      "@type": "Question",
      "name": "Does CarPlay work with both manual and automatic Jimny?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the head unit installation is the same regardless of transmission. Both manual and digital air conditioning control variants are supported." },
    },
    {
      "@type": "Question",
      "name": "Will you come to me for the install?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — we come to your home, office, campsite, or wherever the Jimny is parked. Installation typically takes around 1.5 hours." },
    },
    {
      "@type": "Question",
      "name": "What about the older Jimny (pre-2018)?",
      "acceptedAnswer": { "@type": "Answer", "text": "The pre-2018 Jimny (JB43 generation) is also supported with a different fascia kit. Request a quote and we'll confirm compatibility for your year." },
    },
  ],
};

export default function JimnyCarPlayPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          Mobile installation · Australia-wide
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Suzuki Jimny
          <br />
          <em className="text-accent not-italic">CarPlay installation.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
          Plug and play Apple CarPlay and Android Auto for Jimny 2018–2025.
          No wire cutting, steering wheel controls retained. We come to you —
          your driveway, your campsite, wherever the Jimny lives.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book?make=Suzuki&model=Jimny"
            className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Book Jimny CarPlay →
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border border-white/[0.14] text-upfit-muted px-6 py-3 rounded-lg hover:border-white/[0.3] hover:text-upfit-text transition-colors"
          >
            Not sure? Get a quote
          </Link>
        </div>
      </section>

      {/* Pricing by generation */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Jimny CarPlay options</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              gen: "Jimny 2018–2025 (JB74)",
              badge: "Most popular",
              desc: "Current generation Jimny. Plug and play harness — no modifications to factory wiring. Choose from standard 9\" through to large format screens that fill the centre console.",
              options: [
                { name: "Standard upgrade (9\")", from: 450 },
                { name: "Premium upgrade (9\" wireless)", from: 580 },
                { name: "Large format (11.5\"–13.3\")", from: 650 },
              ],
              note: "Both manual and digital AC variants supported. RHD Australian models only.",
            },
            {
              gen: "Jimny pre-2018 (JB43)",
              badge: "Also supported",
              desc: "Previous generation Jimny. Different dashboard configuration — a custom fascia kit is required. Request a quote to confirm your specific year.",
              options: [
                { name: "Standard upgrade (9\")", from: 470 },
                { name: "Premium upgrade (9\" wireless)", from: 600 },
              ],
              note: "Request a quote — we'll confirm the right fascia kit for your year before booking.",
            },
          ].map((item) => (
            <div key={item.gen} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-serif text-xl font-normal text-upfit-text">{item.gen}</h2>
                <span className="text-xs text-accent border border-accent/25 px-3 py-1 rounded-full flex-shrink-0">{item.badge}</span>
              </div>
              <p className="text-sm text-upfit-muted leading-relaxed mb-4">{item.desc}</p>
              <div className="space-y-2 mb-4">
                {item.options.map((option) => (
                  <div key={option.name} className="flex justify-between items-center py-2 border-b border-white/[0.06] last:border-0">
                    <span className="text-sm text-upfit-text">{option.name}</span>
                    <span className="text-sm text-accent font-medium">From ${option.from}</span>
                  </div>
                ))}
              </div>
              {item.note && (
                <p className="text-xs text-upfit-faint bg-bg-3 rounded-lg px-3 py-2 mb-4">
                  {item.note}
                </p>
              )}
              <Link
                href={item.gen.includes("pre-2018") ? "/quote" : "/book?make=Suzuki&model=Jimny"}
                className="inline-flex items-center gap-1.5 text-sm text-accent font-medium border border-accent/25 px-4 py-2 rounded-md hover:bg-accent/[0.08] transition-all"
              >
                {item.gen.includes("pre-2018") ? "Request a quote →" : "Book this install →"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s included</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Plug and play", body: "OEM wiring harness adaptor means no cutting of factory wiring. The install is completely reversible and won't affect any factory systems." },
            { title: "Steering wheel controls", body: "Your Jimny's steering wheel controls for volume and track remain fully mapped on the new head unit." },
            { title: "Wireless CarPlay & Android Auto", body: "No cables. Connect your phone once and it pairs automatically every time you start the car." },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Common questions</p>
        <div className="space-y-5 max-w-2xl">
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.name}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Ready to upgrade your Jimny?
        </h2>
        <p className="text-upfit-muted mb-8">
          Book online in 2 minutes. We come to you.
        </p>
        <Link
          href="/book?make=Suzuki&model=Jimny"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book Jimny CarPlay →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
