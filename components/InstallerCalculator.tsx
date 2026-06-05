"use client";

import { useRef, useState } from "react";

type SliderProps = {
  label: string;
  sublabel?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
};

function Slider({ label, sublabel, min, max, step, value, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className="text-sm font-medium text-upfit-text">{label}</span>
          {sublabel && <span className="text-xs text-upfit-muted ml-2">{sublabel}</span>}
        </div>
        <span className="text-sm font-medium text-accent tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="installer-slider w-full"
        style={{
          background: `linear-gradient(to right, #e8f44a ${pct}%, #2a2a27 ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function InstallerCalculator() {
  // Left column — your own jobs
  const [advertisedRate, setAdvertisedRate] = useState(120);
  const [jobHrs, setJobHrs] = useState(1.5);
  const [hardwareMargin, setHardwareMargin] = useState(0);
  const [quotingHrs, setQuotingHrs] = useState(1);
  const [enquiries, setEnquiries] = useState(8);
  const [conversionRate, setConversionRate] = useState(40);

  // Right column — UpFit jobs
  const [upfitJobs, setUpfitJobs] = useState(3);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Calculations — own jobs
  const conv = conversionRate / 100;
  const completedJobs = enquiries * conv;
  const unpaidQuotingHrsWeek = enquiries * quotingHrs;
  const totalWeeklyRevenue = completedJobs * (advertisedRate * jobHrs + hardwareMargin);
  const totalWeeklyHrs = completedJobs * jobHrs + unpaidQuotingHrsWeek;
  const effectiveRate = totalWeeklyHrs > 0 ? totalWeeklyRevenue / totalWeeklyHrs : 0;

  // Calculations — UpFit jobs
  const estimatedPayoutPerJob = Math.round((jobHrs * 100) / 10) * 10;
  const weeklyUplift = upfitJobs * (jobHrs * 100);

  const alreadyStrong = effectiveRate >= 100;

  function handleSeeNumbers() {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });

    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", "calculator_submit", {
        advertised_rate: advertisedRate,
        effective_rate: Math.round(effectiveRate),
        conversion_rate: conversionRate,
        quoting_hrs: quotingHrs,
        upfit_jobs_pw: upfitJobs,
        weekly_uplift: Math.round(weeklyUplift),
      });
    }

    fetch("/api/installer-prospect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        advertisedRate,
        effectiveRate: Math.round(effectiveRate),
        conversionRate,
        quotingHrs,
        upfitJobs,
        weeklyUplift: Math.round(weeklyUplift),
      }),
    }).catch(() => {});
  }

  return (
    <>
      <style>{`
        .installer-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .installer-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f0ede6;
          cursor: pointer;
          box-shadow: 0 0 0 2px rgba(240,237,230,0.2);
          transition: box-shadow 0.15s;
        }
        .installer-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 4px rgba(240,237,230,0.15);
        }
        .installer-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f0ede6;
          cursor: pointer;
          border: none;
        }
        .installer-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
        }
      `}</style>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-upfit-text font-normal mb-3">
          What are your hours really worth?
        </h2>
        <p className="text-sm text-upfit-muted leading-relaxed max-w-2xl">
          Your best self-sourced jobs may produce more gross. UpFit is designed to fill the time you&apos;re
          currently spending on enquiries that don&apos;t convert — with confirmed, pre-priced work.
        </p>
      </div>

      {/* Two-column inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

        {/* Left — Your own jobs */}
        <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 space-y-6">
          <p className="text-xs text-upfit-muted uppercase tracking-widest">Your own jobs</p>
          <Slider
            label="Advertised hourly rate"
            min={50} max={200} step={5} value={advertisedRate}
            onChange={setAdvertisedRate}
            format={(v) => `$${v}/hr`}
          />
          <Slider
            label="Average job duration"
            min={0.5} max={4} step={0.5} value={jobHrs}
            onChange={setJobHrs}
            format={(v) => `${v} hrs`}
          />
          <Slider
            label="Average product margin per job"
            sublabel="optional"
            min={0} max={300} step={10} value={hardwareMargin}
            onChange={setHardwareMargin}
            format={(v) => v === 0 ? "$0" : `$${v}`}
          />
          <Slider
            label="Quoting + admin time per enquiry"
            min={0.25} max={3} step={0.25} value={quotingHrs}
            onChange={setQuotingHrs}
            format={(v) => `${v} hrs`}
          />
          <Slider
            label="Customer enquiries per week"
            min={1} max={30} step={1} value={enquiries}
            onChange={setEnquiries}
            format={(v) => `${v}`}
          />
          <Slider
            label="Quotes that become paid jobs"
            min={10} max={90} step={5} value={conversionRate}
            onChange={setConversionRate}
            format={(v) => `${v}%`}
          />
        </div>

        {/* Right — UpFit jobs */}
        <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 space-y-6">
          <p className="text-xs text-upfit-muted uppercase tracking-widest">UpFit jobs</p>
          <Slider
            label="UpFit jobs per week"
            min={1} max={15} step={1} value={upfitJobs}
            onChange={setUpfitJobs}
            format={(v) => `${v} jobs`}
          />

          {/* Read-only payout display */}
          <div className="bg-bg-3 border border-white/[0.06] rounded-lg p-4">
            <p className="text-xs text-upfit-muted mb-1">Estimated install payout per job</p>
            <p className="font-serif text-3xl text-accent">
              ${estimatedPayoutPerJob}
            </p>
            <p className="text-xs text-upfit-muted mt-1">
              Based on {jobHrs} hr job · updates with job duration
            </p>
          </div>

          <div className="bg-bg-3 border border-white/[0.06] rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-upfit-muted">Jobs per week</span>
              <span className="text-upfit-text font-medium">{upfitJobs}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-upfit-muted">Quoting time required</span>
              <span className="text-upfit-text font-medium">0 hrs</span>
            </div>
            <div className="flex justify-between text-sm border-t border-white/[0.06] pt-2">
              <span className="text-upfit-muted">Weekly UpFit earnings</span>
              <span className="text-accent font-medium">${Math.round(weeklyUplift).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* See my numbers button */}
      <button
        onClick={handleSeeNumbers}
        className="btn-primary w-full justify-center mb-10"
      >
        See my numbers →
      </button>

      {/* Results panel */}
      <div id="results" ref={resultsRef} className="space-y-4">

        {/* Output 1 — Side-by-side effective rate comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
            <p className="text-xs text-upfit-muted uppercase tracking-widest mb-4">Your effective hourly earnings</p>
            <p className="font-serif text-4xl text-upfit-text mb-1">
              ${Math.round(effectiveRate)}
              <span className="text-lg text-upfit-muted font-sans">/hr</span>
            </p>
            <p className="text-xs text-upfit-muted">after quoting + admin overhead</p>
          </div>

          <div className="rounded-xl p-6" style={{ background: "#EAF3DE", color: "#27500A" }}>
            <p className="text-xs uppercase tracking-widest mb-4 opacity-60">UpFit effective hourly earnings</p>
            <p className="font-serif text-4xl mb-1" style={{ color: "#27500A" }}>
              $100<span className="text-lg font-sans opacity-60">/hr</span>
            </p>
            <p className="text-xs opacity-60">Guaranteed rate · no quoting overhead</p>
          </div>
        </div>

        {/* Output 2 + 3 — Weekly numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-upfit-muted mb-1">Unpaid hours per week on own work</p>
            <p className="font-serif text-2xl text-upfit-text">
              {unpaidQuotingHrsWeek.toFixed(1)} <span className="text-base text-upfit-muted font-sans">hrs</span>
            </p>
            <p className="text-xs text-upfit-muted mt-1">spent on enquiries that don&apos;t all convert</p>
          </div>
          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5">
            <p className="text-xs text-upfit-muted mb-1">Extra weekly earnings from UpFit jobs</p>
            <p className="font-serif text-2xl text-accent">
              ${Math.round(weeklyUplift).toLocaleString()}
            </p>
            <p className="text-xs text-upfit-muted mt-1">from {upfitJobs} confirmed jobs, zero quoting</p>
          </div>
        </div>

        {/* Output 4 — Dynamic insight */}
        <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 text-sm text-upfit-muted leading-relaxed">
          {alreadyStrong ? (
            <>
              Your conversion rate and quoting efficiency are already strong. UpFit works best for filling
              available capacity — accept jobs that fit your schedule without any of the admin.
            </>
          ) : (
            <>
              You&apos;re spending{" "}
              <span className="text-upfit-text font-medium">{unpaidQuotingHrsWeek.toFixed(1)} hours</span>{" "}
              per week on enquiries that don&apos;t all convert, bringing your effective hourly earnings from{" "}
              <span className="text-upfit-text font-medium">${advertisedRate}/hr</span> down to{" "}
              <span className="text-upfit-text font-medium">${Math.round(effectiveRate)}/hr</span>.
              The{" "}
              <span className="text-upfit-text font-medium">{upfitJobs} UpFit jobs</span> you&apos;ve set
              would add{" "}
              <span className="text-accent font-medium">${Math.round(weeklyUplift).toLocaleString()}</span>{" "}
              to your week — with {unpaidQuotingHrsWeek.toFixed(1)} fewer hours spent on selling.
            </>
          )}
        </div>

      </div>
    </>
  );
}
