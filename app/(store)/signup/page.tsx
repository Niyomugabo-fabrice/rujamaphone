import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

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
