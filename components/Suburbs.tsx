import Link from "next/link";

export type StateEntry = {
  name: string;
  abbr: string;
  slug: string;
  city: string;
  suburbs: string[];
  parentSlug?: string;
};

export const states: StateEntry[] = [
  {
    name: "New South Wales",
    abbr: "NSW",
    slug: "nsw",
    city: "Sydney",
    suburbs: [
      "Parramatta", "Chatswood", "Bondi", "Sutherland", "Liverpool",
      "Penrith", "Hornsby", "Manly", "Newtown", "Bankstown",
      "Castle Hill", "Cronulla", "Hurstville", "Macquarie Park",
      "Strathfield", "Ryde", "Campbelltown", "Blacktown", "North Sydney",
      "Baulkham Hills", "Fairfield", "Auburn", "Kogarah", "Miranda",
      "Gordon", "Pymble", "Dee Why", "Brookvale", "Mosman", "Leichhardt",
    ],
  },
  {
    name: "Victoria",
    abbr: "VIC",
    slug: "vic",
    city: "Melbourne",
    suburbs: [
      "Richmond", "Footscray", "St Kilda", "Dandenong", "Frankston",
      "Ringwood", "Box Hill", "Essendon", "Moonee Ponds", "Werribee",
      "Cranbourne", "Berwick", "Doncaster", "Chadstone", "Sunshine",
      "Williamstown", "Northcote", "Fitzroy", "South Yarra", "Cheltenham",
    ],
  },
  {
    name: "Queensland",
    abbr: "QLD",
    slug: "qld",
    city: "Brisbane",
    suburbs: [
      "Fortitude Valley", "Chermside", "Carindale", "Ipswich", "Redcliffe",
      "Logan", "Strathpine", "Springwood", "Indooroopilly", "Wynnum",
      "Sunnybank", "Nundah", "Toowong", "Eight Mile Plains", "Stafford",
    ],
  },
  {
    name: "Western Australia",
    abbr: "WA",
    slug: "wa",
    city: "Perth",
    suburbs: [
      "Fremantle", "Midland", "Joondalup", "Rockingham", "Armadale",
      "Cannington", "Osborne Park", "Morley", "Karrinyup", "Balcatta",
      "Mandurah", "Scarborough", "Cottesloe", "Subiaco", "Victoria Park",
    ],
  },
  {
    name: "South Australia",
    abbr: "SA",
    slug: "sa",
    city: "Adelaide",
    suburbs: [
      "Glenelg", "Norwood", "Salisbury", "Marion", "Tea Tree Gully",
      "Modbury", "Elizabeth", "Noarlunga", "Unley", "Prospect",
    ],
  },
  {
    name: "Gold Coast",
    abbr: "GC",
    slug: "gold-coast",
    city: "Gold Coast",
    parentSlug: "qld",
    suburbs: [
      "Surfers Paradise", "Broadbeach", "Southport", "Robina", "Bundall",
      "Labrador", "Nerang", "Coomera", "Helensvale", "Hope Island",
      "Varsity Lakes", "Burleigh Heads", "Mudgeeraba", "Coolangatta",
      "Parkwood", "Ashmore", "Runaway Bay", "Benowa", "Mermaid Beach",
      "Palm Beach", "Tugun", "Bilinga", "Currumbin", "Elanora",
    ],
  },
  {
    name: "Sunshine Coast",
    abbr: "SC",
    slug: "sunshine-coast",
    city: "Sunshine Coast",
    parentSlug: "qld",
    suburbs: [
      "Maroochydore", "Caloundra", "Noosa Heads", "Nambour", "Buderim",
      "Mooloolaba", "Kawana Waters", "Sippy Downs", "Coolum Beach",
      "Peregian Springs", "Bli Bli", "Landsborough", "Beerwah",
      "Currimundi", "Alexandra Headland", "Palmview", "Mountain Creek",
      "Bokarina", "Wurtulla", "Birtinya",
    ],
  },
  {
    name: "Cairns",
    abbr: "FNQ",
    slug: "cairns",
    city: "Cairns",
    parentSlug: "qld",
    suburbs: [
      "Cairns City", "Cairns North", "Edge Hill", "Westcourt", "Manunda",
      "Manoora", "Bungalow", "Mooroobool", "Earlville", "Whitfield",
      "Smithfield", "Caravonica", "Redlynch", "Gordonvale", "Palm Cove",
      "Trinity Beach", "Yorkeys Knob", "Holloways Beach", "Kewarra Beach",
      "Trinity Park",
    ],
  },
];

export default function Suburbs() {
  const topLevel = states.filter((s) => !s.parentSlug);
  const subRegions = states.filter((s) => s.parentSlug);

  const subRegionsByParent = subRegions.reduce<Record<string, StateEntry[]>>((acc, s) => {
    const key = s.parentSlug!;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">Australia-wide coverage</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {topLevel.map((state) => (
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

      {/* Sub-region pills, grouped by parent state */}
      {Object.entries(subRegionsByParent).map(([parentSlug, subs]) => {
        const parent = topLevel.find((s) => s.slug === parentSlug);
        return (
          <div key={parentSlug} className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs text-upfit-faint">Also in {parent?.name}:</span>
            {subs.map((sub) => (
              <Link
                key={sub.slug}
                href={`/locations/${sub.slug}`}
                className="text-xs text-upfit-muted border border-white/[0.08] px-3 py-1 rounded-full hover:border-accent/40 hover:text-accent transition-all"
              >
                {sub.name} →
              </Link>
            ))}
          </div>
        );
      })}

      <p className="text-sm text-upfit-muted mt-4">
        Mobile installation — we come to you.{" "}
        <Link href="/quote" className="text-accent hover:text-accent-dark transition-colors">
          Not sure if we cover your area? →
        </Link>
      </p>
    </section>
  );
}
