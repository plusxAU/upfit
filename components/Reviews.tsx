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

export default function Reviews() {
  return (
    <section className="px-10 py-16 border-b border-white/[0.08]">
      <p className="section-label">What customers say</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
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

      <Link
        href="/reviews"
        className="text-sm text-upfit-muted hover:text-upfit-text transition-colors"
      >
        See all reviews →
      </Link>
    </section>
  );
}
