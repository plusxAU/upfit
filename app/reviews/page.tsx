import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Customer Reviews — UpFit",
  description:
    "Real reviews from UpFit customers across Sydney. Apple CarPlay, dashcam and reverse camera installations.",
};

const reviews = [
  { stars: 5, text: "Booked Sunday night, installed Monday morning in my driveway. 90 minutes and looks completely factory-fitted. Couldn't be happier.", name: "James T.", suburb: "Chatswood", vehicle: "Toyota RAV4", service: "CarPlay" },
  { stars: 5, text: "Finally got CarPlay in my HiLux. Had no idea this was even possible. Incredibly clean install, no rattles, no loose wires. Worth every cent.", name: "Sarah M.", suburb: "Parramatta", vehicle: "Toyota HiLux", service: "CarPlay" },
  { stars: 5, text: "Dashcam front and rear done in under an hour at my office car park. Pricing was exactly as listed — no surprises. Booking the wife's Mazda next.", name: "Dave K.", suburb: "Sutherland", vehicle: "Ford Ranger", service: "Dashcam" },
  { stars: 5, text: "CarPlay in my Mazda CX-5. Installer was on time, professional, and the result looks OEM. Already recommended to three friends.", name: "Priya L.", suburb: "Bondi", vehicle: "Mazda CX-5", service: "CarPlay" },
  { stars: 5, text: "Reverse camera and dashcam combo done while I was at work. Came back to a perfectly installed setup. The parking camera image is crystal clear.", name: "Michael R.", suburb: "Castle Hill", vehicle: "Hyundai Tucson", service: "Dashcam + Reverse cam" },
  { stars: 5, text: "Booked for my Ranger and couldn't be more impressed. Wireless CarPlay works perfectly. Installer knew the Ranger inside out.", name: "Tom B.", suburb: "Penrith", vehicle: "Ford Ranger", service: "CarPlay" },
  { stars: 5, text: "Third time using UpFit now — did my car, my wife's CX-3, and now my mum's Corolla. Consistent quality every time.", name: "Alex W.", suburb: "Hornsby", vehicle: "Toyota Corolla", service: "CarPlay" },
  { stars: 5, text: "The wireless CarPlay on my Kluger is incredible. No more plugging in cables. The screen quality is way better than I expected for the price.", name: "Jen S.", suburb: "Macquarie Park", vehicle: "Toyota Kluger", service: "CarPlay" },
  { stars: 5, text: "Reverse cam installed in my Navara while parked at Westfield. Seamless. Image quality is brilliant and the installer was done in 40 minutes.", name: "Chris P.", suburb: "Bankstown", vehicle: "Nissan Navara", service: "Reverse cam" },
];

export default function ReviewsPage() {
  return (
    <main>
      <Nav />

      <section className="px-10 py-20 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs text-upfit-muted uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Verified Google reviews
        </div>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          What customers say
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-serif text-4xl text-accent">5.0★</p>
          <p className="text-upfit-muted text-sm">
            Average rating · {reviews.length}+ reviews
          </p>
        </div>
      </section>

      <section className="px-10 py-16 border-b border-white/[0.08]">
        <div className="grid grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-bg-2 border border-white/[0.08] rounded-xl p-6 flex flex-col gap-4"
            >
              <p className="text-accent text-sm tracking-[0.15em]">
                {"★".repeat(review.stars)}
              </p>
              <p className="text-sm text-upfit-text leading-relaxed italic flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="text-xs text-upfit-muted">
                  <span className="text-upfit-text font-medium">{review.name}</span>{" "}
                  · {review.suburb}
                </p>
                <span className="inline-block text-[11px] text-upfit-faint bg-bg-3 px-2 py-0.5 rounded mt-1.5">
                  {review.vehicle} · {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 py-20 text-center border-b border-white/[0.08]">
        <h2 className="font-serif text-4xl font-normal mb-4">
          Ready to join them?
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
