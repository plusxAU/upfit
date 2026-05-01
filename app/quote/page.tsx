"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { vehicles } from "@/lib/vehicles";

export default function QuotePage() {
  const [make, setMake] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const brand = vehicles.find((b) => b.name === make);

  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Custom quote
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          Request a quote
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed max-w-xl">
          Your vehicle isn&apos;t on our standard list — no problem. We can
          usually accommodate most vehicles. Fill in the details below and
          we&apos;ll get back to you within a few hours.
        </p>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        {submitted ? (
          <div className="max-w-md bg-bg-2 border border-white/[0.08] rounded-xl p-8 text-center">
            <p className="text-accent text-2xl mb-3">✓</p>
            <h2 className="font-serif text-2xl font-normal mb-3">
              Quote request received
            </h2>
            <p className="text-sm text-upfit-muted leading-relaxed">
              We&apos;ll review your vehicle details and get back to you within a
              few hours with a fixed price quote.
            </p>
          </div>
        ) : (
          <div className="max-w-md space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                style={{ background: "#161614", color: "#f0ede6", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "12px 14px", fontSize: "14px", width: "100%", appearance: "none" as const }}
              >
                <option value="">Vehicle make</option>
                {vehicles.map((b) => (
                  <option key={b.slug} value={b.name}>{b.name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              <input placeholder="Model (e.g. Prado, X5)" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Year (e.g. 2018)" />
              <select
                style={{ background: "#161614", color: "#f0ede6", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "12px 14px", fontSize: "14px", width: "100%", appearance: "none" as const }}
              >
                <option value="">Service needed</option>
                <option>Apple CarPlay / Android Auto</option>
                <option>Dashcam installation</option>
                <option>Reverse camera</option>
                <option>Multiple services</option>
              </select>
            </div>
            <input placeholder="Your name" />
            <input placeholder="Mobile number" />
            <input placeholder="Email address" type="email" />
            <textarea
              placeholder="Anything else we should know? (optional)"
              style={{ background: "#161614", color: "#f0ede6", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", padding: "12px 14px", fontSize: "14px", width: "100%", appearance: "none" as const, minHeight: "100px", resize: "vertical" as const }}
            />
            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-accent text-bg font-medium text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors cursor-pointer border-0"
            >
              Submit quote request →
            </button>
            <p className="text-xs text-upfit-faint text-center">
              We typically respond within 2–4 hours during business hours.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
