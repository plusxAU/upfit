import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login — UpFit",
  robots: "noindex",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0f0f0d" }} />}>
      <LoginForm />
    </Suspense>
  );
}
