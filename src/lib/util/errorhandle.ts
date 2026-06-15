import { handleApiError as handleError } from "@/lib/api";

export const handleApiError = (error: unknown) => handleError("api.legacy", error);
