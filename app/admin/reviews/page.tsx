import type { Metadata } from "next";
import ReviewsAdmin from "./ReviewsAdmin";

export const metadata: Metadata = {
  title: "Admin — Reviews",
  robots: "noindex",
};

export default function AdminReviewsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f0f0d", padding: "48px 32px" }}>
      <div style={{ maxWidth: "860px" }}>
        <p style={{ color: "#f0ede6", fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>
          UpFit Admin
        </p>
        <p style={{ color: "#444440", fontSize: "13px", marginBottom: "48px" }}>
          Review management — not for customer use.
        </p>
        <ReviewsAdmin />
      </div>
    </main>
  );
}
