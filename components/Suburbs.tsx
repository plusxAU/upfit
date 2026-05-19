import Link from "next/link";

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
