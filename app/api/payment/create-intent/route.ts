// Stripe Dashboard settings that must be enabled manually:
//   1. Settings → Payment methods → Cards: enabled
//   2. Settings → Customer portal: enabled
//   3. Radar (fraud rules): default rules active
//
// HubSpot custom properties to create manually in HubSpot:
//   - stripe_customer_id  (single line text)
//   - deposit_amount      (number)
//   - balance_amount      (number)
//   - payment_status      (single line text — values: "deposit_paid", "balance_paid", "refunded")

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { totalPrice, customerEmail, customerName, jobDescription } =
      await req.json();

    if (!totalPrice || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customer = await stripe.customers.create({
      name: customerName,
      email: customerEmail,
      metadata: { jobDescription: jobDescription ?? "" },
    });

    const depositAmount = Math.round(totalPrice * 0.5);
    const balanceAmount = totalPrice - depositAmount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: depositAmount * 100, // cents
      currency: "aud",
      customer: customer.id,
      setup_future_usage: "off_session",
      description: `UpFit deposit — ${jobDescription ?? "installation"}`,
      receipt_email: customerEmail,
      metadata: {
        jobDescription: jobDescription ?? "",
        depositAmount: String(depositAmount),
        balanceAmount: String(balanceAmount),
        totalPrice: String(totalPrice),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      depositAmount,
      balanceAmount,
    });
  } catch (err) {
    console.error("create-intent error:", err);
    return NextResponse.json({ error: "Payment setup failed" }, { status: 500 });
  }
}
