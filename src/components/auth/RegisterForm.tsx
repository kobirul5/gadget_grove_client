"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthField from "@/components/auth/AuthField";

export default function RegisterForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    const confirmationField = event.currentTarget.elements.namedItem(
      "confirmPassword",
    );

    if (confirmationField instanceof HTMLInputElement) {
      confirmationField.setCustomValidity(
        password === confirmPassword ? "" : "Passwords do not match.",
      );
      if (!confirmationField.reportValidity()) {
        return;
      }
    } else {
      return;
    }

    const params = new URLSearchParams({ email, flow: "signup" });
    router.push(`/verify-otp?${params.toString()}`);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
      <AuthField
        autoComplete="new-password"
        id="register-confirm-password"
        label="Confirm password"
        name="confirmPassword"
        onInput={(event) => event.currentTarget.setCustomValidity("")}
        placeholder="Enter your password again"
        type="password"
      />
      <Button className="h-11 w-full" type="submit">
        Create account
      </Button>
    </form>
  );
}
