import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function RegisterPage() {
  return (
    <AuthCard
      description="Set up your account and make yourself at home."
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
          Once you&apos;re signed up, you can verify your email.{" "}
          <Link className="font-medium text-primary hover:underline" href="/verify-otp">
            Verify email
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
