"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type VerifyOtpFormProps = {
  email: string;
  flow: "signup" | "password-reset";
};

export default function VerifyOtpForm({ email, flow }: VerifyOtpFormProps) {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function updateCode(index: number, value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 6 - index);

    setCode((currentCode) => {
      const nextCode = [...currentCode];

      if (digits.length > 1) {
        digits.split("").forEach((digit, offset) => {
          nextCode[index + offset] = digit;
        });
      } else {
        nextCode[index] = digits;
      }

      return nextCode;
    });

    if (digits.length > 1) {
      const nextIndex = Math.min(index + digits.length, 5);
      inputs.current[nextIndex]?.focus();
    } else if (digits && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;

    setCode(digits.split("").concat(Array(6 - digits.length).fill("")));
    inputs.current[Math.min(digits.length, 5)]?.focus();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(code.join(""))) return;

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
      <fieldset className="space-y-2 border-0 p-0">
        <legend className="text-sm font-medium text-text-primary">
          Verification code
        </legend>
        <div className="flex gap-2" role="group" aria-label="6-digit verification code">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(input) => {
                inputs.current[index] = input;
              }}
              aria-label={`Digit ${index + 1} of 6`}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              className="h-12 w-10 rounded-xl border border-border bg-surface text-center text-lg font-semibold text-text-primary outline-none transition focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 sm:h-14 sm:w-12"
              inputMode="numeric"
              maxLength={6}
              name={`code-${index + 1}`}
              onChange={(event) => updateCode(index, event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digit && index > 0) {
                  inputs.current[index - 1]?.focus();
                } else if (event.key === "ArrowLeft" && index > 0) {
                  inputs.current[index - 1]?.focus();
                } else if (event.key === "ArrowRight" && index < 5) {
                  inputs.current[index + 1]?.focus();
                }
              }}
              onPaste={handlePaste}
              pattern="[0-9]"
              required
              type="text"
              value={digit}
            />
          ))}
        </div>
      </fieldset>
      <Button className="h-11 w-full" type="submit">
        Continue
      </Button>
    </form>
  );
}
