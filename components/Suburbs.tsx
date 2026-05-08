import Link from "next/link";
import { suburbData } from "@/lib/vehicles";

// ─── State data — single source of truth is lib/vehicles.ts ─────────────────
// This is derived from suburbData so there's no duplication.
// All pages that import { states } from here get the same data.

export type StateEntry = {
  name: string;
  abbr: string;
  slug: string;
  city: string;
  suburbs: string[];
};

export const states: StateEntry[] = [
  {
    name: "New South Wales",
    abbr: "NSW",
    slug: "nsw",
    city: "Sydney",
    suburbs: suburbData.filter((s) => s.stateSlug === "nsw").map((s) => s.name),
  },
  {
    name: "Victoria",
    abbr: "VIC",
    slug: "vic",
    city: "Melbourne",
    suburbs: suburbData.filter((s) => s.stateSlug === "vic").map((s) => s.name),
  },
  {
    name: "Queensland",
    abbr: "QLD",
    slug: "qld",
    city: "Brisbane",
    suburbs: suburbData.filter((s) => s.stateSlug === "qld").map((s) => s.name),
  },
  {
    name: "Western Australia",
    abbr: "WA",
    slug: "wa",
    city: "Perth",
    suburbs: suburbData.filter((s) => s.stateSlug === "wa").map((s) => s.name),
  },
  {
    name: "South Australia",
    abbr: "SA",
    slug: "sa",
    city: "Adelaide",
    suburbs: suburbData.filter((s) => s.stateSlug === "sa").map((s) => s.name),
  },
];

export default function Suburbs() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Australia-wide coverage</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {states.map((state) => (
          <Link
            key={state.slug}
            href={`/locations/${state.slug}`}
            className="bg-bg-2 border border-white/[0.08] rounded-xl p-4 hover:border-white/[0.2] hover:bg-bg-3 transition-all group"
          >
            <p className="font-serif text-2xl text-upfit-text mb-1 group-hover:text-accent transition-colors">
              {state.abbr}
            </p>
            <p className="text-xs text-upfit-muted">{state.city} + surrounds</p>
          </Link>
        ))}
      </div>

      <p className="text-sm text-upfit-muted">
        Mobile installation — we come to you.{" "}
        <Link href="/quote" className="text-accent hover:text-accent-dark transition-colors">
          Not sure if we cover your area? →
        </Link>
      </p>
    </section>
  );
}
