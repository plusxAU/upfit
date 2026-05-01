export type Generation = {
  label: string;
  years: string;
  carplayFrom: number;
  dashcamFrom: number;
  revcamFrom: number;
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
          { label: "Current gen", years: "2021–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2016–2020", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Older gen", years: "2012–2015", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 240, complexity: "complex", notes: "Additional wiring required" },
        ],
      },
      {
        slug: "rav4",
        name: "RAV4",
        generations: [
          { label: "5th gen", years: "2019–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "4th gen", years: "2013–2018", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
          { label: "3rd gen", years: "2006–2012", carplayFrom: 530, dashcamFrom: 290, revcamFrom: 240, complexity: "complex" },
        ],
      },
      {
        slug: "camry",
        name: "Camry",
        generations: [
          { label: "Current gen", years: "2018–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2012–2017", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "corolla",
        name: "Corolla",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2014–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "kluger",
        name: "Kluger",
        generations: [
          { label: "Current gen", years: "2021–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2014–2020", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "landcruiser",
        name: "LandCruiser",
        generations: [
          { label: "300 series", years: "2021–2024", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, complexity: "standard" },
          { label: "200 series", years: "2016–2020", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, complexity: "standard" },
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
          { label: "Next gen", years: "2022–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2015–2021", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Older gen", years: "2011–2014", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 240, complexity: "complex" },
        ],
      },
      {
        slug: "everest",
        name: "Everest",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2015–2021", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "focus",
        name: "Focus",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2012–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "escape",
        name: "Escape",
        generations: [
          { label: "Current gen", years: "2020–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2013–2019", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
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
          { label: "2nd gen", years: "2017–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "1st gen", years: "2012–2016", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "cx-3",
        name: "CX-3",
        generations: [
          { label: "Current gen", years: "2015–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "mazda3",
        name: "Mazda3",
        generations: [
          { label: "4th gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "3rd gen", years: "2014–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "bt-50",
        name: "BT-50",
        generations: [
          { label: "3rd gen", years: "2020–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "2nd gen", years: "2012–2019", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
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
          { label: "Current gen", years: "2019–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2015–2018", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "outlander",
        name: "Outlander",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2013–2021", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "asx",
        name: "ASX",
        generations: [
          { label: "Current gen", years: "2023–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2010–2022", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "eclipse-cross",
        name: "Eclipse Cross",
        generations: [
          { label: "Current gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "1st gen", years: "2018–2021", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
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
          { label: "Current gen", years: "2021–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2015–2020", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "x-trail",
        name: "X-Trail",
        generations: [
          { label: "4th gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "3rd gen", years: "2014–2021", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "patrol",
        name: "Patrol",
        generations: [
          { label: "Y62 series", years: "2013–2024", carplayFrom: 520, dashcamFrom: 290, revcamFrom: 230, complexity: "standard" },
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
          { label: "5th gen", years: "2019–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "4th gen", years: "2013–2018", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "outback",
        name: "Outback",
        generations: [
          { label: "6th gen", years: "2020–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "5th gen", years: "2015–2019", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "xv",
        name: "XV",
        generations: [
          { label: "2nd gen", years: "2017–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
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
          { label: "6th gen", years: "2023–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "5th gen", years: "2017–2022", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "hr-v",
        name: "HR-V",
        generations: [
          { label: "3rd gen", years: "2022–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "2nd gen", years: "2015–2021", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "civic",
        name: "Civic",
        generations: [
          { label: "11th gen", years: "2022–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "10th gen", years: "2016–2021", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
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
          { label: "Mk8", years: "2021–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Mk7", years: "2013–2020", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "tiguan",
        name: "Tiguan",
        generations: [
          { label: "2nd gen", years: "2016–2024", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "amarok",
        name: "Amarok",
        generations: [
          { label: "2nd gen", years: "2023–2024", carplayFrom: 490, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "1st gen", years: "2011–2022", carplayFrom: 500, dashcamFrom: 290, revcamFrom: 230, complexity: "standard" },
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
          { label: "5th gen", years: "2022–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "4th gen", years: "2016–2021", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "cerato",
        name: "Cerato",
        generations: [
          { label: "4th gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "3rd gen", years: "2013–2018", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "seltos",
        name: "Seltos",
        generations: [
          { label: "Current gen", years: "2019–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
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
          { label: "Current gen", years: "2017–2024", carplayFrom: 450, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "Previous gen", years: "2012–2016", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
        ],
      },
      {
        slug: "tucson",
        name: "Tucson",
        generations: [
          { label: "4th gen", years: "2021–2024", carplayFrom: 460, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "3rd gen", years: "2015–2020", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
        ],
      },
      {
        slug: "santa-fe",
        name: "Santa Fe",
        generations: [
          { label: "4th gen", years: "2019–2024", carplayFrom: 470, dashcamFrom: 280, revcamFrom: 220, complexity: "standard" },
          { label: "3rd gen", years: "2013–2018", carplayFrom: 480, dashcamFrom: 280, revcamFrom: 230, complexity: "standard" },
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

export const suburbs = [
  // Sydney
  "Parramatta", "Chatswood", "Bondi", "Sutherland", "Liverpool",
  "Penrith", "Hornsby", "Manly", "Newtown", "Bankstown",
  "Castle Hill", "Cronulla", "Hurstville", "Macquarie Park",
  "Strathfield", "Ryde", "Campbelltown", "Blacktown", "North Sydney",
  "Baulkham Hills", "Fairfield", "Auburn", "Kogarah", "Miranda",
  "Gordon", "Pymble", "Dee Why", "Brookvale", "Mosman", "Leichhardt",
  // Melbourne
  "Richmond", "Footscray", "St Kilda", "Dandenong", "Frankston",
  "Ringwood", "Box Hill", "Essendon", "Moonee Ponds", "Werribee",
  "Cranbourne", "Berwick", "Doncaster", "Chadstone", "Sunshine",
  "Williamstown", "Northcote", "Fitzroy", "South Yarra", "Cheltenham",
  // Brisbane
  "Fortitude Valley", "Chermside", "Carindale", "Ipswich", "Redcliffe",
  "Logan", "Strathpine", "Springwood", "Indooroopilly", "Wynnum",
  "Sunnybank", "Nundah", "Toowong", "Eight Mile Plains", "Stafford",
  // Perth
  "Fremantle", "Midland", "Joondalup", "Rockingham", "Armadale",
  "Cannington", "Osborne Park", "Morley", "Karrinyup", "Balcatta",
  "Mandurah", "Scarborough", "Cottesloe", "Subiaco", "Victoria Park",
  // Adelaide
  "Glenelg", "Norwood", "Salisbury", "Marion", "Tea Tree Gully",
  "Modbury", "Elizabeth", "Noarlunga", "Unley", "Prospect",
];
