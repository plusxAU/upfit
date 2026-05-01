import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main>
      <Nav />
      <section className="px-10 py-40 text-center border-b border-white/[0.08]">
        <p className="font-serif text-8xl text-white/[0.06] mb-6">404</p>
        <h1 className="font-serif text-4xl font-normal mb-4">
          Page not found
        </h1>
        <p className="text-upfit-muted mb-10 max-w-sm mx-auto">
          This page doesn&apos;t exist. Try checking your vehicle or browsing
          our services.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-5 py-2.5 rounded-lg hover:bg-accent-dark transition-colors text-sm"
          >
            Back to home →
          </Link>
          <Link
            href="/book"
            className="text-sm text-upfit-muted hover:text-upfit-text transition-colors"
          >
            Book an install
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
