export type UnitTier = {
  id: string;
  badge: string;
  name: string;
  screen: string;
  features: string[];
  priceMultiplier: number;
  popular?: boolean;
};

export const unitTiers: UnitTier[] = [
  {
    id: "standard",
    badge: "",
    name: "Standard unit",
    screen: '7" touchscreen',
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
    name: "Premium unit",
    screen: '9" touchscreen',
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
    name: "Premium+ unit",
    screen: '10" touchscreen',
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
  return Math.round(basePrice * multiplier / 10) * 10;
}
