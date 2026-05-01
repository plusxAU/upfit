import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { vehicles } from "@/lib/vehicles";

export const metadata = {
  title: "Dashcam Installation Sydney — UpFit",
  description:
    "Professional front and rear dashcam installation across Sydney. Mobile service, fixed pricing, same-week availability.",
};

export default function DashcamPage() {
  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · Sydney-wide
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          Dashcam installation
          <br />
          <em className="text-accent not-italic">at your door.</em>
        </h1>
        <p className="text-upfit-muted text-lg font-light leading-relaxed mb-8 max-w-xl">
          Front and rear dashcam professionally fitted and hardwired. No loose
          cables, no mess. Done in under an hour. From $280.
        </p>
        <Link href="/book?service=dashcam" className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
          Check your vehicle →
        </Link>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s included</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Front + rear cameras", body: "Both cameras supplied and installed. Front captures the road ahead, rear covers your blind spot while reversing and protects against rear-end incidents." },
            { title: "Clean hardwired install", body: "Wired directly to your vehicle's fuse box for permanent power. No cables hanging from your mirror, no cigarette lighter adaptor." },
            { title: "Parking mode capable", body: "All units support parking mode — the camera stays active when the car is parked, protecting against hits and scrapes." },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Compatible vehicles</p>
        <div className="grid grid-cols-5 gap-3">
          {vehicles.map((brand) => (
            <div key={brand.slug} className="bg-bg-2 border border-white/[0.08] rounded-lg p-4">
              <p className="text-sm font-medium text-upfit-text mb-1">{brand.name}</p>
              <p className="text-xs text-upfit-muted leading-relaxed">
                {brand.models.map((m) => m.name).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Frequently asked questions</p>
        <div className="space-y-5 max-w-2xl">
          {[
            { q: "Do you supply the dashcam or do I bring my own?", a: "We supply everything — camera, mounting hardware, cables, and installation. The price includes both the unit and the install." },
            { q: "How long does installation take?", a: "A front and rear dashcam install typically takes under an hour. We come to your home, office or wherever the car is parked." },
            { q: "Will the wiring be visible?", a: "No. We route all cables through the headliner and pillars. The finished result looks clean and factory." },
            { q: "Do you install dashcams on any vehicle?", a: "Dashcam installation is compatible with virtually any vehicle. Unlike CarPlay, there are no make or model restrictions." },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">Ready to add a dashcam?</h2>
        <p className="text-upfit-muted mb-8">Book online in 2 minutes. We come to you.</p>
        <Link href="/book?service=dashcam" className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors">
          Book dashcam install →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
