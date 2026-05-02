import { NextRequest, NextResponse } from "next/server";

const PORTAL_ID = "443132944";
const FORM_GUID = "333b4302-43d7-4c1f-9e7f-6fe96c5a303b";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: body.fields,
          context: {
            pageUri: body.pageUri || "https://upfit.au/quote",
            pageName: "UpFit Quote Request",
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("HubSpot error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote API error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
