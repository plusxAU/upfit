import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildReviewInviteEmail } from "@/lib/reviewEmail";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { jobId, name, email, suburb, vehicle, service } = await req.json();

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "UpFit <team@upfit.au>",
      to: email,
      subject: "How did your install go?",
      html: buildReviewInviteEmail({ name, service: service ?? "", jobId, suburb: suburb ?? "", vehicle: vehicle ?? "" }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-review-invite error:", err);
    return NextResponse.json({ error: "Failed to send invitation" }, { status: 500 });
  }
}
