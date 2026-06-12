"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

const onSubmit = async (data: LoginFormValues) => {
  setIsLoading(true);
  
  try {
    await login(data);
    toast.success("Login successful!");
    // Force a hard reload to trigger middleware
    window.location.href = "/admin";
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Login failed");
  } finally {
    setIsLoading(false);
  }
}; // <--- Ensure this closing brace exists for the onSubmit function

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          // placeholder="you@example.com"
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
          // placeholder="••••••••"
          {...register("password")}
          disabled={isLoading}
          className="border-2 border-neutral-200 shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            {...register("rememberMe")}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal cursor-pointer"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
