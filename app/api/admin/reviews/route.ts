import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    const [pendingIds, publishedIds] = await Promise.all([
      redis.zrevrange("reviews:pending", 0, -1),
      redis.zrevrange("reviews:published", 0, -1),
    ]);

    const [pendingRecords, publishedRecords] = await Promise.all([
      Promise.all(pendingIds.map((id) => redis.hgetall(`review:${id}`))),
      Promise.all(publishedIds.map((id) => redis.hgetall(`review:${id}`))),
    ]);

    return NextResponse.json({
      pending: pendingRecords.filter((r) => r && Object.keys(r).length > 0),
      published: publishedRecords.filter((r) => r && Object.keys(r).length > 0),
    });
  } catch (err) {
    console.error("admin/reviews GET error:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
