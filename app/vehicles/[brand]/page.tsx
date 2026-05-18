import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";
import type { Metadata } from "next";

type Props = { params: Promise<{ brand: string }> };

const ALL_SERVICES = [
  { slug: "carplay-installation", label: "CarPlay & Android Auto" },
  { slug: "dashcam-installation", label: "Dashcam" },
  { slug: "reverse-camera-installation", label: "Reverse cam" },
  { slug: "parking-sensors", label: "Parking sensors" },
];

const CITIES = "Sydney, Melbourne, Brisbane, Perth & Adelaide";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = vehicles.find((b) => b.slug === brandSlug);
  if (!brand) return {};
  return {
    title: `${brand.name} CarPlay & Dashcam Installation Australia — UpFit`,
    description: `Apple CarPlay, dashcam, reverse camera and parking sensor installation for all supported ${brand.name} models across ${CITIES}. Mobile service — we come to you.`,
    alternates: {
      canonical: `https://upfit.au/vehicles/${brandSlug}`,
    },
  };
}

export async function generateStaticParams() {
  return vehicles.map((b) => ({ brand: b.slug }));
}

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;
  const brand = vehicles.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${brand.name} Car Upgrade Installation`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "UpFit",
      "url": "https://upfit.au",
      "telephone": "+61435508050",
    },
    "areaServed": "Australia",
    "description": `Apple CarPlay, dashcam, reverse camera and parking sensor installation for ${brand.name} vehicles across Australia. Mobile service.`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-8 pb-0 flex items-center gap-2 text-xs text-upfit-faint">
        <Link href="/" className="hover:text-upfit-muted transition-colors">Home</Link>
        <span>/</span>
        <Link href="/vehicles" className="hover:text-upfit-muted transition-colors">All vehicles</Link>
        <span>/</span>
        <span className="text-upfit-muted">{brand.name}</span>
      </div>

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          {brand.name} installations
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
          Apple CarPlay, dashcam, reverse camera and parking sensor installation for all
          supported {brand.name} models across {CITIES}. Mobile service — we come to you.
        </p>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <div className="space-y-8">
          {brand.models.map((model) => (
            <div key={model.slug} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-xl font-medium text-upfit-text mb-4">
                {brand.name} {model.name}
              </h2>
              <div className="space-y-3 mb-5">
                {model.generations.map((gen) => {
                  const carplayPrice = gen.pricing.installedBase ?? gen.pricing.moduleInstalled;
                  const cameraPrice = gen.pricing.installedWithCamera;
                  const sensorsPrice = gen.pricing.installedWithSensorsRear;
                  return (
                    <div key={gen.id} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0 flex-wrap gap-2">
                      <span className="text-sm text-upfit-text">{gen.label}</span>
                      <div className="flex flex-wrap gap-4 text-right">
                        <span className="text-xs text-upfit-muted">CarPlay{" "}
                          {carplayPrice ? <span className="text-accent font-medium">from ${carplayPrice}</span> : <span className="text-upfit-faint">Quote</span>}
                        </span>
                        <span className="text-xs text-upfit-muted">Camera{" "}
                          {cameraPrice ? <span className="text-accent font-medium">from ${cameraPrice}</span> : <span className="text-upfit-faint">Quote</span>}
                        </span>
                        <span className="text-xs text-upfit-muted">Sensors{" "}
                          {sensorsPrice ? <span className="text-accent font-medium">from ${sensorsPrice}</span> : <span className="text-upfit-faint">Quote</span>}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 flex-wrap">
                {ALL_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${brand.slug}-${model.slug}/${service.slug}`}
                    className="text-xs text-upfit-muted border border-white/[0.08] px-3 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-all"
                  >
                    {service.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Ready to upgrade your {brand.name}?
        </h2>
        <p className="text-upfit-muted mb-8">
          Check your model and book in 2 minutes. We come to you across Australia.
        </p>
        <Link
          href={`/book?make=${encodeURIComponent(brand.name)}`}
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book {brand.name} install →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
