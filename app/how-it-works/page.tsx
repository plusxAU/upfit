import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "How It Works — UpFit",
  description:
    "Book online, we come to you. Apple CarPlay, dashcam and reverse camera installation across Sydney in three simple steps.",
};

const steps = [
  {
    number: "01",
    title: "Check your vehicle + book online",
    body: "Enter your make and model to confirm compatibility and see your exact price. Choose your unit tier, pick a time that suits, and confirm your address. The whole process takes under 2 minutes — no phone calls, no waiting for quotes.",
    detail: "We support 10 major brands covering the majority of vehicles on Sydney roads. If your vehicle isn't listed, request a custom quote and we'll get back to you within a few hours.",
  },
  {
    number: "02",
    title: "We come to you",
    body: "Your UpFit installer arrives at your home, office, or wherever the car is parked at the time you booked. You don't need to drop the car off anywhere or rearrange your day.",
    detail: "All installers are vetted, insured, and operate under the UpFit brand. They arrive with your chosen unit and all required wiring harness adaptors for your specific vehicle.",
  },
  {
    number: "03",
    title: "Drive away upgraded",
    body: "Installation typically takes 45 minutes to 2 hours depending on the service and vehicle. We use OEM-compatible harness adaptors — no cutting of factory wiring, fully reversible.",
    detail: "Once complete, your installer will walk you through the new system and confirm everything is working correctly. All work is covered by a 12-month parts and labour warranty.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Simple process
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          Book online.
          <br />
          <em className="text-accent not-italic">We come to you.</em>
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed max-w-xl">
          Three steps from booking to upgraded — no workshops, no waiting rooms,
          no surprises on price.
        </p>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <div className="space-y-16 max-w-2xl">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-10">
              <p className="font-serif text-6xl text-white/[0.06] leading-none flex-shrink-0 w-16">
                {step.number}
              </p>
              <div>
                <h2 className="text-xl font-medium text-upfit-text mb-3">
                  {step.title}
                </h2>
                <p className="text-base text-upfit-muted leading-relaxed mb-3">
                  {step.body}
                </p>
                <p className="text-sm text-upfit-faint leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s covered</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "12-month warranty", body: "All parts and labour covered for 12 months from installation date." },
            { title: "OEM harness adaptors", body: "No cutting of factory wiring. Fully reversible installation on all supported vehicles." },
            { title: "Insured installers", body: "Every installer carries public liability insurance. You're covered." },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">
          Ready to get started?
        </h2>
        <p className="text-upfit-muted mb-8">
          Check your vehicle and book in 2 minutes.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Check my vehicle →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
