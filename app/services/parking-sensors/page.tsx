import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Parking Sensor Installation Australia — UpFit",
  description:
    "Professional front and rear parking sensor installation across Sydney, Melbourne, Brisbane, Perth and Adelaide. Mobile service — we come to you. Fixed pricing from $220.",
  alternates: {
    canonical: "https://upfit.au/services/parking-sensors",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Parking Sensor Installation",
  "provider": { "@type": "LocalBusiness", "name": "UpFit", "url": "https://upfit.au", "telephone": "+61435508050" },
  "areaServed": "Australia",
  "description": "Professional front and rear ultrasonic parking sensor installation. Audible alert as you approach objects. Mobile service across Australia from $220.",
  "offers": [
    { "@type": "Offer", "name": "Rear sensors only", "price": "220", "priceCurrency": "AUD" },
    { "@type": "Offer", "name": "Front + rear sensors", "price": "320", "priceCurrency": "AUD" },
    { "@type": "Offer", "name": "Sensors + reverse camera", "price": "380", "priceCurrency": "AUD" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Will parking sensors work on my car?", "acceptedAnswer": { "@type": "Answer", "text": "Parking sensors can be fitted to virtually any vehicle with a standard bumper. There are no make or model restrictions — unlike CarPlay, no harness compatibility check is needed." } },
    { "@type": "Question", "name": "Does installation damage my bumper?", "acceptedAnswer": { "@type": "Answer", "text": "Small holes are drilled for each sensor. These are clean, precise holes — not cosmetically damaging. The sensors sit flush with the bumper surface." } },
    { "@type": "Question", "name": "Can I add a visual display?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — a small LED or LCD display module can be added to show distance. Mention this when booking and we'll confirm pricing." } },
    { "@type": "Question", "name": "Do you come to me for parking sensor installation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — we come to your home, office or wherever the car is parked across Sydney, Melbourne, Brisbane, Perth and Adelaide." } },
  ],
};

export default function ParkingSensorsPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />

      <section className="px-6 md:px-10 py-16 md:py-20 border-b border-white/[0.08] max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Mobile installation · Australia-wide
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-normal leading-tight mb-5">
          Parking sensor
          <br />
          <em className="text-accent not-italic">installation.</em>
        </h1>
        <p className="text-upfit-muted text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
          Front and rear ultrasonic parking sensors professionally fitted at your door across
          Sydney, Melbourne, Brisbane, Perth and Adelaide.
          Audible alert as you get close to objects. From $220.
        </p>
        <Link
          href="/book?service=parking-sensors"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book an install →
        </Link>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Options</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Rear sensors", desc: "4-sensor rear kit. Audible beeper alerts as you reverse.", price: 220, time: "~1 hour" },
            { title: "Front + rear sensors", desc: "8-sensor full kit. Audible alerts front and rear.", price: 320, time: "~1.5 hours" },
            { title: "Sensors + reverse camera", desc: "Best combo — visual and audible parking assistance.", price: 380, time: "~1.5 hours" },
          ].map((option) => (
            <div key={option.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{option.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed mb-4">{option.desc}</p>
              <p className="font-serif text-3xl text-accent mb-1">From ${option.price}</p>
              <p className="text-xs text-upfit-faint mb-4">Installation included · GST incl. · {option.time}</p>
              <Link
                href="/book?service=parking-sensors"
                className="text-sm text-accent border border-accent/25 px-4 py-2 rounded-md hover:bg-accent/[0.08] transition-all inline-block"
              >
                Book now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">What&apos;s involved</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Drilling required", body: "Small holes are drilled into your bumper for each sensor. Standard for all parking sensor installations. Sensors are colour-matched where possible." },
            { title: "Audible alert", body: "Sensors emit a beeping tone that increases in frequency as you get closer to an object. Optional display module available on request." },
            { title: "Professionally wired", body: "All wiring is run internally through the vehicle. No exposed cables. Rear sensors connect to your reversing light circuit and activate automatically." },
          ].map((item) => (
            <div key={item.title} className="bg-bg-2 border border-white/[0.08] rounded-xl p-6">
              <h3 className="font-medium text-upfit-text mb-2">{item.title}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
        <p className="section-label">Frequently asked questions</p>
        <div className="space-y-5 max-w-2xl">
          {[
            { q: "Will parking sensors work on my car?", a: "Parking sensors can be fitted to virtually any vehicle with a standard bumper. There are no make or model restrictions — unlike CarPlay, no harness compatibility check is needed." },
            { q: "Does installation damage my bumper?", a: "Small holes are drilled for each sensor. These are clean, precise holes — not cosmetically damaging. The sensors sit flush with the bumper surface." },
            { q: "Can I add a visual display?", a: "Yes — a small LED or LCD display module can be added to show distance. Mention this when booking and we'll confirm pricing." },
            { q: "Do you come to me?", a: "Yes — we come to your home, office or wherever the car is parked across Sydney, Melbourne, Brisbane, Perth and Adelaide." },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-white/[0.06] pb-5">
              <h3 className="text-sm font-medium text-upfit-text mb-1.5">{faq.q}</h3>
              <p className="text-sm text-upfit-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
          Ready to park with confidence?
        </h2>
        <p className="text-upfit-muted mb-8">Book online in 2 minutes. We come to you.</p>
        <Link
          href="/book?service=parking-sensors"
          className="inline-flex items-center gap-2 bg-accent text-bg font-medium px-6 py-3 rounded-lg hover:bg-accent-dark transition-colors"
        >
          Book parking sensors →
        </Link>
      </section>

      <Footer />
    </main>
  );
}
