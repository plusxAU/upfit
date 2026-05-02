"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export default function Hero() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [fromPrice, setFromPrice] = useState(0);

  const brand = vehicles.find((b) => b.name === selectedMake);
  const model = brand?.models.find((m) => m.name === selectedModel);
  const generation = model?.generations.find((g) => g.years === selectedYear);

  function handleMakeChange(make: string) {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedYear("");
    setShowResult(false);
  }

  function handleModelChange(modelName: string) {
    setSelectedModel(modelName);
    setSelectedYear("");
    setShowResult(false);
  }

  function handleYearSelect(year: string) {
    setSelectedYear(year);
    const gen = model?.generations.find((g) => g.years === year);
    if (gen) {
      setFromPrice(gen.carplayFrom);
      setShowResult(true);
    }
  }

  return (
    <section className="px-6 md:px-10 pt-10 md:pt-20 pb-0 w-full max-w-4xl overflow-hidden">
      <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6 md:mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
        Mobile installation · Australia-wide
      </div>

      <h1 className="font-serif text-[48px] md:text-[68px] leading-[1.0] tracking-[-0.03em] mb-5 md:mb-6 font-normal">
        Your car,
        <br />
        <em className="text-accent not-italic font-serif">upgraded.</em>
      </h1>

      <p className="text-base md:text-lg text-upfit-muted font-light leading-relaxed max-w-lg mb-8 md:mb-10">
        CarPlay, Android Auto, dashcams and reverse cameras — installed at your home or
        office. Unit + installation included. Same-week availability.
      </p>

      {/* Vehicle selector */}
      <div className="bg-bg-2 border border-white/[0.14] rounded-xl p-5 md:p-6 w-full max-w-xl mb-0">
        <p className="text-xs text-upfit-muted uppercase tracking-widest mb-4">
          Check your vehicle
        </p>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <select
            value={selectedMake}
            onChange={(e) => handleMakeChange(e.target.value)}
          >
            <option value="">Make</option>
            {vehicles.map((b) => (
              <option key={b.slug} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!selectedMake}
          >
            <option value="">Model</option>
            {brand?.models.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {selectedModel && model && (
          <div className="mb-4">
            <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
              Year
            </p>
            <div className="flex flex-wrap gap-2">
              {model.generations.map((gen) => (
                <button
                  key={gen.years}
                  onClick={() => handleYearSelect(gen.years)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all cursor-pointer ${
                    selectedYear === gen.years
                      ? "border-accent text-accent bg-accent/[0.06]"
                      : "border-white/[0.14] text-upfit-muted hover:border-accent/40 hover:text-upfit-text"
                  }`}
                >
                  {gen.years}
                </button>
              ))}
            </div>
          </div>
        )}

        {showResult && generation && generation.complexity !== "quote" && (
          <div className="flex items-center justify-between bg-bg-3 rounded-lg px-4 py-3 border border-white/[0.08]">
            <div>
              <p className="text-[10px] text-upfit-faint uppercase tracking-wider">
                From
              </p>
              <p className="font-serif text-3xl text-upfit-text leading-tight">
                ${fromPrice}
              </p>
              <p className="text-xs text-upfit-muted mt-1">
                {selectedMake} {selectedModel} · unit + installation · GST incl.
              </p>
            </div>
            <Link
              href={`/book?make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(selectedModel)}&year=${encodeURIComponent(selectedYear)}`}
              className="bg-accent text-bg text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-accent-dark transition-colors whitespace-nowrap"
            >
              Book this install →
            </Link>
          </div>
        )}

        {showResult && generation?.complexity === "quote" && (
          <div className="flex items-center justify-between bg-bg-3 rounded-lg px-4 py-3 border border-white/[0.08]">
            <p className="text-sm text-upfit-muted">
              Your vehicle needs a custom quote — no problem.
            </p>
            <Link
              href="/quote"
              className="text-accent text-sm font-medium whitespace-nowrap ml-4"
            >
              Request a quote →
            </Link>
          </div>
        )}

        {!showResult && (
          <p className="text-xs text-upfit-faint mt-1">
            Don&apos;t see your vehicle?{" "}
            <Link href="/quote" className="text-accent">
              Request a custom quote →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
