"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function FeedbackForm() {
  const params = useSearchParams();
  const jobId = params.get("jobId") ?? "";
  const name = params.get("name") ?? "";
  const suburb = params.get("suburb") ?? "";
  const vehicle = params.get("vehicle") ?? "";
  const service = params.get("service") ?? "";
  const initialStars = Number(params.get("stars") ?? 0);

  const [stars, setStars] = useState(initialStars);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stars < 1) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, stars, comment, name, suburb, vehicle, service }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const displayStars = hovered || stars;
  const firstName = name.split(" ")[0] || "there";

  if (status === "success") {
    return (
      <main>
        <Nav />
        <section className="px-6 md:px-10 py-20 min-h-screen">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-accent text-xl">✓</span>
            </div>
            <h1 className="font-serif text-3xl font-normal mb-4">Thanks for your feedback.</h1>
            <p className="text-upfit-muted text-base leading-relaxed">
              We appreciate you taking the time — it helps us keep improving.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-16 min-h-screen">
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl font-normal mb-3">
            How did your install go{name ? `, ${firstName}` : ""}?
          </h1>
          {service && (
            <p className="text-upfit-muted text-sm mb-10">
              Your feedback on your {service} install helps us improve.
            </p>
          )}
          {!service && (
            <p className="text-upfit-muted text-sm mb-10">
              Your feedback helps us improve.
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <p className="text-xs text-upfit-muted uppercase tracking-widest mb-3">Your rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStars(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                    style={{ color: n <= displayStars ? "#e8f44a" : "rgba(255,255,255,0.15)" }}
                    aria-label={`${n} star${n !== 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {stars > 0 && (
                <p className="text-xs text-upfit-muted mt-2">
                  {["", "Poor", "Below average", "Average", "Good", "Excellent"][stars]}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-upfit-muted uppercase tracking-widest block mb-2">
                Comment <span className="normal-case text-upfit-faint">(optional)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience…"
                rows={4}
                className="w-full bg-bg-2 border border-white/[0.14] rounded-xl px-4 py-3 text-sm text-upfit-text placeholder:text-upfit-faint outline-none focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={stars < 1 || status === "loading"}
              className="bg-accent text-bg font-semibold text-sm py-3.5 rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting…" : "Submit feedback →"}
            </button>

            {status === "error" && (
              <p className="text-sm text-upfit-muted">{error}</p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
