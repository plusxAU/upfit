import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import redis from "@/lib/redis";
import { signApproveToken } from "@/lib/reviewToken";
import { buildTeamReviewNotificationEmail } from "@/lib/reviewEmail";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { jobId, stars, comment, name, suburb, vehicle, service } = await req.json();

    if (!jobId || !name || typeof stars !== "number" || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const dateSubmitted = new Date().toISOString();

    await redis.hset(`review:${jobId}`, {
      jobId,
      stars: String(stars),
      comment: comment ?? "",
      name,
      suburb: suburb ?? "",
      vehicle: vehicle ?? "",
      service: service ?? "",
      status: "pending",
      dateSubmitted,
      featureDate: dateSubmitted,
    });

    await redis.zadd("reviews:pending", Date.now(), jobId);

    const token = signApproveToken(jobId);
    const approveUrl = `https://upfit.au/api/feedback/approve?jobId=${encodeURIComponent(jobId)}&token=${token}`;

    try {
      await resend.emails.send({
        from: "UpFit <team@upfit.au>",
        to: "team@upfit.au",
        subject: `New review — ${stars}★ from ${name} (${suburb || "unknown suburb"})`,
        html: buildTeamReviewNotificationEmail({
          stars,
          comment: comment ?? "",
          name,
          suburb: suburb ?? "",
          vehicle: vehicle ?? "",
          service: service ?? "",
          dateSubmitted,
          jobId,
          approveUrl,
        }),
      });
    } catch (err) {
      console.error("Review notification email error:", err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("feedback POST error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
