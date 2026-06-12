// Triggered manually via /admin/payment-request or future installer completion flow.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const {
      customerId,
      balanceAmount,
      jobDescription,
      depositAmount,
      includedItems,
    } = await req.json();

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
    const items: string[] = Array.isArray(includedItems) ? includedItems : [];
    const totalAmount =
      typeof depositAmount === "number" && depositAmount > 0
        ? depositAmount + balanceAmount
        : balanceAmount;

    // Generate invoice number: INV-YYYYMMDD-last4digits
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const last4 = Date.now().toString().slice(-4);
    const invoiceNumber = `INV-${yyyy}${mm}${dd}-${last4}`;
    const invoiceDate = `${dd}/${mm}/${yyyy}`;

    // GST breakdown (prices are GST-inclusive)
    const subTotalCents = Math.round((totalAmount * 100) / 1.1);
    const gstCents = Math.round(totalAmount * 100) - subTotalCents;
    const subTotal = (subTotalCents / 100).toFixed(2);
    const gst = (gstCents / 100).toFixed(2);

    const invoiceHtml = buildTaxInvoiceEmail({
      customerName,
      customerEmail: receiptEmail ?? "",
      jobDescription: job,
      includedItems: items,
      totalAmount,
      subTotal,
      gst,
      invoiceDate,
      invoiceNumber,
    });

    // Tax invoice to customer
    if (receiptEmail) {
      try {
        await resend.emails.send({
          from: "UpFit <team@upfit.au>",
          to: receiptEmail,
          subject: `Tax Invoice — UpFit — ${job}`,
          html: invoiceHtml,
        });
      } catch (err) {
        console.error("Tax invoice email error:", err);
      }
    }

    // Team notification
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
          invoiceNumber,
        }),
      });
    } catch (err) {
      console.error("Team balance notification error:", err);
    }

    // Tax invoice copy to team for records
    try {
      await resend.emails.send({
        from: "UpFit <team@upfit.au>",
        to: "team@upfit.au",
        subject: `[Invoice copy] ${invoiceNumber} — ${job}`,
        html: invoiceHtml,
      });
    } catch (err) {
      console.error("Team invoice copy error:", err);
    }

    return NextResponse.json({
      success: true,
      chargeId: paymentIntent.id,
      invoiceNumber,
    });
  } catch (err) {
    console.error("charge-balance error:", err);
    return NextResponse.json({ error: "Balance charge failed" }, { status: 500 });
  }
}

function buildTaxInvoiceEmail({
  customerName,
  customerEmail,
  jobDescription,
  includedItems,
  totalAmount,
  subTotal,
  gst,
  invoiceDate,
  invoiceNumber,
}: {
  customerName: string;
  customerEmail: string;
  jobDescription: string;
  includedItems: string[];
  totalAmount: number;
  subTotal: string;
  gst: string;
  invoiceDate: string;
  invoiceNumber: string;
}): string {
  const hasItems = includedItems.length > 0;
  const itemsText = hasItems ? includedItems.join(", ") : "";

  const lineItemsHtml = hasItems
    ? `
      <tr>
        <td style="padding:12px 0 4px 0;font-size:13px;color:#f0ede6;font-weight:500;border-bottom:none;">${jobDescription}</td>
        <td style="padding:12px 0 4px 0;font-size:13px;color:#f0ede6;text-align:right;border-bottom:none;"></td>
      </tr>
      <tr>
        <td style="padding:4px 0 12px 0;font-size:12px;color:#888884;border-bottom:1px solid rgba(255,255,255,0.08);">Includes: ${itemsText}</td>
        <td style="padding:4px 0 12px 0;font-size:13px;color:#f0ede6;font-weight:500;text-align:right;border-bottom:1px solid rgba(255,255,255,0.08);">$${totalAmount}</td>
      </tr>`
    : `
      <tr>
        <td style="padding:12px 0;font-size:13px;color:#f0ede6;font-weight:500;border-bottom:1px solid rgba(255,255,255,0.08);">${jobDescription}</td>
        <td style="padding:12px 0;font-size:13px;color:#f0ede6;font-weight:500;text-align:right;border-bottom:1px solid rgba(255,255,255,0.08);">$${totalAmount}</td>
      </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tax Invoice — UpFit</title>
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

          <!-- Tax Invoice heading -->
          <tr>
            <td style="padding:0 0 28px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
              <p style="margin:0;font-size:28px;font-weight:400;color:#f0ede6;">Tax Invoice</p>
            </td>
          </tr>

          <!-- Supplier + invoice details -->
          <tr>
            <td style="padding:24px 0 24px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;width:50%;">
                    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666660;">From</p>
                    <p style="margin:0;font-size:13px;color:#f0ede6;font-weight:500;line-height:1.7;">UpFit</p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.7;">Brent Della Valle</p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.7;">ABN 86 599 618 749</p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.7;">
                      <a href="mailto:team@upfit.au" style="color:#888884;text-decoration:none;">team@upfit.au</a>
                    </p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.7;">
                      <a href="tel:1300877342" style="color:#888884;text-decoration:none;">1300 877 342</a>
                    </p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.7;">upfit.au</p>
                  </td>
                  <td style="vertical-align:top;text-align:right;">
                    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666660;">Invoice details</p>
                    <p style="margin:0;font-size:12px;color:#f0ede6;line-height:1.8;">${invoiceNumber}</p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.8;">${invoiceDate}</p>
                    <br/>
                    <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666660;">Bill to</p>
                    <p style="margin:0;font-size:12px;color:#f0ede6;line-height:1.8;">${customerName || "—"}</p>
                    <p style="margin:0;font-size:12px;color:#888884;line-height:1.8;">${customerEmail || "—"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Line items -->
          <tr>
            <td style="padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Column headers -->
                <tr>
                  <td style="padding:16px 0 8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666660;border-bottom:1px solid rgba(255,255,255,0.14);">Description</td>
                  <td style="padding:16px 0 8px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666660;text-align:right;border-bottom:1px solid rgba(255,255,255,0.14);">Amount</td>
                </tr>

                <!-- Main line item(s) -->
                ${lineItemsHtml}

                <!-- Subtotals -->
                <tr>
                  <td style="padding:10px 0 6px 0;font-size:12px;color:#888884;">Subtotal exc GST</td>
                  <td style="padding:10px 0 6px 0;font-size:12px;color:#888884;text-align:right;">$${subTotal}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:12px;color:#888884;border-bottom:1px solid rgba(255,255,255,0.08);">GST (10%)</td>
                  <td style="padding:6px 0;font-size:12px;color:#888884;text-align:right;border-bottom:1px solid rgba(255,255,255,0.08);">$${gst}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0 6px 0;font-size:14px;color:#f0ede6;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.08);">Total inc GST</td>
                  <td style="padding:12px 0 6px 0;font-size:14px;color:#e8f44a;font-weight:600;text-align:right;border-bottom:1px solid rgba(255,255,255,0.08);">$${totalAmount}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:12px;color:#888884;">Payment status</td>
                  <td style="padding:10px 0;font-size:12px;color:#f0ede6;font-weight:500;text-align:right;">Paid in full</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Warranty -->
          <tr>
            <td style="padding:28px 0 0 0;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0 0 10px 0;font-size:12px;font-weight:600;color:#f0ede6;">Warranty</p>
              <p style="margin:0 0 6px 0;font-size:12px;color:#888884;line-height:1.6;">
                <strong style="color:#f0ede6;">Hardware:</strong> All products carry the manufacturer&rsquo;s standard Australian warranty.
              </p>
              <p style="margin:0 0 6px 0;font-size:12px;color:#888884;line-height:1.6;">
                <strong style="color:#f0ede6;">Installation workmanship:</strong> 12 months from date of installation.
              </p>
              <p style="margin:0;font-size:12px;color:#888884;line-height:1.6;">
                For warranty claims or questions contact UpFit at
                <a href="mailto:team@upfit.au" style="color:#888884;text-decoration:underline;">team@upfit.au</a>
                or call <a href="tel:1300877342" style="color:#888884;text-decoration:none;">1300 877 342</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:32px;">
              <p style="margin:0;font-size:12px;color:#444440;line-height:1.6;">
                Thank you for choosing UpFit. &middot;
                <a href="https://upfit.au" style="color:#444440;text-decoration:none;">upfit.au</a> &middot;
                <a href="tel:1300877342" style="color:#444440;text-decoration:none;">1300 877 342</a>
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
  invoiceNumber,
}: {
  customerName: string;
  receiptEmail: string;
  amount: number;
  jobDescription: string;
  chargeId: string;
  invoiceNumber: string;
}): string {
  const rows = [
    ["Customer", customerName || "(unknown)"],
    ["Email", receiptEmail || "(unknown)"],
    ["Job", jobDescription],
    ["Amount charged", `$${amount}`],
    ["Stripe charge ID", chargeId],
    ["Invoice number", invoiceNumber],
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
