import type { MetadataRoute } from "next";
import { vehicles, suburbData } from "@/lib/vehicles";
import { states } from "@/components/Suburbs";

const BASE = "https://upfit.au";

const VEHICLE_SERVICES = [
  "carplay-installation",
  "dashcam-installation",
  "reverse-camera-installation",
  "parking-sensors",
];

const SUBURB_SERVICES = [
  "carplay-installation",
  "dashcam-installation",
  "reverse-camera-installation",
  "parking-sensors",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // ── Static pages ────────────────────────────────────────────────────────────
  urls.push(
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services/carplay-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/dashcam-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/reverse-camera-installation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/parking-sensors`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/vehicles`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // One-off vehicle pages
    { url: `${BASE}/holden-commodore-carplay`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/suzuki-jimny-carplay`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  );

  // ── State / city pages ──────────────────────────────────────────────────────
  for (const state of states) {
    urls.push({
      url: `${BASE}/locations/${state.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  // ── Brand pages ─────────────────────────────────────────────────────────────
  for (const brand of vehicles) {
    urls.push({
      url: `${BASE}/vehicles/${brand.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });

    // ── Vehicle × Service pages ──────────────────────────────────────────────
    for (const model of brand.models) {
      for (const service of VEHICLE_SERVICES) {
        urls.push({
          url: `${BASE}/${brand.slug}-${model.slug}/${service}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // ── Suburb × Service pages ───────────────────────────────────────────────────
  for (const suburb of suburbData) {
    const suburbSlug = suburb.name.toLowerCase().replace(/\s+/g, "-");
    for (const service of SUBURB_SERVICES) {
      urls.push({
        url: `${BASE}/area/${service}-${suburbSlug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return urls;
}
