import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingFlowWrapper from "@/components/BookingFlowWrapper";

export const metadata = {
  title: "Book an Install — UpFit",
  description:
    "Book your Apple CarPlay, dashcam or reverse camera installation. Fixed pricing, mobile service across Sydney.",
};

export default function BookPage() {
  return (
    <main>
      <Nav />
      <section className="px-10 py-16 min-h-screen">
        <div className="max-w-xl mx-auto mb-12 text-center">
          <h1 className="font-serif text-4xl font-normal mb-3">
            Request an install
          </h1>
          <p className="text-upfit-muted text-base">
            Check your vehicle, tell us where you are. We&apos;ll confirm within 2 hours.
          </p>
        </div>
        <Suspense fallback={<div className="text-upfit-muted text-sm text-center">Loading...</div>}>
          <BookingFlowWrapper />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
