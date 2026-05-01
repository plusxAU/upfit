import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";
import type { Metadata } from "next";

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = vehicles.find((b) => b.slug === brandSlug);
  if (!brand) return {};
  return {
    title: `${brand.name} CarPlay & Dashcam Installation Sydney — UpFit`,
    description: `Apple CarPlay, dashcam and reverse camera installation for ${brand.name} vehicles across Sydney. ${brand.models.map((m) => m.name).join(", ")}.`,
  };
}

export async function generateStaticParams() {
  return vehicles.map((b) => ({ brand: b.slug }));
}

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;
  const brand = vehicles.find((b) => b.slug === brandSlug);
  if (!brand) notFound();

  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <Link href="/vehicles" className="hover:text-upfit-text transition-colors">
            All vehicles
          </Link>
          <span>/</span>
          <span>{brand.name}</span>
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          {brand.name} installations
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed max-w-xl">
          Apple CarPlay, dashcam and reverse camera installation for all
          supported {brand.name} models across Sydney. Mobile service, we come
          to you.
        </p>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <div className="space-y-8">
          {brand.models.map((model) => (
            <div key={model.slug} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-xl font-medium text-upfit-text mb-4">
                {brand.name} {model.name}
              </h2>
              <div className="space-y-3 mb-5">
                {model.generations.map((gen) => (
                  <div key={gen.years} className="flex items-center justify-between py-2 border-b border-white/[0.06] last:border-0">
                    <div>
                      <span className="text-sm text-upfit-text">{gen.years}</span>
                      {gen.label && (
                        <span className="text-xs text-upfit-faint ml-2">({gen.label})</span>
                      )}
                    </div>
                    <div className="flex gap-4 text-right">
                      <span className="text-xs text-upfit-muted">CarPlay & Android Auto <span className="text-accent font-medium">from ${gen.carplayFrom}</span></span>
                      <span className="text-xs text-upfit-muted">Dashcam <span className="text-accent font-medium">from ${gen.dashcamFrom}</span></span>
                      <span className="text-xs text-upfit-muted">Reverse cam <span className="text-accent font-medium">from ${gen.revcamFrom}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { slug: "carplay-installation", label: "CarPlay & Android Auto" },
                  { slug: "dashcam-installation", label: "Dashcam" },
                  { slug: "reverse-camera-installation", label: "Reverse cam" },
                ].map((service) => (
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

      <Footer />
    </main>
  );
}
