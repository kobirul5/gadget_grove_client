import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

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
      <ForgotPasswordForm />
    </AuthCard>
  );
}
