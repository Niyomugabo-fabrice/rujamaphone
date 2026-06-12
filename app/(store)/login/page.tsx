import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

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
