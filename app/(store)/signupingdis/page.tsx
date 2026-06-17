import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup Disabled",
  description: "Account registration is currently disabled.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Signup Disabled"
      description="Registration is temporarily disabled. Please sign in or contact support."
    >
      <div className="rounded-3xl border border-neutral-200 bg-muted p-8 text-center shadow-sm">
        <p className="text-base font-semibold text-foreground">
          Signup is currently disabled.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Existing users can sign in below.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Go to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
