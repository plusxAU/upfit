"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
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
  year: string;
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
  agreedToBalance: boolean;
};

const initialState: BookingState = {
  make: "", model: "", year: "", unitId: "", unitName: "",
  unitPrice: 0, addOns: [], packageString: "",
  suburb: "", postcode: "", address: "",
  timePreference: "flexible", date: "", time: "",
  name: "", phone: "", email: "", notes: "",
  agreedToTerms: false, agreedToBalance: false,
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

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "Arial",
      fontSize: "14px",
      "::placeholder": { color: "#666660" },
    },
    invalid: { color: "#e8f44a" },
  },
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
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const parsed = parseBookingParams(searchParams);

  const [step, setStep] = useState(parsed.startAtStep);
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

  const [cardComplete, setCardComplete] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const brand = vehicles.find((b) => b.name === state.make);
  const model = brand?.models.find((m) => m.name === state.model);
  const generation = model?.generations.find((g) => g.id === state.year);

  const totalPrice = state.unitPrice + state.addOns.reduce((sum, a) => sum + a.price, 0);
  const depositAmount = Math.round(totalPrice * 0.5);
  const balanceAmount = totalPrice - depositAmount;

  function update(patch: Partial<BookingState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  function handleMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      make: e.target.value,
      model: "", year: "", unitId: "", unitName: "",
      unitPrice: 0, addOns: [], packageString: "",
    }));
  }

  function handleModelChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setState((s) => ({
      ...s,
      model: e.target.value,
      year: "", unitId: "", unitName: "",
      unitPrice: 0, addOns: [], packageString: "",
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

  const contactFieldsFilled =
    !!state.name && !!state.phone && !!state.email;

  const canCallback =
    !!state.name && !!state.phone && !!state.email &&
    !!state.suburb && !!state.postcode;

  const canProceed: Record<number, boolean> = {
    1: !!state.make && !!state.model && !!state.year,
    2: !!state.unitId,
    3: !!state.suburb && !!state.postcode,
    4: true,
    5: contactFieldsFilled && cardComplete && state.agreedToBalance && state.agreedToTerms,
  };

  async function handleSubmit() {
    if (!stripe || !elements) return;

    setPaymentError(null);
    setIsProcessing(true);

    try {
      const jobDescription = state.packageString
        ? `${state.packageString} · ${state.make} ${state.model}`
        : `${state.unitName} · ${state.make} ${state.model}`;

      const intentRes = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice,
          customerEmail: state.email,
          customerName: state.name,
          jobDescription,
        }),
      });

      if (!intentRes.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, customerId } = await intentRes.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: state.name,
            email: state.email,
          },
        },
      });

      if (error) {
        setPaymentError(error.message ?? "Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status !== "succeeded") {
        setPaymentError("Payment was not completed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Submit to HubSpot after successful payment
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
        { name: "stripe_customer_id", value: customerId },
      ];

      try {
        await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields, pageUri: window.location.href }),
        });
      } catch (err) {
        console.error("HubSpot submission error:", err);
      }

      const timeLabel =
        state.timePreference === "flexible"
          ? "ASAP"
          : state.timePreference === "callback"
          ? "questions_first"
          : `${state.date} · ${state.time}`;

      try {
        await fetch("/api/email/booking-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            customerName: state.name,
            customerEmail: state.email,
            vehicle: `${state.make} ${state.model}${generation ? ` · ${generation.label}` : ""}`,
            packageName: state.unitName,
            addOns: state.addOns.map((a) => a.label),
            totalPrice: totalPrice.toLocaleString(),
            depositAmount: depositAmount.toLocaleString(),
            balanceAmount: balanceAmount.toLocaleString(),
            location: `${state.suburb} ${state.postcode}`,
            timePreference: timeLabel,
            address: state.address || null,
            notes: state.notes || null,
          }),
        });
      } catch (err) {
        console.error("Confirmation email error:", err);
      }

      const confirmationParams = new URLSearchParams({
        name: state.name,
        vehicle: `${state.make} ${state.model}${generation ? ` · ${generation.label}` : ""}`,
        pkg: state.unitName,
        addons: state.addOns.map((a) => a.label).join(","),
        total: String(totalPrice),
        deposit: String(depositAmount),
        balance: String(balanceAmount),
        location: `${state.suburb} ${state.postcode}`,
        time: timeLabel,
        intentId: paymentIntent.id,
      });
      router.push(`/booking/confirmation?${confirmationParams.toString()}`);
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  }

  async function handleCallbackSubmit() {
    setIsProcessing(true);
    try {
      const nameParts = state.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      const serviceTypeValue = state.packageString
        ? `${state.packageString} · Total: $${totalPrice}`
        : `CarPlay & Android Auto · ${state.unitName} · $${totalPrice}`;

      const notesValue = [
        state.notes || "",
        state.timePreference === "schedule" && state.date
          ? `Preferred time: ${state.date} · ${state.time}`
          : "",
      ]
        .filter(Boolean)
        .join(" | ");

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
        { name: "time_preference", value: "questions_first" },
        { name: "notes", value: notesValue },
        { name: "address", value: state.address || "" },
      ];

      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, pageUri: window.location.href }),
      });

      setCallbackSubmitted(true);
    } catch (err) {
      console.error("Callback submission error:", err);
    } finally {
      setIsProcessing(false);
    }
  }

  // Callback confirmation screen
  if (callbackSubmitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-accent text-xl">✓</span>
        </div>
        <h2 className="font-serif text-3xl font-normal mb-3">
          Callback requested
        </h2>
        <p className="text-upfit-muted text-base leading-relaxed mb-8">
          Got it — we&apos;ll call you within 2 hours to discuss your job and answer any questions before you commit to anything.
        </p>
        <p className="text-xs text-upfit-faint">
          We&apos;ll reach you on {state.phone}.
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
          <h2 className="font-serif text-3xl font-normal mb-2">Your vehicle</h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm compatibility and show your options.
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <select value={state.make} onChange={handleMakeChange} style={selectStyle}>
              <option value="">Make</option>
              {vehicles.map((b) => (
                <option key={b.slug} value={b.name}>{b.name}</option>
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
                <option key={m.slug} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>

          {state.model && model && (
            <div className="mb-6">
              <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">Year range</p>
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
              <Link href="/quote" className="text-accent">Request one here →</Link>
            </div>
          )}

          <button
            onClick={() => goTo(2)}
            disabled={!canProceed[1] || !!generation?.configurator.requiresQuote}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
          <p className="text-xs text-upfit-faint mt-3 text-center">
            Don&apos;t see your vehicle?{" "}
            <Link href="/quote" className="text-accent">Request a custom quote</Link>
          </p>
        </div>
      )}

      {/* Step 2 — Package */}
      {step === 2 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Your package</h2>
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

      {/* Step 4 — Time preference */}
      {step === 4 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">When suits you?</h2>
          <p className="text-sm text-upfit-muted mb-7">
            We&apos;ll confirm availability when we contact you. No commitment needed at this stage.
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

      {/* Step 5 — Contact details + Payment */}
      {step === 5 && (
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2">Confirm &amp; pay</h2>
          <p className="text-sm text-upfit-muted mb-7">
            A 50% deposit is charged now. The balance is charged when your installer marks the job complete.
          </p>

          {/* Order summary */}
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 mb-5 divide-y divide-white/[0.06]">
            {[
              {
                label: "Vehicle",
                value: `${state.make} ${state.model}${generation ? ` · ${generation.label}` : ""}`,
              },
              { label: "Package", value: state.unitName },
              ...(state.addOns.length > 0
                ? [{ label: "Add-ons", value: state.addOns.map((a) => a.label).join(", ") }]
                : []),
              { label: "Total", value: `$${totalPrice.toLocaleString()} incl. GST` },
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

          {/* Contact details */}
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

          {/* Payment section — shown once contact fields are filled */}
          {contactFieldsFilled && (
            <div className="mb-6">
              {/* Payment summary */}
              <div
                style={{
                  background: "#161614",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
                  Payment summary
                </p>
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-sm text-upfit-text">Deposit charged now</span>
                  <span className="text-sm font-medium text-accent">
                    ${depositAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-upfit-text">Balance charged on completion</span>
                  <span className="text-sm font-medium text-upfit-muted">
                    ${balanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Card element */}
              <div
                style={{
                  background: "#161614",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "8px",
                  padding: "13px 14px",
                  marginBottom: "12px",
                }}
              >
                <CardElement
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={(e) => {
                    setCardComplete(e.complete);
                    if (e.error) {
                      setPaymentError(e.error.message ?? null);
                    } else {
                      setPaymentError(null);
                    }
                  }}
                />
              </div>

              {paymentError && (
                <p style={{ color: "#e8f44a", fontSize: "13px", marginBottom: "12px" }}>
                  {paymentError}
                </p>
              )}

              {/* Balance consent checkbox */}
              <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={state.agreedToBalance}
                    onChange={(e) => update({ agreedToBalance: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-[1.5px] flex items-center justify-center transition-all ${
                    state.agreedToBalance
                      ? "bg-accent border-accent"
                      : "border-white/[0.25] bg-bg-2 group-hover:border-accent/50"
                  }`}>
                    {state.agreedToBalance && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#0f0f0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-upfit-muted leading-relaxed">
                  I authorise UpFit to charge ${balanceAmount.toLocaleString()} to this card upon successful installation completion. I&apos;ll receive a receipt by email immediately after.
                </span>
              </label>
            </div>
          )}

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
              <Link href="/terms" target="_blank" className="text-accent hover:underline">
                Terms &amp; Conditions
              </Link>
              {" "}and{" "}
              <Link href="/privacy" target="_blank" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              . I confirm I am the vehicle owner or authorised to approve work on the vehicle.
            </span>
          </label>

          <button
            onClick={handleSubmit}
            disabled={!canProceed[5] || isProcessing || !stripe}
            className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing…" : `Confirm booking & pay $${depositAmount.toLocaleString()} deposit →`}
          </button>
          <p className="text-xs text-upfit-faint mt-3 text-center leading-relaxed">
            Secure payment by Stripe. Balance of ${balanceAmount.toLocaleString()} charged on completion.
          </p>

          {/* Callback exit ramp */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-xs text-upfit-muted mb-3">Not ready to pay yet?</p>
            <button
              onClick={handleCallbackSubmit}
              disabled={!canCallback || isProcessing}
              className="text-sm text-accent hover:underline disabled:text-upfit-faint disabled:no-underline disabled:cursor-not-allowed bg-transparent border-0 cursor-pointer"
            >
              {isProcessing ? "Submitting…" : "Request a callback instead →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
