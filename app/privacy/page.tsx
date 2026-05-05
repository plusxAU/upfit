import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — UpFit",
  description: "UpFit privacy policy — how we collect, use and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <Nav />
      <section className="px-6 md:px-10 py-16 max-w-2xl">
        <h1 className="font-serif text-4xl font-normal mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-upfit-muted mb-10">
          Last updated: [date] &nbsp;·&nbsp; [UpFit entity name] ABN [XXX]
        </p>

        <div className="space-y-8 text-sm text-upfit-muted leading-relaxed">
          {/* PLACEHOLDER — replace with your privacy policy copy */}
          <p className="text-upfit-faint italic">
            Privacy policy content coming soon. For any privacy-related
            enquiries please contact{" "}
            <a href="mailto:team@upfit.au" className="text-accent">
              team@upfit.au
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
