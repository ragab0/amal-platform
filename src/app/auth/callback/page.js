"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/store/features/auth/authThunks";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import CircleLoader from "@/components/loaders/CircleLoader";

export default function CallbackPage() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    const handleCallback = async () => {
      try {
        const { error } = await appDispatch(checkAuth()).unwrap();
        if (!error) {
          toast.success("تم تسجيل الدخول بنجاح");
          router.replace("/");
        } else {
          toast.error("فشل تسجيل الدخول");
          router.replace("/login");
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء تسجيل الدخول");
        router.replace("/login");
      }
    };
    handleCallback();
  }, [appDispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircleLoader />
    </div>
  );
}
