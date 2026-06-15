import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export function AuthLayout({
  children,
  title,
  description,
  showBackButton = true,
  backHref = "/",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md">
        {showBackButton && (
          <div className="mb-4 sm:mb-6">
            <Button variant="ghost" asChild className="gap-2">
              <Link href={backHref}>
                ← Back
              </Link>
            </Button>
          </div>
        )}

        <div className="bg-card rounded-lg border-2 border-black-100 p-6 sm:p-8 shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{title}</h1>
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
