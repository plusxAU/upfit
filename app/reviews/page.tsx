import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ReviewCard } from "@/components/Reviews";
import redis from "@/lib/redis";

export const metadata = {
  title: "Customer Reviews — UpFit",
  description:
    "Real reviews from UpFit customers across Australia. Apple CarPlay, dashcam and reverse camera installations.",
};

const PER_PAGE = 9;

async function getPublishedReviews(page: number) {
  const offset = (page - 1) * PER_PAGE;
  const total = await redis.zcard("reviews:published");
  const jobIds = await redis.zrevrange("reviews:published", offset, offset + PER_PAGE - 1);
  const records = await Promise.all(jobIds.map((id) => redis.hgetall(`review:${id}`)));
  const reviews = records
    .filter((r) => r && r.name && r.stars)
    .map((r) => ({
      stars: Number(r.stars),
      text: r.comment || "",
      name: r.name,
      suburb: r.suburb || "",
      vehicle: r.vehicle || "",
      service: r.service || "",
    }));
  return { reviews, total, totalPages: Math.ceil(total / PER_PAGE) };
}

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? 1) || 1);
  const { reviews, total, totalPages } = await getPublishedReviews(page);

  return (
    <main>
      <Nav />

      <section className="px-6 md:px-10 py-20 border-b border-white/[0.08]">
        <p className="section-label mb-4">What customers say</p>
        <h1 className="font-serif text-5xl font-normal leading-tight mb-5">
          Customer reviews
        </h1>
        {total > 0 && (
          <p className="text-upfit-muted text-sm">{total} verified review{total !== 1 ? "s" : ""}</p>
        )}
      </section>

      {reviews.length > 0 ? (
        <section className="px-6 md:px-10 py-16 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link
                  href={`/reviews?page=${page - 1}`}
                  className="px-4 py-2 text-sm border border-white/[0.14] rounded-lg text-upfit-muted hover:text-upfit-text hover:border-white/30 transition-colors"
                >
                  ← Previous
                </Link>
              )}
              <span className="text-xs text-upfit-faint px-2">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/reviews?page=${page + 1}`}
                  className="px-4 py-2 text-sm border border-white/[0.14] rounded-lg text-upfit-muted hover:text-upfit-text hover:border-white/30 transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </section>
      ) : (
        <section className="px-6 md:px-10 py-20 border-b border-white/[0.08]">
          <p className="text-upfit-muted text-sm">No reviews yet.</p>
        </section>
      )}

      <section className="px-6 md:px-10 py-20 text-center border-b border-white/[0.08]">
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
