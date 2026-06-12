import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { states } from "@/components/Suburbs";
import type { Metadata } from "next";

type Props = { params: Promise<{ state: string }> };

const SERVICES = [
  { slug: "carplay-installation", label: "CarPlay & Android Auto", from: 450 },
  { slug: "dashcam-installation", label: "Dashcam installation", from: 349 },
  { slug: "reverse-camera-installation", label: "Reverse camera", from: 320 },
  { slug: "parking-sensors", label: "Parking sensors", from: 620 },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return {};
  return {
    title: `CarPlay, Dashcam & Parking Sensor Installation ${state.name} — UpFit`,
    description: `Mobile Apple CarPlay, Android Auto, dashcam, reverse camera and parking sensor installation across ${state.name}. We come to you — home, office or wherever the car is parked. Fixed pricing, same-week availability.`,
    alternates: {
      canonical: `https://upfit.au/locations/${stateSlug}`,
    },
  };
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Mobile Car Upgrade Installation in ${state.name}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "UpFit",
      "url": "https://upfit.au",
      "telephone": "+61435508050",
    },
    "areaServed": { "@type": "State", "name": state.name },
    "description": `Mobile Apple CarPlay, Android Auto, dashcam, reverse camera and parking sensor installation across ${state.name}. We come to you.`,
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-upfit-text transition-colors">Home</Link>
          <span>/</span>
          <span>{state.name}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Mobile car upgrades
          <br />
          <em className="text-accent not-italic">across {state.name}.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl mb-8">
          Apple CarPlay, Android Auto, dashcams, reverse cameras and parking sensors —
          installed at your home or office anywhere in {state.name}.
          Fixed pricing, same-week availability.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book an install →
        </Link>
      </section>

      {/* Service cards */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Services in {state.name}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div key={service.slug} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{service.label}</h3>
              <p className="font-serif text-2xl text-accent mb-3">From ${service.from}</p>
              <Link
                href={`/book?service=${service.slug}`}
                className="text-sm text-accent border border-accent/25 px-4 py-2 rounded-md hover:bg-accent/[0.08] transition-all inline-block"
              >
                Book now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Suburbs — link to all services, not just CarPlay */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Areas we cover in {state.name}</p>
        <div className="space-y-8">
          {state.suburbs.map((suburb) => {
            const suburbSlug = suburb.toLowerCase().replace(/\s+/g, "-");
            return (
              <div key={suburb}>
                <p className="text-sm font-medium text-upfit-text mb-3">{suburb}</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/area/${service.slug}-${suburbSlug}`}
                      className="text-xs text-upfit-muted border border-white/[0.08] px-3 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-all"
                    >
                      {service.label} in {suburb}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-upfit-muted mt-8">
          Don&apos;t see your suburb?{" "}
          <Link href="/quote" className="text-accent">Request a quote →</Link>
          {" "}We cover most areas in {state.name}.
        </p>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Ready to upgrade your car in {state.name}?
        </h2>
        <p className="text-upfit-muted mb-8">Book online in 2 minutes. We come to you.</p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Check my vehicle →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
