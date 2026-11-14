import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function VerifyOtpPage() {
  return (
    <AuthCard
      description="We sent a 6-digit code to your email. Pop it in below to continue."
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
      title="Check your email"
    >
      <form className="space-y-5">
        <AuthField
          autoComplete="one-time-code"
          id="verification-code"
          inputMode="numeric"
          label="Verification code"
          maxLength={6}
          name="code"
          placeholder="Enter 6-digit code"
        />
        <Button className="h-11 w-full" disabled type="submit">
          Verify code
        </Button>
        <div className="text-center text-sm text-text-secondary">
          Resetting your password?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            href="/reset-password"
          >
            Choose a new password
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
