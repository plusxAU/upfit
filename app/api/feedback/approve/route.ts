import { NextRequest } from "next/server";
import redis from "@/lib/redis";
import { verifyApproveToken } from "@/lib/reviewToken";

const page = (body: string, color = "#f0ede6") => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UpFit Reviews</title>
</head>
<body style="margin:0;padding:60px 32px;background:#0f0f0d;font-family:Arial,sans-serif;color:${color};">
  <p style="font-size:20px;font-weight:600;margin:0 0 12px;">UpFit</p>
  <p style="font-size:16px;margin:0;">${body}</p>
</body>
</html>`;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const jobId = searchParams.get("jobId") ?? "";
  const token = searchParams.get("token") ?? "";

  if (!jobId || !token || !verifyApproveToken(jobId, token)) {
    return new Response(page("Invalid or expired approve link.", "#e8f44a"), {
      status: 403,
      headers: { "Content-Type": "text/html" },
    });
  }

  const existing = await redis.hget(`review:${jobId}`, "status");
  if (existing === "published") {
    return new Response(page("This review is already published. ✓"), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  }
  if (!existing) {
    return new Response(page("Review not found.", "#e8f44a"), {
      status: 404,
      headers: { "Content-Type": "text/html" },
    });
  }

  const featureDate = new Date().toISOString();
  await redis
    .multi()
    .zrem("reviews:pending", jobId)
    .zadd("reviews:published", Date.now(), jobId)
    .hset(`review:${jobId}`, "status", "published", "featureDate", featureDate)
    .exec();

  return new Response(page("Review published ✓ — it will appear in the homepage carousel."), {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
