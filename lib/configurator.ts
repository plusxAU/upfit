// ============================================================
// UpFit Configurator Logic
// ============================================================
// Pure functions only — no React, no UI dependencies.
// All configurator display logic lives here.
// Used by:
//   - components/Configurator.tsx (UI)
//   - app/[vehicle]/[service]/page.tsx (static generation)
//   - components/BookingFlow.tsx (step 2)
// ============================================================

import type { VehicleGeneration } from "./vehicles";

// ── Types ────────────────────────────────────────────────────

export type AddOnId =
  | "camera"
  | "sensors-rear"
  | "sensors-front-rear";

export type AddOn = {
  id: AddOnId;
  label: string;
  price: number;
};

export type UnitOption = {
  id: string;
  name: string;
  brand: string;
  screen: string;
  price: number;
  popular?: boolean;
  isModule?: boolean;
  isAdapter?: boolean;
  features: string[];
};

export type ConfiguratorOptions = {
  // What path this vehicle takes
  requiresQuote: boolean;
  quoteReason: string | null;
  showWirelessAdapterOnly: boolean; // already has CarPlay — adapter only
  showModuleFirst: boolean;         // module recommended over replacement
  showHeadUnits: boolean;           // show head unit tier selection

  // Add-ons
  showCameraOption: boolean;
  showSensorsOption: boolean;
  showCameraRetainedNotice: boolean; // show "Factory camera retained ✓"

  // Pricing
  basePrice: number | null;          // lowest available price for this gen
  adapterPrice: number | null;       // if wireless adapter path
  modulePrice: number | null;        // if module path

  // Content
  recommendedPath: string;
  recommendedPathReason: string;
  whatIsLost: string[];
  whatIsRetained: string[];
  caveat: string | null;
  enthusiastNote: string | null;
};

export type ConfiguratorSelection = {
  generationId: string;
  unitId: string;
  unitName: string;
  unitPrice: number;
  addOns: AddOn[];
  totalPrice: number;
  packageString: string; // for HubSpot service_type
};

// ── Add-on definitions ────────────────────────────────────────

export const ADD_ON_CAMERA: AddOn = {
  id: "camera",
  label: "Reverse camera",
  price: 220,
};

export const ADD_ON_SENSORS_REAR: AddOn = {
  id: "sensors-rear",
  label: "Parking sensors (rear)",
  price: 220,
};

export const ADD_ON_SENSORS_FRONT_REAR: AddOn = {
  id: "sensors-front-rear",
  label: "Parking sensors (front + rear)",
  price: 320,
};

// ── Unit catalogue ────────────────────────────────────────────
// Single source of truth for available head unit options.
// Modules and adapters are generated dynamically from vehicle data.

export const HEAD_UNIT_OPTIONS: UnitOption[] = [
  {
    id: "pioneer-dmh-z5350bt",
    name: "Pioneer DMH-Z5350BT",
    brand: "Pioneer",
    screen: "6.8\" touchscreen",
    price: 999,
    features: ["Wired CarPlay & Android Auto", "DAB+ radio", "Dual camera inputs"],
  },
  {
    id: "sony-xav-ax5500",
    name: "Sony XAV-AX5500",
    brand: "Sony",
    screen: "6.95\" floating screen",
    price: 1049,
    features: ["Wired CarPlay & Android Auto", "Clean Sony interface", "Dual USB"],
  },
  {
    id: "kenwood-dmx7522s",
    name: "Kenwood DMX7522S",
    brand: "Kenwood",
    screen: "6.8\" touchscreen",
    price: 1099,
    popular: true,
    features: ["Wireless CarPlay & Android Auto", "Advanced sound tuning", "DAB+ radio"],
  },
  {
    id: "aerpro-am10x",
    name: "Aerpro AM10X",
    brand: "Aerpro",
    screen: "10\" large screen",
    price: 1149,
    features: ["Wireless CarPlay & Android Auto", "10\" display", "External mic included"],
  },
];

// ── Core logic functions ──────────────────────────────────────

/**
 * Derives all display options for a vehicle generation.
 * This is the single function that drives what the configurator shows.
 */
export function getConfiguratorOptions(
  gen: VehicleGeneration
): ConfiguratorOptions {
  const { factory, configurator, pricing, content } = gen;

  // Wireless adapter path — vehicle already has wired CarPlay
  const showWirelessAdapterOnly = factory.hasCarPlay && !configurator.moduleAvailable;

  // Module path — activation module recommended
  const showModuleFirst =
    configurator.moduleAvailable && configurator.moduleRecommended;

  // Head unit path — full replacement
  const showHeadUnits =
    !showWirelessAdapterOnly && !configurator.requiresQuote;

  // Camera retention notice — has camera AND it's retained (not offered as add-on)
  const showCameraRetainedNotice =
    factory.hasCamera &&
    configurator.cameraRetentionAvailable &&
    !configurator.showCameraOption;

  // Base price — lowest entry point for this generation
  const basePrice = (() => {
    if (showWirelessAdapterOnly) return pricing.moduleInstalled;
    if (showModuleFirst) return pricing.moduleInstalled;
    if (configurator.requiresQuote) return null;
    return pricing.installedBase;
  })();

  return {
    requiresQuote: configurator.requiresQuote,
    quoteReason: configurator.quoteReason,
    showWirelessAdapterOnly,
    showModuleFirst,
    showHeadUnits,
    showCameraOption: configurator.showCameraOption,
    showSensorsOption: configurator.showSensorsOption,
    showCameraRetainedNotice,
    basePrice,
    adapterPrice: showWirelessAdapterOnly ? pricing.moduleInstalled : null,
    modulePrice: configurator.moduleAvailable ? pricing.moduleInstalled : null,
    recommendedPath: content.recommendedPath,
    recommendedPathReason: content.recommendedPathReason,
    whatIsLost: content.whatIsLost,
    whatIsRetained: content.whatIsRetained,
    caveat: content.caveat,
    enthusiastNote: content.enthusiastNote,
  };
}

/**
 * Returns the unit options to show for a generation.
 * For wireless adapter path — returns single adapter option.
 * For module path — returns module first, then head units as secondary.
 * For head unit path — returns all head unit tiers.
 */
export function getUnitOptions(
  gen: VehicleGeneration,
  opts: ConfiguratorOptions
): UnitOption[] {
  if (opts.showWirelessAdapterOnly) {
    return [
      {
        id: "wireless-adapter",
        name: "Wireless CarPlay Adapter",
        brand: "Carlinkit / Ottocast",
        screen: "Your existing factory screen",
        price: gen.pricing.moduleInstalled ?? 249,
        isAdapter: true,
        features: [
          "Converts wired CarPlay to wireless",
          "No dashboard removal",
          "Auto-connects on startup",
        ],
      },
    ];
  }

  if (opts.showModuleFirst && gen.pricing.moduleInstalled) {
    const moduleOption: UnitOption = {
      id: "module",
      name: `${gen.factory.navSystemName ?? "Factory screen"} Activation Module`,
      brand: "GetCarTech",
      screen: "Your existing factory screen",
      price: gen.pricing.moduleInstalled,
      isModule: true,
      popular: true,
      features: [
        "Wireless CarPlay & Android Auto",
        "Keeps factory screen — OEM look",
        "Fully reversible",
        "No dashboard removal",
      ],
    };
    // If head units are also available as secondary option
    if (gen.pricing.installedBase) {
      return [moduleOption, ...HEAD_UNIT_OPTIONS];
    }
    return [moduleOption];
  }

  return HEAD_UNIT_OPTIONS;
}

/**
 * Returns available add-ons for a generation based on configurator flags.
 */
export function getAvailableAddOns(opts: ConfiguratorOptions): {
  camera: AddOn | null;
  sensorsRear: AddOn | null;
  sensorsFrontRear: AddOn | null;
} {
  return {
    camera: opts.showCameraOption ? ADD_ON_CAMERA : null,
    sensorsRear: opts.showSensorsOption ? ADD_ON_SENSORS_REAR : null,
    sensorsFrontRear: opts.showSensorsOption ? ADD_ON_SENSORS_FRONT_REAR : null,
  };
}

/**
 * Calculates total price from unit selection + add-ons.
 */
export function calculateTotal(
  unitPrice: number,
  selectedAddOns: AddOn[]
): number {
  return selectedAddOns.reduce((total, addon) => total + addon.price, unitPrice);
}

/**
 * Builds the HubSpot service_type string from a selection.
 * e.g. "Kenwood DMX7522S + Parking sensors (rear) — Ford Ranger PX2 SYNC3 (2015–2018)"
 */
export function buildPackageString(
  gen: VehicleGeneration,
  unitName: string,
  addOns: AddOn[]
): string {
  const parts = [unitName, ...addOns.map((a) => a.label)];
  return `${parts.join(" + ")} — ${gen.label}`;
}

/**
 * Builds the URL params string for handing off to /book.
 * Allows booking flow to skip steps that are already answered.
 */
export function buildBookingUrl(
  make: string,
  model: string,
  generationId: string,
  selection?: ConfiguratorSelection
): string {
  const params = new URLSearchParams({
    make,
    model,
    gen: generationId,
  });

  if (selection) {
    params.set("unit", selection.unitId);
    params.set("unitName", selection.unitName);
    params.set("unitPrice", String(selection.unitPrice));
    if (selection.addOns.length > 0) {
      params.set("addons", selection.addOns.map((a) => a.id).join(","));
    }
    params.set("total", String(selection.totalPrice));
  }

  return `/book?${params.toString()}`;
}

/**
 * Builds the URL for a quote request, pre-filling vehicle details.
 */
export function buildQuoteUrl(
  make: string,
  model: string,
  generationId: string,
  service: string
): string {
  const params = new URLSearchParams({ make, model, gen: generationId, service });
  return `/quote?${params.toString()}`;
}

/**
 * Parses booking URL params into partial booking state.
 * Used by BookingFlow to skip steps that are already answered.
 */
export function parseBookingParams(searchParams: URLSearchParams): {
  make: string;
  model: string;
  generationId: string;
  unitId: string;
  unitName: string;
  unitPrice: number;
  addOnIds: AddOnId[];
  totalPrice: number;
  startAtStep: number;
} {
  const make = searchParams.get("make") ?? "";
  const model = searchParams.get("model") ?? "";
  const generationId = searchParams.get("gen") ?? "";
  const unitId = searchParams.get("unit") ?? "";
  const unitName = searchParams.get("unitName") ?? "";
  const unitPrice = Number(searchParams.get("unitPrice") ?? 0);
  const addOnIds = (searchParams.get("addons") ?? "")
    .split(",")
    .filter(Boolean) as AddOnId[];
  const totalPrice = Number(searchParams.get("total") ?? 0);

  // Determine which step to start at
  let startAtStep = 1;
  if (make && model && generationId) startAtStep = 2;
  if (make && model && generationId && unitId) startAtStep = 3;

  return {
    make,
    model,
    generationId,
    unitId,
    unitName,
    unitPrice,
    addOnIds,
    totalPrice,
    startAtStep,
  };
}

/**
 * Formats a price for display — returns "Quote" if null.
 */
export function formatPrice(price: number | null, prefix = "From "): string {
  if (price === null) return "Quote";
  return `${prefix}$${price.toLocaleString()}`;
}

/**
 * Returns the lowest available price across all generations of a model.
 * Used for brand pages and vehicle/service page hero pricing.
 */
export function getModelMinPrice(
  generations: VehicleGeneration[]
): number | null {
  const prices = generations
    .map((g) => {
      const opts = getConfiguratorOptions(g);
      return opts.basePrice;
    })
    .filter((p): p is number => p !== null);

  return prices.length > 0 ? Math.min(...prices) : null;
}
