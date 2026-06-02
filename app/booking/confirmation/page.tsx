import { Suspense } from "react";
import ConfirmationContent from "./ConfirmationContent";

export const metadata = {
  title: "Booking Confirmed — UpFit",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ConfirmationContent />
    </Suspense>
  );
}
