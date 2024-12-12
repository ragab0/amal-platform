"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getInitialAuthState() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return;
    }

    // Using fetch with specific cookie forwarding
    const response = await fetch(`${API_URL}/auth/is-login`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${token}`, // Forward the cookie securely
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    return {
      auth: {
        user: data.result || {},
        isAuthenticated: true,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error checking auth:", error);
  }
}
