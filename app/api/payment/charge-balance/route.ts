// Triggered manually via /admin/payment-request or future installer completion flow.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { customerId, balanceAmount, jobDescription } = await req.json();

    if (!customerId || !balanceAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    if (paymentMethods.data.length === 0) {
      return NextResponse.json(
        { error: "No saved payment method found for customer" },
        { status: 400 }
      );
    }

    const paymentMethod = paymentMethods.data[0];

    const customer = await stripe.customers.retrieve(customerId);
    const receiptEmail =
      customer.deleted ? undefined : (customer as Stripe.Customer).email ?? undefined;
    const customerName =
      customer.deleted ? "" : (customer as Stripe.Customer).name ?? "";

    const paymentIntent = await stripe.paymentIntents.create({
      amount: balanceAmount * 100, // cents
      currency: "aud",
      customer: customerId,
      payment_method: paymentMethod.id,
      confirm: true,
      off_session: true,
      description: `UpFit balance — ${jobDescription ?? "installation"}`,
      receipt_email: receiptEmail,
      metadata: {
        jobDescription: jobDescription ?? "",
        balanceAmount: String(balanceAmount),
        chargeType: "balance",
      },
    });

    const job = jobDescription ?? "installation";

    if (receiptEmail) {
      try {
        await resend.emails.send({
          from: "UpFit <team@upfit.au>",
          to: receiptEmail,
          subject: `Payment complete — ${job}`,
          html: buildReceiptEmail({ customerName, amount: balanceAmount, jobDescription: job }),
        });
      } catch (err) {
        console.error("Receipt email error:", err);
      }
    }

    try {
      await resend.emails.send({
        from: "UpFit <team@upfit.au>",
        to: "team@upfit.au",
        subject: `Balance payment received — ${job}`,
        html: buildTeamBalanceEmail({
          customerName,
          receiptEmail: receiptEmail ?? "",
          amount: balanceAmount,
          jobDescription: job,
          chargeId: paymentIntent.id,
        }),
      });
    } catch (err) {
      console.error("Team balance notification error:", err);
    }

    return NextResponse.json({
      success: true,
      chargeId: paymentIntent.id,
    });
  } catch (err) {
    console.error("charge-balance error:", err);
    return NextResponse.json({ error: "Balance charge failed" }, { status: 500 });
  }
}

function buildReceiptEmail({
  customerName,
  amount,
  jobDescription,
}: {
  customerName: string;
  amount: number;
  jobDescription: string;
}): string {
  const firstName = customerName ? customerName.split(" ")[0] : "there";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment complete</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0d;font-family:Arial,sans-serif;color:#f0ede6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.5px;color:#f0ede6;">UpFit</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px 0;">
              <p style="margin:0;font-size:26px;font-weight:400;color:#f0ede6;">Payment complete, ${firstName}.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:15px;color:#888884;line-height:1.6;">
                Thank you &mdash; your final payment of $${amount} has been processed. Your UpFit installation is now complete.
                If you have any questions please contact us at <a href="mailto:team@upfit.au" style="color:#e8f44a;text-decoration:none;">team@upfit.au</a> or call <a href="tel:1300877342" style="color:#e8f44a;text-decoration:none;">1300 877 342</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#161614;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:45%;">Job</td>
                  <td style="padding:10px 0;font-size:12px;color:#f0ede6;font-weight:500;text-align:right;">${jobDescription}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:45%;">Final payment</td>
                  <td style="padding:10px 0;font-size:13px;color:#e8f44a;font-weight:600;text-align:right;">$${amount}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:40px;">
              <p style="margin:0;font-size:12px;color:#444440;line-height:1.6;">
                UpFit &middot; <a href="https://upfit.au" style="color:#444440;text-decoration:none;">upfit.au</a> &middot; <a href="tel:1300877342" style="color:#444440;text-decoration:none;">1300 877 342</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTeamBalanceEmail({
  customerName,
  receiptEmail,
  amount,
  jobDescription,
  chargeId,
}: {
  customerName: string;
  receiptEmail: string;
  amount: number;
  jobDescription: string;
  chargeId: string;
}): string {
  const rows = [
    ["Customer", customerName || "(unknown)"],
    ["Email", receiptEmail || "(unknown)"],
    ["Job", jobDescription],
    ["Amount charged", `$${amount}`],
    ["Stripe charge ID", chargeId],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="padding:10px 0;font-size:12px;color:#666660;width:35%;">${label}</td>
          <td style="padding:10px 0;font-size:12px;color:#f0ede6;text-align:right;word-break:break-all;">${value}</td>
        </tr>
      </table>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Balance payment received</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0d;font-family:Arial,sans-serif;color:#f0ede6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:0 0 24px 0;">
              <p style="margin:0;font-size:20px;font-weight:600;color:#f0ede6;">UpFit</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 24px 0;">
              <p style="margin:0;font-size:22px;font-weight:400;color:#f0ede6;">Balance payment received</p>
            </td>
          </tr>
          <tr>
            <td style="background:#161614;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
              ${rowsHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
