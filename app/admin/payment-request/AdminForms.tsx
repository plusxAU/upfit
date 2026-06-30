"use client";

import { useState, useRef } from "react";

function StripeModeTag() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
  const isLive = key.startsWith("pk_live");
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        background: isLive ? "rgba(232,244,74,0.12)" : "rgba(255,160,50,0.15)",
        color: isLive ? "#e8f44a" : "#ffb347",
        border: `1px solid ${isLive ? "rgba(232,244,74,0.3)" : "rgba(255,160,50,0.3)"}`,
      }}
    >
      {isLive ? "LIVE" : "TEST"}
    </span>
  );
}

const inputStyle: React.CSSProperties = {
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
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "120px",
  resize: "vertical" as const,
  lineHeight: "1.6",
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  background: "#e8f44a",
  color: "#0f0f0d",
  fontWeight: 600,
  fontSize: "14px",
  padding: "13px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

function SendRequestSection() {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    jobDescription: "",
    totalAmount: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/payment/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          jobDescription: form.jobDescription,
          totalAmount: Number(form.totalAmount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      const deposit = data.depositAmount as number;
      const balance = data.balanceAmount as number;
      setSuccessMsg(
        `Payment request sent to ${form.customerEmail}. Deposit: $${deposit}. Balance on completion: $${balance}.`
      );
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <section>
      <h2 style={{ color: "#f0ede6", fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}>
        Send payment request
      </h2>
      <p style={{ color: "#888880", fontSize: "13px", marginBottom: "20px" }}>
        Sends a deposit payment link to the customer via email.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          style={inputStyle}
          placeholder="Customer name"
          required
          value={form.customerName}
          onChange={(e) => setForm((s) => ({ ...s, customerName: e.target.value }))}
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Customer email"
          required
          value={form.customerEmail}
          onChange={(e) => setForm((s) => ({ ...s, customerEmail: e.target.value }))}
        />
        <input
          style={inputStyle}
          placeholder="Job description (e.g. Honda HR-V CarPlay installation)"
          required
          value={form.jobDescription}
          onChange={(e) => setForm((s) => ({ ...s, jobDescription: e.target.value }))}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Total job amount ($)"
          required
          min={1}
          value={form.totalAmount}
          onChange={(e) => setForm((s) => ({ ...s, totalAmount: e.target.value }))}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ ...btnStyle, opacity: status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? "Sending…" : "Send payment request →"}
        </button>
      </form>
      {status === "success" && (
        <p style={{ marginTop: "14px", fontSize: "13px", color: "#e8f44a" }}>{successMsg}</p>
      )}
      {status === "error" && (
        <p style={{ marginTop: "14px", fontSize: "13px", color: "#e8f44a" }}>{error}</p>
      )}
    </section>
  );
}

function ChargeBalanceSection() {
  const [form, setForm] = useState({
    customerId: "",
    balanceAmount: "",
    depositAmount: "",
    jobDescription: "",
    includedItems: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleAddItem() {
    setForm((s) => ({
      ...s,
      includedItems: s.includedItems
        ? s.includedItems.endsWith("\n")
          ? s.includedItems
          : s.includedItems + "\n"
        : "",
    }));
    // Focus textarea at end
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const confirmed = window.confirm(
      `You are about to charge $${form.balanceAmount} to the customer's saved card. This cannot be undone. Confirm?`
    );
    if (!confirmed) return;

    setStatus("loading");
    setError("");
    try {
      const items = form.includedItems
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const body: Record<string, unknown> = {
        customerId: form.customerId,
        balanceAmount: Number(form.balanceAmount),
        jobDescription: form.jobDescription,
        includedItems: items,
      };
      if (form.depositAmount) {
        body.depositAmount = Number(form.depositAmount);
      }

      const res = await fetch("/api/payment/charge-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Charge failed");
      setSuccessMsg(
        `Balance of $${form.balanceAmount} charged successfully. Receipt sent to customer.`
      );
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <section>
      <h2 style={{ color: "#f0ede6", fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}>
        Mark job complete + charge balance
      </h2>
      <p style={{ color: "#888880", fontSize: "13px", marginBottom: "20px" }}>
        Charges the saved card on file for the remaining balance and sends a tax invoice.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          style={inputStyle}
          placeholder="Stripe Customer ID (cus_…)"
          required
          value={form.customerId}
          onChange={(e) => setForm((s) => ({ ...s, customerId: e.target.value.trim() }))}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Balance amount ($)"
          required
          min={1}
          value={form.balanceAmount}
          onChange={(e) => setForm((s) => ({ ...s, balanceAmount: e.target.value }))}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Deposit already charged ($) — optional, used for invoice total"
          min={0}
          value={form.depositAmount}
          onChange={(e) => setForm((s) => ({ ...s, depositAmount: e.target.value }))}
        />
        <input
          style={inputStyle}
          placeholder="Job description"
          required
          value={form.jobDescription}
          onChange={(e) => setForm((s) => ({ ...s, jobDescription: e.target.value }))}
        />
        <div>
          <label
            style={{
              display: "block",
              color: "#666660",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
            }}
          >
            What&apos;s included (one item per line) — optional
          </label>
          <textarea
            ref={textareaRef}
            style={textareaStyle}
            placeholder={
              "Kenwood DMX7522S head unit\nAxxess AXHN-2 LaneWatch retention interface\nPAC SWI-CP2 steering wheel control interface\nAerpro fascia kit and harnesses\nInstallation labour"
            }
            value={form.includedItems}
            onChange={(e) => setForm((s) => ({ ...s, includedItems: e.target.value }))}
          />
          <button
            type="button"
            onClick={handleAddItem}
            style={{
              marginTop: "6px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#888880",
              fontSize: "12px",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add item
          </button>
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ ...btnStyle, opacity: status === "loading" ? 0.6 : 1, marginTop: "4px" }}
        >
          {status === "loading" ? "Charging…" : "Charge balance →"}
        </button>
      </form>
      {status === "success" && (
        <p style={{ marginTop: "14px", fontSize: "13px", color: "#e8f44a" }}>{successMsg}</p>
      )}
      {status === "error" && (
        <p style={{ marginTop: "14px", fontSize: "13px", color: "#e8f44a" }}>{error}</p>
      )}
    </section>
  );
}

export default function AdminForms() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "12px", color: "#444440" }}>Stripe mode</span>
        <StripeModeTag />
      </div>
      <SendRequestSection />
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      <ChargeBalanceSection />
    </div>
  );
}
