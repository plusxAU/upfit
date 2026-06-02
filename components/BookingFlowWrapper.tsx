"use client";

import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookingFlow from "@/components/BookingFlow";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BookingFlowWrapper() {
  const params = useSearchParams();
  return (
    <Elements stripe={stripePromise}>
      <BookingFlow searchParams={params} />
    </Elements>
  );
}
