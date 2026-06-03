"use client";

import { useState } from "react";

const SERVICES = [
  { id: "head-units", label: "Head units / Apple CarPlay" },
  { id: "parking-sensors", label: "Parking sensors" },
  { id: "dash-cams", label: "Dash cams" },
  { id: "reverse-cameras", label: "Reverse cameras" },
  { id: "audio", label: "Speakers / amplifiers / subwoofers" },
];

const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const EXPERIENCE = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

type Status = "idle" | "loading" | "success" | "error";

export default function InstallerApplicationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [setup, setSetup] = useState<"mobile" | "workshop" | "both" | "">("");
  const [services, setServices] = useState<string[]>([]);
  const [capacity, setCapacity] = useState("");
  const [experience, setExperience] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function toggleService(id: string) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/installers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, suburb, state, setup,
          services, capacity, experience, notes,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-8 text-center max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-accent text-lg">✓</span>
        </div>
        <h3 className="font-serif text-xl text-upfit-text mb-2">Application received</h3>
        <p className="text-sm text-upfit-muted leading-relaxed">
          Thanks {name.split(" ")[0]}. We&apos;ll review your details and reach out within a couple of business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">Full name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">Phone</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="04xx xxx xxx"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs text-upfit-muted mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
        />
      </div>

      {/* Suburb + State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">Suburb you&apos;re based in</label>
          <input
            type="text"
            required
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            placeholder="Parramatta"
          />
        </div>
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">State</label>
          <select
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="" disabled>Select</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile or workshop */}
      <div>
        <label className="block text-xs text-upfit-muted mb-2">How do you operate?</label>
        <div className="flex gap-3 flex-wrap">
          {(["mobile", "workshop", "both"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSetup(opt)}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                setup === opt
                  ? "bg-accent text-bg border-accent"
                  : "bg-bg-3 border-white/[0.1] text-upfit-muted hover:text-upfit-text"
              }`}
            >
              {opt === "mobile" ? "Mobile" : opt === "workshop" ? "Workshop" : "Both"}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="block text-xs text-upfit-muted mb-2">What do you install? <span className="opacity-50">(select all that apply)</span></label>
        <div className="flex flex-col gap-2">
          {SERVICES.map((svc) => (
            <label key={svc.id} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                  services.includes(svc.id)
                    ? "bg-accent border-accent"
                    : "border-white/20 bg-bg-3 group-hover:border-white/40"
                }`}
                onClick={() => toggleService(svc.id)}
              >
                {services.includes(svc.id) && (
                  <svg className="w-2.5 h-2.5 text-bg" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-sm text-upfit-muted group-hover:text-upfit-text transition-colors" onClick={() => toggleService(svc.id)}>
                {svc.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity + Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">
            Available capacity for UpFit jobs
            <span className="block opacity-60 font-normal">per week, approximate</span>
          </label>
          <select
            required
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="" disabled>Select</option>
            <option value="1-2">1–2 jobs</option>
            <option value="3-5">3–5 jobs</option>
            <option value="6-10">6–10 jobs</option>
            <option value="10+">10+ jobs</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-upfit-muted mb-1.5">Years of experience</label>
          <select
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="" disabled>Select</option>
            {EXPERIENCE.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Anything else */}
      <div>
        <label className="block text-xs text-upfit-muted mb-1.5">
          Anything else?
          <span className="ml-1 opacity-50">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Brands you specialise in, certifications, workshop location, other relevant details…"
          style={{ resize: "vertical" }}
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">Something went wrong — please try again or email team@upfit.au</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || services.length === 0 || !setup}
        className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
