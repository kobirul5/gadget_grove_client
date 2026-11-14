import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function LoginPage() {
  return (
    <AuthCard
      description="Good to see you again. Sign in to carry on."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/register">
            Create an account
          </Link>
        </>
      }
      title="Welcome back"
    >
      <form className="space-y-5">
        <AuthField
          autoComplete="email"
          id="login-email"
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
        />
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-text-primary"
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            autoComplete="current-password"
            className="min-h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15"
            id="login-password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
          <div className="text-right">
            <Link
              className="text-sm font-medium text-primary hover:underline"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button className="h-11 w-full" disabled type="submit">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
