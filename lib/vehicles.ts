export type Generation = {
  label: string;
  years: string;
  carplayFrom: number;
  dashcamFrom: number;
  revcamFrom: number;
  parkingFrom: number;
  complexity: "standard" | "complex" | "quote";
  notes?: string;
};

export type VehicleModel = {
  slug: string;
  name: string;
  generations: Generation[];
};

export type VehicleBrand = {
  slug: string;
  name: string;
  models: VehicleModel[];
};

export const vehicles: VehicleBrand[] = [
  {
    slug: "toyota",
    name: "Toyota",
    models: [
      {
        slug: "hilux",
        name: "HiLux",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2016–2020", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Older gen", years: "2012–2015", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 240, parkingFrom: 240, complexity: "complex" as const, notes: "Additional wiring required" },
        ],
      },
      {
        slug: "rav4",
        name: "RAV4",
        generations: [
          { label: "5th gen", years: "2019–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "4th gen", years: "2013–2018", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
          { label: "3rd gen", years: "2006–2012", carplayFrom: 530, dashcamFrom: 290, revcamFrom: 240, parkingFrom: 240, complexity: "complex" as const },
        ],
      },
      {
        slug: "camry",
        name: "Camry",
        generations: [
          { label: "Current gen", years: "2018–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2012–2017", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "corolla",
        name: "Corolla",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2014–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "kluger",
        name: "Kluger",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2014–2020", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
      {
        slug: "landcruiser",
        name: "LandCruiser 200/300",
        generations: [
          { label: "300 series", years: "2021–2024", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
          { label: "200 series", years: "2016–2020", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
      {
        slug: "landcruiser-70",
        name: "LandCruiser 70 Series",
        generations: [
          { label: "All years", years: "1984–2025", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const, notes: "No factory screen — full head unit replacement only. Single DIN to Double DIN conversion kit required." },
        ],
      },
      {
        slug: "prado",
        name: "Prado",
        generations: [
          { label: "150 Series facelift", years: "2017–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "150 Series", years: "2009–2016", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "ford",
    name: "Ford",
    models: [
      {
        slug: "ranger",
        name: "Ranger",
        generations: [
          { label: "Next gen", years: "2022–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2021", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Older gen", years: "2011–2014", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 240, parkingFrom: 240, complexity: "complex" as const },
        ],
      },
      {
        slug: "everest",
        name: "Everest",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2021", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
      {
        slug: "focus",
        name: "Focus",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2012–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "escape",
        name: "Escape",
        generations: [
          { label: "Current gen", years: "2020–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2013–2019", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    models: [
      {
        slug: "cx-5",
        name: "CX-5",
        generations: [
          { label: "2nd gen", years: "2017–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "1st gen", years: "2012–2016", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
      {
        slug: "cx-3",
        name: "CX-3",
        generations: [
          { label: "Current gen", years: "2015–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "mazda3",
        name: "Mazda3",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2014–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "bt-50",
        name: "BT-50",
        generations: [
          { label: "Current gen", years: "2020–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2011–2019", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "mitsubishi",
    name: "Mitsubishi",
    models: [
      {
        slug: "triton",
        name: "Triton",
        generations: [
          { label: "Current gen", years: "2023–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2022", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "outlander",
        name: "Outlander",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2013–2021", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "asx",
        name: "ASX",
        generations: [
          { label: "Current gen", years: "2023–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2010–2022", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "eclipse-cross",
        name: "Eclipse Cross",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "1st gen", years: "2017–2020", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "pajero",
        name: "Pajero",
        generations: [
          { label: "NX series", years: "2014–2021", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    models: [
      {
        slug: "navara",
        name: "Navara",
        generations: [
          { label: "Current gen", years: "2015–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "x-trail",
        name: "X-Trail",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2014–2021", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "patrol",
        name: "Patrol",
        generations: [
          { label: "Y62 series", years: "2012–2024", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "subaru",
    name: "Subaru",
    models: [
      {
        slug: "forester",
        name: "Forester",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2013–2018", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "outback",
        name: "Outback",
        generations: [
          { label: "Current gen", years: "2020–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2019", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "xv",
        name: "XV / Crosstrek",
        generations: [
          { label: "Current gen", years: "2017–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "1st gen", years: "2013–2020", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "honda",
    name: "Honda",
    models: [
      {
        slug: "cr-v",
        name: "CR-V",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2017–2021", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "hr-v",
        name: "HR-V",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2020", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "civic",
        name: "Civic",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2016–2020", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    models: [
      {
        slug: "golf",
        name: "Golf",
        generations: [
          { label: "Mk8", years: "2020–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Mk7/7.5", years: "2013–2019", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "complex" as const, notes: "MQB platform — CAN-bus retention required" },
        ],
      },
      {
        slug: "tiguan",
        name: "Tiguan",
        generations: [
          { label: "2nd gen", years: "2016–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "complex" as const, notes: "MQB platform — CAN-bus retention required" },
        ],
      },
      {
        slug: "amarok",
        name: "Amarok",
        generations: [
          { label: "2nd gen", years: "2022–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "1st gen", years: "2011–2022", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, parkingFrom: 230, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "kia",
    name: "Kia",
    models: [
      {
        slug: "sportage",
        name: "Sportage",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2016–2021", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "cerato",
        name: "Cerato",
        generations: [
          { label: "Current gen", years: "2018–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "seltos",
        name: "Seltos",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    models: [
      {
        slug: "i30",
        name: "i30",
        generations: [
          { label: "Current gen", years: "2017–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "tucson",
        name: "Tucson",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
          { label: "Previous gen", years: "2015–2020", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "santa-fe",
        name: "Santa Fe",
        generations: [
          { label: "Current gen", years: "2018–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
  {
    slug: "holden",
    name: "Holden",
    models: [
      {
        slug: "commodore-vf",
        name: "Commodore VF",
        generations: [
          { label: "VF Series II", years: "2015–2017", carplayFrom: 350, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const, notes: "MyLink module activation — keeps factory screen" },
          { label: "VF Series I", years: "2013–2015", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
      {
        slug: "colorado",
        name: "Colorado",
        generations: [
          { label: "RG series", years: "2012–2020", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, parkingFrom: 220, complexity: "standard" as const },
        ],
      },
    ],
  },
];

export function getBrandBySlug(slug: string) {
  return vehicles.find((b) => b.slug === slug);
}

export function getModelBySlug(brandSlug: string, modelSlug: string) {
  const brand = getBrandBySlug(brandSlug);
  return brand?.models.find((m) => m.slug === modelSlug);
}

// ─── Suburb & city data ──────────────────────────────────────────────────────

export type SuburbEntry = {
  name: string;
  city: string;
  state: string;
  stateSlug: string;
};

export const suburbData: SuburbEntry[] = [
  // Sydney — NSW
  ...["Parramatta","Chatswood","Bondi","Sutherland","Liverpool","Penrith","Hornsby","Manly","Newtown","Bankstown","Castle Hill","Cronulla","Hurstville","Macquarie Park","Strathfield","Ryde","Campbelltown","Blacktown","North Sydney","Baulkham Hills","Fairfield","Auburn","Kogarah","Miranda","Gordon","Pymble","Dee Why","Brookvale","Mosman","Leichhardt"].map(name => ({ name, city: "Sydney", state: "New South Wales", stateSlug: "nsw" })),
  // Melbourne — VIC
  ...["Richmond","Footscray","St Kilda","Dandenong","Frankston","Ringwood","Box Hill","Essendon","Moonee Ponds","Werribee","Cranbourne","Berwick","Doncaster","Chadstone","Sunshine","Williamstown","Northcote","Fitzroy","South Yarra","Cheltenham"].map(name => ({ name, city: "Melbourne", state: "Victoria", stateSlug: "vic" })),
  // Brisbane — QLD
  ...["Fortitude Valley","Chermside","Carindale","Ipswich","Redcliffe","Logan","Strathpine","Springwood","Indooroopilly","Wynnum","Sunnybank","Nundah","Toowong","Eight Mile Plains","Stafford"].map(name => ({ name, city: "Brisbane", state: "Queensland", stateSlug: "qld" })),
  // Perth — WA
  ...["Fremantle","Midland","Joondalup","Rockingham","Armadale","Cannington","Osborne Park","Morley","Karrinyup","Balcatta","Mandurah","Scarborough","Cottesloe","Subiaco","Victoria Park"].map(name => ({ name, city: "Perth", state: "Western Australia", stateSlug: "wa" })),
  // Adelaide — SA
  ...["Glenelg","Norwood","Salisbury","Marion","Tea Tree Gully","Modbury","Elizabeth","Noarlunga","Unley","Prospect"].map(name => ({ name, city: "Adelaide", state: "South Australia", stateSlug: "sa" })),
];

// Flat list kept for generateStaticParams compatibility
export const suburbs = suburbData.map(s => s.name);

export function getSuburbEntry(name: string): SuburbEntry | undefined {
  return suburbData.find(s => s.name.toLowerCase() === name.toLowerCase());
}

export function getCityForSuburb(name: string): string {
  return getSuburbEntry(name)?.city ?? "Australia";
}

export function getSuburbsByCity(city: string): SuburbEntry[] {
  return suburbData.filter(s => s.city === city);
}

export function getNearbySuburbs(suburbName: string, count = 6): string[] {
  const entry = getSuburbEntry(suburbName);
  if (!entry) return [];
  return suburbData
    .filter(s => s.city === entry.city && s.name !== suburbName)
    .slice(0, count)
    .map(s => s.name);
}
