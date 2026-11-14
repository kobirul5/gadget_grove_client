import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      description="Set up your account and make yourself at home."
      footer={
        <>
          Already have an account?{" "}
          <Link className="font-semibold text-primary hover:underline" href="/login">
            Sign in
          </Link>
        </>
      }
      title="Create your account"
    >
      <RegisterForm />
    </AuthCard>
  );
}
