import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types/auth";

export function useCurrentUser(): User | null {
  const { user } = useAuth();
  return user;
}
