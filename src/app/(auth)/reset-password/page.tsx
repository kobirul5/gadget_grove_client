import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      description="Pick a new password and you&apos;ll be all set."
      footer={
        <>
          Changed your mind?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/login">
            Back to sign in
          </Link>
        </>
      }
      title="Set a new password"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
