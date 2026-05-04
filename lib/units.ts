export type UnitTier = {
  id: string;
  badge: string;
  name: string;
  brand: string;
  modelSku: string;
  screen: string;
  features: string[];
  included: string[];
  excluded: string[];
  installedPrice: number;
  partsExGst: number;
  labourExGst: number;
  priceNote: string;
  installTimeMin: number;
  installTimeMax: number;
  popular?: boolean;
  isModule?: boolean;
  supplierUrl: string;
};

export const unitTiers: UnitTier[] = [
  {
    id: "wireless-adapter",
    badge: "Keep your factory screen",
    name: "Wireless CarPlay Adapter",
    brand: "Carlinkit / Ottocast",
    modelSku: "TBC",
    screen: "Your existing factory screen",
    features: [
      "Converts existing wired CarPlay to wireless",
      "No dashboard removal needed",
      "Small plug-in adapter",
      "Auto-connects on startup",
      "Only for cars with existing wired CarPlay",
    ],
    included: ["Wireless adapter", "Setup and pairing"],
    excluded: ["Does not add CarPlay to cars without wired CarPlay"],
    installedPrice: 249,
    partsExGst: 90,
    labourExGst: 50,
    priceNote: "Adapter + setup · GST incl. · only if wired CarPlay confirmed",
    installTimeMin: 15,
    installTimeMax: 30,
    isModule: true,
    supplierUrl: "https://www.carlinkit.com",
  },
  {
    id: "getcartech-vf-module",
    badge: "Holden VF only — keeps factory screen",
    name: "VF Wireless CarPlay Module",
    brand: "GetCarTech",
    modelSku: "VF Wireless CarPlay Module",
    screen: "Your existing MyLink screen",
    features: [
      "Wireless Apple CarPlay & Android Auto",
      "Retains factory MyLink screen",
      "Plug and play — no dash removal",
      "Steering wheel controls retained",
      "Reversible installation",
    ],
    included: ["Module", "Plug and play harness", "Standard mobile install"],
    excluded: ["Faulty MyLink systems", "Non-standard audio paths"],
    installedPrice: 1299,
    partsExGst: 749,
    labourExGst: 190,
    priceNote: "Module + installation · GST incl. · VF Commodore only",
    installTimeMin: 60,
    installTimeMax: 90,
    isModule: true,
    supplierUrl: "https://getcartech.com/products/holden-vf-wireless-carplay-module-diy-kit",
  },
  {
    id: "pioneer-dmh-z5350bt-value",
    badge: "Value option",
    name: "Pioneer DMH-Z5350BT",
    brand: "Pioneer",
    modelSku: "DMH-Z5350BT",
    screen: "6.8\" capacitive touchscreen",
    features: [
      "Wired Apple CarPlay & Android Auto",
      "6.8\" high-resolution touchscreen",
      "Dual camera inputs",
      "Bluetooth audio & calls",
      "AM/FM/DAB+ radio",
    ],
    included: ["Head unit", "Vehicle install kit", "Standard mobile labour"],
    excluded: ["Wireless CarPlay (wired only)", "Complex retention interfaces"],
    installedPrice: 999,
    partsExGst: 520,
    labourExGst: 180,
    priceNote: "Unit + installation · GST incl. · price varies by vehicle",
    installTimeMin: 90,
    installTimeMax: 150,
    supplierUrl: "https://www.pioneer.com.au/shop/car/multimedia-receivers/av-receivers/dmh-z5350bt/",
  },
  {
    id: "sony-xav-ax5500-clean",
    badge: "Clean look",
    name: "Sony XAV-AX5500",
    brand: "Sony",
    modelSku: "XAV-AX5500",
    screen: "6.95\" touchscreen",
    features: [
      "Wired Apple CarPlay & Android Auto",
      "6.95\" floating touchscreen",
      "Clean Sony interface",
      "Dual USB inputs",
      "Bluetooth audio & calls",
    ],
    included: ["Head unit", "Vehicle install kit", "Standard mobile labour"],
    excluded: ["Wireless CarPlay", "Complex retention interfaces"],
    installedPrice: 1049,
    partsExGst: 550,
    labourExGst: 180,
    priceNote: "Unit + installation · GST incl. · price varies by vehicle",
    installTimeMin: 90,
    installTimeMax: 150,
    supplierUrl: "https://www.sony.com.au/electronics/in-car-receivers-players/xav-ax5500",
  },
  {
    id: "kenwood-dmx7522s-standard",
    badge: "Most popular",
    name: "Kenwood DMX7522S",
    brand: "Kenwood",
    modelSku: "DMX7522S",
    screen: "6.8–6.95\" touchscreen",
    features: [
      "Wireless Apple CarPlay & Android Auto",
      "6.8\" high-resolution touchscreen",
      "Advanced sound tuning",
      "Bluetooth audio & calls",
      "AM/FM/DAB+ radio",
    ],
    included: ["Head unit", "Vehicle install kit", "Standard mobile labour"],
    excluded: ["Custom cameras", "Premium amplifier integration"],
    installedPrice: 1099,
    partsExGst: 620,
    labourExGst: 180,
    priceNote: "Unit + installation · GST incl. · price varies by vehicle",
    installTimeMin: 90,
    installTimeMax: 150,
    popular: true,
    supplierUrl: "https://www.kenwood.com/au/car/visual_navigation/dmx7522s/",
  },
  {
    id: "aerpro-am10x-large-screen",
    badge: "Large screen",
    name: "Aerpro AM10X",
    brand: "Aerpro",
    modelSku: "AM10X",
    screen: "10\" capacitive touchscreen",
    features: [
      "Wireless & wired Apple CarPlay",
      "Wireless & wired Android Auto",
      "10\" large format display",
      "External microphone included",
      "AM/FM/DAB+ radio",
    ],
    included: ["Head unit", "Vehicle-specific Aerpro kit", "Standard mobile labour"],
    excluded: ["Premium factory amplifier integration", "360 camera (unless bundle)"],
    installedPrice: 1149,
    partsExGst: 480,
    labourExGst: 190,
    priceNote: "Unit + installation · GST incl. · price varies by vehicle",
    installTimeMin: 90,
    installTimeMax: 180,
    supplierUrl: "https://aerpro.com/am10x",
  },
  {
    id: "aerpro-am10x-large-screen-camera",
    badge: "Best value bundle",
    name: "Aerpro AM10X + Reverse Camera",
    brand: "Aerpro",
    modelSku: "AM8349K / AM10X",
    screen: "10\" capacitive touchscreen + reverse camera",
    features: [
      "Wireless & wired Apple CarPlay & Android Auto",
      "10\" large format display",
      "AHD reverse camera included",
      "Camera integrates with display",
      "Hardwired — no loose cables",
    ],
    included: ["Head unit", "Reverse camera", "Vehicle kit", "Standard mobile labour"],
    excluded: ["Difficult cable paths", "Factory camera integration beyond kit"],
    installedPrice: 1399,
    partsExGst: 590,
    labourExGst: 250,
    priceNote: "Unit + camera + installation · GST incl.",
    installTimeMin: 120,
    installTimeMax: 180,
    supplierUrl: "https://aerpro.com/am8349k",
  },
];

// Keep getUnitPrice for backward compatibility but real prices now in unitTiers
export function getUnitPrice(basePrice: number, multiplier: number): number {
  return Math.round((basePrice * multiplier) / 10) * 10;
}
