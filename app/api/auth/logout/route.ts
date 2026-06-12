import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the cookie by setting maxAge to 0 or setting the date to the past
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Sets expiration to 1970, effectively deleting it
    path: "/",
  });

  return response;
}