"use client";

import { useSearchParams } from "next/navigation";
import BookingFlow from "@/components/BookingFlow";

export default function BookingFlowWrapper() {
  const params = useSearchParams();
  return (
    <BookingFlow
      prefillMake={params.get("make") ?? ""}
      prefillModel={params.get("model") ?? ""}
      prefillYear={params.get("year") ?? ""}
    />
  );
}
