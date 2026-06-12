import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment received — UpFit",
  robots: "noindex",
};

export default function PaymentSuccessPage() {
  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-20 max-w-2xl">
        <h1 className="font-serif text-4xl font-normal mb-5">
          Payment received — thank you.
        </h1>
        <p className="text-upfit-muted text-base leading-relaxed mb-4">
          Your deposit is confirmed. We&apos;ll be in touch shortly to lock in
          your appointment.
        </p>
        <p className="text-upfit-muted text-sm leading-relaxed mb-10">
          If you have any questions in the meantime, call us on{" "}
          <a href="tel:1300877342" className="text-accent hover:underline">
            1300 877 342
          </a>{" "}
          or email{" "}
          <a
            href="mailto:team@upfit.au"
            className="text-accent hover:underline"
          >
            team@upfit.au
          </a>
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-accent text-bg font-medium text-sm px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Back to upfit.au →
        </Link>
      </section>
      <Footer />
    </main>
  );
}
