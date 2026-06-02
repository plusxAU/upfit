"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: "Arial",
      fontSize: "14px",
      "::placeholder": { color: "#666660" },
    },
    invalid: { color: "#e8f44a" },
  },
};

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("processing");
    setMessage(null);

    try {
      const intentRes = await fetch("/api/payment/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalPrice: 2,
          customerEmail: "test@upfit.au",
          customerName: "Test User",
          jobDescription: "Test payment — $1.00 deposit",
        }),
      });

      if (!intentRes.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await intentRes.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User", email: "test@upfit.au" },
        },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message ?? "Payment failed.");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const params = new URLSearchParams({
          name: "Test User",
          vehicle: "Test Vehicle · 2024",
          pkg: "Test Package",
          addons: "",
          total: "2",
          deposit: "1",
          balance: "1",
          location: "Test Suburb 2000",
          time: "ASAP",
          intentId: paymentIntent.id,
        });
        router.push(`/booking/confirmation?${params.toString()}`);
        return;
      } else {
        setStatus("error");
        setMessage("Payment did not complete.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", padding: "40px 24px" }}>
      <p style={{ color: "#ff4444", fontWeight: 600, fontSize: 13, marginBottom: 24, textAlign: "center" }}>
        INTERNAL TEST PAGE — DO NOT SHARE
      </p>

      <h1 style={{ color: "#f0ede6", fontSize: 22, fontWeight: 400, marginBottom: 8, textAlign: "center" }}>
        UpFit payment test
      </h1>
      <p style={{ color: "#888", fontSize: 14, textAlign: "center", marginBottom: 32 }}>
        $1.00 deposit charge (from $2.00 total)
      </p>

      <div style={{
        background: "#161614",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 8,
        padding: "13px 14px",
        marginBottom: 20,
      }}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      {message && (
        <p style={{
          color: "#e8f44a",
          fontSize: 13,
          marginBottom: 16,
          textAlign: "center",
        }}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "processing" || !stripe}
        style={{
          width: "100%",
          background: status === "processing" ? "#444" : "#e8f44a",
          color: "#0f0f0d",
          border: 0,
          borderRadius: 8,
          padding: "12px 0",
          fontSize: 14,
          fontWeight: 600,
          cursor: status === "processing" ? "not-allowed" : "pointer",
        }}
      >
        {status === "processing" ? "Processing…" : "Charge $1.00 deposit"}
      </button>
    </form>
  );
}

export default function TestPaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
}
