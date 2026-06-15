"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateProfileSchema, changePasswordSchema, type UpdateProfileFormValues, type ChangePasswordFormValues } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  const { token } = useAuth();
  const user = useCurrentUser();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      avatar: user?.avatar || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileUpdate = async (data: UpdateProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const result = await response.json();
      toast.success("Profile updated successfully!");
      // Refresh user data
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordChange = async (data: ChangePasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to change password");
      }

      toast.success("Password changed successfully!");
      resetPasswordForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </ProtectedRoute>
    );
  }

  const initials = user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your account settings</p>
          </div>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src={user.avatar || undefined} />
                <AvatarFallback className="text-xl sm:text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-lg sm:text-xl">{user.fullName}</CardTitle>
                <CardDescription className="text-sm">{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-muted-foreground">Email Verified</p>
                <p className="font-medium">{user.emailVerified ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Update Profile</CardTitle>
            <CardDescription className="text-sm">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmitProfile(onProfileUpdate)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm sm:text-base">Full Name</Label>
                <Input
                  id="fullName"
                  {...registerProfile("fullName")}
                  disabled={isUpdatingProfile}
                  className="h-10"
                />
                {profileErrors.fullName && (
                  <p className="text-xs sm:text-sm text-destructive">{profileErrors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar" className="text-sm sm:text-base">Avatar URL</Label>
                <Input
                  id="avatar"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  {...registerProfile("avatar")}
                  disabled={isUpdatingProfile}
                  className="h-10"
                />
                {profileErrors.avatar && (
                  <p className="text-xs sm:text-sm text-destructive">{profileErrors.avatar.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isUpdatingProfile} className="w-full sm:w-auto h-10">
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Change Password</CardTitle>
            <CardDescription className="text-sm">Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmitPassword(onPasswordChange)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm sm:text-base">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  {...registerPassword("currentPassword")}
                  disabled={isChangingPassword}
                  className="h-10"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-xs sm:text-sm text-destructive">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm sm:text-base">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...registerPassword("newPassword")}
                  disabled={isChangingPassword}
                  className="h-10"
                />
                {passwordErrors.newPassword && (
                  <p className="text-xs sm:text-sm text-destructive">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...registerPassword("confirmPassword")}
                  disabled={isChangingPassword}
                  className="h-10"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-xs sm:text-sm text-destructive">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isChangingPassword} className="w-full sm:w-auto h-10">
                {isChangingPassword ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  );
}
