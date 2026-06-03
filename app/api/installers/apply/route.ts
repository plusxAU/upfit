import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const {
    name, phone, email, suburb, state,
    setup, services, capacity, experience, notes,
  } = await req.json();

  const servicesList = Array.isArray(services) && services.length > 0
    ? services.join(", ")
    : "Not specified";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
      <h2 style="margin-bottom:24px;">New installer application</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          ${row("Name", name)}
          ${row("Phone", phone)}
          ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
          ${row("Based in", `${suburb}, ${state}`)}
          ${row("Setup", setup)}
          ${row("Installs", servicesList)}
          ${row("UpFit capacity/wk", capacity)}
          ${row("Experience", experience)}
          ${notes ? row("Anything else", notes) : ""}
        </tbody>
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "UpFit <bookings@upfit.au>",
      to: "team@upfit.au",
      replyTo: email,
      subject: `Installer application — ${name} (${suburb}, ${state})`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "email_failed" }, { status: 500 });
  }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:40%;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:13px;font-weight:500;">${value}</td>
    </tr>
  `;
}
