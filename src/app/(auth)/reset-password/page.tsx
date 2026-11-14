import Link from "next/link";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import AuthField from "@/components/auth/AuthField";

export default function ResetPasswordPage() {
  return (
    <AuthCard
      description="Choose a new password for your Gadget Grove account."
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
      <form className="space-y-5">
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
          placeholder="Re-enter your new password"
          type="password"
        />
        <Button className="h-11 w-full" disabled type="submit">
          Reset password
        </Button>
      </form>
    </AuthCard>
  );
}
