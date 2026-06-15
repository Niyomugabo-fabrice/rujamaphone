"use client";

function redirectToLogin() {
  localStorage.removeItem("auth_token");
  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

async function redirectIfUnauthorized(response: Response) {
  if (response.status === 401) {
    redirectToLogin();
    return;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return;

  try {
    const payload = await response.clone().json();
    if (payload?.success === false && payload?.error === "Unauthorized") {
      redirectToLogin();
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
