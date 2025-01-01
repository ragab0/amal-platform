"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/store/features/auth/authThunks";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import CircleLoader from "@/components/loaders/CircleLoader";

export default function CallbackPage() {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const isFirstRender = useRef(true);
  const { TOKEN } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    console.log("CLIENT: SAVED TOKEN IS,", TOKEN);

    const handleCallback = async () => {
      const { error } = await appDispatch(checkAuth(TOKEN));
      if (!error) {
        toast.success("تم تسجيل الدخول بنجاح");
        router.replace("/");
      } else {
        toast.error("فشل تسجيل الدخول", error);
        router.replace("/login");
      }
    };
    handleCallback();
  }, [appDispatch, router, TOKEN]);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircleLoader />
    </div>
  );
}
