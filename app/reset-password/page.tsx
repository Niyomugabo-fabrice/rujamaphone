import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}