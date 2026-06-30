import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const body = await req.json();
    const { status, featureDate } = body as { status?: string; featureDate?: string };

    if (status === "published") {
      // Admin approve — featureDate defaults to now
      const fd = featureDate ?? new Date().toISOString();
      const score = new Date(fd).getTime();
      await redis
        .multi()
        .zrem("reviews:pending", jobId)
        .zadd("reviews:published", score, jobId)
        .hset(`review:${jobId}`, "status", "published", "featureDate", fd)
        .exec();
    } else if (status === "pending") {
      // Unpublish
      await redis
        .multi()
        .zrem("reviews:published", jobId)
        .zadd("reviews:pending", Date.now(), jobId)
        .hset(`review:${jobId}`, "status", "pending")
        .exec();
    } else if (featureDate) {
      // Update featureDate only — re-score in published set if applicable
      const score = new Date(featureDate).getTime();
      const currentStatus = await redis.hget(`review:${jobId}`, "status");
      const tx = redis.multi().hset(`review:${jobId}`, "featureDate", featureDate);
      if (currentStatus === "published") {
        tx.zadd("reviews:published", score, jobId);
      }
      await tx.exec();
    } else {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("admin/reviews PATCH error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    await redis
      .multi()
      .del(`review:${jobId}`)
      .zrem("reviews:pending", jobId)
      .zrem("reviews:published", jobId)
      .exec();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("admin/reviews DELETE error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
