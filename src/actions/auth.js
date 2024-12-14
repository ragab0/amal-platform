"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
