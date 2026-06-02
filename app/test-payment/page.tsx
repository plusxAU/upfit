import TestPaymentForm from "./TestPaymentForm";

export const metadata = {
  title: "Payment Test — UpFit",
  robots: { index: false, follow: false },
};

export default function TestPaymentPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f0f0d" }}>
      <TestPaymentForm />
    </main>
  );
}
