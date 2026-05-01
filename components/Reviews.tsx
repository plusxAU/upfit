import Link from "next/link";

const reviews = [
  {
    stars: 5,
    text: "Booked Sunday night, installed Monday morning in my driveway. 90 minutes and looks completely factory-fitted. Couldn't be happier.",
    name: "James T.",
    suburb: "Chatswood",
    vehicle: "Toyota RAV4",
    service: "CarPlay",
  },
  {
    stars: 5,
    text: "Finally got CarPlay in my HiLux. Had no idea this was even possible. Incredibly clean install, no rattles, no loose wires. Worth every cent.",
    name: "Sarah M.",
    suburb: "Parramatta",
    vehicle: "Toyota HiLux",
    service: "CarPlay",
  },
  {
    stars: 5,
    text: "Dashcam front and rear done in under an hour at my office car park. Pricing was exactly as listed — no surprises. Booking the wife's Mazda next.",
    name: "Dave K.",
    suburb: "Sutherland",
    vehicle: "Ford Ranger",
    service: "Dashcam",
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="bg-bg-2 border border-white/[0.08] rounded-xl p-5 md:p-6 flex flex-col gap-4 h-full">
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
  );
}

export default function Reviews() {
  return (
    <section className="py-16 border-b border-white/[0.08]">
      <div className="px-6 md:px-10 mb-6">
        <p className="section-label">What customers say</p>
      </div>

      {/* Mobile: horizontal scroll carousel showing ~1.3 cards */}
      <div
        className="md:hidden flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            className="flex-shrink-0 snap-start"
            style={{ width: "80vw" }}
          >
            <ReviewCard review={review} />
          </div>
        ))}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 px-10 mb-6">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      <div className="px-6 md:px-10 mt-4">
        <Link
          href="/reviews"
          className="text-sm text-upfit-muted hover:text-upfit-text transition-colors"
        >
          See all reviews →
        </Link>
      </div>
    </section>
  );
}
