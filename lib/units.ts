export type UnitTier = {
  id: string;
  badge: string;
  name: string;
  screen: string;
  features: string[];
  priceMultiplier: number;
  popular?: boolean;
  isModule?: boolean;
};

export const unitTiers: UnitTier[] = [
  {
    id: "activation",
    badge: "Keep your factory screen",
    name: "CarPlay Activation",
    screen: "Module only — no head unit replacement",
    features: [
      "Adds wireless CarPlay & Android Auto",
      "Your existing factory screen stays",
      "Steering wheel controls remain mapped",
      "Plug-in module — fully reversible",
      "Best for 2016+ vehicles with factory screen",
    ],
    priceMultiplier: 0.78,
    isModule: true,
  },
  {
    id: "standard",
    badge: "",
    name: "Standard upgrade",
    screen: '7" touchscreen — full head unit',
    features: [
      "Wired Apple CarPlay & Android Auto",
      "Reverse camera input",
      "Bluetooth audio & calls",
      "AM/FM/DAB+ radio",
    ],
    priceMultiplier: 1.0,
  },
  {
    id: "premium",
    badge: "Most popular",
    name: "Premium upgrade",
    screen: '9" touchscreen — full head unit',
    features: [
      "Wireless Apple CarPlay & Android Auto",
      "Reverse camera included",
      "DAB+ digital radio",
      "Superior audio quality",
      "Voice control",
    ],
    priceMultiplier: 1.29,
    popular: true,
  },
  {
    id: "premium-plus",
    badge: "Best experience",
    name: "Premium+ upgrade",
    screen: '10" touchscreen — full head unit',
    features: [
      "Wireless Apple CarPlay & Android Auto",
      "360° camera ready",
      "DAB+ digital radio",
      "Premium audio output",
      "Voice control",
      "OEM-style integration",
    ],
    priceMultiplier: 1.6,
  },
];

export function getUnitPrice(basePrice: number, multiplier: number): number {
  return Math.round((basePrice * multiplier) / 10) * 10;
}
