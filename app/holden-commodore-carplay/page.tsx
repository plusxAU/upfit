import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Holden Commodore CarPlay Installation — VE & VF | UpFit",
  description:
    "Apple CarPlay installation for Holden Commodore VE (2006–2013) and VF (2013–2017). MyLink activation module or full head unit upgrade. Mobile installation across Australia — we come to you.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Holden Commodore Apple CarPlay Installation",
  "provider": { "@type": "LocalBusiness", "name": "UpFit", "url": "https://upfit.au", "telephone": "+61435508050" },
  "areaServed": "Australia",
  "description": "Apple CarPlay and Android Auto installation for Holden Commodore VE and VF. MyLink activation module or full head unit upgrade. Mobile service.",
  "offers": [
    { "@type": "Offer", "name": "VF MyLink Activation Module", "price": "350", "priceCurrency": "AUD" },
    { "@type": "Offer", "name": "Full Head Unit Upgrade", "price": "470", "priceCurrency": "AUD" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you add CarPlay to a Holden Commodore VF?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — two ways. A MyLink activation module keeps your factory screen and adds wireless CarPlay from around $350. Or a full head unit replacement gives you a new premium screen from $470. Both are installed at your home or office." },
    },
    {
      "@type": "Question",
      "name": "Can you add CarPlay to a Holden Commodore VE?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — the VE Commodore (2006–2013) uses a full head unit replacement. OEM-compatible harness adaptors are available for both Series 1 and Series 2. Confirm whether your VE has single or dual zone climate control when booking as this affects the harness." },
    },
    {
      "@type": "Question",
      "name": "Does my Commodore have a Bose sound system?",
      "acceptedAnswer": { "@type": "Answer", "text": "SS, SS-V, Calais V and most HSV models have premium audio (Bose or similar). These require an advanced harness adaptor — add around $60–80 to the standard price. Mention your variant when booking and we'll confirm." },
    },
    {
      "@type": "Question",
      "name": "Do you come to me or do I need to bring the car somewhere?",
      "acceptedAnswer": { "@type": "Answer", "text": "We come to you — your driveway, workplace, or wherever the Commodore is parked. No workshops." },
    },
    {
      "@type": "Question",
      "name": "Will CarPlay installation void my Commodore's warranty?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. We use OEM-compatible harness adaptors — no cutting of factory wiring. The installation is fully reversible." },
    },
  ],
};

const models = [
  {
    name: "Commodore VF (2013–2017)",
    badge: "MyLink compatible",
    description: "The VF MyLink system can be upgraded two ways — a plug-in activation module that keeps your factory screen and adds wireless CarPlay, or a full premium head unit replacement for a bigger screen and more features.",
    options: [
      { name: "MyLink Activation Module", desc: "Keeps factory screen · Wireless CarPlay & Android Auto · Fully reversible · ~1 hour", from: 350 },
      { name: "Full Head Unit Upgrade", desc: "New 9\" screen · Wireless CarPlay & Android Auto · DAB+ · ~1.5 hours", from: 470 },
    ],
    note: "SS, SS-V, Calais V and HSV variants with Bose/premium audio require an advanced harness. Add ~$70 when booking.",
    href: "/holden-commodore-vf/carplay-installation",
  },
  {
    name: "Commodore VE (2006–2013)",
    badge: "Series 1 & 2 supported",
    description: "The VE Commodore gets a full head unit replacement using OEM-compatible harness adaptors. Works with both Series 1 (2006–2010) and Series 2 (2010–2013). Steering wheel controls retained.",
    options: [
      { name: "Full Head Unit Upgrade", desc: "New 9\" screen · Wireless CarPlay & Android Auto · DAB+ · ~1.5 hours", from: 480 },
    ],
    note: "Single zone vs dual zone climate control affects harness — we'll confirm your variant before the job.",
    href: "/holden-commodore-ve/carplay-installation",
  },
  {
    name: "HSV (all VE & VF based)",
    badge: "GTS, Clubsport, Senator, Maloo",
    description: "HSV models share the VE and VF Commodore platform — the same installation options apply. Almost all HSV variants have premium audio systems which require an advanced harness adaptor.",
    options: [
      { name: "VF HSV — MyLink Activation", desc: "Keeps factory screen · Wireless CarPlay · ~1 hour", from: 370 },
      { name: "VF HSV — Full Upgrade", desc: "New 9\" screen · Wireless CarPlay · ~1.5 hours", from: 490 },
      { name: "VE HSV — Full Upgrade", desc: "New 9\" screen · Wireless CarPlay · ~1.5 hours", from: 490 },
    ],
    note: "Advanced harness required on all HSV models — add ~$70. Mention HSV variant when booking.",
    href: "/holden-hsv/carplay-installation",
  },
];

export default function CommodoreCarPlayPage() {
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
          Holden Commodore
          <br />
          <em className="text-accent not-italic">CarPlay installation.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
          Apple CarPlay and Android Auto for VE and VF Commodores — including
          HSV variants. MyLink activation module or full head unit upgrade.
          We come to your driveway.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book?make=Holden"
            className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
          >
            Book an install →
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border border-white/[0.14] text-upfit-muted px-6 py-3 rounded-lg hover:border-white/[0.3] hover:text-upfit-text transition-colors"
          >
            Get a custom quote
          </Link>
        </div>
      </section>

      {/* Model sections */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Choose your Commodore</p>
        <div className="space-y-8">
          {models.map((model) => (
            <div key={model.name} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h2 className="font-serif text-2xl font-normal text-upfit-text">{model.name}</h2>
                <span className="text-xs text-accent border border-accent/25 px-3 py-1 rounded-full">{model.badge}</span>
              </div>
              <p className="text-sm text-upfit-muted leading-relaxed mb-5">{model.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {model.options.map((option) => (
                  <div key={option.name} className="bg-bg-3 border border-white/[0.06] rounded-lg p-4">
                    <p className="text-sm font-medium text-upfit-text mb-1">{option.name}</p>
                    <p className="text-xs text-upfit-muted mb-3 leading-relaxed">{option.desc}</p>
                    <p className="font-serif text-xl text-accent">From ${option.from}</p>
                  </div>
                ))}
              </div>
              {model.note && (
                <p className="text-xs text-upfit-faint bg-bg-3 rounded-lg px-3 py-2 inline-block mb-4">
                  ⚠ {model.note}
                </p>
              )}
              <Link
                href="/book?make=Holden"
                className="inline-flex items-center gap-1.5 text-sm text-accent font-medium border border-accent/25 px-4 py-2 rounded-md hover:bg-accent/[0.08] transition-all"
              >
                Book this install →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Why Commodore owners love this */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Why Commodore owners do this</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Keep driving what you love", body: "No reason to sell a great car just because it doesn't have CarPlay. The VE and VF are excellent platforms — add the tech, keep the drive." },
            { title: "Factory-quality result", body: "OEM harness adaptors, no cut wires, steering wheel controls retained. The finished install looks and feels like it came from the factory." },
            { title: "We come to your driveway", body: "No need to book a workshop or wait. We come to wherever the car is parked — usually done in 1 to 1.5 hours." },
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
          Ready to upgrade your Commodore?
        </h2>
        <p className="text-upfit-muted mb-8">
          Book online in 2 minutes. We come to your driveway.
        </p>
        <Link
          href="/book?make=Holden"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book Commodore CarPlay →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
