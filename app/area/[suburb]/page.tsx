import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { suburbs } from "@/lib/vehicles";
import type { Metadata } from "next";

type Props = { params: Promise<{ suburb: string }> };

const serviceConfig = {
  "carplay-installation": {
    label: "Apple CarPlay installation",
    short: "CarPlay",
    fromPrice: 450,
    description: "Apple CarPlay and Android Auto retrofit",
  },
  "dashcam-installation": {
    label: "Dashcam installation",
    short: "Dashcam",
    fromPrice: 280,
    description: "Front and rear dashcam installation",
  },
  "reverse-camera-installation": {
    label: "Reverse camera installation",
    short: "Reverse cam",
    fromPrice: 220,
    description: "Reverse camera installation",
  },
};

function slugToSuburb(slug: string) {
  return suburbs.find(
    (s) => s.toLowerCase().replace(/\s+/g, "-") === slug
  );
}

function parseSuburbSlug(slug: string): {
  suburb: string;
  service: keyof typeof serviceConfig;
} | null {
  for (const [serviceSlug] of Object.entries(serviceConfig)) {
    const prefix = `${serviceSlug}-`;
    if (slug.startsWith(prefix)) {
      const suburbSlug = slug.slice(prefix.length);
      const suburb = slugToSuburb(suburbSlug);
      if (suburb)
        return {
          suburb,
          service: serviceSlug as keyof typeof serviceConfig,
        };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb: slugParam } = await params;
  const parsed = parseSuburbSlug(slugParam);
  if (!parsed) return {};
  const config = serviceConfig[parsed.service];
  return {
    title: `${config.label} ${parsed.suburb} — UpFit`,
    description: `Professional ${config.label.toLowerCase()} in ${parsed.suburb}, Sydney. Mobile service, we come to you. Fixed pricing from $${config.fromPrice}.`,
  };
}

export async function generateStaticParams() {
  const params: { suburb: string }[] = [];
  for (const suburb of suburbs) {
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

  const nearbySuburbs = suburbs.filter((s) => s !== suburb).slice(0, 6);

  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · {suburb}
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          {config.label}
          <br />
          <em className="text-accent not-italic">in {suburb}.</em>
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed mb-3 max-w-xl">
          Professional {config.description.toLowerCase()} in {suburb} and
          surrounding areas. We come to your home, office or wherever the car
          is parked. Fixed pricing from ${config.fromPrice}.
        </p>
        <p className="text-accent font-serif text-2xl mb-8">
          From ${config.fromPrice}
        </p>
        <Link
          href={`/book?suburb=${encodeURIComponent(suburb)}&service=${service}`}
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book in {suburb} →
        </Link>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">How it works in {suburb}</p>
        <div className="grid grid-cols-3 gap-8 max-w-3xl">
          {[
            {
              num: "01",
              title: "Book online",
              body: `Select your vehicle, choose a time that works for you in ${suburb}, and confirm your address. No phone calls needed.`,
            },
            {
              num: "02",
              title: "We come to you",
              body: `Your installer drives to your ${suburb} location — home, office, or wherever your car is parked. You don't need to go anywhere.`,
            },
            {
              num: "03",
              title: "Drive away upgraded",
              body: "Installation takes 45 minutes to 2 hours. Clean, professional finish that looks completely factory-fitted.",
            },
          ].map((step) => (
            <div key={step.num}>
              <p className="font-serif text-4xl text-white/[0.06] leading-none mb-3">
                {step.num}
              </p>
              <h3 className="text-sm font-medium text-upfit-text mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-upfit-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Other services in {suburb}</p>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(serviceConfig)
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

      <section className="px-10 py-16 border-b border-white/[0.08]">
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

      <section className="px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">
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
