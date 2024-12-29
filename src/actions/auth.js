"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const NODE_ENV = process.env.NODE_ENV;

// Using React cache to memoize the auth state
export async function getInitialAuthState() {
  console.log("INSIDE SERVER AUTH");

  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("jwt")?.value;
    if (!token) {
      return {
        auth: {
          user: {},
          isAuthenticated: false,
          loading: false,
          error: null,
        },
      };
    }

    const response = await axios.get(`${API_URL}/auth/is-login`, {
      headers: {
        Cookie: `jwt=${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
      timeout: NODE_ENV === "development" ? 1000 : 8000,
    });

    return {
      auth: {
        user: response.data.result || {},
        isAuthenticated: true,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.log("Failed to get initial data", error);

    return {
      auth: {
        user: {},
        isAuthenticated: false,
        loading: false,
        error: error.response?.data?.result || null,
      },
    };
  }
}
