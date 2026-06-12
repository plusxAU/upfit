"use client";

import { useState } from "react";

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
    jobDescription: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/payment/charge-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: form.customerId,
          balanceAmount: Number(form.balanceAmount),
          jobDescription: form.jobDescription,
        }),
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
        Charges the saved card on file for the remaining balance and sends a receipt.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          style={inputStyle}
          placeholder="Stripe Customer ID (cus_…)"
          required
          value={form.customerId}
          onChange={(e) => setForm((s) => ({ ...s, customerId: e.target.value }))}
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
          placeholder="Job description"
          required
          value={form.jobDescription}
          onChange={(e) => setForm((s) => ({ ...s, jobDescription: e.target.value }))}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ ...btnStyle, opacity: status === "loading" ? 0.6 : 1 }}
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
      <SendRequestSection />
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      <ChargeBalanceSection />
    </div>
  );
}
