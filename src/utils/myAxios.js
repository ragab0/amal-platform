import axios from "axios";
import { toast } from "react-toastify";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to log requests
myAxios.interceptors.request.use(
  (config) => {
    console.log("Request config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
myAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network Error (No connection to backend)
    if (!error.response) {
      error.message = "لم يتم الاتصال بالخادم.";
      toast.error(error.message);
      return Promise.reject(error);
    }

    // Server returned an error response
    const { response } = error;
    switch (response?.status) {
      case 400:
        const { result, results } = error.response.data;
        if (result) {
          error.message = result;
          toast.error(error.message);
        } else if (results) {
          error.message = "بيانات غير صحيحة. يرجى التحقق من البيانات المدخلة.";
          results.forEach((item = {}) => {
            toast.error(Object.values(item)[0]);
          });
        }
        break;

      case 401:
        error.message = "غير مصرح بها. يرجى تسجيل الدخول مرة أخرى.";
        toast.error(error.message);
        break;
      case 403:
        error.message = "ليس لديك صلاحية للوصول إلى هذا المحتوى.";
        toast.error(error.message);
        break;
      case 404:
        error.message = "طلب غير صالح.";
        toast.error(error.message);
        break;
      case 500:
        error.message = "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا.";
        toast.error(error.message);
        break;
    }

    return Promise.reject(error);
  }
);

export default myAxios;
