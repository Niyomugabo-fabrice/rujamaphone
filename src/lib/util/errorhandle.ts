import { NextResponse } from "next/server";
// Add this helper to your route file or import it from a utility
export const handleApiError = (error: any) => {
  console.error("API_ERROR:", error);

  // Handle Auth Errors
  if (error.message.includes("Unauthorized")) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  if (error.message.includes("Forbidden")) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  // Handle Validation/Bad Request Errors
  if (error.message.includes("Missing")) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Fallback for Database or Cloudinary errors
  return NextResponse.json(
    { error: "Internal Server Processing Error" },
    { status: 500 }
  );
};