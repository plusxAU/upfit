import redis from "@/lib/redis";

type Review = {
  stars: number;
  text: string;
  name: string;
  suburb: string;
  vehicle: string;
  service: string;
};

export function ReviewCard({ review }: { review: Review }) {
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

async function fetchPublishedReviews(count = 6): Promise<Review[]> {
  try {
    const jobIds = await redis.zrevrange("reviews:published", 0, count - 1);
    if (jobIds.length === 0) return [];
    const records = await Promise.all(jobIds.map((id) => redis.hgetall(`review:${id}`)));
    return records
      .filter((r) => r && r.name && r.stars)
      .map((r) => ({
        stars: Number(r.stars),
        text: r.comment || "",
        name: r.name,
        suburb: r.suburb || "",
        vehicle: r.vehicle || "",
        service: r.service || "",
      }));
  } catch (err) {
    console.error("Reviews fetch error:", err);
    return [];
  }
}

export default async function Reviews() {
  const reviews = await fetchPublishedReviews(6);

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 border-b border-white/[0.08]">
      <div className="px-6 md:px-10 mb-6">
        <p className="section-label">
          {reviews.length === 1 ? "Latest customer review" : "Latest customer reviews"}
        </p>
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


    </section>
  );
}
