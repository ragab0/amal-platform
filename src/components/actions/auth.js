"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  timeout: 120000, // 2 minutes timeout (till we use the pro maxDuration);
  withCredentials: true,
});

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

    const response = await axiosInstance.get(`${API_URL}/auth/is-login`, {
      headers: {
        Cookie: `jwt=${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return {
      auth: {
        user: response.data?.result || {},
        isAuthenticated: true,
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.log("Auth Error:", error);
    let errorMessage;
    if (error.code === "ECONNABORTED") {
      errorMessage =
        "انتهت مهلة الطلب. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.";
    } else if (error.response?.data?.result?.message) {
      errorMessage = error.response.data.result.message;
    } else if (typeof error.response?.data?.result === "string") {
      errorMessage = error.response.data.result;
    } else {
      errorMessage = "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة في وقت لاحق.";
    }
    console.log("Error Message:", errorMessage);
    return {
      auth: {
        user: {},
        isAuthenticated: false,
        loading: false,
        error: errorMessage,
      },
    };
  }
}
