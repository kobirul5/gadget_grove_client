import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function RegisterPage() {
  return (
    <AuthCard
      description="Create an account to make your next tech find even easier."
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/login">
            Sign in
          </Link>
        </>
      }
      title="Create your account"
    >
      <form className="space-y-4">
        <AuthField
          autoComplete="name"
          id="register-name"
          label="Full name"
          name="name"
          placeholder="Your name"
        />
        <AuthField
          autoComplete="email"
          id="register-email"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <AuthField
          autoComplete="new-password"
          id="register-password"
          label="Password"
          name="password"
          placeholder="Create a password"
          type="password"
        />
        <Button className="h-11 w-full" disabled type="submit">
          Create account
        </Button>
        <p className="text-center text-sm text-text-secondary">
          Want to preview email verification?{" "}
          <Link className="font-medium text-primary hover:underline" href="/verify-otp">
            View verification
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
