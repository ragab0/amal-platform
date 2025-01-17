export default function InitialDataLoader({ children, initialError }) {
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
        </div>
      </div>
    );
  }

  return children;
}
