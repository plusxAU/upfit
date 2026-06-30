import { Suspense } from "react";
import type { Metadata } from "next";
import FeedbackForm from "./FeedbackForm";

export const metadata: Metadata = {
  title: "Leave Feedback — UpFit",
  robots: "noindex",
};

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <FeedbackForm />
    </Suspense>
  );
}
