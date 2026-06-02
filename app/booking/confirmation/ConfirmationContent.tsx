"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConfirmationContent() {
  const params = useSearchParams();

  const name = params.get("name") ?? "";
  const vehicle = params.get("vehicle") ?? "";
  const pkg = params.get("pkg") ?? "";
  const addons = params.get("addons") ?? "";
  const total = Number(params.get("total") ?? 0);
  const deposit = Number(params.get("deposit") ?? 0);
  const balance = Number(params.get("balance") ?? 0);
  const location = params.get("location") ?? "";
  const time = params.get("time") ?? "";
  const intentId = params.get("intentId") ?? "";

  const firstName = name.split(" ")[0] || name;
  const addonList = addons ? addons.split(",") : [];

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("event", "purchase", {
      transaction_id: intentId || `upfit_${Date.now()}`,
      value: deposit,
      currency: "AUD",
      items: [
        {
          item_id: intentId,
          item_name: `${vehicle} — ${pkg}`,
          price: total,
          quantity: 1,
        },
      ],
    });
  }, [intentId, deposit, total, vehicle, pkg]);

  const rows = [
    { label: "Vehicle", value: vehicle },
    { label: "Package", value: pkg },
    ...(addonList.length > 0 ? [{ label: "Add-ons", value: addonList.join(", ") }] : []),
    { label: "Total", value: `$${total.toLocaleString()} incl. GST` },
    { label: "Deposit charged", value: `$${deposit.toLocaleString()}` },
    { label: "Balance on completion", value: `$${balance.toLocaleString()}` },
    { label: "Location", value: location },
    { label: "Time preference", value: time },
  ];

  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-16 min-h-screen">
        <div className="max-w-xl mx-auto text-center py-12">

          <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-accent text-xl">✓</span>
          </div>

          <h1 className="font-serif text-3xl font-normal mb-3">
            Booking confirmed
          </h1>
          <p className="text-upfit-muted text-base leading-relaxed mb-2">
            Thanks {firstName}. Your ${deposit.toLocaleString()} deposit has been charged and a confirmation email is on its way to you.
          </p>
          <p className="text-upfit-muted text-sm mb-10">
            We&apos;ll call or text to lock in your install time — usually within 2 hours.
          </p>

          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 text-left mb-8">
            <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
              Booking summary
            </p>
            {rows.map((row) => (
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

          <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 text-left mb-8">
            <p className="text-xs text-upfit-muted uppercase tracking-wider mb-3">
              What happens next
            </p>
            {[
              "We'll call or text to confirm your install time.",
              "Your installer comes to you — no need to go anywhere.",
              `Once the job is done, the remaining $${balance.toLocaleString()} is charged to the same card.`,
            ].map((step, i) => (
              <div key={i} className="flex gap-3 py-2.5 border-b border-white/[0.06] last:border-0">
                <span className="text-xs text-accent font-medium flex-shrink-0">{i + 1}.</span>
                <span className="text-xs text-upfit-muted leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-upfit-faint">
            Questions? Call us on{" "}
            <Link href="tel:1300877342" className="text-accent">
              1300 877 342
            </Link>
          </p>

        </div>
      </section>
      <Footer />
    </main>
  );
}
