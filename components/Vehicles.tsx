import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export default function Vehicles() {
  const sorted = [...vehicles].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Supported vehicles</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {sorted.map((brand) => (
          <Link
            key={brand.slug}
            href={`/vehicles/${brand.slug}`}
            className="bg-bg-2 border border-white/[0.08] rounded-xl p-4 hover:border-white/[0.2] hover:bg-bg-3 transition-all block"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-sm font-medium text-upfit-text hover:text-accent transition-colors">
                {brand.name}
              </p>
              <span className="text-[10px] text-upfit-faint bg-bg-3 px-1.5 py-0.5 rounded flex-shrink-0">
                {brand.models.length}
              </span>
            </div>
            <p className="text-xs text-upfit-muted leading-relaxed">
              {brand.models.map((m) => m.name).join(" · ")}
            </p>
          </Link>
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
