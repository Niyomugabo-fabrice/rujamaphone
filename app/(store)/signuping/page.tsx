import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Rujama Phones Shop account for a faster shopping experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Sign Up"
      description="Create your account to get started."
    >
      <SignupForm />
    </AuthLayout>
  );
}
