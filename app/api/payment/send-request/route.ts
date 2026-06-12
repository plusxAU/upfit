// MANUAL STEP REQUIRED: Enable Stripe payment success email notifications at dashboard.stripe.com → Settings → Email notifications → Successful payments

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const { customerName, customerEmail, jobDescription, totalAmount } =
      await req.json();

    if (!customerName || !customerEmail || !jobDescription || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const depositAmount = Math.round(totalAmount * 0.5);
    const balanceAmount = totalAmount - depositAmount;

    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail,
      metadata: { jobDescription },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id,
      payment_intent_data: {
        setup_future_usage: "off_session",
        description: jobDescription,
        metadata: {
          jobDescription,
          depositAmount: String(depositAmount),
          balanceAmount: String(balanceAmount),
        },
      },
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: { name: `Deposit — ${jobDescription}` },
            unit_amount: depositAmount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "https://upfit.au/payment-success",
      cancel_url: "https://upfit.au",
    });

    const paymentUrl = session.url!;

    await resend.emails.send({
      from: "UpFit <team@upfit.au>",
      to: customerEmail,
      subject: `Your UpFit deposit — ${jobDescription}`,
      html: buildDepositEmail({ customerName, jobDescription, depositAmount, balanceAmount, paymentUrl }),
    });

    await resend.emails.send({
      from: "UpFit <team@upfit.au>",
      to: "team@upfit.au",
      subject: `Payment request sent — ${jobDescription}`,
      html: buildTeamRequestEmail({ customerName, customerEmail, jobDescription, depositAmount, balanceAmount, paymentUrl }),
    });

    try {
      const nameParts = customerName.trim().split(" ");
      const firstname = (nameParts[0] as string) || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      await fetch(new URL("/api/booking", req.nextUrl.origin).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: firstname },
            { name: "lastname", value: lastname },
            { name: "email", value: customerEmail },
            { name: "service_type", value: jobDescription },
            { name: "stripe_customer_id", value: customer.id },
            { name: "deposit_amount", value: String(depositAmount) },
            { name: "balance_amount", value: String(balanceAmount) },
            { name: "payment_status", value: "deposit_requested" },
          ],
          pageUri: new URL("/admin/payment-request", req.nextUrl.origin).toString(),
        }),
      });
    } catch (err) {
      console.error("HubSpot submission error:", err);
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      customerId: customer.id,
      depositAmount,
      balanceAmount,
    });
  } catch (err) {
    console.error("send-request error:", err);
    return NextResponse.json(
      { error: "Failed to create payment request" },
      { status: 500 }
    );
  }
}

function buildDepositEmail({
  customerName,
  jobDescription,
  depositAmount,
  balanceAmount,
  paymentUrl,
}: {
  customerName: string;
  jobDescription: string;
  depositAmount: number;
  balanceAmount: number;
  paymentUrl: string;
}): string {
  const firstName = customerName.split(" ")[0] || customerName;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your UpFit deposit</title>
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
              <p style="margin:0;font-size:26px;font-weight:400;color:#f0ede6;">Hi ${firstName} — your install is booked.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-size:15px;color:#888884;line-height:1.6;">
                To confirm your booking, please pay the deposit below. Your card is saved securely — the remaining balance is charged automatically once your installation is confirmed complete.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#161614;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:24px;">
              <p style="margin:0 0 16px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666660;">Your booking</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:45%;">Job</td>
                  <td style="padding:10px 0;font-size:12px;color:#f0ede6;font-weight:500;text-align:right;">${jobDescription}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:45%;">Deposit due now</td>
                  <td style="padding:10px 0;font-size:13px;color:#e8f44a;font-weight:600;text-align:right;">$${depositAmount}</td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#666660;width:45%;">Balance on completion</td>
                  <td style="padding:10px 0;font-size:12px;color:#f0ede6;font-weight:500;text-align:right;">$${balanceAmount}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 24px 0;">
              <a href="${paymentUrl}" style="display:inline-block;background:#e8f44a;color:#0f0f0d;font-weight:600;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;">Pay deposit now &rarr;</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 16px 0;">
              <p style="margin:0;font-size:13px;color:#888884;line-height:1.6;">
                Your card is saved securely. The remaining balance is charged automatically once your installation is confirmed complete &mdash; you won&rsquo;t need to do anything on the day.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 40px 0;">
              <p style="margin:0;font-size:13px;color:#888884;line-height:1.6;">
                Please ensure your card has sufficient funds available at the time of your installation. The remaining balance of $${balanceAmount} will be charged automatically when your installer confirms the job is complete &mdash; you won&rsquo;t need to do anything on the day.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);">
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

function buildTeamRequestEmail({
  customerName,
  customerEmail,
  jobDescription,
  depositAmount,
  balanceAmount,
  paymentUrl,
}: {
  customerName: string;
  customerEmail: string;
  jobDescription: string;
  depositAmount: number;
  balanceAmount: number;
  paymentUrl: string;
}): string {
  const rows = [
    ["Customer", customerName],
    ["Email", customerEmail],
    ["Job", jobDescription],
    ["Deposit", `$${depositAmount}`],
    ["Balance", `$${balanceAmount}`],
    ["Payment link", `<a href="${paymentUrl}" style="color:#e8f44a;text-decoration:none;">${paymentUrl}</a>`],
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
  <title>Payment request sent</title>
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
              <p style="margin:0;font-size:22px;font-weight:400;color:#f0ede6;">Payment request sent</p>
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
