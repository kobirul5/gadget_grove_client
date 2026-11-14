"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthField from "@/components/auth/AuthField";

export default function ResetPasswordForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

    router.push("/login");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AuthField
        autoComplete="new-password"
        id="new-password"
        label="New password"
        name="password"
        placeholder="Enter your new password"
        type="password"
      />
      <AuthField
        autoComplete="new-password"
        id="confirm-password"
        label="Confirm new password"
        name="confirmPassword"
        onInput={(event) => event.currentTarget.setCustomValidity("")}
        placeholder="Re-enter your new password"
        type="password"
      />
      <Button className="h-11 w-full" type="submit">
        Continue to sign in
      </Button>
    </form>
  );
}
