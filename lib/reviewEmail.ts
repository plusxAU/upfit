const BASE_URL = "https://upfit.au";

export function buildReviewInviteEmail({
  name,
  service,
  jobId,
  suburb,
  vehicle,
}: {
  name: string;
  service: string;
  jobId: string;
  suburb: string;
  vehicle: string;
}): string {
  const firstName = name.split(" ")[0] || name;
  const encodedName = encodeURIComponent(name);
  const encodedSuburb = encodeURIComponent(suburb);
  const encodedVehicle = encodeURIComponent(vehicle);
  const encodedService = encodeURIComponent(service);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How did your install go?</title>
</head>
<body style="margin:0; padding:0; background-color:#f0ede6; font-family: 'DM Sans', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ede6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e2d8;">

          <!-- Logo header -->
          <tr>
            <td align="center" style="padding: 24px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#0f0f0d; border-radius:8px; padding: 12px 20px;">
                    <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: bold;">
                      <span style="color:#f0ede6;">Up</span><span style="color:#e8f44a;">Fit</span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding: 16px 32px 0 32px;">
              <h1 style="margin:0; font-family: 'DM Sans', Arial, sans-serif; font-size: 24px; line-height:1.3; color:#0f0f0d; font-weight:700;">
                How did your install go, ${firstName}?
              </h1>
            </td>
          </tr>

          <!-- Body copy -->
          <tr>
            <td align="center" style="padding: 16px 32px 0 32px;">
              <p style="margin:0; font-family: 'DM Sans', Arial, sans-serif; font-size: 16px; line-height:1.6; color:#444440;">
                Thanks for choosing UpFit for your ${service}. We'd love to hear how it went — it only takes a moment.
              </p>
            </td>
          </tr>

          <!-- Star rating label -->
          <tr>
            <td align="center" style="padding: 28px 32px 12px 32px;">
              <p style="margin:0; font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color:#888880; font-weight:600;">
                Tap to rate your experience
              </p>
            </td>
          </tr>

          <!-- Star buttons row -->
          <tr>
            <td align="center" style="padding: 0 16px 24px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- 1 star -->
                  <td style="padding: 0 4px;">
                    <a href="${BASE_URL}/feedback?jobId=${jobId}&stars=1&name=${encodedName}&suburb=${encodedSuburb}&vehicle=${encodedVehicle}&service=${encodedService}"
                       style="display:inline-block; text-decoration:none; background-color:#f7f5ee; border:1px solid #e5e2d8; border-radius:8px; padding: 14px 12px; font-family: Arial, sans-serif; font-size: 20px; color:#FFB400; letter-spacing: 2px;">
                      &#9733;&#9734;&#9734;&#9734;&#9734;
                    </a>
                  </td>
                  <!-- 2 stars -->
                  <td style="padding: 0 4px;">
                    <a href="${BASE_URL}/feedback?jobId=${jobId}&stars=2&name=${encodedName}&suburb=${encodedSuburb}&vehicle=${encodedVehicle}&service=${encodedService}"
                       style="display:inline-block; text-decoration:none; background-color:#f7f5ee; border:1px solid #e5e2d8; border-radius:8px; padding: 14px 12px; font-family: Arial, sans-serif; font-size: 20px; color:#FFB400; letter-spacing: 2px;">
                      &#9733;&#9733;&#9734;&#9734;&#9734;
                    </a>
                  </td>
                  <!-- 3 stars -->
                  <td style="padding: 0 4px;">
                    <a href="${BASE_URL}/feedback?jobId=${jobId}&stars=3&name=${encodedName}&suburb=${encodedSuburb}&vehicle=${encodedVehicle}&service=${encodedService}"
                       style="display:inline-block; text-decoration:none; background-color:#f7f5ee; border:1px solid #e5e2d8; border-radius:8px; padding: 14px 12px; font-family: Arial, sans-serif; font-size: 20px; color:#FFB400; letter-spacing: 2px;">
                      &#9733;&#9733;&#9733;&#9734;&#9734;
                    </a>
                  </td>
                  <!-- 4 stars -->
                  <td style="padding: 0 4px;">
                    <a href="${BASE_URL}/feedback?jobId=${jobId}&stars=4&name=${encodedName}&suburb=${encodedSuburb}&vehicle=${encodedVehicle}&service=${encodedService}"
                       style="display:inline-block; text-decoration:none; background-color:#f7f5ee; border:1px solid #e5e2d8; border-radius:8px; padding: 14px 12px; font-family: Arial, sans-serif; font-size: 20px; color:#FFB400; letter-spacing: 2px;">
                      &#9733;&#9733;&#9733;&#9733;&#9734;
                    </a>
                  </td>
                  <!-- 5 stars -->
                  <td style="padding: 0 4px;">
                    <a href="${BASE_URL}/feedback?jobId=${jobId}&stars=5&name=${encodedName}&suburb=${encodedSuburb}&vehicle=${encodedVehicle}&service=${encodedService}"
                       style="display:inline-block; text-decoration:none; background-color:#f7f5ee; border:1px solid #e5e2d8; border-radius:8px; padding: 14px 12px; font-family: Arial, sans-serif; font-size: 20px; color:#FFB400; letter-spacing: 2px;">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Helper text -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <p style="margin:0; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; line-height:1.5; color:#888880;">
                Tapping a star takes you to a short form where you can add a comment if you'd like.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="border-top: 1px solid #e5e2d8;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 32px 32px 32px;">
              <p style="margin:0; font-family: 'DM Sans', Arial, sans-serif; font-size: 13px; line-height:1.6; color:#888880;">
                UpFit &middot; upfit.au &middot; 1300 877 342
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

export function buildTeamReviewNotificationEmail({
  stars,
  comment,
  name,
  suburb,
  vehicle,
  service,
  dateSubmitted,
  jobId,
  approveUrl,
}: {
  stars: number;
  comment: string;
  name: string;
  suburb: string;
  vehicle: string;
  service: string;
  dateSubmitted: string;
  jobId: string;
  approveUrl: string;
}): string {
  const rows: [string, string][] = [
    ["Rating", `${"★".repeat(stars)}${"☆".repeat(5 - stars)} (${stars}/5)`],
    ["Name", name],
    ["Suburb", suburb || "—"],
    ["Vehicle", vehicle || "—"],
    ["Service", service],
    ["Comment", comment || "(none)"],
    ["Submitted", dateSubmitted],
    ["Job ID", jobId],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid rgba(255,255,255,0.06);">
        <tr>
          <td style="padding:10px 0;font-size:12px;color:#666660;width:30%;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;font-size:12px;color:#f0ede6;text-align:right;word-break:break-word;">${value}</td>
        </tr>
      </table>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New review — ${stars}★ from ${name}</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0d;font-family:Arial,sans-serif;color:#f0ede6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <tr><td style="padding:0 0 24px 0;">
            <p style="margin:0;font-size:20px;font-weight:600;color:#f0ede6;">UpFit</p>
          </td></tr>

          <tr><td style="padding:0 0 24px 0;">
            <p style="margin:0;font-size:22px;font-weight:400;color:#f0ede6;">New review — ${stars}★ from ${name}</p>
          </td></tr>

          <tr><td style="background:#161614;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
            ${rowsHtml}
          </td></tr>

          <tr><td style="padding:24px 0 0 0;">
            <a href="${approveUrl}" style="display:inline-block;background:#e8f44a;color:#0f0f0d;font-weight:600;font-size:14px;padding:13px 24px;border-radius:8px;text-decoration:none;">Approve &amp; publish →</a>
            <p style="margin:12px 0 0 0;font-size:11px;color:#444440;">Clicking publishes this review to the homepage carousel. Every submission lands here for moderation regardless of star rating.</p>
          </td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
