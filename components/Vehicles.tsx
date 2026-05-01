import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export default function Vehicles() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Supported vehicles</p>

      <div className="grid grid-cols-4 divide-x divide-y divide-white/[0.08] border border-white/[0.08] rounded-xl overflow-hidden">
        {vehicles.map((brand) => (
          <div key={brand.slug} className="bg-bg-2 p-5 hover:bg-bg-3 transition-colors">
            <Link href={`/vehicles/${brand.slug}`}>
              <p className="text-sm font-medium text-upfit-text mb-2 hover:text-accent transition-colors">
                {brand.name}
              </p>
            </Link>
            <p className="text-xs text-upfit-muted leading-relaxed">
              {brand.models.map((m) => m.name).join(" · ")}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-upfit-muted mt-4">
        Don&apos;t see your vehicle?{" "}
        <Link href="/quote" className="text-accent hover:text-accent-dark transition-colors">
          Request a custom quote →
        </Link>{" "}
        We&apos;re adding new models regularly.
      </p>
    </section>
  );
}
