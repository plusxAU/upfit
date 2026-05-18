"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";
import { unitTiers } from "@/lib/units";
import type { VehicleGeneration } from "@/lib/vehicles";
import type { UnitTier } from "@/lib/units";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimePreference = "flexible" | "callback" | "schedule";

type AddOn = {
  id: string;
  name: string;
  price: number;
};

type BookingState = {
  make: string;
  model: string;
  year: string;
  unitId: string;
  unitName: string;
  basePrice: number;
  addOns: AddOn[];
  suburb: string;
  postcode: string;
  address: string;
  timePreference: TimePreference;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  agreedToTerms: boolean;
};

const initialState: BookingState = {
  make: "", model: "", year: "", unitId: "", unitName: "",
  basePrice: 0, addOns: [], suburb: "", postcode: "", address: "",
  timePreference: "flexible", date: "", time: "",
  name: "", phone: "", email: "", notes: "", agreedToTerms: false,
};

const STEPS = ["Vehicle", "Package", "Location", "Time", "Confirm"];

const selectStyle = {
  background: "#161614",
  color: "#f0ede6",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "8px",
  padding: "12px 14px",
  fontSize: "14px",
  width: "100%",
  appearance: "none" as const,
};

// Head unit tiers (excludes module/adapter tiers)
const headUnitTiers = unitTiers.filter((t) => !t.isModule);

// Returns the appropriate module/adapter tier for a generation, or null.
function getModuleTier(gen: VehicleGeneration): UnitTier | null {
  if (!gen.configurator.moduleAvailable) return null;
  if (gen.factory.hasCarPlay) {
    return unitTiers.find((t) => t.id === "wireless-adapter") ?? null;
  }
  const price = gen.pricing.moduleInstalled;
  if (!price) return null;
  return (
    unitTiers.find(
      (t) => t.isModule && t.id !== "wireless-adapter" && t.installedPrice === price
    ) ?? null
  );
}

// ─── UnitCard ─────────────────────────────────────────────────────────────────

function UnitCard({
  tier,
  isSelected,
  onSelect,
}: {
  tier: UnitTier;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left bg-bg-2 border rounded-xl p-5 flex items-center gap-4 transition-all cursor-pointer ${
        isSelected
          ? "border-accent bg-accent/[0.03]"
          : tier.popular
          ? "border-accent/30 hover:border-accent/50"
          : "border-white/[0.08] hover:border-white/[0.14]"
      }`}
    >
      <div className="flex-1">
        {tier.badge ? (
          <p className="text-[10px] text-accent uppercase tracking-wider font-medium mb-1.5">
            {tier.badge}
          </p>
        ) : (
          <div className="h-4 mb-1.5" />
        )}
        <p className="text-base font-medium text-upfit-text mb-0.5">{tier.name}</p>
        <p className="text-xs text-upfit-faint mb-1">
          {tier.brand} · {tier.modelSku}
        </p>
        <p className="text-xs text-upfit-muted leading-relaxed">
          {tier.screen} · {tier.features.slice(0, 3).join(" · ")}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-serif text-2xl text-upfit-text leading-tight">
          ${tier.installedPrice.toLocaleString()}
        </p>
        <p className="text-[10px] text-upfit-faint mt-0.5">
          {tier.installTimeMin}–{tier.installTimeMax} min
        </p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected ? "border-accent bg-accent" : "border-white/[0.14]"
        }`}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-bg" />}
      </div>
    </button>
  );
}

// ─── BookingFlow ──────────────────────────────────────────────────────────────

export default function BookingFlow({
  prefillMake = "",
  prefillModel = "",
  prefillYear = "",
}: {
  prefillMake?: string;
  prefillModel?: string;
  prefillYear?: string;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<BookingState>({
    ...initialState,
    make: prefillMake,
    model: prefillModel,
    year: prefillYear,
  });

  // ── Derived vehicle data ───────────────────────────────────────────────────
  const brand = vehicles.find((b) => b.name === state.make);
  const model = brand?.models.find((m) => m.name === state.model);
  const generation = model?.generations.find((g) => g.slug === state.year);

  // Step 2 path flags
  const isAdapterOnly = !!generation?.factory.hasCarPlay;
  const showModulePrimary =
    !isAdapterOnly &&
    !!generation?.configurator.moduleAvailable &&
    !!generation?.configurator.moduleRecommended;
  const moduleTier = generation ? getModuleTier(generation) : null;

  // Whether the add-ons section has anything to render
  const hasAddOns =
    !!generation &&
    (generation.configurator.showCameraOption ||
      generation.configurator.showSensorsOption ||
      generation.configurator.cameraRetentionAvailable);

  // Derived total — never stored in state to avoid sync bugs
  const totalPrice =
    state.basePrice + state.addOns.reduce((sum, a) => sum + a.price, 0);

  // ── State helpers ──────────────────────────────────────────────────────────

  function update(patch: Partial<BookingState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function selectUnit(tier: UnitTier) {
    update({ unitId: tier.id, unitName: tier.name, basePrice: tier.installedPrice, addOns: [] });
  }

  function toggleCamera(checked: boolean) {
    if (checked) {
      update({
        addOns: [
          ...state.addOns.filter((a) => a.id !== "camera"),
          { id: "camera", name: "Reverse camera", price: 220 },
        ],
      });
    } else {
      update({ addOns: state.addOns.filter((a) => a.id !== "camera") });
    }
  }

  function setSensors(value: string) {
    const base = state.addOns.filter(
      (a) => a.id !== "sensors-rear" && a.id !== "sensors-front-rear"
    );
    if (value === "rear") {
      update({ addOns: [...base, { id: "sensors-rear", name: "Parking sensors (rear)", price: 220 }] });
    } else if (value === "front-rear") {
      update({ addOns: [...base, { id: "sensors-front-rear", name: "Parking sensors (front + rear)", price: 320 }] });
    } else {
      update({ addOns: base });
    }
  }

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      make: e.target.value,
      model: "",
      year: "",
      unitId: "",
      unitName: "",
      basePrice: 0,
      addOns: [],
    }));
  }

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      model: e.target.value,
      year: "",
      unitId: "",
      unitName: "",
      basePrice: 0,
      addOns: [],
    }));
  }

  function goTo(n: number) {
    // Auto-select the wireless adapter when entering step 2 for CarPlay-equipped vehicles
    if (n === 2 && isAdapterOnly && !state.unitId) {
      const adapter = unitTiers.find((t) => t.id === "wireless-adapter");
      if (adapter) {
        setState((s) => ({
          ...s,
          unitId: adapter.id,
          unitName: adapter.name,
          basePrice: adapter.installedPrice,
          addOns: [],
        }));
      }
    }
    if (n >= 1 && n <= 5) setStep(n);
  }

  // ── HubSpot submission ─────────────────────────────────────────────────────

  async function handleSubmit() {
    const nameParts = state.name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const timePreferenceValue =
      state.timePreference === "flexible"
        ? "ASAP"
        : state.timePreference === "callback"
        ? "questions_first"
        : "preferred_time";

    const notesValue = [
      state.notes || "",
      state.timePreference === "schedule" && state.date
        ? `Preferred time: ${state.date} · ${state.time}`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const addOnsSummary =
      state.addOns.length > 0
        ? " + " + state.addOns.map((a) => `${a.name} ($${a.price})`).join(" + ")
        : "";
    const serviceTypeValue = `CarPlay & Android Auto · ${state.unitName} ($${state.basePrice})${addOnsSummary} · Total: $${totalPrice}`;

    const fields = [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: state.email },
      { name: "phone", value: state.phone },
      { name: "city", value: state.suburb },
      { name: "zip", value: state.postcode },
      { name: "vehicle_make", value: state.make },
      { name: "vehicle_model", value: state.model },
      { name: "vehicle_year", value: state.year },
      { name: "service_type", value: serviceTypeValue },
      { name: "time_preference", value: timePreferenceValue },
      { name: "notes", value: notesValue },
      { name: "address", value: state.address || "" },
      { name: "terms_accepted", value: state.agreedToTerms ? "Yes - agreed at booking" : "No" },
    ];

    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, pageUri: window.location.href }),
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }

    setSubmitted(true);
  }

  // ── Step validation ────────────────────────────────────────────────────────

  const canProceed: Record<number, boolean> = {
    1: !!state.make && !!state.model && !!state.year,
    2: !!state.unitId,
    3: !!state.suburb && !!state.postcode,
    4: true,
    5: !!state.name && !!state.phone && !!state.email && state.agreedToTerms,
  };

  // ── Post-submission confirmation ───────────────────────────────────────────

  if (submitted) {
    const packageLine =
      state.addOns.length > 0
        ? `${state.unitName} + ${state.addOns.map((a) => a.name).join(" + ")}`
        : state.unitName;

    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-accent text-xl">✓</span>
        </div>
        <h2 className="font-serif text-3xl font-normal mb-3">
          Booking request received
        </h2>
        <p className="text-upfit-muted text-base leading-relaxed mb-2">
          Thanks {state.name.split(" ")[0]}. We&apos;ll confirm your{" "}
          {state.make} {state.model} installation within 2 hours.
        </p>
        <p className="text-upfit-muted text-sm mb-8">
          We&apos;ll call or text {state.phone} to lock in a time.
        </p>
        <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 text-left mb-6">
          <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
            Your request summary
          </p>
          {[
            { label: "Vehicle", value: `${state.make} ${state.model} (${state.year})` },
            { label: "Package", value: packageLine },
            { label: "Total", value: `$${totalPrice.toLocaleString()} incl. unit + install` },
            { label: "Location", value: `${state.suburb} ${state.postcode}` },
            {
              label: "Time preference",
              value:
                state.timePreference === "flexible"
                  ? "ASAP — we'll contact you to confirm"
                  : state.timePreference === "callback"
                  ? "Questions first — requesting callback"
                  : `${state.date} · ${state.time}`,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex justify-between py-2.5 border-b border-white/[0.06] last:border-0"
            >
              <span className="text-xs text-upfit-muted">{row.label}</span>
              <span className="text-xs text-upfit-text font-medium text-right max-w-[60%]">
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-upfit-faint">
          Questions? Call or text us and we&apos;ll respond immediately.
        </p>
      </div>
    );
  }

  // ── Main flow ──────────────────────────────────────────────────────────────

  return (
    <div className="max-w-xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const isDone = step > n;
          const isActive = step === n;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isDone && goTo(n)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-all ${
                  isDone
                    ? "bg-accent text-bg cursor-pointer"
                    : isActive
                    ? "bg-accent text-bg ring-4 ring-accent/20"
                    : "bg-bg-3 text-upfit-muted border border-white/[0.14]"
                }`}
              >
                {isDone ? "✓" : n}
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-1 transition-colors ${
                    step > n ? "bg-accent" : "bg-white/[0.08]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step 1 — Vehicle ───────────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Your vehicle</h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm compatibility and show your options.
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <select value={state.make} onChange={handleMakeChange} style={selectStyle}>
              <option value="">Make</option>
              {vehicles.map((b) => (
                <option key={b.slug} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              value={state.model}
              onChange={handleModelChange}
              disabled={!state.make}
              style={{ ...selectStyle, color: state.make ? "#f0ede6" : "#444440" }}
            >
              <option value="">Model</option>
              {brand?.models.map((m) => (
                <option key={m.slug} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {state.model && model && (
            <div className="mb-6">
              <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
                Year range
              </p>
              <div className="flex flex-wrap gap-2">
                {model.generations.map((gen) => (
                  <button
                    key={gen.slug}
                    onClick={() => update({ year: gen.slug, unitId: "", unitName: "", basePrice: 0, addOns: [] })}
                    className={`px-4 py-2 rounded-full text-sm border transition-all cursor-pointer ${
                      state.year === gen.slug
                        ? "border-accent text-accent bg-accent/[0.06]"
                        : "border-white/[0.14] text-upfit-muted hover:border-accent/40"
                    }`}
                  >
                    {gen.label}
                    {gen.content.difficulty === "hard" && (
                      <span className="ml-1.5 text-[10px] text-upfit-faint">(complex)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {generation?.configurator.requiresQuote && (
            <div className="bg-bg-2 border border-white/[0.08] rounded-lg p-4 mb-6 text-sm text-upfit-muted">
              This vehicle needs a custom quote.{" "}
              <Link href="/quote" className="text-accent">
                Request one here →
              </Link>
            </div>
          )}

          <button
            onClick={() => goTo(2)}
            disabled={!canProceed[1] || generation?.configurator.requiresQuote}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
          <p className="text-xs text-upfit-faint mt-3 text-center">
            Don&apos;t see your vehicle?{" "}
            <Link href="/quote" className="text-accent">
              Request a custom quote
            </Link>
          </p>
        </div>
      )}

      {/* ── Step 2 — Package builder ───────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Build your package</h2>
          <p className="text-sm text-upfit-muted mb-1">
            {state.make} {state.model} · {generation?.label}
          </p>
          <p className="text-xs text-upfit-faint mb-7">
            All prices include the unit and installation, GST incl. Your installer
            will confirm the exact model before your appointment.
          </p>

          {/* ── Adapter-only path (vehicle already has wired CarPlay) ── */}
          {isAdapterOnly && (
            <div className="mb-5">
              <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
                Your vehicle already has wired CarPlay
              </p>
              {unitTiers
                .filter((t) => t.id === "wireless-adapter")
                .map((tier) => (
                  <UnitCard
                    key={tier.id}
                    tier={tier}
                    isSelected={state.unitId === tier.id}
                    onSelect={() => selectUnit(tier)}
                  />
                ))}
            </div>
          )}

          {/* ── Module primary + head unit secondary ── */}
          {showModulePrimary && moduleTier && (
            <div className="mb-5">
              <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
                Recommended — keeps your factory screen
              </p>
              <UnitCard
                tier={moduleTier}
                isSelected={state.unitId === moduleTier.id}
                onSelect={() => selectUnit(moduleTier)}
              />
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-upfit-faint">or replace your screen</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="flex flex-col gap-3">
                {headUnitTiers.map((tier) => (
                  <UnitCard
                    key={tier.id}
                    tier={tier}
                    isSelected={state.unitId === tier.id}
                    onSelect={() => selectUnit(tier)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Standard head unit selection ── */}
          {!isAdapterOnly && !showModulePrimary && (
            <div className="flex flex-col gap-3 mb-5">
              {headUnitTiers.map((tier) => (
                <UnitCard
                  key={tier.id}
                  tier={tier}
                  isSelected={state.unitId === tier.id}
                  onSelect={() => selectUnit(tier)}
                />
              ))}
            </div>
          )}

          {/* ── Add-ons ── */}
          {state.unitId && generation && hasAddOns && (
            <div className="border-t border-white/[0.06] pt-5 mb-5">
              <p className="text-xs text-upfit-muted uppercase tracking-wider mb-4">
                Add-ons
              </p>

              {/* Factory camera retained notice */}
              {generation.configurator.cameraRetentionAvailable && (
                <div className="flex items-center gap-2 text-sm text-upfit-muted mb-4 bg-bg-2 border border-white/[0.06] rounded-lg px-3 py-2.5">
                  <span className="text-accent text-xs font-medium">✓</span>
                  <span>Factory camera retained — included at no extra cost</span>
                </div>
              )}

              {/* Reverse camera checkbox */}
              {generation.configurator.showCameraOption && (
                <label className="flex items-center justify-between py-3 border-b border-white/[0.06] cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all flex-shrink-0 ${
                        state.addOns.some((a) => a.id === "camera")
                          ? "bg-accent border-accent"
                          : "border-white/[0.25] bg-bg-2 group-hover:border-accent/50"
                      }`}
                    >
                      {state.addOns.some((a) => a.id === "camera") && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="#0f0f0d"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-upfit-text">Add reverse camera</p>
                      <p className="text-xs text-upfit-faint">AHD camera, hardwired</p>
                    </div>
                  </div>
                  <span className="text-sm text-accent font-medium flex-shrink-0 ml-4">+$220</span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={state.addOns.some((a) => a.id === "camera")}
                    onChange={(e) => toggleCamera(e.target.checked)}
                  />
                </label>
              )}

              {/* Parking sensors dropdown */}
              {generation.configurator.showSensorsOption && (
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-upfit-text">Parking sensors</p>
                    <p className="text-xs text-upfit-faint">Audible alerts, colour-matched</p>
                  </div>
                  <select
                    value={
                      state.addOns.some((a) => a.id === "sensors-rear")
                        ? "rear"
                        : state.addOns.some((a) => a.id === "sensors-front-rear")
                        ? "front-rear"
                        : "none"
                    }
                    onChange={(e) => setSensors(e.target.value)}
                    style={{ ...selectStyle, width: "auto", padding: "8px 12px", fontSize: "13px" }}
                  >
                    <option value="none">None</option>
                    <option value="rear">Rear only (+$220)</option>
                    <option value="front-rear">Front + rear (+$320)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* ── Running total ── */}
          {state.unitId && (
            <div className="bg-bg-3 border border-white/[0.08] rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-upfit-faint uppercase tracking-wider mb-0.5">
                  Total
                </p>
                <p className="font-serif text-2xl text-upfit-text">
                  ${totalPrice.toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-upfit-muted text-right leading-relaxed">
                Unit + installation
                <br />
                GST incl.
              </p>
            </div>
          )}

          <button
            onClick={() => goTo(1)}
            className="w-full text-upfit-muted text-sm py-3 border border-white/[0.14] rounded-lg hover:border-white/[0.2] hover:text-upfit-text transition-all mb-2.5 bg-transparent cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={() => goTo(3)}
            disabled={!canProceed[2]}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 3 — Location ──────────────────────────────────────────────── */}
      {step === 3 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Your location</h2>
          <p className="text-sm text-upfit-muted mb-7">
            We come to you — home, office or anywhere the car is parked.
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-7">
            <input
              placeholder="Suburb"
              value={state.suburb}
              onChange={(e) => update({ suburb: e.target.value })}
            />
            <input
              placeholder="Postcode"
              value={state.postcode}
              onChange={(e) => update({ postcode: e.target.value })}
            />
          </div>

          <button
            onClick={() => goTo(2)}
            className="w-full text-upfit-muted text-sm py-3 border border-white/[0.14] rounded-lg hover:border-white/[0.2] hover:text-upfit-text transition-all mb-2.5 bg-transparent cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={() => goTo(4)}
            disabled={!canProceed[3]}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 4 — Time preference ───────────────────────────────────────── */}
      {step === 4 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">When suits you?</h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm availability when we contact you. No commitment needed
            at this stage.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            {(
              [
                {
                  id: "flexible" as const,
                  title: "ASAP — contact me to lock in a time",
                  body: "We'll call or text you to confirm. Typical response time 30 minutes to 2 hours.",
                  badge: "Fastest",
                },
                {
                  id: "schedule" as const,
                  title: "I have a preferred time",
                  body: "Suggest a date and time. We'll confirm availability.",
                  badge: null,
                },
                {
                  id: "callback" as const,
                  title: "I have a few questions first",
                  body: "Call me back before we confirm anything.",
                  badge: null,
                },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                onClick={() => update({ timePreference: option.id })}
                className={`w-full text-left border rounded-xl p-4 transition-all cursor-pointer ${
                  state.timePreference === option.id
                    ? "border-accent bg-accent/[0.03]"
                    : "border-white/[0.08] bg-bg-2 hover:border-white/[0.14]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-upfit-text">{option.title}</p>
                  {option.badge && (
                    <span className="text-[10px] text-accent uppercase tracking-wider font-medium bg-accent/10 px-2 py-0.5 rounded">
                      {option.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-upfit-muted">{option.body}</p>
              </button>
            ))}
          </div>

          {state.timePreference === "schedule" && (
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <input
                type="date"
                value={state.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => update({ date: e.target.value })}
              />
              <select
                value={state.time}
                onChange={(e) => update({ time: e.target.value })}
                style={selectStyle}
              >
                <option value="">Preferred time</option>
                <option>Morning (8am–12pm)</option>
                <option>Afternoon (12pm–5pm)</option>
              </select>
            </div>
          )}

          <button
            onClick={() => goTo(3)}
            className="w-full text-upfit-muted text-sm py-3 border border-white/[0.14] rounded-lg hover:border-white/[0.2] hover:text-upfit-text transition-all mb-2.5 bg-transparent cursor-pointer"
          >
            ← Back
          </button>
          <button
            onClick={() => goTo(5)}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0"
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 5 — Contact details ───────────────────────────────────────── */}
      {step === 5 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Almost done</h2>
          <p className="text-sm text-upfit-muted mb-7">
            No payment needed yet. We&apos;ll confirm your booking within 2 hours and
            send a payment link once locked in.
          </p>

          {/* Order summary */}
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 mb-5 divide-y divide-white/[0.06]">
            {[
              {
                label: "Vehicle",
                value: `${state.make} ${state.model} (${state.year})`,
              },
              {
                label: "Package",
                value:
                  state.addOns.length > 0
                    ? `${state.unitName} + ${state.addOns.map((a) => a.name).join(", ")}`
                    : state.unitName,
              },
              {
                label: "Total",
                value: `$${totalPrice.toLocaleString()} incl. GST`,
              },
              {
                label: "Location",
                value: `${state.suburb} ${state.postcode}`,
              },
              {
                label: "Time",
                value:
                  state.timePreference === "flexible"
                    ? "ASAP — we'll contact you to confirm"
                    : state.timePreference === "callback"
                    ? "Questions first — requesting callback"
                    : `${state.date} · ${state.time}`,
              },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5">
                <span className="text-xs text-upfit-muted">{row.label}</span>
                <span className="text-xs text-upfit-text font-medium text-right max-w-[60%]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <input
            placeholder="Your name"
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            className="mb-2.5"
          />
          <input
            placeholder="Mobile number"
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className="mb-2.5"
          />
          <input
            placeholder="Email address"
            type="email"
            value={state.email}
            onChange={(e) => update({ email: e.target.value })}
            className="mb-2.5"
          />
          <input
            placeholder="Where should we come? (street address — optional for now)"
            value={state.address}
            onChange={(e) => update({ address: e.target.value })}
            className="mb-2.5"
          />
          <textarea
            placeholder="Anything else we should know? (optional)"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            style={{
              background: "#161614",
              color: "#f0ede6",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "14px",
              width: "100%",
              minHeight: "80px",
              resize: "vertical" as const,
              marginBottom: "24px",
              fontFamily: "var(--font-dm-sans)",
            }}
          />

          <button
            onClick={() => goTo(4)}
            className="w-full text-upfit-muted text-sm py-3 border border-white/[0.14] rounded-lg hover:border-white/[0.2] hover:text-upfit-text transition-all mb-2.5 bg-transparent cursor-pointer"
          >
            ← Back
          </button>

          {/* Terms & Conditions + Privacy Policy checkbox */}
          <label className="flex items-start gap-3 mb-4 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={state.agreedToTerms}
                onChange={(e) => update({ agreedToTerms: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all ${
                  state.agreedToTerms
                    ? "bg-accent border-accent"
                    : "border-white/[0.25] bg-bg-2 group-hover:border-accent/50"
                }`}
              >
                {state.agreedToTerms && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#0f0f0d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-upfit-muted leading-relaxed">
              I have read and agree to UpFit&apos;s{" "}
              <Link href="/terms" target="_blank" className="text-accent hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              . I confirm I am the vehicle owner or authorised to approve work on the vehicle.
            </span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!canProceed[5]}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            Request booking →
          </button>
          <p className="text-xs text-upfit-faint mt-3 text-center leading-relaxed">
            No payment required. We&apos;ll call or text to confirm your booking within 2 hours.
          </p>
        </div>
      )}
    </div>
  );
}
