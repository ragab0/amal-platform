import axios from "axios";
import { toast } from "react-toastify";

const myAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    let result, results;
    switch (response?.status) {
      case 400:
        result = error.response.data.result;
        results = error.response.data.results;
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
        result = error.response.data.result;
        results = error.response.data.results;
        if (result) {
          error.message = result;
          toast.error(error.message);
        } else {
          error.message = "طلب غير صالح.";
          toast.error(error.message);
        }

        break;
      case 429:
        error.message = response.data;
        toast.error(error.message);
        break;
      case 500:
        error.message = "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا.";
        toast.error(error.message);
        break;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("myAxiosResponse Error:", error);
    }
    return response?.status >= 500 ? null : Promise.reject(error);
  }
);

export default myAxios;
