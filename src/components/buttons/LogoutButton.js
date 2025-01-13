"use client";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { logout } from "@/store/features/auth/authThunks";
import { toast } from "react-toastify";
import { HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function LogoutButton({ className = "" }) {
  const dispatch = useAppDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const { error } = await dispatch(logout());
    if (!error) {
      toast.success("تم تسجيل الخروج بنجاح");
      router.push("/");
    }
    setShowLogoutModal(false);
  }

  return (
    <>
      <button
        onClick={() => setShowLogoutModal(true)}
        className={`flex gap-2 items-center justify-between ${className}`}
      >
        تسجيل الخروج
        <HiOutlineLogout />
      </button>
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="تنبيـــه"
          message="هل أنت متأكد من رغبتك في تسجيل الخروج؟"
          confirmText="موافق"
          cancelText="إلغــــاء"
        />
      )}
    </>
  );
}
