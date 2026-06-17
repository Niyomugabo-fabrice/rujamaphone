import { fail } from "@/lib/api";

export async function POST() {
  return fail("Signup is disabled", 403);
}
