import { createHmac, timingSafeEqual } from "crypto";

function sign(jobId: string): string {
  return createHmac("sha256", process.env.REVIEW_APPROVE_SECRET!)
    .update(jobId)
    .digest("hex");
}

export function signApproveToken(jobId: string): string {
  return sign(jobId);
}

export function verifyApproveToken(jobId: string, token: string): boolean {
  const expected = sign(jobId);
  try {
    return (
      token.length === expected.length &&
      timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"))
    );
  } catch {
    return false;
  }
}
