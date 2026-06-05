import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
      advertisedRate,
      effectiveRate,
      conversionRate,
      quotingHrs,
      upfitJobs,
      weeklyUplift,
    } = await req.json();

    const gap = 100 - effectiveRate;

    const html = `
      <h2 style="font-family:Arial,sans-serif;margin-bottom:16px">Installer calculator submission</h2>
      <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 12px;color:#666">Advertised hourly rate</td><td style="padding:6px 12px">$${advertisedRate}/hr</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Effective hourly rate (real)</td><td style="padding:6px 12px;font-weight:bold">$${effectiveRate}/hr</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Conversion rate</td><td style="padding:6px 12px">${conversionRate}%</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Quoting time per enquiry</td><td style="padding:6px 12px">${quotingHrs} hrs</td></tr>
        <tr><td style="padding:6px 12px;color:#666">UpFit jobs selected per week</td><td style="padding:6px 12px">${upfitJobs}</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Weekly UpFit earnings uplift</td><td style="padding:6px 12px">$${weeklyUplift}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;font-size:14px;color:#666;margin-top:16px">Gap vs UpFit $100/hr rate: <strong>$${gap}/hr</strong></p>
    `;

    await resend.emails.send({
      from: "UpFit Alerts <bookings@upfit.au>",
      to: "team@upfit.au",
      subject: `Installer calculator — $${effectiveRate}/hr effective rate, ${upfitJobs} UpFit jobs/week`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("installer-prospect route error:", err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}
