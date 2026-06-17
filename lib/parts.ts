// ============================================================
// UpFit Parts & Supplier Layer
// ============================================================
// Supplier-agnostic parts catalogue.
// Separates WHAT a vehicle needs from WHO supplies it.
//
// Primary supplier: Aerpro/TDJ (part numbers in vehicles.ts)
// Secondary supplier: Car Audio Connect (Connects2, PAC, Metra)
//
// Used for:
//   - Installer dispatch packs (which part from which supplier)
//   - Stock fallback logic (Aerpro out of stock → try alternative)
//   - Future: live stock checking via supplier APIs
// ============================================================

export type SupplierName =
  | "aerpro"
  | "connects2"
  | "caraudioconnect"
  | "pac"
  | "metra"
  | "getcartech"
  | "other";

export type PartFunction =
  | "fascia"
  | "harness"
  | "swc-interface"
  | "antenna-adaptor"
  | "camera-kit"
  | "amp-harness"
  | "module"
  | "canbus-decoder";

export type PartConfidence =
  | "confirmed"    // physically verified, installer tested
  | "catalogue"    // listed in supplier catalogue, unverified
  | "community"    // sourced from forums/community knowledge
  | "unknown";

export type SupplierOption = {
  supplier: SupplierName;
  partNumber: string | null;
  productUrl: string | null;
  tradePrice: number | null;   // ex-GST, null = not yet confirmed
  inStock: boolean | null;     // null = unknown, check live
  confidence: PartConfidence;
  notes: string | null;
};

export type VehiclePart = {
  vehicleId: string;           // matches VehicleGeneration.id
  function: PartFunction;
  description: string;         // human-readable e.g. "Double DIN fascia kit"
  required: boolean;           // false = optional add-on
  suppliers: SupplierOption[];
};

// ── Helper functions ──────────────────────────────────────────

/**
 * Returns the preferred supplier option for a part.
 * Priority: confirmed > catalogue > community
 * Within same confidence: aerpro > connects2 > caraudioconnect > others
 */
export function getPreferredSupplier(
  part: VehiclePart
): SupplierOption | null {
  const priority: PartConfidence[] = ["confirmed", "catalogue", "community"];
  const supplierPriority: SupplierName[] = [
    "aerpro",
    "connects2",
    "caraudioconnect",
    "pac",
    "metra",
    "getcartech",
    "other",
  ];

  for (const confidence of priority) {
    const matches = part.suppliers.filter(
      (s) => s.confidence === confidence && s.partNumber !== null
    );
    if (matches.length === 0) continue;

    // Sort by supplier priority within same confidence tier
    matches.sort(
      (a, b) =>
        supplierPriority.indexOf(a.supplier) -
        supplierPriority.indexOf(b.supplier)
    );
    return matches[0];
  }

  return null;
}

/**
 * Returns fallback supplier options if primary is out of stock.
 */
export function getFallbackSuppliers(
  part: VehiclePart,
  excludeSupplier: SupplierName
): SupplierOption[] {
  return part.suppliers.filter(
    (s) => s.supplier !== excludeSupplier && s.partNumber !== null
  );
}

/**
 * Returns all parts needed for a vehicle job.
 */
export function getPartsForVehicle(
  vehicleId: string,
  partsDb: VehiclePart[]
): VehiclePart[] {
  return partsDb.filter((p) => p.vehicleId === vehicleId);
}

// ── Parts database ────────────────────────────────────────────
// Populated progressively as trade accounts are confirmed.
// Aerpro part numbers are the primary source — pulled from vehicles.ts.
// Alternative suppliers added as they are confirmed.
//
// NOTE: This is the operational layer — not used for SEO pages.
// vehicles.ts remains the source of truth for the website.
// ─────────────────────────────────────────────────────────────

export const partsDb: VehiclePart[] = [

  // ── TOYOTA HILUX N80 2015–2020 ─────────────────────────────
  {
    vehicleId: "toyota-hilux-n80-2015-2020",
    function: "fascia",
    description: "Double DIN fascia kit for HiLux N80",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "FP8241K",
        productUrl: "https://aerpro.com/fp8241k",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: null,
      },
    ],
  },
  {
    vehicleId: "toyota-hilux-n80-2015-2020",
    function: "antenna-adaptor",
    description: "Antenna patch lead",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "APP2",
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: null,
      },
    ],
  },

  // ── FORD RANGER PX2 SYNC3 2015–2018 ────────────────────────
  {
    vehicleId: "ford-ranger-px2-sync3-2015-2018",
    function: "fascia",
    description: "SYNC3 fascia + harness + SWC kit",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "FP9129CT",
        productUrl: "https://aerpro.com/fp9129ct",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "Includes Infodapter SWC interface and camera retention harness",
      },
      {
        supplier: "connects2",
        partNumber: null,
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "unknown",
        notes: "Check Car Audio Connect for Connects2 Ranger PX2 kit as fallback",
      },
    ],
  },

  // ── FORD RANGER PX2 BASE 2015–2018 ─────────────────────────
  {
    vehicleId: "ford-ranger-px2-non-sync3-2015-2018",
    function: "fascia",
    description: "Non-SYNC3 fascia + harness kit",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "FP9129K",
        productUrl: "https://aerpro.com/fp9129k",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: null,
      },
    ],
  },

  // ── HOLDEN COMMODORE VF 2013–2017 ──────────────────────────
  {
    vehicleId: "holden-commodore-vf1-2013-2015",
    function: "fascia",
    description: "VF Commodore double DIN fascia kit (full replacement path)",
    required: false,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "FP9353K",
        productUrl: "https://aerpro.com/fp9353k",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "Only needed for full head unit replacement path. Module path requires no fascia.",
      },
    ],
  },
  {
    vehicleId: "holden-commodore-vf1-2013-2015",
    function: "module",
    description: "VF MyLink wireless CarPlay activation module",
    required: false,
    suppliers: [
      {
        supplier: "getcartech",
        partNumber: "VF Wireless CarPlay Module",
        productUrl: "https://getcartech.com/products/holden-vf-wireless-carplay-module-diy-kit",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "VF Series 1 — audio via Bluetooth/AUX",
      },
    ],
  },
  {
    vehicleId: "holden-commodore-vf2-2015-2017",
    function: "module",
    description: "VF Series 2 MyLink wireless CarPlay activation module",
    required: false,
    suppliers: [
      {
        supplier: "getcartech",
        partNumber: "VF Wireless CarPlay Module",
        productUrl: "https://getcartech.com/products/holden-vf-wireless-carplay-module-diy-kit",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "VF Series 2 — includes USB audio decoder for iPod/USB audio path",
      },
    ],
  },

  // ── SUZUKI JIMNY JB74 2018–2025 ────────────────────────────
  {
    vehicleId: "suzuki-jimny-jb74-2018-2025",
    function: "fascia",
    description: "JB74 Jimny standard fascia kit",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "FP8396K",
        productUrl: "https://aerpro.com/fp8396k",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "Suits both manual AC and digital AC variants",
      },
      {
        supplier: "caraudioconnect",
        partNumber: null,
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "unknown",
        notes: "Check as fallback if Aerpro out of stock",
      },
    ],
  },

  // ── MITSUBISHI TRITON MQ/MR 2015–2024 ──────────────────────
  {
    vehicleId: "mitsubishi-triton-mq-mr-2015-2024",
    function: "fascia",
    description: "Triton MQ/MR double DIN fascia kit",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "AKMB26",
        productUrl: "https://aerpro.com/akmb26",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: null,
      },
    ],
  },
  {
    vehicleId: "mitsubishi-triton-mq-mr-2015-2024",
    function: "harness",
    description: "ISO wiring harness (NOT included in AKMB26 — order separately)",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: null,
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "catalogue",
        notes: "Must order separately — confirm correct ISO harness part number with Aerpro trade account",
      },
    ],
  },

  // ── NISSAN X-TRAIL T32 FACELIFT 2021–2022 ──────────────────
  {
    vehicleId: "nissan-xtrail-t32-2021-2022-360",
    function: "fascia",
    description: "AMANI17 vehicle-specific kit (includes 360 camera retention)",
    required: true,
    suppliers: [
      {
        supplier: "aerpro",
        partNumber: "AMANI17",
        productUrl: "https://aerpro.com/amani17",
        tradePrice: null,
        inStock: null,
        confidence: "confirmed",
        notes: "Suits non-amplified (non-Bose) variants only. Includes 360 camera retention harness.",
      },
    ],
  },

  // ── VOLKSWAGEN — Connects2 primary ─────────────────────────
  {
    vehicleId: "vw-amarok-2h-2011-2022",
    function: "harness",
    description: "VW Amarok wiring harness",
    required: true,
    suppliers: [
      {
        supplier: "connects2",
        partNumber: null,
        productUrl: "https://www.caraudioconnect.com.au/",
        tradePrice: null,
        inStock: null,
        confidence: "catalogue",
        notes: "Aerpro has limited VW coverage — Connects2 via Car Audio Connect is the primary source for VW harnesses. Confirm part number via their vehicle selector.",
      },
      {
        supplier: "aerpro",
        partNumber: null,
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "unknown",
        notes: "Verify if Aerpro has VW Amarok coverage before ordering from Connects2",
      },
    ],
  },
  {
    vehicleId: "vw-tiguan-5n-2008-2016",
    function: "harness",
    description: "VW Tiguan 5N wiring harness + CANBUS decoder",
    required: true,
    suppliers: [
      {
        supplier: "connects2",
        partNumber: null,
        productUrl: "https://www.caraudioconnect.com.au/",
        tradePrice: null,
        inStock: null,
        confidence: "catalogue",
        notes: "Connects2 is the primary source for VW CANBUS interfaces. Confirm part number via Car Audio Connect vehicle selector.",
      },
    ],
  },
  {
    vehicleId: "vw-tiguan-5n-2008-2016",
    function: "canbus-decoder",
    description: "VW CANBUS decoder for steering wheel control retention",
    required: true,
    suppliers: [
      {
        supplier: "connects2",
        partNumber: null,
        productUrl: "https://www.caraudioconnect.com.au/",
        tradePrice: null,
        inStock: null,
        confidence: "catalogue",
        notes: "PAC Audio SWI-CP2 is an alternative universal SWC interface worth checking",
      },
      {
        supplier: "pac",
        partNumber: "SWI-CP2",
        productUrl: null,
        tradePrice: null,
        inStock: null,
        confidence: "catalogue",
        notes: "Universal SWC interface — works on most VW applications",
      },
    ],
  },
];
