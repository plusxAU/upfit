import fs from 'fs';
import path from 'path';

export type ServiceMeta = {
  slug: string;
  label: string;
  short: string;
  fromPrice: number;
  description: string;
};

// Registry of all known services. A service is active when its directory
// exists (without a _ prefix) under app/services/. To disable a service,
// rename its directory to _slug — the route disappears but the files are
// preserved. To re-enable, rename it back.
const REGISTRY: Record<string, Omit<ServiceMeta, 'slug'>> = {
  'carplay-installation': {
    label: 'Apple CarPlay installation',
    short: 'CarPlay',
    fromPrice: 699,
    description: 'Apple CarPlay and Android Auto retrofit',
  },
  'dashcam-installation': {
    label: 'Dashcam installation',
    short: 'Dashcam',
    fromPrice: 349,
    description: 'Front and rear dashcam installation',
  },
  'reverse-camera-installation': {
    label: 'Reverse camera installation',
    short: 'Reverse cam',
    fromPrice: 320,
    description: 'Reverse camera installation',
  },
  'parking-sensors': {
    label: 'Parking sensor installation',
    short: 'Parking sensors',
    fromPrice: 620,
    description: 'Front and rear parking sensor installation',
  },
};

const DISPLAY_ORDER = [
  'carplay-installation',
  'dashcam-installation',
  'reverse-camera-installation',
  'parking-sensors',
];

export function getActiveServices(): ServiceMeta[] {
  const servicesDir = path.join(process.cwd(), 'app/services');
  const entries = fs.readdirSync(servicesDir);
  return entries
    .filter(name => REGISTRY[name])
    .sort((a, b) => DISPLAY_ORDER.indexOf(a) - DISPLAY_ORDER.indexOf(b))
    .map(name => ({ slug: name, ...REGISTRY[name] }));
}
