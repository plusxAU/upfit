"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";
import Configurator from "@/components/Configurator";
import {
  parseBookingParams,
  ADD_ON_CAMERA,
  ADD_ON_SENSORS_REAR,
  ADD_ON_SENSORS_FRONT_REAR,
  type AddOn,
  type AddOnId,
  type ConfiguratorSelection,
} from "@/lib/configurator";

// ─── Types ───────────────────────────────────────────────────────────────────

type TimePreference = "flexible" | "callback" | "schedule";

type BookingState = {
  make: string;
  model: string;
  year: string;          // stores generation.id
  unitId: string;
  unitName: string;
  unitPrice: number;
  addOns: AddOn[];
  packageString: string;
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
  unitPrice: 0, addOns: [], packageString: "",
  suburb: "", postcode: "", address: "",
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

function resolveAddOns(ids: AddOnId[]): AddOn[] {
  return ids.map((id) => {
    if (id === "camera") return ADD_ON_CAMERA;
    if (id === "sensors-rear") return ADD_ON_SENSORS_REAR;
    if (id === "sensors-front-rear") return ADD_ON_SENSORS_FRONT_REAR;
    return null;
  }).filter((a): a is AddOn => a !== null);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BookingFlow({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const parsed = parseBookingParams(searchParams);

  const [step, setStep] = useState(parsed.startAtStep);
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<BookingState>({
    ...initialState,
    make: parsed.make,
    model: parsed.model,
    year: parsed.generationId,
    unitId: parsed.unitId,
    unitName: parsed.unitName,
    unitPrice: parsed.unitPrice,
    addOns: resolveAddOns(parsed.addOnIds),
    packageString: parsed.unitName,
  });

  const brand = vehicles.find((b) => b.name === state.make);
  const model = brand?.models.find((m) => m.name === state.model);
  const generation = model?.generations.find((g) => g.id === state.year);

  const totalPrice = state.unitPrice + state.addOns.reduce((sum, a) => sum + a.price, 0);

  function update(patch: Partial<BookingState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      make: e.target.value,
      model: "",
      year: "",
      unitId: "",
      unitName: "",
      unitPrice: 0,
      addOns: [],
      packageString: "",
    }));
  }

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      model: e.target.value,
      year: "",
      unitId: "",
      unitName: "",
      unitPrice: 0,
      addOns: [],
      packageString: "",
    }));
  }

  function handleConfiguratorComplete(selection: ConfiguratorSelection) {
    setState((s) => ({
      ...s,
      unitId: selection.unitId,
      unitName: selection.unitName,
      unitPrice: selection.unitPrice,
      addOns: selection.addOns,
      packageString: selection.packageString,
    }));
  }

  function goTo(n: number) {
    if (n >= 1 && n <= 5) setStep(n);
  }

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

    const serviceTypeValue = state.packageString
      ? `${state.packageString} · Total: $${totalPrice}`
      : `CarPlay & Android Auto · ${state.unitName} · $${totalPrice}`;

    const fields = [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: state.email },
      { name: "phone", value: state.phone },
      { name: "city", value: state.suburb },
      { name: "zip", value: state.postcode },
      { name: "vehicle_make", value: state.make },
      { name: "vehicle_model", value: state.model },
      { name: "vehicle_year", value: generation?.label ?? state.year },
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
        body: JSON.stringify({
          fields,
          pageUri: window.location.href,
        }),
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }

    setSubmitted(true);
  }

  const canProceed: Record<number, boolean> = {
    1: !!state.make && !!state.model && !!state.year,
    2: !!state.unitId,
    3: !!state.suburb && !!state.postcode,
    4: true,
    5: !!state.name && !!state.phone && !!state.email && state.agreedToTerms,
  };

  // Confirmation screen
  if (submitted) {
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
            {
              label: "Vehicle",
              value: `${state.make} ${state.model}${generation ? ` · ${generation.label}` : ""}`,
            },
            {
              label: "Package",
              value: state.unitName,
            },
            {
              label: "Add-ons",
              value: state.addOns.length > 0 ? state.addOns.map((a) => a.label).join(", ") : "None",
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

      {/* Step 1 — Vehicle */}
      {step === 1 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Your vehicle
          </h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm compatibility and show your options.
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <select
              value={state.make}
              onChange={handleMakeChange}
              style={selectStyle}
            >
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
              style={{
                ...selectStyle,
                color: state.make ? "#f0ede6" : "#444440",
              }}
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
                    onClick={() => update({ year: gen.id, unitId: "", addOns: [], packageString: "" })}
                    className={`px-4 py-2 rounded-full text-sm border transition-all cursor-pointer ${
                      state.year === gen.id
                        ? "border-accent text-accent bg-accent/[0.06]"
                        : "border-white/[0.14] text-upfit-muted hover:border-accent/40"
                    }`}
                  >
                    {gen.label}
                    {gen.content.difficulty === "hard" && (
                      <span className="ml-1.5 text-[10px] text-upfit-faint">
                        (complex)
                      </span>
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
            disabled={
              !canProceed[1] || !!generation?.configurator.requiresQuote
            }
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

      {/* Step 2 — Package */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Your package
          </h2>
          <p className="text-sm text-upfit-muted mb-1">
            {state.make} {state.model}{generation ? ` · ${generation.label}` : ""}
          </p>
          <p className="text-xs text-upfit-faint mb-7">
            All prices include the unit and installation, GST incl.
          </p>

          {generation && (
            <div className="mb-7">
              <Configurator
                generation={generation}
                make={state.make}
                model={state.model}
                service="carplay-installation"
                mode="flow"
                onComplete={handleConfiguratorComplete}
                initialUnitId={state.unitId || undefined}
                initialAddOnIds={state.addOns.map((a) => a.id as AddOnId)}
              />
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

      {/* Step 3 — Location */}
      {step === 3 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Your location
          </h2>
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

      {/* Step 4 — Time preference */}
      {step === 4 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            When suits you?
          </h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm availability when we contact you. No
            commitment needed at this stage.
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
                  <p className="text-sm font-medium text-upfit-text">
                    {option.title}
                  </p>
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

      {/* Step 5 — Contact details */}
      {step === 5 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Almost done
          </h2>
          <p className="text-sm text-upfit-muted mb-7">
            No payment needed yet. We&apos;ll confirm your booking within 2
            hours and send a payment link once locked in.
          </p>

          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 mb-5 divide-y divide-white/[0.06]">
            {[
              {
                label: "Vehicle",
                value: `${state.make} ${state.model}${generation ? ` · ${generation.label}` : ""}`,
              },
              {
                label: "Package",
                value: state.unitName,
              },
              ...(state.addOns.length > 0
                ? [{ label: "Add-ons", value: state.addOns.map((a) => a.label).join(", ") }]
                : []),
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
              <div className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all ${
                state.agreedToTerms
                  ? "bg-accent border-accent"
                  : "border-white/[0.25] bg-bg-2 group-hover:border-accent/50"
              }`}>
                {state.agreedToTerms && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0f0f0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-upfit-muted leading-relaxed">
              I have read and agree to UpFit&apos;s{" "}
              <Link
                href="/terms"
                target="_blank"
                className="text-accent hover:underline"
              >
                Terms &amp; Conditions
              </Link>
              {" "}and{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-accent hover:underline"
              >
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
