import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { states } from "@/components/Suburbs";

const allSuburbs = states.flatMap((s) => s.suburbs);

function getCityForSuburb(suburb: string): string {
  return states.find((s) => s.suburbs.includes(suburb))?.city ?? "Australia";
}

function getNearbySuburbs(suburb: string, count = 6): string[] {
  const state = states.find((s) => s.suburbs.includes(suburb));
  if (!state) return [];
  return state.suburbs.filter((s) => s !== suburb).slice(0, count);
}
import type { Metadata } from "next";

type Props = { params: Promise<{ suburb: string }> };

const serviceConfig = {
  "carplay-installation": {
    label: "Apple CarPlay installation",
    short: "CarPlay",
    fromPrice: 450,
    description: "Apple CarPlay and Android Auto retrofit",
    serviceSlug: "carplay-installation",
  },
  "dashcam-installation": {
    label: "Dashcam installation",
    short: "Dashcam",
    fromPrice: 280,
    description: "Front and rear dashcam installation",
    serviceSlug: "dashcam-installation",
  },
  "reverse-camera-installation": {
    label: "Reverse camera installation",
    short: "Reverse cam",
    fromPrice: 220,
    description: "Reverse camera installation",
    serviceSlug: "reverse-camera-installation",
  },
  "parking-sensors": {
    label: "Parking sensor installation",
    short: "Parking sensors",
    fromPrice: 220,
    description: "Front and rear parking sensor installation",
    serviceSlug: "parking-sensors",
  },
} as const;

type ServiceSlug = keyof typeof serviceConfig;

function parseSuburbSlug(slug: string): { suburb: string; service: ServiceSlug } | null {
  for (const serviceSlug of Object.keys(serviceConfig) as ServiceSlug[]) {
    const prefix = `${serviceSlug}-`;
    if (slug.startsWith(prefix)) {
      const suburbSlug = slug.slice(prefix.length);
      const name = allSuburbs.find(
        (s) => s.toLowerCase().replace(/\s+/g, "-") === suburbSlug
      );
      if (name) return { suburb: name, service: serviceSlug };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb: slugParam } = await params;
  const parsed = parseSuburbSlug(slugParam);
  if (!parsed) return {};
  const config = serviceConfig[parsed.service];
  const city = getCityForSuburb(parsed.suburb);
  return {
    title: `${config.label} ${parsed.suburb} — Mobile, We Come to You`,
    description: `Professional ${config.label.toLowerCase()} in ${parsed.suburb}, ${city}. Mobile service — we come to your home or office. Fixed pricing from $${config.fromPrice}. Same-week availability.`,
    alternates: {
      canonical: `https://upfit.au/area/${slugParam}`,
    },
  };
}

export async function generateStaticParams() {
  const params: { suburb: string }[] = [];
  for (const suburb of allSuburbs) {
    const suburbSlug = suburb.toLowerCase().replace(/\s+/g, "-");
    for (const serviceSlug of Object.keys(serviceConfig)) {
      params.push({ suburb: `${serviceSlug}-${suburbSlug}` });
    }
  }
  return params;
}

export default async function SuburbPage({ params }: Props) {
  const { suburb: slugParam } = await params;
  const parsed = parseSuburbSlug(slugParam);
  if (!parsed) notFound();

  const { suburb, service } = parsed;
  const config = serviceConfig[service];
  const city = getCityForSuburb(suburb);
  const nearbySuburbs = getNearbySuburbs(suburb, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${config.label} in ${suburb}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "UpFit",
      "url": "https://upfit.au",
      "telephone": "+61435508050",
      "email": "team@upfit.au",
    },
    "areaServed": {
      "@type": "City",
      "name": suburb,
      "containedInPlace": { "@type": "State", "name": city },
    },
    "description": `Professional ${config.description.toLowerCase()} in ${suburb}, ${city}. Mobile service — we come to you. Fixed pricing from $${config.fromPrice}.`,
    "offers": {
      "@type": "Offer",
      "price": String(config.fromPrice),
      "priceCurrency": "AUD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does ${config.label.toLowerCase()} cost in ${suburb}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${config.label} in ${suburb} starts from $${config.fromPrice}. Final price depends on your vehicle make, model, and year — check your vehicle on our website for your exact price.`,
        },
      },
      {
        "@type": "Question",
        "name": `Do you come to ${suburb} for installations?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes — we come directly to you in ${suburb}. Your installer arrives at your home, office, or wherever your car is parked. No need to drop the car anywhere.`,
        },
      },
      {
        "@type": "Question",
        "name": "How long does the installation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most installations take between 45 minutes and 2 hours depending on the service and vehicle. We'll confirm timing when you book.",
        },
      },
      {
        "@type": "Question",
        "name": "Is there a warranty on the installation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — all UpFit installations come with a 12-month parts and labour warranty. If anything isn't right, we'll fix it at no cost.",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      {/* Hero */}
      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · {suburb} · {city}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          {config.label}
          <br />
          <em className="text-accent not-italic">in {suburb}.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-3 max-w-xl">
          Professional {config.description.toLowerCase()} in {suburb}, {city}.
          We come to your home, office, or wherever the car is parked.
          Fixed pricing from ${config.fromPrice} — no surprises.
        </p>
        <p className="text-accent font-serif text-2xl mb-8">From ${config.fromPrice}</p>
        <Link
          href={`/book?suburb=${encodeURIComponent(suburb)}&service=${service}`}
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book in {suburb} →
        </Link>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">How it works in {suburb}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
          {[
            {
              num: "01",
              title: "Book online",
              body: `Select your vehicle, pick a time that suits, and confirm your address in ${suburb}. No phone calls needed.`,
            },
            {
              num: "02",
              title: "We come to you",
              body: `Your installer drives to ${suburb} — home, office, or wherever your car is parked. You don't need to go anywhere.`,
            },
            {
              num: "03",
              title: "Drive away upgraded",
              body: "Installation takes 45 minutes to 2 hours. Clean, professional finish that looks completely factory-fitted.",
            },
          ].map((step) => (
            <div key={step.num}>
              <p className="font-serif text-4xl text-white/[0.06] leading-none mb-3">{step.num}</p>
              <h3 className="text-sm font-medium text-upfit-text mb-2">{step.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <section className="px-6 md:px-10 py-10 border-b border-white/[0.08]">
        <div className="flex flex-wrap gap-6">
          {[
            "12-month parts & labour warranty",
            "Fixed pricing — no quote games",
            "Vetted, insured installers",
            "Factory-quality finish",
            "Steering wheel controls retained",
          ].map((trust) => (
            <div key={trust} className="flex items-center gap-2 text-sm text-upfit-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {trust}
            </div>
          ))}
        </div>
      </section>

      {/* Other services */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Other services in {suburb}</p>
        <div className="flex gap-3 flex-wrap">
          {(Object.entries(serviceConfig) as [ServiceSlug, typeof serviceConfig[ServiceSlug]][])
            .filter(([slug]) => slug !== service)
            .map(([slug, cfg]) => (
              <Link
                key={slug}
                href={`/area/${slug}-${suburb.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-bg-2 border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-upfit-muted hover:text-upfit-text hover:border-white/[0.2] transition-all"
              >
                {cfg.label} {suburb} →
              </Link>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Common questions about {config.short} in {suburb}</p>
        <div className="space-y-5 max-w-2xl">
          {[
            {
              q: `How much does ${config.label.toLowerCase()} cost in ${suburb}?`,
              a: `${config.label} in ${suburb} starts from $${config.fromPrice}. Final price depends on your vehicle — check your make and model on our site for an exact price.`,
            },
            {
              q: `Do you come to ${suburb}?`,
              a: `Yes — we come directly to you in ${suburb}. Your installer arrives at your home, office, or wherever your car is parked.`,
            },
            {
              q: "How long does installation take?",
              a: "Most installations take 45 minutes to 2 hours. We'll confirm the exact time when you book.",
            },
            {
              q: "What warranty do you offer?",
              a: "All UpFit installations come with a 12-month parts and labour warranty. If anything isn't right, we fix it at no charge.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby suburbs */}
      {nearbySuburbs.length > 0 && (
        <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
          <p className="section-label">Nearby suburbs we cover</p>
          <div className="flex flex-wrap gap-2">
            {nearbySuburbs.map((s) => (
              <Link
                key={s}
                href={`/area/${service}-${s.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-upfit-muted border border-white/[0.08] px-3.5 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-all"
              >
                {config.short} in {s}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Ready to book in {suburb}?
        </h2>
        <p className="text-upfit-muted mb-8">
          Check your vehicle and book in 2 minutes.
        </p>
        <Link
          href={`/book?suburb=${encodeURIComponent(suburb)}&service=${service}`}
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book in {suburb} →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
