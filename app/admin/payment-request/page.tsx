import type { Metadata } from "next";
import AdminForms from "./AdminForms";

export const metadata: Metadata = {
  title: "Admin — Payment Request",
  robots: "noindex",
};

export default function AdminPaymentRequestPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f0f0d",
        padding: "48px 32px",
      }}
    >
      <div style={{ maxWidth: "560px" }}>
        <p
          style={{
            color: "#f0ede6",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          UpFit Admin
        </p>
        <p
          style={{
            color: "#444440",
            fontSize: "13px",
            marginBottom: "48px",
          }}
        >
          Internal payment tools — not for customer use.
        </p>
        <AdminForms />
      </div>
    </main>
  );
}
