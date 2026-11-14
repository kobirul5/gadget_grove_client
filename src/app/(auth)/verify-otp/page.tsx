import { Suspense } from "react";
import VerifyOtpPageContent from "@/components/auth/VerifyOtpPageContent";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={<main className="min-h-96 flex-1 bg-background-soft" aria-hidden="true" />}
    >
      <VerifyOtpPageContent />
    </Suspense>
  );
}
