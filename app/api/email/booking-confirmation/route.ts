import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const {
      customerName,
      customerEmail,
      vehicle,
      packageName,
      addOns,
      totalPrice,
      depositAmount,
      balanceAmount,
      location,
      timePreference,
      address,
      notes,
    } = await req.json();

    const firstName = customerName.split(" ")[0] || customerName;

    const timeLabel =
      timePreference === "ASAP"
        ? "ASAP — we'll call or text to confirm a time"
        : timePreference === "questions_first"
        ? "Callback requested — we'll call before confirming"
        : timePreference;

    const addOnsList =
      addOns && addOns.length > 0
        ? addOns.join(", ")
        : "None";

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed — UpFit</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0d;font-family:Arial,sans-serif;color:#f0ede6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.5px;color:#f0ede6;">UpFit</p>
            </td>
          </tr>

          <!-- Check icon + heading -->
          <tr>
            <td style="padding:0 0 8px 0;">
              <p style="margin:0;font-size:28px;font-weight:400;color:#f0ede6;">Booking confirmed, ${firstName}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:15px;color:#888884;line-height:1.6;">
                Your $${depositAmount} deposit has been charged. We&rsquo;ll call or text to lock in your install time — usually within 2 hours.
                The remaining $${balanceAmount} is charged when your installer marks the job complete.
              </p>
            </td>
          </tr>

          <!-- Summary card -->
          <tr>
            <td style="background:#161614;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
              <p style="margin:0 0 16px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666660;">Booking summary</p>

              ${[
                ["Vehicle", vehicle],
                ["Package", packageName],
                ["Add-ons", addOnsList],
                ["Total", `$${totalPrice} incl. GST`],
                ["Deposit charged", `$${depositAmount}`],
                ["Balance on completion", `$${balanceAmount}`],
                ...(address ? [["Address", address] as [string, string]] : []),
                ["Location", location],
                ["Timing", timeLabel],
                ...(notes ? [["Notes", notes] as [string, string]] : []),
              ]
                .map(
                  ([label, value]) => `
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:40%;">${label}</td>
                  <td style="padding:10px 0;font-size:12px;color:#f0ede6;font-weight:500;text-align:right;">${value}</td>
                </tr>
              </table>`
                )
                .join("")}
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding:32px 0 0 0;">
              <p style="margin:0 0 12px 0;font-size:13px;font-weight:600;color:#f0ede6;">What happens next</p>
              <p style="margin:0 0 8px 0;font-size:13px;color:#888884;line-height:1.6;">
                1. We&rsquo;ll call or text you to confirm your install time.
              </p>
              <p style="margin:0 0 8px 0;font-size:13px;color:#888884;line-height:1.6;">
                2. Your installer comes to you — no need to go anywhere.
              </p>
              <p style="margin:0;font-size:13px;color:#888884;line-height:1.6;">
                3. Once the job is done, the remaining $${balanceAmount} is charged to the same card.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:40px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:32px;">
              <p style="margin:0;font-size:12px;color:#444440;line-height:1.6;">
                Questions? Reply to this email or call us on <a href="tel:1300877342" style="color:#e8f44a;text-decoration:none;">1300 877 342</a>.
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;color:#444440;">
                &copy; UpFit &mdash; Mobile vehicle technology installation, Australia-wide.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const { error } = await resend.emails.send({
      from: "UpFit Bookings <bookings@upfit.au>",
      replyTo: "team@upfit.au",
      to: customerEmail,
      subject: `Booking confirmed — ${vehicle} install`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email route error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
