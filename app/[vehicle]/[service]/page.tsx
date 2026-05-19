import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles, getBrandBySlug, getModelBySlug } from "@/lib/vehicles";
import type { Metadata } from "next";
import type { VehicleGeneration } from "@/lib/vehicles";
import GenerationAccordion from "@/components/GenerationAccordion";
import { getModelMinPrice, formatPrice } from "@/lib/configurator";

type Props = {
  params: Promise<{ vehicle: string; service: string }>;
  searchParams: Promise<{ gen?: string }>;
};

type ServiceEntry = {
  label: string;
  getPrice: (gen: VehicleGeneration) => number | null;
  unit: string;
  bookingKey: string;
};

const serviceMap: Record<string, ServiceEntry> = {
  "carplay-installation": {
    label: "Apple CarPlay installation",
    getPrice: (gen) => gen.pricing.installedBase ?? gen.pricing.moduleInstalled,
    unit: "CarPlay retrofit",
    bookingKey: "carplay",
  },
  "dashcam-installation": {
    label: "Dashcam installation",
    getPrice: () => null,
    unit: "Dashcam install",
    bookingKey: "dashcam",
  },
  "reverse-camera-installation": {
    label: "Reverse camera installation",
    getPrice: (gen) => gen.pricing.installedWithCamera,
    unit: "Reverse camera",
    bookingKey: "revcam",
  },
  "parking-sensors": {
    label: "Parking sensor installation",
    getPrice: (gen) => gen.pricing.installedWithSensorsRear,
    unit: "Parking sensors",
    bookingKey: "parking-sensors",
  },
};

function parseVehicleSlug(vehicleSlug: string) {
  for (const brand of vehicles) {
    if (!vehicleSlug.startsWith(brand.slug + "-")) continue;
    const modelSlug = vehicleSlug.slice(brand.slug.length + 1);
    const brand_ = getBrandBySlug(brand.slug);
    const model = getModelBySlug(brand.slug, modelSlug);
    if (brand_ && model) return { brand: brand_, model };
  }
  return null;
}

const CITIES = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vehicle: vehicleSlug, service: serviceSlug } = await params;
  const vehicle = parseVehicleSlug(vehicleSlug);
  const service = serviceMap[serviceSlug];
  if (!vehicle || !service) return {};

  const minPrice = getModelMinPrice(vehicle.model.generations);

  return {
    title: `${vehicle.brand.name} ${vehicle.model.name} ${service.label} Australia — UpFit`,
    description: `Professional ${service.label.toLowerCase()} for ${vehicle.brand.name} ${vehicle.model.name} across Sydney, Melbourne, Brisbane, Perth & Adelaide. Mobile service — we come to you.${minPrice !== null ? ` From $${minPrice}.` : ""}`,
    alternates: {
      canonical: `https://upfit.au/${vehicleSlug}/${serviceSlug}`,
    },
  };
}

export async function generateStaticParams() {
  const params = [];
  for (const brand of vehicles) {
    for (const model of brand.models) {
      for (const service of Object.keys(serviceMap)) {
        params.push({ vehicle: `${brand.slug}-${model.slug}`, service });
      }
    }
  }
  return params;
}

export default async function VehicleServicePage({ params, searchParams }: Props) {
  const { vehicle: vehicleSlug, service: serviceSlug } = await params;
  const { gen: genParam = "" } = await searchParams;
  const vehicle = parseVehicleSlug(vehicleSlug);
  const service = serviceMap[serviceSlug];

  if (!vehicle || !service) notFound();

  const { brand, model } = vehicle;
  const minPrice = getModelMinPrice(model.generations);

  // Priority: URL gen param → first non-quote gen → first gen
  const initialOpenId =
    model.generations.find((g) => g.id === genParam || g.slug === genParam)?.id ??
    model.generations.find((g) => !g.configurator.requiresQuote)?.id ??
    model.generations[0]?.id ??
    "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${brand.name} ${model.name} ${service.label}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "UpFit",
      "url": "https://upfit.au",
      "telephone": "+61435508050",
      "email": "team@upfit.au",
    },
    "areaServed": CITIES.map((city) => ({ "@type": "City", "name": city })),
    "description": `Professional ${service.label.toLowerCase()} for ${brand.name} ${model.name} across Australia. Mobile service — we come to you.${minPrice !== null ? ` From $${minPrice}.` : ""}`,
    ...(minPrice !== null && {
      "offers": { "@type": "Offer", "price": String(minPrice), "priceCurrency": "AUD" },
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${service.label} possible on all ${brand.name} ${model.name} years?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${model.name} models from 2012 onwards are fully supported. Check the year range below for your specific vehicle.`,
        },
      },
      {
        "@type": "Question",
        "name": "Do you come to me or do I need to bring the car?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We come to you — your home, office, or wherever your ${model.name} is parked across Sydney, Melbourne, Brisbane, Perth or Adelaide.`,
        },
      },
      {
        "@type": "Question",
        "name": "How long does the installation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${service.label} on the ${brand.name} ${model.name} typically takes 1.5 to 2 hours depending on the year and configuration.`,
        },
      },
      {
        "@type": "Question",
        "name": "What warranty is included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All UpFit installations come with a 12-month parts and labour warranty. If anything isn't right, we fix it at no charge.",
        },
      },
      {
        "@type": "Question",
        "name": "Will the installation affect my car's factory warranty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We use OEM-compatible wiring harness adaptors and don't cut any factory wiring. The installation is completely reversible.",
        },
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-8 pb-0 flex items-center gap-2 text-xs text-upfit-faint">
        <Link href="/" className="hover:text-upfit-muted transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/vehicles/${brand.slug}`} className="hover:text-upfit-muted transition-colors">{brand.name}</Link>
        <span>/</span>
        <span className="text-upfit-muted">{brand.name} {model.name} {service.label}</span>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08] max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          {brand.name} {model.name}
          <br />
          <em className="text-accent not-italic">{service.label}</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-3 max-w-xl">
          Mobile {service.label.toLowerCase()} for your {brand.name} {model.name} across
          Sydney, Melbourne, Brisbane, Perth and Adelaide.
          We come to your home or office — fixed pricing, no surprises.
        </p>
        <p className="text-accent font-serif text-2xl mb-8">
          {formatPrice(minPrice)}
        </p>
      </section>

      {/* Trust bar */}
      <section className="px-6 md:px-10 py-8 border-b border-white/[0.08]">
        <div className="flex flex-wrap gap-6">
          {[
            "12-month parts & labour warranty",
            "Factory-quality finish",
            "Steering wheel controls retained",
            "No cutting of factory wiring",
            "Mobile — we come to you",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm text-upfit-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Generation accordion */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">By year range</p>
        <GenerationAccordion
          generations={model.generations}
          make={brand.name}
          model={model.name}
          service={serviceSlug}
          initialOpenId={initialOpenId}
        />
      </section>

      {/* Available cities */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Available in your city</p>
        <div className="flex flex-wrap gap-3">
          {CITIES.map((city) => (
            <div key={city} className="bg-bg-2 border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-upfit-muted">
              {city}
            </div>
          ))}
        </div>
        <p className="text-sm text-upfit-muted mt-4">
          Don&apos;t see your city?{" "}
          <Link href="/quote" className="text-accent">Request a quote →</Link>
          {" "}We cover regional areas too.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Common questions</p>
        <div className="space-y-5 max-w-2xl">
          {[
            {
              q: `Is ${service.label} possible on all ${brand.name} ${model.name} years?`,
              a: `Most ${model.name} models from 2012 onwards are fully supported. Older vehicles may require a custom quote. Check the year range above for your specific vehicle.`,
            },
            {
              q: "Do you come to me or do I need to drop the car off?",
              a: `We come to you across Sydney, Melbourne, Brisbane, Perth and Adelaide — your home, office, or wherever your ${model.name} is parked.`,
            },
            {
              q: "How long does the installation take?",
              a: `${service.label} on the ${brand.name} ${model.name} typically takes 1.5 to 2 hours. We&apos;ll confirm exact timing when you book.`,
            },
            {
              q: "What warranty is included?",
              a: "All UpFit installations come with a 12-month parts and labour warranty. If anything isn't right, we fix it at no cost.",
            },
            {
              q: "Will this void my car's factory warranty?",
              a: "No. We use OEM-compatible wiring harness adaptors and never cut factory wiring. The installation is completely reversible.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other services for this vehicle */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Other services for {brand.name} {model.name}</p>
        <div className="flex gap-3 flex-wrap">
          {Object.entries(serviceMap)
            .filter(([slug]) => slug !== serviceSlug)
            .map(([slug, svc]) => (
              <Link
                key={slug}
                href={`/${vehicleSlug}/${slug}`}
                className="bg-bg-2 border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-upfit-muted hover:text-upfit-text hover:border-white/[0.2] transition-all"
              >
                {brand.name} {model.name} {svc.label} →
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
