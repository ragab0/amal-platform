'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OfflinePage() {
  const router = useRouter();

  useEffect(() => {
    function handleOnline() {
      router.back();
    }

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          لا يوجد اتصال بالإنترنت
        </h1>
        <p className="text-gray-600 mb-4">
          يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-main text-white px-6 py-2 rounded-md hover:bg-main/90 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
