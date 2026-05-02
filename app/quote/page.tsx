"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { vehicles } from "@/lib/vehicles";

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

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    service: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    const portalId = "443132944";
    const formGuid = "333b4302-43d7-4c1f-9e7f-6fe96c5a303b";

    const nameParts = form.name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const fields = [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "email", value: form.email },
      { name: "phone", value: form.phone },
      { name: "vehicle_make", value: form.make },
      { name: "vehicle_model", value: form.model },
      { name: "vehicle_year", value: form.year },
      { name: "service_type", value: form.service },
      { name: "notes", value: form.notes || "" },
    ];

    try {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields,
            context: {
              pageUri: window.location.href,
              pageName: "UpFit Quote Request",
            },
          }),
        }
      );
    } catch (err) {
      console.error("HubSpot submission error:", err);
    }

    setSubmitted(true);
  }

  const canSubmit = form.name && form.phone && form.email && form.make;

  return (
    <main>
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Custom quote
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Request a quote
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
          Your vehicle isn&apos;t on our standard list — no problem. We can
          usually accommodate most vehicles. Fill in the details below and
          we&apos;ll get back to you within a few hours.
        </p>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        {submitted ? (
          <div className="max-w-md bg-bg-2 border border-white/[0.08] rounded-xl p-8 text-center">
            <p className="text-accent text-3xl mb-4">✓</p>
            <h2 className="font-serif text-2xl font-normal mb-3">
              Quote request received
            </h2>
            <p className="text-sm text-upfit-muted leading-relaxed">
              We&apos;ll review your vehicle details and get back to you within
              a few hours with a fixed price quote.
            </p>
          </div>
        ) : (
          <div className="max-w-md space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.make}
                onChange={(e) => update("make", e.target.value)}
                style={selectStyle}
              >
                <option value="">Vehicle make</option>
                {vehicles.map((b) => (
                  <option key={b.slug} value={b.name}>{b.name}</option>
                ))}
                <option value="Other">Other make</option>
              </select>
              <input
                placeholder="Model (e.g. Prado, X5)"
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Year (e.g. 2018)"
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
              />
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                style={selectStyle}
              >
                <option value="">Service needed</option>
                <option>Apple CarPlay &amp; Android Auto</option>
                <option>CarPlay activation (keep factory screen)</option>
                <option>Dashcam installation</option>
                <option>Reverse camera</option>
                <option>Parking sensors</option>
                <option>Multiple services</option>
              </select>
            </div>
            <input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <input
              placeholder="Mobile number"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <input
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <textarea
              placeholder="Anything else we should know? (optional)"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              style={{
                background: "#161614",
                color: "#f0ede6",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
                width: "100%",
                appearance: "none" as const,
                minHeight: "100px",
                resize: "vertical" as const,
                fontFamily: "var(--font-dm-sans)",
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0 disabled:bg-upfit-faint disabled:text-bg-3 disabled:cursor-not-allowed"
            >
              Submit quote request →
            </button>
            <p className="text-xs text-upfit-faint text-center">
              We typically respond within 2 hours during business hours.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
