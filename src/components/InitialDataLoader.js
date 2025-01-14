"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InitialDataLoader({ children, initialError }) {
  const [isRetrying, setIsRetrying] = useState(false);
  const router = useRouter();

  const handleRetry = () => {
    setIsRetrying(true);
    // Refresh the current route
    router.refresh();
  };

  useEffect(() => {
    if (isRetrying) {
      setIsRetrying(false);
    }
  }, []);

  if (initialError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-600">
            عذراً، حدث خطأ أثناء تحميل البيانات
          </h2>
          {initialError && (
            <p className="text-gray-600">
              {typeof initialError === "string"
                ? initialError
                : initialError.message ||
                  "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى"}
            </p>
          )}
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {isRetrying ? "جاري إعادة المحاولة..." : "إعادة المحاولة"}
          </button>
        </div>
      </div>
    );
  }

  return children;
}
