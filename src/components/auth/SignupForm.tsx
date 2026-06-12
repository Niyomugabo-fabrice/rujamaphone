"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { signupSchema, type SignupFormValues } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup(data);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          // placeholder="Fabrice Niyomugabo"

        className="border-2 border-neutral-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-neutral-300"
          {...register("fullName")}
          disabled={isLoading}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"

          // placeholder="fabriceniyo@gmail.com"
          {...register("email")}
          disabled={isLoading}
          className="border-2 border-neutral-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-neutral-300"

        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          
          showStrength
          {...register("password")}
          disabled={isLoading}
          className="border-2 border-neutral-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          // placeholder="••••••••"
          {...register("confirmPassword")}
          disabled={isLoading}
          className="border-2 border-neutral-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
