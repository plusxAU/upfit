import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstallerCalculator from "@/components/InstallerCalculator";

export const metadata = {
  title: "Install with UpFit — Installer Partnership",
  description:
    "UpFit sends pre-booked, pre-priced installation jobs directly to vetted mobile installers across Australia. No quoting, no chasing, no admin.",
  robots: "noindex", // remove this line once ready to go public
};

export default function InstallersPage() {
  return (
    <main>
      <Nav />

      {/* 1 — Hero */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-white/[0.08] max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Installer partnership · Australia-wide
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          What&apos;s your time
          <br />
          <em className="text-accent not-italic">actually worth?</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed max-w-xl">
          Many installers are earning significantly less per hour than they think.
          The maths is simple — and surprising.
        </p>
      </section>

      {/* 2 — Calculator */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">The maths</p>
        <div className="max-w-3xl mx-auto">
          <InstallerCalculator />
        </div>
      </section>

      {/* 3 — How it works */}
      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">How it works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              step: "01",
              title: "We send you the job",
              body: "Pre-booked, pre-priced, customer confirmed. You see the vehicle, service, and your pay before you accept.",
            },
            {
              step: "02",
              title: "You do what you're good at",
              body: "Show up, install, done. No quoting, no chasing, no admin. Just clean installs.",
            },
            {
              step: "03",
              title: "You get paid",
              body: "Within 3 business days of completion, every time. No invoicing, no waiting on customers.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <p className="text-xs text-accent uppercase tracking-widest mb-4">{item.step}</p>
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 — CTA */}
      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Sound like a fit?
        </h2>
        <p className="text-upfit-muted mb-8 max-w-md mx-auto">
          We&apos;re building our installer network across Sydney, Melbourne, Brisbane, Perth and Adelaide.
        </p>
        <a
          href="mailto:team@upfit.au"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Get in touch →
        </a>
      </section>

      <Footer />
    </main>
  );
}
