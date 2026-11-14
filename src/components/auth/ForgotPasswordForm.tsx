"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthField from "@/components/auth/AuthField";

export default function ForgotPasswordForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const params = new URLSearchParams({ email, flow: "password-reset" });

    router.push(`/verify-otp?${params.toString()}`);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AuthField
        autoComplete="email"
        id="forgot-email"
        label="Email address"
        name="email"
        placeholder="you@example.com"
        type="email"
      />
      <Button className="h-11 w-full" type="submit">
        Continue
      </Button>
    </form>
  );
}
