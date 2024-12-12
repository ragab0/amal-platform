"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/store/features/auth/authThunks";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { toast } from "react-toastify";
import CircleLoader from "@/components/loaders/CircleLoader";

export default function CallbackPage() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    appDispatch(checkAuth())
      .then(({ error, payload }) => {
        if (!error) {
          toast.success("تم تسجيل الدخول بنجاح");
          router.replace("/");
        }
      })
      .finally(() => {
        router.replace("/login");
      });
  }, [appDispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <CircleLoader />
    </div>
  );
}
