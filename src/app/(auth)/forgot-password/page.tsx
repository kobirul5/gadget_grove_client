import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      description="It happens. Enter your email and we&apos;ll help you get back in."
      footer={
        <>
          Remember your password?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/login">
            Back to sign in
          </Link>
        </>
      }
      title="Forgot password?"
    >
      <form className="space-y-5">
        <AuthField
          autoComplete="email"
          id="forgot-email"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <Button className="h-11 w-full" disabled type="submit">
          Send verification code
        </Button>
        <Link
          className="block text-center text-sm font-medium text-primary hover:underline"
          href="/verify-otp"
        >
          Already have a code? Enter it here
        </Link>
      </form>
    </AuthCard>
  );
}
