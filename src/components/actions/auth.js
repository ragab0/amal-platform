"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const NODE_ENV = process.env.NODE_ENV;

// Using React cache to memoize the auth state
export async function getInitialAuthState() {
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
      credentials: "include",
      // timeout: 5000, // 5 second timeout
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
    // Throw a more user-friendly error
    throw new Error(
      error.response?.data?.result ||
        "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى."
    );
  }
}
