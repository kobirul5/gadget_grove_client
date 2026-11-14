"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthField from "@/components/auth/AuthField";

type VerifyOtpFormProps = {
  email: string;
  flow: "signup" | "password-reset";
};

export default function VerifyOtpForm({ email, flow }: VerifyOtpFormProps) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({ email });

    if (flow === "password-reset") {
      router.push(`/reset-password?${params.toString()}`);
      return;
    }

    router.push("/login");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {email ? (
        <p className="text-sm text-text-secondary">
          Enter the 6-digit code for{" "}
          <span className="font-medium text-text-primary">{email}</span>.
        </p>
      ) : null}
      <AuthField
        autoComplete="one-time-code"
        id="verification-code"
        inputMode="numeric"
        label="Verification code"
        maxLength={6}
        name="code"
        pattern="[0-9]{6}"
        placeholder="Enter 6-digit code"
      />
      <Button className="h-11 w-full" type="submit">
        Continue
      </Button>
    </form>
  );
}
