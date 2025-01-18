export default function InitialDataLoader({ children, initialErrorMessage }) {
  if (initialErrorMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-600">
            عذراً، حدث خطأ أثناء تحميل البيانات
          </h2>
          {
            <p className="text-gray-600">
              {typeof initialErrorMessage === "string"
                ? initialErrorMessage
                : "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى"}
            </p>
          }
        </div>
      </div>
    );
  }

  return children;
}
