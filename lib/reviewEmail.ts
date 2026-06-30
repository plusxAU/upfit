const BASE_URL = "https://upfit.au";

function buildStarLinks({
  jobId,
  name,
  suburb,
  vehicle,
  service,
}: {
  jobId: string;
  name: string;
  suburb: string;
  vehicle: string;
  service: string;
}): string {
  const cells = [1, 2, 3, 4, 5]
    .map((n) => {
      const params = new URLSearchParams({ jobId, stars: String(n), name, suburb, vehicle, service });
      const href = `${BASE_URL}/feedback?${params.toString()}`;
      const filled = "★".repeat(n);
      const empty = "☆".repeat(5 - n);
      const label = `${filled}<span style="color:#333330;">${empty}</span>`;
      return `<td><a href="${href}" style="display:inline-block;padding:10px 14px;background:#1c1c19;border:1px solid rgba(255,255,255,0.14);border-radius:8px;text-decoration:none;font-size:18px;letter-spacing:0.05em;color:#e8f44a;">${label}</a></td>`;
    })
    .join('<td style="width:6px;"></td>');
  return `<table cellpadding="0" cellspacing="0"><tr>${cells}</tr></table>`;
}

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
  const starTable = buildStarLinks({ jobId, name, suburb, vehicle, service });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>How did your install go?</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0d;font-family:Arial,sans-serif;color:#f0ede6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0d;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <tr><td style="padding:0 0 32px 0;">
            <p style="margin:0;font-size:20px;font-weight:600;letter-spacing:-0.5px;color:#f0ede6;">UpFit</p>
          </td></tr>

          <tr><td style="padding:0 0 20px 0;">
            <p style="margin:0;font-size:26px;font-weight:400;color:#f0ede6;">How did your install go, ${firstName}?</p>
          </td></tr>

          <tr><td style="padding:0 0 32px 0;">
            <p style="margin:0;font-size:15px;color:#888884;line-height:1.6;">
              Thanks for choosing UpFit for your ${service} install. We&rsquo;d love to hear how it went &mdash; it only takes a moment.
            </p>
          </td></tr>

          <tr><td style="padding:0 0 12px 0;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666660;">Tap to rate your experience</p>
          </td></tr>

          <tr><td style="padding:0 0 32px 0;">${starTable}</td></tr>

          <tr><td style="padding:0 0 16px 0;">
            <p style="margin:0;font-size:13px;color:#888884;line-height:1.6;">
              Clicking a star takes you to a short form where you can add a comment if you&rsquo;d like.
            </p>
          </td></tr>

          <tr><td style="padding:32px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:#444440;line-height:1.6;">
              UpFit &middot; <a href="https://upfit.au" style="color:#444440;text-decoration:none;">upfit.au</a> &middot; <a href="tel:1300877342" style="color:#444440;text-decoration:none;">1300 877 342</a>
            </p>
          </td></tr>

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
