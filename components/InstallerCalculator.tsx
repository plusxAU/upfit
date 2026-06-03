"use client";

import { useState } from "react";

type SliderProps = {
  label: string;
  sublabel: string;
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
          <span className="text-xs text-upfit-faint ml-2">{sublabel}</span>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-black/[0.08] last:border-0">
      <span className="text-xs opacity-60">{label}</span>
      <span className="text-xs font-medium">{value}</span>
    </div>
  );
}

export default function InstallerCalculator() {
  const [jobsPerWeek, setJobsPerWeek] = useState(8);
  const [installTime, setInstallTime] = useState(1.5);
  const [chargePerJob, setChargePerJob] = useState(200);
  const [quotingTime, setQuotingTime] = useState(1);
  const [conversionRate, setConversionRate] = useState(40);
  const [travelTime, setTravelTime] = useState(0.5);

  const conv = conversionRate / 100;
  const unpaidQuotingPerJob = ((1 - conv) / conv) * quotingTime;
  const effectiveHoursPerJob = installTime + travelTime + unpaidQuotingPerJob;
  const effectiveRate = chargePerJob / effectiveHoursPerJob;

  const installTravelHrsWeek = (installTime + travelTime) * jobsPerWeek;
  const unpaidQuotingHrsWeek = unpaidQuotingPerJob * jobsPerWeek;
  const yourWeeklyIncome = chargePerJob * jobsPerWeek;

  const upfitRate = 100;
  const upfitWeeklyIncome = jobsPerWeek * (installTime + travelTime) * upfitRate;

  const rateLift = ((upfitRate - effectiveRate) / effectiveRate) * 100;
  const alreadyStrong = effectiveRate >= upfitRate;

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
          background: #e8f44a;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(232,244,74,0.15);
          transition: box-shadow 0.15s;
        }
        .installer-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 5px rgba(232,244,74,0.25);
        }
        .installer-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #e8f44a;
          cursor: pointer;
          border: none;
        }
        .installer-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
        }
      `}</style>

      <div className="space-y-6 mb-10">
        <p className="text-sm text-upfit-muted leading-relaxed">
          Every quote you send takes time. Many don&apos;t convert. Adjust the sliders to match your current workload.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          <Slider
            label="Jobs per week"
            sublabel="installs you actually get paid for"
            min={3} max={20} step={1} value={jobsPerWeek}
            onChange={setJobsPerWeek}
            format={(v) => `${v} jobs`}
          />
          <Slider
            label="Install time"
            sublabel="hands on the car"
            min={0.5} max={4} step={0.5} value={installTime}
            onChange={setInstallTime}
            format={(v) => `${v} hrs`}
          />
          <Slider
            label="Charge per job"
            sublabel="labour only"
            min={80} max={400} step={10} value={chargePerJob}
            onChange={setChargePerJob}
            format={(v) => `$${v}`}
          />
          <Slider
            label="Quoting time"
            sublabel="research, back-and-forth, write-up"
            min={0.25} max={3} step={0.25} value={quotingTime}
            onChange={setQuotingTime}
            format={(v) => `${v} hrs`}
          />
          <Slider
            label="Quote conversion rate"
            sublabel="out of 10 quotes, how many convert"
            min={10} max={90} step={5} value={conversionRate}
            onChange={setConversionRate}
            format={(v) => `${v}%`}
          />
          <Slider
            label="Travel time per job"
            sublabel="avg round trip to customer"
            min={0} max={2} step={0.25} value={travelTime}
            onChange={setTravelTime}
            format={(v) => v === 0 ? "0 hrs" : `${v} hrs`}
          />
        </div>
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Your jobs */}
        <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
          <p className="text-xs text-upfit-muted uppercase tracking-widest mb-4">Your jobs</p>
          <p className="text-xs text-upfit-faint mb-1">Effective rate</p>
          <p className="font-serif text-4xl text-upfit-text mb-1">
            ${Math.round(effectiveRate)}<span className="text-lg text-upfit-muted font-sans">/hr</span>
          </p>
          <p className="text-xs text-upfit-faint mb-5">after quoting overhead</p>
          <div className="border-t border-white/[0.06] pt-4">
            <Row label="Install + travel" value={`${installTravelHrsWeek.toFixed(1)} hrs/wk`} />
            <Row label="Unpaid quoting" value={`${unpaidQuotingHrsWeek.toFixed(1)} hrs/wk`} />
            <Row label="Weekly income" value={`$${yourWeeklyIncome.toLocaleString()}`} />
          </div>
        </div>

        {/* UpFit jobs */}
        <div className="rounded-xl p-6" style={{ background: "#EAF3DE", color: "#27500A" }}>
          <p className="text-xs uppercase tracking-widest mb-4 opacity-60">UpFit jobs</p>
          <p className="text-xs mb-1 opacity-50">Effective rate</p>
          <p className="font-serif text-4xl mb-1" style={{ color: "#27500A" }}>
            $100<span className="text-lg font-sans opacity-60">/hr</span>
          </p>
          <p className="text-xs mb-5 opacity-50">no quoting overhead</p>
          <div className="border-t pt-4" style={{ borderColor: "rgba(39,80,10,0.15)" }}>
            <div className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "rgba(39,80,10,0.1)" }}>
              <span className="text-xs opacity-60">Install + travel</span>
              <span className="text-xs font-medium">{installTravelHrsWeek.toFixed(1)} hrs/wk</span>
            </div>
            <div className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "rgba(39,80,10,0.1)" }}>
              <span className="text-xs opacity-60">Unpaid quoting</span>
              <span className="text-xs font-medium">0 hrs</span>
            </div>
            <div className="flex justify-between py-2" style={{ borderColor: "rgba(39,80,10,0.1)" }}>
              <span className="text-xs opacity-60">Weekly income</span>
              <span className="text-xs font-medium">${upfitWeeklyIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic insight */}
      <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 mb-4 text-sm text-upfit-muted leading-relaxed">
        {alreadyStrong ? (
          <>
            Your conversion rate and quoting efficiency are already strong — you&apos;re operating close to the UpFit rate.
            The benefit for you is consistency: a guaranteed pipeline of pre-booked jobs without the uncertainty of a variable lead flow.
          </>
        ) : (
          <>
            You&apos;re spending{" "}
            <span className="text-upfit-text font-medium">{unpaidQuotingHrsWeek.toFixed(1)} hrs</span>{" "}
            every week on quotes that don&apos;t convert — bringing your effective rate down to{" "}
            <span className="text-upfit-text font-medium">${Math.round(effectiveRate)}/hr</span>.
            UpFit&apos;s pre-booked jobs eliminate that gap entirely, lifting your effective rate by{" "}
            <span className="text-accent font-medium">{Math.round(rateLift)}%</span>{" "}
            without adding a single extra hour to your week.
          </>
        )}
      </div>

      {/* Pricing note */}
      <div
        className="rounded-xl p-5 text-sm leading-relaxed"
        style={{
          background: "rgba(232,244,74,0.04)",
          borderLeft: "3px solid #e8f44a",
          paddingLeft: "20px",
        }}
      >
        <p className="text-upfit-text font-medium mb-1">How UpFit prices jobs</p>
        <p className="text-upfit-muted">
          Every job is priced in advance based on vehicle-specific installation requirements — make, model,
          generation, and service type. You know exactly what you&apos;re earning before you show up.
          No open-ended hours, no surprises, no negotiating.
        </p>
      </div>
    </>
  );
}
