"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") ?? "/admin/payment-request";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If cookie already valid, skip straight through
  useEffect(() => {
    fetch("/api/admin/reviews", { method: "GET" }).then((r) => {
      if (r.ok) router.replace(next);
    });
  }, [next, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Login failed");
      }
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "360px" }}>
        <p style={{ color: "#f0ede6", fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
          UpFit Admin
        </p>
        <p style={{ color: "#444440", fontSize: "13px", marginBottom: "32px" }}>
          Enter your password to continue.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="password"
            placeholder="Password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              background: "#161614",
              color: "#f0ede6",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#e8f44a",
              color: "#0f0f0d",
              fontWeight: 600,
              fontSize: "14px",
              padding: "13px",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              fontFamily: "inherit",
            }}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
        {error && (
          <p style={{ marginTop: "14px", fontSize: "13px", color: "#e8f44a" }}>{error}</p>
        )}
      </div>
    </main>
  );
}
