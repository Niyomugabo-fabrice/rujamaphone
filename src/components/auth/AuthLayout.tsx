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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
     

        <div className="bg-card rounded-lg border-2 border-black-100 p-8 shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
