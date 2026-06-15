import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Rujama Phones Shop account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account."
    >
      <LoginForm />
    </AuthLayout>
  );
}
