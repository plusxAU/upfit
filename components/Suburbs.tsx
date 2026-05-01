import Link from "next/link";
import { suburbs } from "@/lib/vehicles";

export default function Suburbs() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Sydney coverage</p>

      <div className="flex flex-wrap gap-2">
        {suburbs.map((suburb) => (
          <Link
            key={suburb}
            href={`/area/carplay-installation-${suburb.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-xs text-upfit-muted border border-white/[0.08] px-3.5 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-all"
          >
            {suburb}
          </Link>
        ))}
        <Link
          href="/suburbs"
          className="text-xs text-upfit-muted border border-white/[0.08] px-3.5 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-all"
        >
          + more →
        </Link>
      </div>
    </section>
  );
}
