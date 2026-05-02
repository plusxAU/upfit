"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";
import { unitTiers, getUnitPrice } from "@/lib/units";

type TimePreference = "flexible" | "callback" | "schedule";

type BookingState = {
  make: string;
  model: string;
  year: string;
  unitId: string;
  unitName: string;
  unitPrice: number;
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
};

const initialState: BookingState = {
  make: "", model: "", year: "", unitId: "", unitName: "",
  unitPrice: 0, suburb: "", postcode: "", address: "",
  timePreference: "flexible", date: "", time: "",
  name: "", phone: "", email: "", notes: "",
};

const STEPS = ["Vehicle", "Unit", "Location", "Time", "Confirm"];

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

  const brand = vehicles.find((b) => b.name === state.make);
  const model = brand?.models.find((m) => m.name === state.model);
  const generation = model?.generations.find((g) => g.years === state.year);

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
    }));
  }

  function goTo(n: number) {
    if (n >= 1 && n <= 5) setStep(n);
  }

  async function handleSubmit() {
    const nameParts = state.name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const timeLabel =
      state.timePreference === "flexible"
        ? "ASAP — contact me to lock in a time"
        : state.timePreference === "callback"
        ? "Questions first — call me back"
        : `${state.date} · ${state.time}`;

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
      { name: "service_type", value: `CarPlay & Android Auto · ${state.unitName} · from $${state.unitPrice}` },
      { name: "time_preference", value: timeLabel },
      { name: "notes", value: state.notes || "" },
      { name: "address", value: state.address || "" },
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
    5: !!state.name && !!state.phone && !!state.email,
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
              value: `${state.make} ${state.model} (${state.year})`,
            },
            {
              label: "Service",
              value: `CarPlay & Android Auto · ${state.unitName}`,
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
            {
              label: "Estimated price",
              value: `From $${state.unitPrice} incl. unit + install`,
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
                    key={gen.years}
                    onClick={() => update({ year: gen.years, unitId: "" })}
                    className={`px-4 py-2 rounded-full text-sm border transition-all cursor-pointer ${
                      state.year === gen.years
                        ? "border-accent text-accent bg-accent/[0.06]"
                        : "border-white/[0.14] text-upfit-muted hover:border-accent/40"
                    }`}
                  >
                    {gen.years}
                    {gen.complexity === "complex" && (
                      <span className="ml-1.5 text-[10px] text-upfit-faint">
                        (complex)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {generation?.complexity === "quote" && (
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
              !canProceed[1] || generation?.complexity === "quote"
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

      {/* Step 2 — Unit */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">
            Choose your unit
          </h2>
          <p className="text-sm text-upfit-muted mb-1">
            {state.make} {state.model} ({state.year})
          </p>
          <p className="text-xs text-upfit-faint mb-7">
            All prices include the unit and installation, GST incl. Your
            installer will confirm the exact model before your appointment.
          </p>

          <div className="flex flex-col gap-3 mb-7">
            {unitTiers.map((tier) => {
              const price = getUnitPrice(
                generation?.carplayFrom ?? 450,
                tier.priceMultiplier
              );
              const isSelected = state.unitId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() =>
                    update({
                      unitId: tier.id,
                      unitName: tier.name,
                      unitPrice: price,
                    })
                  }
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
                    <p className="text-base font-medium text-upfit-text mb-1">
                      {tier.name}
                    </p>
                    <p className="text-xs text-upfit-muted leading-relaxed">
                      {tier.screen} · {tier.features.join(" · ")}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-upfit-faint uppercase tracking-wider">
                      From
                    </p>
                    <p className="font-serif text-2xl text-upfit-text leading-tight">
                      ${price}
                    </p>
                    <p className="text-[10px] text-upfit-faint mt-0.5">
                      unit + install
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? "border-accent bg-accent"
                        : "border-white/[0.14]"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-bg" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

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
                value: `${state.make} ${state.model} (${state.year})`,
              },
              {
                label: "Unit",
                value: `${state.unitName} — from $${state.unitPrice} incl. unit + install`,
              },
              {
                label: "Location",
                value: `${state.suburb} ${state.postcode}`,
              },              {
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
