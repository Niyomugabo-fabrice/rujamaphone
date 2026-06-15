"use client";

let isRedirectingToLogin = false;

async function redirectToLogin() {
  if (isRedirectingToLogin) return;
  isRedirectingToLogin = true;

  localStorage.removeItem("auth_token");

  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // The redirect still matters even if the cookie cleanup request fails.
  }

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

async function redirectIfUnauthorized(response: Response) {
  if (response.status === 401) {
    await redirectToLogin();
    return;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return;

  try {
    const payload = await response.clone().json();
    if (payload?.success === false && payload?.error === "Unauthorized") {
      await redirectToLogin();
    }
  } catch {
    // Ignore non-JSON or already-consumed response bodies.
  }
}

export async function adminFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.headers || {}),
    },
  });

  await redirectIfUnauthorized(response);
  return response;
}
