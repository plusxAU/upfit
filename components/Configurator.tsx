"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { VehicleGeneration } from "@/lib/vehicles";
import {
  getConfiguratorOptions,
  getUnitOptions,
  getAvailableAddOns,
  calculateTotal,
  buildPackageString,
  buildBookingUrl,
  buildQuoteUrl,
  type AddOn,
  type AddOnId,
  type UnitOption,
  type ConfiguratorSelection,
} from "@/lib/configurator";

// ── Types ─────────────────────────────────────────────────────

type ConfiguratorMode = "page" | "flow";

type ConfiguratorProps = {
  generation: VehicleGeneration;
  make: string;
  model: string;
  service: string;
  mode: ConfiguratorMode;
  /** flow mode: called when selection is complete */
  onComplete?: (selection: ConfiguratorSelection) => void;
  /** flow mode: pre-selected unit from URL params */
  initialUnitId?: string;
  /** flow mode: pre-selected add-ons from URL params */
  initialAddOnIds?: AddOnId[];
};

// ── Sub-components ────────────────────────────────────────────

function UnitCard({
  unit,
  selected,
  onSelect,
}: {
  unit: UnitOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left border rounded-xl p-4 transition-all cursor-pointer ${
        selected
          ? "border-accent bg-accent/[0.04]"
          : unit.popular
          ? "border-accent/30 bg-bg-2 hover:border-accent/50"
          : "border-white/[0.08] bg-bg-2 hover:border-white/[0.16]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {unit.popular && (
            <p className="text-[10px] text-accent uppercase tracking-wider font-medium mb-1">
              Most popular
            </p>
          )}
          {unit.isModule && (
            <p className="text-[10px] text-accent uppercase tracking-wider font-medium mb-1">
              Recommended — keeps factory screen
            </p>
          )}
          {unit.isAdapter && (
            <p className="text-[10px] text-accent uppercase tracking-wider font-medium mb-1">
              Your car already has CarPlay
            </p>
          )}
          <p className="text-sm font-medium text-upfit-text">{unit.name}</p>
          <p className="text-xs text-upfit-faint mt-0.5">{unit.brand} · {unit.screen}</p>
          <ul className="mt-2 space-y-0.5">
            {unit.features.map((f) => (
              <li key={f} className="text-xs text-upfit-muted flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <p className="font-serif text-xl text-upfit-text">${unit.price.toLocaleString()}</p>
          <div
            className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
              selected ? "border-accent bg-accent" : "border-white/[0.2]"
            }`}
          >
            {selected && <div className="w-2 h-2 rounded-full bg-bg" />}
          </div>
        </div>
      </div>
    </button>
  );
}

function AddOnRow({
  label,
  priceA,
  labelA,
  priceB,
  labelB,
  selectedId,
  idA,
  idB,
  onSelect,
}: {
  label: string;
  priceA: number;
  labelA: string;
  priceB: number;
  labelB: string;
  selectedId: AddOnId | null;
  idA: AddOnId;
  idB: AddOnId;
  onSelect: (id: AddOnId | null) => void;
}) {
  return (
    <div className="border border-white/[0.08] rounded-xl p-4 bg-bg-2">
      <p className="text-sm font-medium text-upfit-text mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(selectedId === idA ? null : idA)}
          className={`text-xs px-3 py-2 rounded-lg border transition-all ${
            selectedId === idA
              ? "border-accent bg-accent/[0.08] text-accent"
              : "border-white/[0.12] text-upfit-muted hover:border-white/[0.25]"
          }`}
        >
          {labelA} · +${priceA}
        </button>
        <button
          onClick={() => onSelect(selectedId === idB ? null : idB)}
          className={`text-xs px-3 py-2 rounded-lg border transition-all ${
            selectedId === idB
              ? "border-accent bg-accent/[0.08] text-accent"
              : "border-white/[0.12] text-upfit-muted hover:border-white/[0.25]"
          }`}
        >
          {labelB} · +${priceB}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function Configurator({
  generation,
  make,
  model,
  service,
  mode,
  onComplete,
  initialUnitId,
  initialAddOnIds = [],
}: ConfiguratorProps) {
  const opts = getConfiguratorOptions(generation);
  const unitOptions = getUnitOptions(generation, opts);
  const availableAddOns = getAvailableAddOns(opts);

  // Default to first unit (or pre-selected from URL)
  const defaultUnitId =
    initialUnitId ||
    unitOptions.find((u) => u.popular)?.id ||
    unitOptions[0]?.id ||
    "";

  const [selectedUnitId, setSelectedUnitId] = useState(defaultUnitId);
  const [cameraSelected, setCameraSelected] = useState(
    initialAddOnIds.includes("camera")
  );
  const [sensorsId, setSensorsId] = useState<AddOnId | null>(
    initialAddOnIds.find((id) => id.startsWith("sensors")) as AddOnId | null
  );

  const selectedUnit = unitOptions.find((u) => u.id === selectedUnitId);

  // Build active add-ons array
  const activeAddOns: AddOn[] = [];
  if (cameraSelected && availableAddOns.camera) {
    activeAddOns.push(availableAddOns.camera);
  }
  if (sensorsId === "sensors-rear" && availableAddOns.sensorsRear) {
    activeAddOns.push(availableAddOns.sensorsRear);
  }
  if (sensorsId === "sensors-front-rear" && availableAddOns.sensorsFrontRear) {
    activeAddOns.push(availableAddOns.sensorsFrontRear);
  }

  const totalPrice = selectedUnit
    ? calculateTotal(selectedUnit.price, activeAddOns)
    : 0;

  const selection: ConfiguratorSelection | null = selectedUnit
    ? {
        generationId: generation.id,
        unitId: selectedUnit.id,
        unitName: selectedUnit.name,
        unitPrice: selectedUnit.price,
        addOns: activeAddOns,
        totalPrice,
        packageString: buildPackageString(generation, selectedUnit.name, activeAddOns),
      }
    : null;

  const bookingUrl = selection
    ? buildBookingUrl(make, model, generation.id, selection)
    : buildBookingUrl(make, model, generation.id);

  const quoteUrl = buildQuoteUrl(make, model, generation.id, service);

  // In flow mode, notify parent on every change
  useEffect(() => {
    if (mode === "flow" && selection && onComplete) {
      onComplete(selection);
    }
  }, [selectedUnitId, cameraSelected, sensorsId]); // eslint-disable-line

  // ── Quote path ───────────────────────────────────────────────
  if (opts.requiresQuote) {
    return (
      <div className="border border-white/[0.08] rounded-xl p-5 bg-bg-2">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1.5" />
          <div>
            <p className="text-sm font-medium text-upfit-text mb-1">
              Custom quote required
            </p>
            <p className="text-xs text-upfit-muted leading-relaxed">
              {opts.quoteReason}
            </p>
          </div>
        </div>
        <Link
          href={quoteUrl}
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Get a quote →
        </Link>
      </div>
    );
  }

  // ── Configurator UI ──────────────────────────────────────────
  return (
    <div className="space-y-4">

      {/* Unit selection */}
      {unitOptions.length > 0 && (
        <div>
          {unitOptions.length > 1 && (
            <p className="text-xs text-upfit-muted uppercase tracking-wider mb-2">
              {opts.showModuleFirst ? "Choose your upgrade path" : "Choose your head unit"}
            </p>
          )}
          <div className="space-y-2">
            {unitOptions.map((unit) => (
              <UnitCard
                key={unit.id}
                unit={unit}
                selected={selectedUnitId === unit.id}
                onSelect={() => setSelectedUnitId(unit.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Camera retained notice */}
      {opts.showCameraRetainedNotice && (
        <div className="flex items-center gap-2 px-4 py-3 bg-bg-2 border border-white/[0.06] rounded-xl">
          <span className="text-accent text-sm">✓</span>
          <p className="text-xs text-upfit-muted">
            Your factory reverse camera is retained — no new camera needed.
          </p>
        </div>
      )}

      {/* Add-ons */}
      {(opts.showCameraOption || opts.showSensorsOption) && (
        <div>
          <p className="text-xs text-upfit-muted uppercase tracking-wider mb-2">
            Add-ons
          </p>
          <div className="space-y-2">
            {opts.showCameraOption && availableAddOns.camera && (
              <div className="border border-white/[0.08] rounded-xl p-4 bg-bg-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-upfit-text">
                      Reverse camera
                    </p>
                    <p className="text-xs text-upfit-muted mt-0.5">
                      AHD camera hardwired to head unit
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-upfit-muted">
                      +${availableAddOns.camera.price}
                    </p>
                    <button
                      onClick={() => setCameraSelected(!cameraSelected)}
                      className={`w-10 h-6 rounded-full transition-all relative ${
                        cameraSelected ? "bg-accent" : "bg-white/[0.1]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                          cameraSelected ? "left-5" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {opts.showSensorsOption && availableAddOns.sensorsRear && availableAddOns.sensorsFrontRear && (
              <AddOnRow
                label="Parking sensors"
                idA="sensors-rear"
                labelA="Rear only"
                priceA={availableAddOns.sensorsRear.price}
                idB="sensors-front-rear"
                labelB="Front + rear"
                priceB={availableAddOns.sensorsFrontRear.price}
                selectedId={sensorsId}
                onSelect={setSensorsId}
              />
            )}
          </div>
        </div>
      )}

      {/* Caveat */}
      {opts.caveat && (
        <p className="text-xs text-upfit-faint bg-bg-2 border border-white/[0.06] rounded-lg px-3 py-2 leading-relaxed">
          ⚠ {opts.caveat}
        </p>
      )}

      {/* Enthusiast note */}
      {opts.enthusiastNote && (
        <p className="text-xs text-upfit-muted border-l-2 border-accent/30 pl-3 leading-relaxed">
          {opts.enthusiastNote}
        </p>
      )}

      {/* Total + CTA */}
      {mode === "page" && selectedUnit && (
        <div className="border border-white/[0.08] rounded-xl p-4 bg-bg-2">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-upfit-muted mb-1">Your package</p>
              <p className="text-sm text-upfit-text">{selectedUnit.name}</p>
              {activeAddOns.map((a) => (
                <p key={a.id} className="text-xs text-upfit-muted">
                  + {a.label}
                </p>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs text-upfit-muted mb-0.5">Total</p>
              <p className="font-serif text-3xl text-accent">
                ${totalPrice.toLocaleString()}
              </p>
              <p className="text-[10px] text-upfit-faint">inc. GST</p>
            </div>
          </div>
          <Link
            href={bookingUrl}
            className="w-full flex items-center justify-center gap-2 bg-accent text-bg font-medium py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Book this install →
          </Link>
        </div>
      )}

      {/* Flow mode — running total only (CTA is handled by BookingFlow) */}
      {mode === "flow" && selectedUnit && (
        <div className="flex items-center justify-between px-4 py-3 bg-bg-2 border border-white/[0.08] rounded-xl">
          <div>
            <p className="text-xs text-upfit-muted">Package total</p>
            <p className="text-sm text-upfit-text mt-0.5">
              {selectedUnit.name}
              {activeAddOns.length > 0 && (
                <span className="text-upfit-faint">
                  {" "}+ {activeAddOns.map((a) => a.label).join(", ")}
                </span>
              )}
            </p>
          </div>
          <p className="font-serif text-2xl text-accent">
            ${totalPrice.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
