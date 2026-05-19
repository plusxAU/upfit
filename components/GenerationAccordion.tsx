"use client";

import { useState } from "react";
import Configurator from "@/components/Configurator";
import { getConfiguratorOptions, formatPrice } from "@/lib/configurator";
import type { VehicleGeneration } from "@/lib/vehicles";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-4 h-4 text-upfit-muted flex-shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function GenerationAccordion({
  generations,
  make,
  model,
  service,
  initialOpenId,
}: {
  generations: VehicleGeneration[];
  make: string;
  model: string;
  service: string;
  initialOpenId: string;
}) {
  const [openId, setOpenId] = useState(initialOpenId);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? "" : id));
  }

  return (
    <div className="space-y-2">
      {generations.map((gen) => {
        const opts = getConfiguratorOptions(gen);
        const isOpen = openId === gen.id;
        const priceLabel = formatPrice(opts.basePrice, "");

        return (
          <div
            key={gen.id}
            className="border border-white/[0.08] rounded-xl bg-bg-2 overflow-hidden"
          >
            {/* ── Header — always visible ────────────────────────────── */}
            <button
              onClick={() => toggle(gen.id)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-upfit-text">
                  {gen.label}
                </p>
                {/*
                  Always in DOM for SEO — visually hidden when collapsed.
                  Shows the recommended path reason as a subtitle under the label
                  when the drawer is open.
                */}
                <p
                  className={`text-xs text-upfit-muted leading-snug overflow-hidden transition-all duration-300 ${
                    isOpen ? "mt-1 max-h-12 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {gen.content.recommendedPathReason}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium text-accent">
                  {priceLabel}
                </span>
                <Chevron open={isOpen} />
              </div>
            </button>

            {/* ── Expandable content — always in DOM for SEO ─────────── */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[9999px]" : "max-h-0"
              }`}
            >
              <div className="px-5 pb-6 pt-1">
                <Configurator
                  generation={gen}
                  make={make}
                  model={model}
                  service={service}
                  mode="page"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
