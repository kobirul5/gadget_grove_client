"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";

export default function VerifyOtpPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const flow =
    searchParams.get("flow") === "password-reset" ? "password-reset" : "signup";

  return (
    <AuthCard
      description="Enter the 6-digit code to continue."
      footer={
        <>
          Wrong email?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            href="/forgot-password"
          >
            Go back
          </Link>
        </>
      }
      title="Verify your email"
    >
      <VerifyOtpForm email={email} flow={flow} />
      {flow === "password-reset" ? (
        <div className="mt-4 text-center text-sm text-text-secondary">
          <Link
            className="font-medium text-primary hover:underline"
            href="/forgot-password"
          >
            Use a different email
          </Link>
        </div>
      ) : null}
    </AuthCard>
  );
}
