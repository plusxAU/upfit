import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Supported Vehicles — UpFit",
  description:
    "Check if your vehicle is supported for Apple CarPlay, dashcam or reverse camera installation. We support Toyota, Ford, Mazda, Mitsubishi, Nissan, Subaru, Honda, Volkswagen, Kia and Hyundai.",
};

export default function VehiclesPage() {
  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          10 brands supported
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          Supported vehicles
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed max-w-xl">
          We support most popular vehicles on Sydney roads. Select your brand
          to see compatible models, year ranges and pricing.
        </p>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <div className="grid grid-cols-2 gap-4">
          {vehicles.map((brand) => (
            <Link
              key={brand.slug}
              href={`/vehicles/${brand.slug}`}
              className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.2] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-medium text-upfit-text group-hover:text-accent transition-colors">
                  {brand.name}
                </h2>
                <span className="text-xs text-upfit-faint bg-bg-3 px-2 py-1 rounded">
                  {brand.models.length} models
                </span>
              </div>
              <p className="text-sm text-upfit-muted leading-relaxed mb-4">
                {brand.models.map((m) => m.name).join(" · ")}
              </p>
              <p className="text-xs text-accent font-medium">
                View {brand.name} compatibility →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Don&apos;t see your vehicle?</p>
        <div className="max-w-lg">
          <p className="text-upfit-muted text-base leading-relaxed mb-6">
            We&apos;re adding new models regularly. If your vehicle isn&apos;t listed,
            request a custom quote — we can usually accommodate most vehicles
            with a bit of extra lead time.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-5 py-2.5 rounded-lg hover:bg-accent-dark transition-colors text-sm"
          >
            Request a custom quote →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
