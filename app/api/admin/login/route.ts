import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH!;
    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      // Constant-time-ish: bcrypt.compare already does this internally
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signAdminToken();
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (err) {
    console.error("admin login error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
