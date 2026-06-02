// Future use: triggered manually or by installer completion flow.
// Not connected to any UI yet.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
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

    return NextResponse.json({
      success: true,
      chargeId: paymentIntent.id,
    });
  } catch (err) {
    console.error("charge-balance error:", err);
    return NextResponse.json({ error: "Balance charge failed" }, { status: 500 });
  }
}
